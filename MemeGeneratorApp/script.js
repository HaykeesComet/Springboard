const imageInput = document.getElementById('imageInput');
let topText = document.getElementById('topTextInput');
let bottomText = document.getElementById('bottomTextInput');
const submitButton = document.getElementById('generate-btn');
let container = document.getElementById('memeContainersDiv');
let memeContainers = [];
let imageFile;

// Submitting and processing of image and texts
submitButton.addEventListener('click', function(e) {
	e.preventDefault();
	if (topText.value === '' || bottomText.value === '') {
		alert('For best results, please write something in both top and bottom text fields.');
	}
	else if (topText.value !== '' && bottomText.value !== '') {
		topText = document.getElementById('topTextInput').value.trim();
		bottomText = document.getElementById('bottomTextInput').value.trim();
		imageFile = imageInput.files[0];
	}
	
	// Defaulting to empty image and texts fields after each submission
	if (imageFile) {
		createMemeContainer(imageFile, topText, bottomText);
		document.getElementById('topTextInput').value = '';
		document.getElementById('bottomTextInput').value = '';
		imageInput.value = '';
	}
});

function createMemeContainer(imageFile, topText, bottomText) {
	const memeContainer = document.createElement('div');
	memeContainer.classList.add('meme-container');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const img = new Image();

	img.onload = function() {
		// Updating canvas
		const aspectRatio = img.width / img.height;
		const maxWidth = 500;
		const maxHeight = maxWidth / aspectRatio;
		canvas.width = maxWidth;
		canvas.height = maxHeight;
		ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
		drawText(ctx, topText, 28, maxWidth / 2, 35);
		drawText(ctx, bottomText, 28, maxWidth / 2, maxHeight - 15);
		memeContainer.appendChild(canvas);
		
		// Creating delete button
		const deleteButton = document.createElement('button');
		deleteButton.textContent = '⇧(✖)⇧';
		deleteButton.onclick = function() {
			deleteMemeContainer(memeContainer);
		};
		
		// Finalizing meme structure
		memeContainer.appendChild(deleteButton);
		container.appendChild(memeContainer);
		memeContainers.push(memeContainer);
	};

	img.src = URL.createObjectURL(imageFile);
}

function drawText(ctx, text, fontSize, x, y) {
	// Preparing text
	ctx.strokeStyle = "black";
	ctx.lineWidth = Math.floor(fontSize / 4);
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.lineJoin = "round";
	ctx.font = `${fontSize}px "Questrial"`;

	const maxWidth = 480;
	const words = text.split(' ');
	let line = '';
	let offsetY = y;

	// Adding text
	for (let i = 0; i < words.length; i++) {
		const testLine = line + words[i] + ' ';
		const metrics = ctx.measureText(testLine);
		const testWidth = metrics.width;
		if (testWidth > maxWidth && i > 0) {
			ctx.strokeText(line, x, offsetY);
			ctx.fillText(line, x, offsetY);
			line = words[i] + ' ';
			offsetY += fontSize + 5;
		}
		else {
			line = testLine;
		}
	}

	ctx.strokeText(line, x, offsetY);
	ctx.fillText(line, x, offsetY);
}

// Deleting a single meme
function deleteMemeContainer(container) {
	memeContainers = memeContainers.filter((item) => item !== container);
	container.remove();
}
