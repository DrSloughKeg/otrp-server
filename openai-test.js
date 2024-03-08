const OpenAI = require("openai");

const openai = new OpenAI();

const API_KEY = process.env.APIKEY; //change to env
const API_BODY = {
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: "This is a test, let me know if my connection is working.",
    },
  ],
  model: "gpt-3.5-turbo",
  max_tokens: 60,
};

async function main() {
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
    });
}

main();
