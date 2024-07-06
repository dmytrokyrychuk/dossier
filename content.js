// content.js

function addEmojiSelector() {
    document.querySelectorAll("parasite-player-profile").forEach((node) => {
      // Уникати додавання меню кілька разів
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
  
    document.querySelectorAll(".sc-eLtQCx").forEach((node) => {
      // Уникати додавання тегу кілька разів
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
  
  // Викликати функцію для відображення елементів на сторінці Faceit
  addEmojiSelector();
  
  // Додаткові дії, які можуть бути необхідними для вмістного скрипту
  // Наприклад, спостереження за змінами на сторінці або інші маніпуляції з DOM
  
  