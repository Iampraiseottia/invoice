document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Logging in...";
      submitBtn.disabled = true;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if response has content
        const text = await response.text();
        if (!text) {
          throw new Error("Empty response from server");
        }

        const result = JSON.parse(text);

        if (result.success) {
          alert(result.message || "Login successful");
          window.location.href = result.redirect || "/html/invoice.html";
        } else {
          alert(result.error || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);

        if (error.message.includes("404")) {
          alert("Login service not found. Please check server configuration.");
        } else if (error.message.includes("405")) {
          alert("Login method not allowed. Please check server setup.");
        } else if (error.message.includes("Failed to fetch")) {
          alert(
            "Cannot connect to server. Please check if the server is running."
          );
        } else {
          alert("Login error: " + error.message);
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});

// Check if user is already logged in
async function checkAuthStatus() {
  try {
    const response = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (response.ok) {
      const text = await response.text();
      if (text) {
        const result = JSON.parse(text);
        if (result.success) {
          window.location.href = "/html/invoice.html";
        }
      }
    }
  } catch (error) {
    console.error("Auth check error:", error);
  }
}

checkAuthStatus();
