
import { getCart as readCart, saveCart as writeCart } from '../utils/storage.js';

export function getCart() {
  return readCart();
}

export function saveCart(cart) {
  writeCart(cart);
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.name === product.name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(Id) {
  const cart = getCart().filter((item) => item.id !== Id);
  saveCart(cart);
  return cart;
}
