import { searchBreeds, getBreedImage } from "./api.mjs";
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

// Search on page load
window.addEventListener("DOMContentLoaded", () => {
  searchInput.value = "husky";
  handleSearch();
});

function handleSearch() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    performSearch(searchTerm);
  }
}

async function performSearch(name) {
  try {
    showLoading(breedsContainer);

    const breeds = await searchBreeds(name);

    clearContainer(breedsContainer);

    if (breeds.length === 0) {
      showError(
        breedsContainer,
        "No breeds found. Try a different search term."
      );
      return;
    }

    for (const breed of breeds) {
      await displayBreed(breed);
    }
  } catch (error) {
    showError(breedsContainer, `Error: ${error.message}`);
  }
}

async function displayBreed(breed) {
  try {
    const imageUrl = await getBreedImage(breed.id);
    const breedCard = createBreedCard(breed, imageUrl);
    breedsContainer.appendChild(breedCard);
  } catch (error) {
    console.error(`Error with ${breed.name}:`, error);
  }
}
