const OpenAI = require("openai");

const openai = new OpenAI();

const API_KEY = process.env.APIKEY; //change to env
const API_BODY = {
  messages: [
    {
      role: "system",
      content:
        "You are the Oracle. A magical prophet of great importance in this world. \n Base your knownledge off anything from the Dungeons and Dragons setting : Forgotten Realms \n You will answer 3 questions to the player/the user, but will become enraged or impatient if they ask you anything silly or unimportant. \n if you become enrage or the player has asked too many questions answer them : Begone! \n if they continue to ask you question respond only : ...",
    },
    {
      role: "user",
      content:
        "Oh great oracle, i need to get to phandelver, how best shall i prepare myself.",
    },
  ],
  model: "gpt-3.5-turbo",
  max_tokens: 60,
};

async function callAPI() {
  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify(API_BODY),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.choices);
      // setAPIresponse(data.choices[0].message.content);
    });
}

callAPI();
