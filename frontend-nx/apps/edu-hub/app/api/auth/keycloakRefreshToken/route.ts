import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { IKeycloakRefreshTokenParams } from '@/types/keycloak';

// Handle the POST request
export async function POST(request: Request) {
  try {
    const keycloakUrlToRefreshToken = `${process.env.NEXT_PUBLIC_AUTH_URL}/realms/edu-hub/protocol/openid-connect/token`;

    // Parse the JSON body to extract `refreshToken`
    const keycloakRefreshTokenBody = (await request.json()) as IKeycloakRefreshTokenParams['body'];
    const keycloakParamsToRefreshToken = new URLSearchParams();

    keycloakParamsToRefreshToken.append('client_id', 'hasura');
    keycloakParamsToRefreshToken.append(
      'client_secret',
      process.env.KEYCLOAK_HASURA_CLIENT_SECRET || process.env.CLIENT_SECRET || process.env.NEXT_AUTH_CLIENT_SECRET!
    );
    keycloakParamsToRefreshToken.append('grant_type', 'refresh_token');
    keycloakParamsToRefreshToken.append('refresh_token', keycloakRefreshTokenBody.refreshToken);

    // Make the POST request to Keycloak
    const keycloakRefreshTokenResponse = await axios.post(keycloakUrlToRefreshToken, keycloakParamsToRefreshToken);

    // Return a JSON response with the data
    return NextResponse.json(keycloakRefreshTokenResponse.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data || {}, { status: error.response?.status || 401 });
    }

    return NextResponse.json({ message: 'Unexpected error occurred' }, { status: 401 });
  }
}

// Handle other methods (e.g., GET)
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed, only POST method is available.' }, { status: 405 });
}
