export interface TokenData {
  user: {
    id: string;
    email: string;
  };
  refreshToken: string;
  accessToken: string;
}

const tokenKey = `pms.user:token`;

const getStorageData = () => {
  let token: TokenData | null = null;
  try {
    token = JSON.parse(sessionStorage.getItem(tokenKey) as string);
  } catch (err) {
    console.log('Get Token Err', err);
  }

  return token;
};

const getAccessToken = () => getStorageData()?.accessToken;
const getRefreshToken = () => getStorageData()?.refreshToken;
const getUserData = () => getStorageData()?.user;
const clearToken = () => sessionStorage.removeItem(tokenKey);
const setToken = (data: TokenData) => sessionStorage.setItem(tokenKey, JSON.stringify(data));

const TokenService = {
  getAccessToken,
  getRefreshToken,
  clearToken,
  getUserData,
  setToken
};

export default TokenService;
