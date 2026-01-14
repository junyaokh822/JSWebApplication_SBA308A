const apiKey =
  "live_Nk1ODSgWNZsWSkQXAd0SQtlQrPGjRxXBwpJLv0ELor8Ta8m7Z5IaUC1U9KKwRTra";
const baseURL = "https://api.thedogapi.com/v1";

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
    searchBreeds(searchTerm);
  }
}

async function searchBreeds(name) {
  try {
    // Clear and show loading
    breedsContainer.innerHTML = "<p>Loading...</p>";

    // API call
    const response = await axios.get(`${baseURL}/breeds/search?q=${name}`, {
      headers: { "x-api-key": apiKey },
    });

    // Clear loading
    breedsContainer.innerHTML = "";

    const breeds = response.data;
    if (breeds.length === 0) {
      breedsContainer.innerHTML =
        '<p class="error">No breeds found. Try a different search term.</p>';
      return;
    }

    // Display all breeds
    for (const breed of breeds) {
      await displayBreed(breed);
    }
  } catch (error) {
    breedsContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

async function displayBreed(breed) {
  try {
    // Get image
    let imageUrl = null;
    try {
      const imageResponse = await axios.get(
        `${baseURL}/images/search?breed_id=${breed.id}&limit=1`,
        { headers: { "x-api-key": apiKey } }
      );
      if (imageResponse.data.length > 0) {
        imageUrl = imageResponse.data[0].url;
      }
    } catch (imageError) {
      console.error("Image error:", imageError);
    }

    // Create card
    const breedCard = document.createElement("div");
    breedCard.className = "breed-card";
    breedCard.innerHTML = `
            ${
              imageUrl
                ? `<img src="${imageUrl}" alt="${breed.name}" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;">`
                : ""
            }
            <h3>${breed.name}</h3>
            <p><strong>Lifespan:</strong> ${breed.life_span || "N/A"}</p>
            <p><strong>Temperament:</strong> ${breed.temperament || "N/A"}</p>
            <p><strong>Origin:</strong> ${breed.origin || "N/A"}</p>
            <p><strong>Group:</strong> ${breed.breed_group || "N/A"}</p>
            <p><strong>Description:</strong> 
                ${
                  breed.description
                    ? breed.description.substring(0, 100) + "..."
                    : "No description"
                }
            </p>
        `;
    breedsContainer.appendChild(breedCard);
  } catch (error) {
    console.error(`Error with ${breed.name}:`, error);
  }
}
