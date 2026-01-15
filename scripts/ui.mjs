// Clear container
export function clearContainer(container) {
  container.innerHTML = "";
}

// Show loading state
export function showLoading(container) {
  container.innerHTML = "<p>Loading dog breeds...</p>";
}

// Show error message
export function showError(container, message) {
  container.innerHTML = `<p class="error">${message}</p>`;
}

// Create a breed card element with image carousel
export function createBreedCard(breed, imageUrls) {
  const breedCard = document.createElement("div");
  breedCard.className = "breed-card";
  breedCard.dataset.breedId = breed.id;

  let imageHTML = "";
  if (imageUrls && imageUrls.length > 0) {
    imageHTML = createCarouselHTML(breed.name, imageUrls);
  } else {
    imageHTML = '<p class="error">No images available for this breed</p>';
  }

  breedCard.innerHTML = `
    ${imageHTML}
    <h3>${breed.name}</h3>
    <p><strong>Lifespan:</strong> ${breed.life_span || "N/A"}</p>
    <p><strong>Temperament:</strong> ${breed.temperament || "N/A"}</p>
    <p><strong>Origin:</strong> ${breed.origin || "N/A"}</p>
    <p><strong>Breed Group:</strong> ${breed.breed_group || "N/A"}</p>
    <p><strong>Description:</strong> 
      ${
        breed.description
          ? breed.description.substring(0, 150) + "..."
          : "No description available"
      }
    </p>
  `;

  // Add carousel functionality if there are images
  if (imageUrls && imageUrls.length > 0) {
    setupCarousel(breedCard, imageUrls);
  }

  return breedCard;
}

// Create HTML for image carousel
function createCarouselHTML(breedName, imageUrls) {
  return `
    <div class="image-carousel">
      <div class="carousel-container">
        <button class="carousel-btn prev-btn" aria-label="Previous image">←</button>
        <img src="${
          imageUrls[0]
        }" alt="${breedName} - Image 1" class="breed-image" loading="lazy">
        <button class="carousel-btn next-btn" aria-label="Next image">→</button>
      </div>
      <div class="carousel-counter">Image 1 of ${imageUrls.length}</div>
      <div class="carousel-thumbnails">
        ${imageUrls
          .map(
            (url, index) => `
          <img src="${url}" alt="${breedName} - Thumbnail ${index + 1}" 
               class="thumbnail ${index === 0 ? "active" : ""}" 
               data-index="${index}" loading="lazy">
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// Set up carousel navigation
function setupCarousel(card, imageUrls) {
  const prevBtn = card.querySelector(".prev-btn");
  const nextBtn = card.querySelector(".next-btn");
  const image = card.querySelector(".breed-image");
  const counter = card.querySelector(".carousel-counter");
  const thumbnails = card.querySelectorAll(".thumbnail");

  let currentIndex = 0;

  function updateImage(newIndex) {
    currentIndex = newIndex;

    // Update main image with fade effect
    image.style.opacity = 0;
    setTimeout(() => {
      image.src = imageUrls[currentIndex];
      image.alt = `Image ${currentIndex + 1}`;
      image.style.opacity = 1;
    }, 150);

    // Update counter
    counter.textContent = `Image ${currentIndex + 1} of ${imageUrls.length}`;

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === imageUrls.length - 1;

    // Update thumbnail active states
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === currentIndex);
    });
  }

  // Previous button click
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      updateImage(currentIndex - 1);
    }
  });

  // Next button click
  nextBtn.addEventListener("click", () => {
    if (currentIndex < imageUrls.length - 1) {
      updateImage(currentIndex + 1);
    }
  });

  // Thumbnail clicks
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const index = parseInt(thumbnail.dataset.index);
      if (index !== currentIndex) {
        updateImage(index);
      }
    });
  });

  // Initialize carousel
  updateImage(0);
}
