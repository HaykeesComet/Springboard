const gameContainer = document.querySelector("#game");
const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
const colorsPicklist = [...colors];
const squareCount = colorsPicklist.length;

// Game state
let revealedCount = 0;
let activeSquare = null;
let awaitingEndOfMove = false;

function buildsquare(color) {
	const element = document.createElement("div");

	element.classList.add("square");
	element.setAttribute("data-color", color);
	element.setAttribute("data-revealed", "false");

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");
		if (awaitingEndOfMove
			|| revealed === "true"
			|| element == activeSquare) {
			return;
		}

		// Color reveal
		element.style.backgroundColor = color;
		if (!activeSquare) {
			activeSquare = element;
			return;
		}

		const colorToMatch = activeSquare.getAttribute("data-color");
		if (colorToMatch === color) {
			element.setAttribute("data-revealed", "true");
			activeSquare.setAttribute("data-revealed", "true");
			activeSquare = null;
			awaitingEndOfMove = false;
			revealedCount += 2;
			if (revealedCount === squareCount) {
				alert("You win! Awesome  \; \)");
			}
			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			activeSquare.style.backgroundColor = null;
			element.style.backgroundColor = null;
			awaitingEndOfMove = false;
			activeSquare = null;
		}, 1000);
	});

	return element;
}

// Square creation
for (let i = 0; i < squareCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const square = buildsquare(color);
	colorsPicklist.splice(randomIndex, 1);
	gameContainer.appendChild(square);
}

// Current page reload
document.addEventListener('DOMContentLoaded', function() {
	const refreshButton = document.getElementById('refreshButton');
	refreshButton.addEventListener('click', function() {
		location.reload();
	});
});
