const container = document.querySelector("div.search-bar-container");
const input = document.querySelector("input.search-bar");

input.addEventListener("focus", () => {
	container.classList.add("glow");
});
input.addEventListener("blur", () => {
	container.classList.remove("glow");
});
