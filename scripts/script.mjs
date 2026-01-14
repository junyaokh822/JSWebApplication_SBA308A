import axios from "axios";

let apiKey =
  "live_Nk1ODSgWNZsWSkQXAd0SQtlQrPGjRxXBwpJLv0ELor8Ta8m7Z5IaUC1U9KKwRTra";
let baseURL = "https://api.thedogapi.com/v1";

getDoggy("terrier")
  .then((result) => {
    if (result) {
      console.log("Successfully got data!");
      console.log(JSON.stringify(result, null, 2));
    }
  })
  .catch((err) => {
    console.error("Error in main:", err.message);
  });

async function getDoggy(name) {
  try {
    if (!name) {
      throw new Error("Must include a name to search for!");
    }

    let apiURL = `${baseURL}/breeds/search?q=${name}`;
    let response = await axios.get(apiURL, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    const breeds = response.data;

    if (breeds.length === 0) {
      console.log("No breeds found!");
      return null;
    }

    console.log(`Found ${breeds.length} breed(s):\n`);

    // Get ALL breeds
    const allBreedsData = [];

    for (const breed of breeds) {
      console.log(`Processing: ${breed.name}`);

      const basicInfo = {
        name: breed.name,
        lifeSpan: breed.life_span,
        temperament: breed.temperament,
        origin: breed.origin,
        description: breed.description,
        breed_group: breed.breed_group,
        weight: breed.weight.metric,
        height: breed.height.metric,
      };

      let images = [];
      try {
        const imagesResponse = await axios.get(
          `${baseURL}/images/search?breed_id=${breed.id}&limit=5`,
          {
            headers: {
              "x-api-key": apiKey,
            },
          }
        );

        images = imagesResponse.data.map((img) => ({
          id: img.id,
          url: img.url,
          width: img.width,
          height: img.height,
        }));

        console.log(`  Found ${images.length} image(s) for ${breed.name}`);
      } catch (imageErr) {
        console.log(`  No images found for ${breed.name}`);
      }

      allBreedsData.push({
        ...basicInfo,
        images: images,
        full_breed_data: breed,
      });
    }

    return allBreedsData;
  } catch (err) {
    console.error(`Error getting breed data: ${err.message}`);
    return null;
  }
}
