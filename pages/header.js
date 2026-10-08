import { getCart } from '../cart/cart.js';

export function renderHeader() {
  const cartCount = getCart().reduce((total, item) => total + (item.quantity || 1), 0);

  let existingHeader = document.querySelector('header');

  if (existingHeader) {
    existingHeader.innerHTML = /*HTML*/ `
      <nav class="flex items-center justify-between gap-5 text-sm text-slate-200">
        <a href="./index.html" class="hover:text-white">Amazon</a>

        <div class="flex items-center gap-5">
          <a href="./index.html" class="hover:text-white">Products</a>
          <a href="./checkout.html" class="hover:text-white">Checkout (${cartCount})</a>
        </div>
      </nav>
    `;
    return existingHeader;
  }

  const header = document.createElement('header');
  header.className = 'bg-slate-900 text-white p-4';
  header.innerHTML = /*HTML*/ `
    <nav class="flex items-center justify-between gap-5 text-sm text-slate-200">
      <a href="./index.html" class="hover:text-white">Amazon</a>

      <div class="flex items-center gap-5">
        <a href="./index.html" class="hover:text-white">Products</a>
        <a href="./checkout.html" class="hover:text-white">Checkout (${cartCount})</a>
      </div>
    </nav>
  `;

  document.body.prepend(header);
  return header;
}