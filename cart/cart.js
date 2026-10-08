
import { getCart as readCart, saveCart as writeCart } from '../utils/storage.js';

export function getCart() {
  return readCart();
}

export function saveCart(cart) {
  writeCart(cart);
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  return cart;
}

export function updateQuantity(itemId, quantity) {
  const nextQuantity = Number(quantity);
  const cart = getCart()
    .map((item) => (item.id === itemId ? { ...item, quantity: Number.isFinite(nextQuantity) ? Math.max(1, nextQuantity) : 1 } : item))
    .filter((item) => item.quantity > 0);

  saveCart(cart);
  return cart;
}

export function removeFromCart(itemId) {
  const cart = getCart().filter((item) => item.id !== itemId);
  saveCart(cart);
  return cart;
}
