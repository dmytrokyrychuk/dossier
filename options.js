document.addEventListener("DOMContentLoaded", function () {
  // Відновлення вибраного емодзі зі сховища
  restoreOptions();

  // Обробник події для зберігання налаштувань
  document.querySelector("#options-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const emojiSelect = document.querySelector("#emoji-selector");
    browser.storage.sync.set({
      selectedEmoji: emojiSelect.value,
    });
  });

  // Обробник події для додавання своєї емодзі
  document.querySelector("#add-custom-emoji").addEventListener("click", function () {
    const customEmojiInput = document.querySelector("#custom-emoji");
    const customEmojiValue = customEmojiInput.value.trim();
    if (customEmojiValue) {
      const emojiSelect = document.querySelector("#emoji-selector");
      emojiSelect.innerHTML += `<option value="${customEmojiValue}">${customEmojiValue}</option>`;
      customEmojiInput.value = "";
    }
  });
});

// Відновлення вибраного емодзі зі сховища
function restoreOptions() {
  function setCurrentChoice(result) {
    const emojiSelect = document.querySelector("#emoji-selector");
    emojiSelect.value = result.selectedEmoji || "";
  }

  function onError(error) {
    console.log(`Помилка: ${error}`);
  }

  const getting = browser.storage.sync.get("selectedEmoji");
  getting.then(setCurrentChoice, onError);
}
