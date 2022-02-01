const listener = function () {
  var dark = (function () {
    return !!(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  })();
  document.documentElement.setAttribute(
    "data-kit-theme",
    window.localStorage.getItem("UI-KIT-THEME") || (dark ? "dark" : "light")
  );
};

export {listener};

export const scriptTag = `<script>(${listener
  .toString()
  .replace("listener", "")})()</script>`;
