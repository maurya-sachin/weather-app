export const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark:bg-gray-900", "dark:text-white");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark:bg-gray-900", "dark:text-white");
  }
};
