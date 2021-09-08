export const server = () => {
  if (process.env.proxy === 'Y') {
    return null;
  } else {
    return ['@/api/index.js'];
  }
}