const listener = function () {
  document.documentElement.setAttribute(
    "data-kit-theme",
    window.localStorage.getItem("UI-KIT-THEME") || "light"
  );
};
module.exports.listener = listener;

module.exports.scriptTag = `<script>(${listener
  .toString()
  .replace("listener", "")})()</script>`;
