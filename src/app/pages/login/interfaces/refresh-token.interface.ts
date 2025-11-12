export interface RefreshToken {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expirationToken: number;
}
