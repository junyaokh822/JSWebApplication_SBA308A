import axios from "axios";

let apiKey =
  "live_Nk1ODSgWNZsWSkQXAd0SQtlQrPGjRxXBwpJLv0ELor8Ta8m7Z5IaUC1U9KKwRTra";
let baseURL = "https://api.thedogapi.com/v1";

getDoggy("terrier");

async function getDoggy(name) {
  try {
    if (!name) {
      throw new Error("Must includes a name to search for!");
    }
    let apiURL = `${baseURL}/breeds/search?q=${name}`;
    let response = await axios.get(apiURL, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    const breeds = response.data;
    if (breeds === 0) {
      console.log("No breeds found!");
      return;
    }

    console.log(`Found ${breeds.length} breed(s):\n`);

    //extract data for each breed
    for (let i = 0; i < breeds.length; i++) {
      const breed = breeds[i];
      const extractedData = {
        name: breed.name,
        lifeSpan: breed.life_span,
        temperament: breed.temperament,
        origin: breed.origin,
        description: breed.description,
        breed_group: breed.breed_group,
        weight: breed.weight.metric,
        height: breed.height.metric,
      };

      console.log(`Breed ${i + 1}:`, extractedData);
    }
  } catch (err) {
    console.error(`Error Msg: ${err}`);
  }
}
