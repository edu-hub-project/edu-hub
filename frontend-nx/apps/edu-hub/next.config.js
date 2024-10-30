//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next/plugins/with-nx');

const nextTranslate = require('next-translate-plugin');

const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: true,
  },
  output: 'standalone',
  images: {
    domains: ['picsum.photos', 'images.unsplash.com', 'storage.googleapis.com', 'localhost'],
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  i18n: undefined,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module.exports = withNx(nextTranslate(nextConfig));
