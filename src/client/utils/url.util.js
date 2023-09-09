export function getBaseUrl() {
  let url;
  switch (process.env.NODE_ENV) {
    case 'production':
      url = '/api';
      break;
    case 'development':
    default:
      url = 'http://localhost:8080/api';
  }
  return url;
}
