export const getServerImage = (path: string) => {
  return `${import.meta.env['VITE_API_ENDPOINT']}${path}`;
};
