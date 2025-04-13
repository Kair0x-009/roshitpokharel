    document.addEventListener("DOMContentLoaded", () => {
      const form = document.querySelector("form");
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      let lastSubmitTime = 0;
      const THROTTLE_TIME = 10000;

      form.addEventListener("submit", function (e) {
        const now = Date.now();
        if (now - lastSubmitTime < THROTTLE_TIME) {
          e.preventDefault();
          alert("Please wait a few seconds before submitting again.");
          return;
        }

        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        const nameRegex = /^[a-zA-Z\\s]{3,}$/;

        if (!nameRegex.test(nameInput.value.trim())) {
          alert("Please enter a valid name (at least 3 letters, no numbers).");
          e.preventDefault();
          return;
        }

        if (!emailRegex.test(emailInput.value.trim())) {
          alert("Please enter a valid email address.");
          e.preventDefault();
          return;
        }

        if (messageInput.value.trim().length < 10) {
          alert("Message must be at least 10 characters long.");
          e.preventDefault();
          return;
        }

        lastSubmitTime = now;
      });

      // Disable right-click
      document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        alert("Right-click is disabled to protect content. 👀");
      });

      // Disable dev tools (basic)
      document.onkeydown = function (e) {
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
          alert("Developer tools are disabled 🚫");
          return false;
        }
      };

      // Custom Cursor
      const cursor = document.querySelector(".custom-cursor");
      window.addEventListener("mousemove", (e) => {
        cursor.style.top = e.clientY + "px";
        cursor.style.left = e.clientX + "px";
      });

      window.addEventListener("mousedown", () => {
        cursor.style.transform = "scale(1.5)";
      });

      window.addEventListener("mouseup", () => {
        cursor.style.transform = "scale(1)";
      });
    });
