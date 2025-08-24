//your code here
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let selectedImages = [];
let imageElements = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadImages() {
  const grid = document.getElementById("imageGrid");
  grid.innerHTML = "";
  selectedImages = [];
  document.getElementById("reset").classList.add("hidden");
  document.getElementById("verify").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");

  // Select a random image class to duplicate
  const duplicateIndex = Math.floor(Math.random() * imageClasses.length);
  const displayImages = [...imageClasses, imageClasses[duplicateIndex]];
  shuffleArray(displayImages);

  // Create image elements
  imageElements = displayImages.map((className, index) => {
    const img = document.createElement("img");
    img.classList.add(className);
    img.dataset.index = index;
    img.dataset.class = className;
    img.addEventListener("click", handleImageClick);
    grid.appendChild(img);
    return img;
  });
}

function handleImageClick(e) {
  const img = e.target;
  if (selectedImages.length < 2 && !img.classList.contains("selected")) {
    img.classList.add("selected");
    selectedImages.push(img);

    if (selectedImages.length === 1) {
      document.getElementById("reset").classList.remove("hidden");
    } else if (selectedImages.length === 2) {
      document.getElementById("verify").classList.remove("hidden");
    }
  }
}

function handleVerify() {
  const result = document.getElementById("result");
  const verifyButton = document.getElementById("verify");

  if (selectedImages[0].dataset.class === selectedImages[1].dataset.class) {
    result.textContent = "You are a human. Congratulations!";
  } else {
    result.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  result.classList.remove("hidden");
  verifyButton.classList.add("hidden");
}

function handleReset() {
  loadImages();
}

document.getElementById("verify").addEventListener("click", handleVerify);
document.getElementById("reset").addEventListener("click", handleReset);

// Initial load
loadImages();
