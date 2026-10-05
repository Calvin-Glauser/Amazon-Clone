const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const formatPrice = (cents) => {
    return currencyFormatter.format(cents / 100);
    }