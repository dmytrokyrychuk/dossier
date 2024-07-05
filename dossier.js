(function () {
  function log() {
    console.log("[dossier]:", ...arguments);
  }

  function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  function handleMutation() {
    // Add emoji selector on player's profile page
    document.querySelectorAll(".sc-cdHbCu").forEach((node) => {
      // Avoid adding the menu multiple times
      if (node.querySelector("[data-dossier]")) return;

      const username = node.querySelector("h5")?.textContent;
      if (!username) return;

      const select = document.createElement("select");
      select.dataset.dossier = "true";
      select.innerHTML = `
        <option value="">📁</option>
        <option value="☢️">☢️</option>
        <option value="👍">👍</option>
        <option value="❤️">❤️</option>
      `;
      select.value = localStorage.getItem("dossier-tag-" + username) || "";
      select.addEventListener("change", (e) => {
        log("select change", e.target.value);
        if (e.target.value) {
          localStorage.setItem("dossier-tag-" + username, e.target.value);
        } else {
          localStorage.removeItem("dossier-tag-" + username);
        }
      });

      node.appendChild(select);
    });

    // Add player's tag besides their username
    document.querySelectorAll(".sc-eLtQCx").forEach((node) => {
      // Avoid adding the tag multiple times
      if (node.parentNode.querySelector("[data-dossier]")) return;

      const username = node.textContent;
      const tag = localStorage.getItem("dossier-tag-" + username);
      if (!tag) return;

      const span = document.createElement("span");
      span.dataset.dossier = "true";
      span.textContent = tag;
      node.parentNode.appendChild(span);
    });
  }

  window.addEventListener("load", () => {
    const observer = new MutationObserver(debounce(handleMutation, 500));
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
