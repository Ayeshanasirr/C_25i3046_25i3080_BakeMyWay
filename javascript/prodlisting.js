// products.js - client-side rendering for product listing
// NOTE: This page intentionally does not add alerts or console.log (homepage handles required alerts/logs)

const PRODUCTS = [
  { id:1, name:"The Classic Vanilla Cloud", category:"Cakes", price:34.99, rating:4.9, reviews:120, image:"../pics/cake2.png", description:"Light vanilla cake with cream." },
  { id:2, name:"Dark Chocolate Cream", category:"Cakes", price:40.00, rating:4.8, reviews:95, image:"../pics/cake1.png", description:"Rich dark chocolate layer cake." },
  { id:3, name:"The Strawberry Bloom", category:"Cakes", price:45.00, rating:4.9, reviews:210, image:"../pics/cake3.png", description:"Strawberry topped celebration cake." },
  { id:4, name:"Kid's Party Hats", category:"Accessories", price:5.00, rating:4.9, reviews:50, image:"../pics/cake4.png", description:"Fun party hats for kids." },
  { id:5, name:"Executive Birthday Cake", category:"Cakes", price:55.00, rating:4.7, reviews:32, image:"../pics/cake5.png", description:"Elegant birthday cake." },
  { id:6, name:"The Ruby Red Velvet", category:"Cakes", price:48.00, rating:5.0, reviews:180, image:"../pics/cake6.png", description:"Classic red velvet with cream." },
  { id:7, name:"Confetti", category:"Decor", price:7.50, rating:4.5, reviews:12, image:"../pics/confetti.png", description:"Colorful confetti for parties." },
  { id:8, name:"Sparkle Birthday Candles", category:"Decor", price:12.00, rating:4.6, reviews:40, image:"../pics/candles.png", description:"Sparkle candles for cakes." }
];

const categoryListEl = document.getElementById("category-list");
const productsGridEl = document.getElementById("products-grid");
const resultsCountEl = document.getElementById("results-count");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const ratingCheckboxes = Array.from(document.querySelectorAll('input[name="min-rating"]'));

let currentCategory = "All";
let currentQuery = "";
let currentSort = "default";
let currentRatings = [];

function getCategories() {
  const set = new Set(PRODUCTS.map(p => p.category));
  return ["All", ...Array.from(set)];
}

function renderCategories() {
  if (!categoryListEl) return;
  const cats = getCategories();
  categoryListEl.innerHTML = "";
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = cat === currentCategory ? "active" : "";
    btn.addEventListener("click", function(){
      currentCategory = cat;
      renderCategories();
      renderProducts();
    });
    categoryListEl.appendChild(btn);
  });
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]); });
}

function attachAddToCart(){
  const adds = Array.from(document.querySelectorAll(".add-cart"));
  adds.forEach(btn => {
    btn.removeEventListener("click", onAddToCart);
    btn.addEventListener("click", onAddToCart);
  });
}

function onAddToCart(e){
  const name = e.currentTarget.getAttribute("data-name") || "Product";
  // local UI feedback only (homepage handles alerts/logs)
  e.currentTarget.textContent = "Added";
  e.currentTarget.disabled = true;
  e.currentTarget.style.opacity = "0.7";
}

function renderProducts(){
  if (!productsGridEl || !resultsCountEl) return;
  let out = PRODUCTS.slice();

  if (currentCategory !== "All") out = out.filter(p => p.category === currentCategory);

  if (currentRatings.length > 0) out = out.filter(p => currentRatings.some(r => p.rating >= parseFloat(r)));

  const q = currentQuery.trim().toLowerCase();
  if (q !== "") out = out.filter(p => (p.name + " " + p.description).toLowerCase().includes(q));

  if (currentSort === "price-asc") out.sort((a,b) => a.price - b.price);
  else if (currentSort === "price-desc") out.sort((a,b) => b.price - a.price);
  else if (currentSort === "rating-desc") out.sort((a,b) => b.rating - a.rating);

  productsGridEl.innerHTML = "";
  out.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${escapeHtml(p.name)}">
      <div class="product-info">
        <h4>${escapeHtml(p.name)}</h4>
        <p class="price">$${p.price.toFixed(2)}</p>
        <p class="desc">${escapeHtml(p.description)}</p>
        <div class="product-row">
          <button class="add-cart" data-name="${escapeHtml(p.name)}">Add to cart</button>
          <a class="details" href="product.html">View</a>
        </div>
      </div>
    `;
    productsGridEl.appendChild(card);
  });

  resultsCountEl.textContent = `Showing ${out.length} product${out.length !== 1 ? "s" : ""}`;
  attachAddToCart();
}

function updateRatings(){
  currentRatings = ratingCheckboxes.filter(ch => ch.checked).map(ch => ch.value);
}

if (searchInput) {
  searchInput.addEventListener("input", function(e){
    currentQuery = e.target.value;
    renderProducts();
  });
}
if (sortSelect) {
  sortSelect.addEventListener("change", function(e){ currentSort = e.target.value; renderProducts(); });
}
ratingCheckboxes.forEach(cb => cb.addEventListener("change", function(){ updateRatings(); renderProducts(); }));

// init
currentCategory = "All";
renderCategories();
renderProducts();
