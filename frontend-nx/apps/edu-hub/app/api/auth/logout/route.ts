import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: Request) {
  console.log('Calling logout handler!');

  try {
    // Retrieve the token from the request cookies
    const token = await getToken({ req: request });

    if (!token && process.env.NEXTAUTH_URL) {
      console.warn('No JWT token found when calling /logout endpoint');
      // Redirect to the `NEXTAUTH_URL` if no token is found
      return NextResponse.redirect(process.env.NEXTAUTH_URL, 307);
    }

    if (token && !token.idToken) {
      throw new Error("Without an id_token the user won't be redirected back from the IdP after logout.");
    }

    if (token && token.idToken && process.env.NEXT_PUBLIC_AUTH_URL) {
      // Construct the logout URL with the id_token and post-logout redirect URI
      const endsessionURL = `${process.env.NEXT_PUBLIC_AUTH_URL}/realms/edu-hub/protocol/openid-connect/logout`;
      const endsessionParams = new URLSearchParams([
        ['id_token_hint', token.idToken],
        ['post_logout_redirect_uri', process.env.NEXTAUTH_URL || 'http://localhost:5000'],
      ]);

      // Respond with the logout URL as JSON
      return NextResponse.json({ url: `${endsessionURL}?${endsessionParams}` });
    }

    throw new Error('Something went wrong - see logout');
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred during logout.' }, { status: 500 });
  }
}
