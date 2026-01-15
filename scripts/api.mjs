const apiKey =
  "live_Nk1ODSgWNZsWSkQXAd0SQtlQrPGjRxXBwpJLv0ELor8Ta8m7Z5IaUC1U9KKwRTra";
const baseURL = "https://api.thedogapi.com/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "x-api-key": apiKey,
    "Content-Type": "application/json",
  },
});

// Search dog breeds by name
export async function searchBreeds(name) {
  const response = await api.get("/breeds/search", {
    params: { q: name },
  });
  return response.data;
}

// Get single image for a breed
export async function getBreedImage(breedId) {
  try {
    const response = await api.get("/images/search", {
      params: { breed_id: breedId, limit: 1 },
    });
    return response.data.length > 0 ? response.data[0].url : null;
  } catch (error) {
    console.error("Image fetch error:", error);
    return null;
  }
}

// Get multiple images for a breed (for carousel)
export async function getBreedImages(breedId, limit = 10) {
  try {
    const response = await api.get("/images/search", {
      params: { breed_id: breedId, limit: limit },
    });
    return response.data.map((item) => item.url);
  } catch (error) {
    console.error("Multiple images fetch error:", error);
    return [];
  }
}
