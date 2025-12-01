// Basic interactivity: toggle password visibility + demo submit handler
document.addEventListener("DOMContentLoaded", function () {
  const pwd = document.getElementById("password");
  const toggle = document.getElementById("togglePassword");
  const form = document.getElementById("loginForm");

  if (toggle && pwd) {
    toggle.addEventListener("click", () => {
      const isPwd = pwd.type === "password";
      pwd.type = isPwd ? "text" : "password";
      toggle.setAttribute("aria-pressed", String(!isPwd));
      toggle.textContent = isPwd ? "🙈" : "👁";
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Demo: read values and log — replace with your auth call
      const email = form.email?.value ?? "";
      const password = form.password?.value ?? "";
      console.log("Demo submit:", { email, password });
      // simple UI feedback
      alert("Demo submit — check console for values. Replace with real auth.");
    });
  }
});
