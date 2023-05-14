export const isSignedin = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken === 'null') return false;
  return accessToken;
}

export const refreshTokenExists = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken === 'null') return false;
  return refreshToken;
}