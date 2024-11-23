if (typeof browser === "undefined") {
  window.browser = chrome;
}

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


  function handleMutation() {
    // Add emoji selector on player's profile page
    document.querySelectorAll("[class*=PlayerBanner__Container]").forEach((node) => {
      debugger;
      // Avoid adding the menu multiple times
      if (node.querySelector("[data-dossier]")) return;

      const usernameNode = node.querySelector("[class*=styles__Nickname]");
      if (!usernameNode) return;
      const username = usernameNode.textContent;
      if (!username) return;

      const select = document.createElement("select");
      select.dataset.dossier = "true";
      select.innerHTML = `
        <option value=""></option>
      `;
      browser.storage.sync.get("emojiOptions").then((result) => {
        if (!result) result = {};
        if (!result.emojiOptions) {
          result.emojiOptions = ["☢️", "😭", "👍", "❤️"];
        }
        result.emojiOptions.forEach((emoji) => {
          select.innerHTML += `<option value="${emoji}">${emoji}</option>`;
        })
        select.value = localStorage.getItem("dossier-tag-" + username) || "";
      }, (error) => {console.error(error);});

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
    const usernameClasses = [
      "styles__Name-",
      "UserNickname__Container-",
      "PlayerCell__Nickname-",
      "Nickname__Container-"
    ];
    usernameClasses.forEach((className) => {
      const selector = `[class*=${className}]`;
      console.log("Class:", className, ", selector:", selector);
      document.querySelectorAll(selector).forEach((node) => {
        console.log("Node:", node);
        const username = node.textContent.trim();
        const tag = localStorage.getItem("dossier-tag-" + username);
        let tagNode = node.parentNode.querySelector("[data-dossier]");

        if (tag) {
          if (!tagNode) {
            tagNode = document.createElement("span");
            tagNode.dataset.dossier = "true";
            node.parentNode.appendChild(tagNode);
          }
          tagNode.textContent = tag;
        }
        if (tagNode && !tag) {
          tagNode.parentNode.removeChild(tagNode);
        }
      });
    });
  }
  window.addEventListener("load", () => {
    const observer = new MutationObserver(debounce(handleMutation, 500));
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
