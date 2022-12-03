import TokenService from '../services/token.service';

export enum SystemUserType {
  INTERNAL_USER = 'INTERNAL_USER',
  IMPORTER_USER = 'IMPORTER_USER',
  GENERAL_PUBLIC_USER = 'GENERAL_PUBLIC_USER'
}

interface JWTParsedType {
  clientId: string;
  exp: number;
  iat: number;
  sessionId: string;
  sub: string;
  username: string;
}

export function parseJwt(token = TokenService.getAccessToken()): JWTParsedType | null {
  try {
    if (token) {
      const base64Url: string = token.split('.')[1];
      const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload: string = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    }
    return null;
  } catch (error) {
    return null;
  }
}
