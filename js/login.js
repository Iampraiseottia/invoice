document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch("../php/login.php", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          // Store user data in localStorage for client-side use
          localStorage.setItem("user", JSON.stringify(result.user));
          alert(result.message);
          window.location.href = result.redirect;
        } else {
          alert(result.error || "Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Network error. Please try again.");
      }
    });
  }
});
