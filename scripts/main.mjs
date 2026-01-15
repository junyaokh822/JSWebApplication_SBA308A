import { searchBreeds, getBreedImages } from "./api.mjs";
import {
  showLoading,
  showError,
  createBreedCard,
  clearContainer,
} from "./ui.mjs";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const breedsContainer = document.getElementById("breedsContainer");

// Event Listeners
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

// Search on page load with default breed
window.addEventListener("DOMContentLoaded", () => {
  searchInput.value = "husky";
  handleSearch();
  searchInput.focus();
});

// Handle search button click or Enter key
function handleSearch() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    performSearch(searchTerm);
  } else {
    showError(breedsContainer, "Please enter a breed name to search");
  }
}

// Perform the API search
async function performSearch(name) {
  try {
    showLoading(breedsContainer);

    const breeds = await searchBreeds(name);

    clearContainer(breedsContainer);

    if (breeds.length === 0) {
      showError(
        breedsContainer,
        `No breeds found for "${name}". Try a different search term.`
      );
      return;
    }

    // Display each breed
    for (const breed of breeds) {
      await displayBreed(breed);
    }

    // Scroll to results
    breedsContainer.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    showError(breedsContainer, `Error: ${error.message}`);
  }
}

// Display a single breed with images
async function displayBreed(breed) {
  try {
    const imageUrls = await getBreedImages(breed.id, 10);
    const breedCard = createBreedCard(breed, imageUrls);
    breedsContainer.appendChild(breedCard);
  } catch (error) {
    console.error(`Error displaying ${breed.name}:`, error);
    const breedCard = createBreedCard(breed, []);
    breedsContainer.appendChild(breedCard);
  }
}
