const formatter = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

export default function formatPrice(cents) {
  return formatter.format(cents / 100);
}
