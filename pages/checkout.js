import { getCart } from '../cart/cart.js';
import { renderHeader } from '../pages/header.js';

renderHeader();

function renderCheckout() {
  const app = document.getElementById('app');
  const cart = getCart();

  if (!app) return;

  if (cart.length === 0) {
    app.innerHTML = '<p class="p-6 text-slate-600">Your cart is empty.</p>';
    return;
  }

  cart.forEach((item) => {
    const productItemEl = document.createElement('div');
    productItemEl.className = 'flex flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm';

    productItemEl.innerHTML = /*HTML*/ `
      <div>
        <span>${item.name}</span>
      </div>
    `;

    app.append(productItemEl);
  });
}

renderCheckout();
