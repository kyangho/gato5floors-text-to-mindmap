export function getBaseUrl() {
  let url;
  console.log(process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case 'server':
      url = 'http://ai.g5t.tech/api';
      break;
    case 'development':
    default:
      url = 'http://localhost:5000/api';
  }
  return url;
}
