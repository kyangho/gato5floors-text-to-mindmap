export function formatNumberCurrency(number, currency = 'VND') {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency
  }).format(number);
}
