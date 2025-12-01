const flavors = document.querySelectorAll('.choices span');
const shapes = document.querySelectorAll('.shapes div');
const frosting = document.querySelectorAll('.frosting div');

function makeActive(elements) {
  elements.forEach(el => {
    el.addEventListener('click', () => {
      elements.forEach(item => item.classList.remove('active'));
      el.classList.add('active');
    });
  });
}

makeActive(flavors);
makeActive(shapes);
makeActive(frosting);

document.querySelector('.cart-btn').addEventListener('click', () => {
  alert("Item added to cart successfully!");
});