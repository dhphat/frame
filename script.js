const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scaleControl = document.getElementById("scale");
const xPosControl = document.getElementById("xPos");
const yPosControl = document.getElementById("yPos");
const downloadButton = document.getElementById("download");

let img = new Image();
let scale = 1;
let xPos = 0;
let yPos = 0;

const frame = new Image();
frame.src = './frame.png';  // Reference to the frame image
frame.onload = drawImage;  // Ensure frame is drawn once it's loaded

upload.addEventListener("change", function () {
    const file = upload.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        img = new Image();
        img.onload = function () {
            canvas.width = 600;  // Set your canvas width
            canvas.height = 400; // Set your canvas height
            drawImage();
        };
        img.src = event.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

scaleControl.addEventListener("input", function () {
    scale = parseFloat(this.value);
    drawImage();
});

xPosControl.addEventListener("input", function () {
    xPos = parseInt(this.value);
    drawImage();
});

yPosControl.addEventListener("input", function () {
    yPos = parseInt(this.value);
    drawImage();
});

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img.complete) {
        // Draw the uploaded image
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const imgX = (canvas.width - imgWidth) / 2 + xPos;
        const imgY = (canvas.height - imgHeight) / 2 + yPos;
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    }

    // Draw the frame on top of the user image
    if (frame.complete) {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height); // Draw the frame to fit the canvas
    }
}

downloadButton.addEventListener("click", function () {
    const link = document.createElement('a');
    link.download = 'framed_image.png';
    link.href = canvas.toDataURL();
    link.click();
});
