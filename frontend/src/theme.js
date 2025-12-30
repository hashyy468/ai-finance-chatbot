/**
 * Simple theme toggle utility
 */
export function toggleTheme(currentTheme) {
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", newTheme);
  return newTheme;
}
