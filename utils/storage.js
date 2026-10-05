const CART_KEY = 'amazon-cart';

export function getCart() {
  try {
    const storedCart = localStorage.getItem(CART_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
