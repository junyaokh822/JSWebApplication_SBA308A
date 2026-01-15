const apiKey =
  "live_Nk1ODSgWNZsWSkQXAd0SQtlQrPGjRxXBwpJLv0ELor8Ta8m7Z5IaUC1U9KKwRTra";
const baseURL = "https://api.thedogapi.com/v1";

export async function searchBreeds(name) {
  const response = await axios.get(`${baseURL}/breeds/search?q=${name}`, {
    headers: { "x-api-key": apiKey },
  });
  return response.data;
}

export async function getBreedImage(breedId) {
  const imageResponse = await axios.get(
    `${baseURL}/images/search?breed_id=${breedId}&limit=1`,
    { headers: { "x-api-key": apiKey } }
  );
  return imageResponse.data.length > 0 ? imageResponse.data[0].url : null;
}
