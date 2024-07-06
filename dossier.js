(function () {
  function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  function openSettings() {
    // Implement your settings logic here
    // For example, show a modal or popup for settings
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    const settingsPanel = document.createElement("div");
    settingsPanel.style.backgroundColor = "#fff";
    settingsPanel.style.padding = "20px";
    settingsPanel.style.borderRadius = "8px";
    settingsPanel.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
    settingsPanel.style.maxWidth = "400px";
    settingsPanel.style.textAlign = "center";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close Settings";
    closeButton.style.marginTop = "10px";
    closeButton.addEventListener("click", () => {
      modal.remove();
    });

    settingsPanel.appendChild(closeButton);
    modal.appendChild(settingsPanel);
    document.body.appendChild(modal);
  }

  function handleMutation() {
    // Add emoji selector on player's profile page
    document.querySelectorAll("parasite-player-profile").forEach((node) => {
      // Avoid adding the menu multiple times
      if (node.querySelector("[data-dossier]")) return;

      const usernameNode = node.querySelector("h5");
      if (!usernameNode) return;
      const username = usernameNode.textContent;
      if (!username) return;

      const select = document.createElement("select");
      select.dataset.dossier = "true";
      select.innerHTML = `
        <option value="">📁</option>
        <option value="☢️">☢️</option>
        <option value="😭">😭</option>
        <option value="👍">👍</option>
        <option value="❤️">❤️</option>
      `;
      select.value = localStorage.getItem("dossier-tag-" + username) || "";
      select.addEventListener("change", (e) => {
        if (e.target.value) {
          localStorage.setItem("dossier-tag-" + username, e.target.value);
        } else {
          localStorage.removeItem("dossier-tag-" + username);
        }
      });

      usernameNode.parentNode.appendChild(select);
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

  // Register a menu command for settings
  GM_registerMenuCommand("Open Emoji Selector Settings", openSettings);

  window.addEventListener("load", () => {
    const observer = new MutationObserver(debounce(handleMutation, 500));
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
