const formData = require('form-data');
const Mailgun = require('mailgun.js');

/**
 * Responds to any HTTP request to send emails via Mailgun.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.sendMail = async (req, res) => {
  if (process.env.HASURA_CLOUD_FUNCTION_SECRET !== req.headers.secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { subject, content, to, replyTo, cc, bcc } = req.body.event.data.new;
  const mailTag = req.headers.mailTag || 'eduhub'; // default if not provided

  // Base message configuration
  const msg = {
    from: `noreply@${process.env.MAILGUN_DOMAIN}`,
    to,
    subject: process.env.NODE_ENV === 'staging' ? '[STAGING] ' + subject : subject,
    text: content,
    html: content,
    'o:tag': [mailTag],
    'o:tracking': true
  };

  if (replyTo) msg['h:Reply-To'] = replyTo;
  if (cc) msg.cc = cc;
  if (bcc) msg.bcc = bcc;

  try {
    switch (process.env.NODE_ENV) {
      case 'development':
        // Development mode: Log all email attempts
        console.log('Development email:', {
          to: msg.to,
          from: msg.from,
          subject: msg.subject,
          text: msg.text,
          cc: msg.cc,
          bcc: msg.bcc,
          replyTo: msg['h:Reply-To']
        });
        break;
      case 'staging':
      case 'production':
      // Staging: Using a test domain with restricted recipients
      // Production: Using regular Mailgun domain
      const productionMailgun = new Mailgun(formData);
        await productionMailgun.client({
          username: 'api',
          key: process.env.MAILGUN_API_KEY
        }).messages.create(process.env.MAILGUN_DOMAIN, msg);
        break;

      default:
        throw new Error('Invalid environment');
    }

    return res.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
};
