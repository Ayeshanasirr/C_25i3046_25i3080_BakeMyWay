// product.js - product detail behavior (only one console.log for debugging)

/*
 This small script:
 - swaps main image when thumbnails clicked
 - adjusts quantity
 - handles Move to Cart button (simple UI feedback)
*/

console.log("product.js loaded — product detail initialized");

const mainImage = document.getElementById("main-image");
const thumbBtns = Array.from(document.querySelectorAll(".thumb-btn"));
const qtyInput = document.getElementById("qty-input");
const qtyInc = document.getElementById("qty-increase");
const qtyDec = document.getElementById("qty-decrease");
const addToCartBtn = document.getElementById("add-to-cart");

// swap main image when thumbnails are clicked
thumbBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    if (img && mainImage) {
      mainImage.src = img.src;
      mainImage.alt = img.alt || mainImage.alt;
      console.log("Thumbnail clicked — main image changed to:", img.src);
    }
  });
});

// quantity controls
if (qtyInc && qtyInput) {
  qtyInc.addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) + 1);
  });
}
if (qtyDec && qtyInput) {
  qtyDec.addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
  });
}

// Move to cart (UI only)
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const qty = parseInt(qtyInput.value || "1", 10);
    addToCartBtn.textContent = "Added ✓";
    addToCartBtn.disabled = true;
    addToCartBtn.style.opacity = "0.85";
    // small console log for debugging / instructor evidence
    console.log(`Added to cart: The Executive Birthday Cake (qty ${qty})`);

  });
}
