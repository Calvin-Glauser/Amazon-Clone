import { getCart, removeFromCart, updateQuantity } from '../cart/cart.js';
import { renderHeader } from '../pages/header.js';

renderHeader();

const app = document.getElementById('app');
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function renderCheckout() {
  const cart = getCart();

  if (!app) return;

  if (cart.length === 0) {
    app.innerHTML = /*HTML*/ `
      <div class="p-6">
      
        <div class="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 class="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
          <p class="mt-2 text-slate-600">Add items to your cart to see them here.</p>
        </div>
      </div>
    `;
    return;
  }

  const itemsTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 12.99 : 0;
  const total = itemsTotal + shipping;

  app.innerHTML = /*HTML*/ `
    <div class="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[2fr_1fr]">
      <section class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h1 class="mb-4 text-2xl font-semibold text-slate-900">Shopping Cart</h1>
        <div class="space-y-4">
          ${cart
            .map(
              (item) => `

                <div class="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex items-center gap-4">
                    <div class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-slate-100 text-xs font-medium text-slate-500">
                      ${item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>

                      <h2 class="text-lg font-semibold text-slate-900">${item.name}</h2>
                      <p class="text-sm text-slate-600">${formatCurrency(item.price)}</p>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 sm:items-end">
                    <div class="flex items-center gap-3">

                      <label class="text-sm text-slate-600" for="quantity-${item.id}">Qty</label>

                      <input
                        id="quantity-${item.id}"
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        data-quantity-id="${item.id}"
                        class="w-20 rounded-md border border-slate-300 px-2 py-1 text-center"
                      >
                    </div>

                    <div class="flex items-center gap-4">
                      <p class="text-base font-semibold text-slate-900">${formatCurrency(item.price * item.quantity)}</p>
                      <button
                        type="button"
                        data-remove-id="${item.id}"
                        class="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              `,
            )
            .join('')}
        </div>
      </section>

      <aside class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 class="text-xl font-semibold text-slate-900">Order Summary</h2>


        <div class="mt-4 space-y-3 text-sm text-slate-700">
          <div class="flex items-center justify-between">
            <span>Items total</span>
            <span>${formatCurrency(itemsTotal)}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Shipping</span>
            <span>${formatCurrency(shipping)}</span>
          </div>
          <div class="border-t border-slate-200 pt-3">
            <div class="flex items-center justify-between text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>${formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  `;
}

app.addEventListener('change', (event) => {
  const quantityInput = event.target.closest('[data-quantity-id]');

  if (!quantityInput) return;

  const itemId = Number(quantityInput.dataset.quantityId);
  const newQuantity = Number(quantityInput.value);

  if (!Number.isFinite(newQuantity) || newQuantity < 1) {
    quantityInput.value = '1';
    updateQuantity(itemId, 1);
  } else {
    updateQuantity(itemId, newQuantity);
  }

  renderHeader();
  renderCheckout();
});

app.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove-id]');

  if (!removeButton) return;

  const itemId = Number(removeButton.dataset.removeId);
  removeFromCart(itemId);
  renderHeader();
  renderCheckout();
});

renderCheckout();
