window.addEventListener("load", function () {
  console.log("BakeMyWay homepage loaded");
});

document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("mouseenter", function () { link.style.opacity = "0.7"; });
  link.addEventListener("mouseleave", function () { link.style.opacity = "1"; });
});

(function () {
  var modal = document.createElement("div");
  modal.id = "signup-modal";
  modal.style.cssText = "display:none;position:fixed;inset:0;z-index:9999";
  modal.innerHTML = '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.45)"></div><div style="position:relative;width:360px;max-width:92%;margin:8vh auto;background:#fff;padding:18px;border-radius:10px"><button id="signup-close" style="position:absolute;right:10px;top:8px;border:none;background:transparent;font-size:18px">✕</button><h3 style="margin-top:0">Sign up for BakeMyWay</h3><p>Enter your email for updates & offers</p><input id="signup-email" type="email" placeholder="you@example.com" style="width:100%;padding:8px;margin:10px 0;box-sizing:border-box" /><button id="signup-submit" style="background:linear-gradient(90deg,#62d6dc,#4fbec9);color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer">Sign Up</button></div>';
  document.body.appendChild(modal);

  var signupBtn = document.getElementById("signup-btn");
  var signupModal = document.getElementById("signup-modal");
  var signupClose, signupSubmit, signupEmail;
  function refreshModalRefs() {
    signupClose = document.getElementById("signup-close");
    signupSubmit = document.getElementById("signup-submit");
    signupEmail = document.getElementById("signup-email");
  }
  refreshModalRefs();

  if (signupBtn) {
    signupBtn.addEventListener("click", function () {
      signupModal.style.display = "block";
      refreshModalRefs();
      if (signupEmail) signupEmail.value = "";
      console.log("Signup modal opened");
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "signup-close") {
      signupModal.style.display = "none";
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "signup-submit") {
      refreshModalRefs();
      var email = (signupEmail && signupEmail.value) ? signupEmail.value.trim() : "";
      if (!email || email.indexOf("@") === -1) {
        alert("Please enter a valid email address");
        return;
      }
      console.log("Signup email submitted:", email);
      signupModal.style.display = "none";
      alert("Thanks! You are signed up — check your email.");
    }
  });
})();

(function () {
  var addButtons = Array.from(document.querySelectorAll(".add-cart"));
  addButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-name") || "Product";
      var ok = confirm('Are you sure you want to add "' + name + '" to your cart?');
      if (!ok) return;
      alert(name + " added to cart successfully!");
      console.log("Product added to cart:", name);
    });
  });
})();
