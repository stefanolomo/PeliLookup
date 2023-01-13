const options = document.querySelector(".options-container")
const toggle = document.querySelector(".toggleOptions")

toggle.addEventListener("click", () => {
	options.classList.toggle("hidden")
})