export function renderHeader() {
  const existingHeader = document.querySelector('header');
  if (existingHeader) {
    return existingHeader;
  }

  const header = document.createElement('header');
  header.className = 'bg-slate-900 text-white p-4';
  header.innerHTML = /*HTML*/ `
    <nav class="flex items-center justify-between gap-5 text-sm text-slate-200">
      <a href="./index.html" class="hover:text-white">Amazon</a>

      <div class="flex items-center gap-5">
        <a href="./index.html" class="hover:text-white">Products</a>
        <a href="./checkout.html" class="hover:text-white">Checkout</a>
      </div>
    </nav>
  `;

  document.body.prepend(header);
  return header;
}