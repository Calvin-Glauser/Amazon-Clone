import { product } from '../data/products.js';
import { renderHeader } from '../pages/header.js';
import { addToCart } from '../cart/cart.js';

renderHeader();

function renderProducts() {
  const mainEl = document.getElementById('app');

  if (!mainEl) return;

  mainEl.className = 'grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4';

  product.forEach((productItem) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'flex flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm';

    cardEl.innerHTML = /*HTML*/ `
      <div class="mb-3 flex items-center justify-center overflow-hidden rounded-md bg-slate-100">
        <img
          src="${productItem.image || ''}"
          alt="${productItem.name}"
          class="h-[300px] w-[300px] object-cover"
        >
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold text-slate-900">${productItem.name}</h3>
        <p class="text-sm text-slate-600">${productItem.description}</p>
        <p class="text-base font-bold text-amber-700">$${productItem.price.toFixed(2)}</p>
        <div>
          <button class="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600" data-product-id="${productItem.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    mainEl.append(cardEl);
  });

  mainEl.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-product-id]');
    if (!button) return;

    const id = Number(button.dataset.productId);
    const selectedProduct = product.find((item) => item.id === id);
    if (selectedProduct) addToCart(selectedProduct);
  });
}

renderProducts();