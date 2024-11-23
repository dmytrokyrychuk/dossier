if (typeof browser === "undefined") {
  window.browser = chrome;
}

document.addEventListener("DOMContentLoaded", function () {
  // Відновлення вибраного емодзі зі сховища
  restoreOptions();

  // Обробник події для зберігання налаштувань
  document.querySelector("#options-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const emojiSelect = document.querySelector("#emoji-selector");
    console.log("Збереження налаштувань:", emojiSelect.value);
    browser.storage.sync.set({
      emojiOptions: emojiSelect.value.split("\n").map((option) => option.trim()).filter((option) => option),
    });

  });
});

// Відновлення вибраного емодзі зі сховища
function restoreOptions() {
  function onSuccess(result) {
    const emojiSelect = document.querySelector("#emoji-selector");
    emojiSelect.value = result.emojiOptions.join("\n") || "☢️\n😭\n👍\n❤️";
  }

  function onError(error) {
    console.log(`Помилка: ${error}`);
  }

  const getting = browser.storage.sync.get("emojiOptions");
  getting.then(onSuccess, onError);
}
