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
    //make api call to url
    let response = await axios.get(apiURL, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    // //parse into json
    console.log(response.data);
  } catch (err) {
    console.error(`Error Msg: ${err}`);
  }
}
