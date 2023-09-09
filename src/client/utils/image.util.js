import { getBaseUrl } from './url.util';
export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
  }
  const isLt20M = file.size / 1024 / 1024 < 20;
  if (!isLt20M) {
  }
  return isJpgOrPng && isLt20M;
};

export function genImageUrlByName(imageName) {
  return `${getBaseUrl()}/admin/images/${imageName}`;
}
