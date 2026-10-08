
This ais a recreation of the basic front end features found on online shopping sites such as amazon

It includes the following features.

A product catalog with product cards and pricing
Add-to-cart behavior with live header updates
A shopping cart page with quantity controls and remove actions
Order summary calculations for items and shipping
persistent cart storage across refreshes using browser localStorage
Responsive styling for desktop and mobile layouts

The app uses Vite as the local development server and Tailwind CSS classes for UI styling.



npm run dev



amazonClone/
├── index.html
├── checkout.html
├── package.json
├── vite.config.js
├── README.md
├── styles/
│   └── style.css
├── data/
│   └── products.js
├── pages/
│   ├── products.js
│   ├── header.js
│   └── checkout.js
├── cart/
│   └── cart.js
├── utils/
│   ├── currency.js
│   └── storage.js
└── node_modules/  


