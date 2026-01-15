export function showLoading(container) {
  container.innerHTML = "<p>Loading...</p>";
}

export function showError(container, message) {
  container.innerHTML = `<p class="error">${message}</p>`;
}

export function createBreedCard(breed, imageUrl) {
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
  return breedCard;
}

export function clearContainer(container) {
  container.innerHTML = "";
}
