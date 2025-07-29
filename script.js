document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Theme Toggle Functionality
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "dark";
  
  document.documentElement.setAttribute("data-theme", currentTheme);
  
  themeToggle.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // Image Loading Animation
  document.querySelectorAll("img").forEach(img => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });

  // Form Validation
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("submit-btn");
  const submitText = document.getElementById("submit-text");

  // Improved regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z\s'-]{3,50}$/;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Clear previous error messages
    clearErrors();
    
    let isValid = true;
    
    // Name validation
    if (!nameRegex.test(nameInput.value.trim())) {
      showError(nameInput, "Please enter a valid name (3-50 letters, spaces, hyphens or apostrophes only)");
      isValid = false;
    }
    
    // Email validation
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }
    
    // Message validation
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must be at least 10 characters long");
      isValid = false;
    }
    
    if (isValid) {
      // Form is valid, show loading state
      submitText.textContent = "Sending...";
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        form.submit();
        submitText.textContent = "Message Sent!";
        setTimeout(() => {
          submitText.textContent = "Send Message";
          submitBtn.disabled = false;
          form.reset();
        }, 2000);
      }, 1500);
    }
  });

  function showError(input, message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    input.focus();
  }

  function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(error => error.remove());
  }

  // Developer Tools Notice (instead of blocking)
  document.addEventListener("keydown", function(e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
      console.log("This portfolio is created by Roshit Pokharel. Please respect copyright.");
    }
  });

  // Right-click notice
  document.addEventListener("contextmenu", function(e) {
    console.log("Portfolio content is protected by copyright. Please contact for usage.");
  });
});
