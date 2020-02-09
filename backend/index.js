const express = require("express")
const bodyParser = require("body-parser")
const request = require('request')
const url = require('url')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const prompts = [
  "Why did the chicken cross the road? Because",
  "A man and a woman walked into a bar. The",
  "Knock knock. Who's there? The"
];

const realJokes = [
  "Several fonts walk into a bar. “Get out of here!” shouts the bartender. “We don’t serve your type here.”.",
  "A pair of jumper cables walk into a bar and ask for a drink. The bartender says, “OK, but I don’t want you starting anything in here.”.",
  "Charles Dickens walks into a bar and orders a martini. The bartender asks, “Olive or Twist?”."
];

async function getRealJoke() {
  let index = Math.floor(Math.random() * prompts.length)
  await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000) })
  return realJokes[index];
}

async function getFakeJoke() {
  let index = Math.floor(Math.random() * prompts.length);
  let generatedData = ""

  const dataPromise = new Promise((resolve, reject) => {
    const reqUrl = url.format({
      protocol: "http",
      hostname: "localhost",
      port: 5000,
      pathname: "/generate",
      query: {
        prompt: prompts[index]
      }
    })

    request(reqUrl, (err, res, body) => {
      if (err) {
        console.log(err)
        reject()
      }
      console.log(body)
      generatedData = body
      resolve()
    })

  })

  try {
    await dataPromise
  } catch (e) {
    console.log(e)
    return "Error"
  }

  return generatedData;
}

app.get("/get-challenge", (req, res, next) => {
  let real = Math.floor(Math.random() * 10) % 2 == 0 ? true : false;
  console.log(`getting ${real}`);

  if (real) {
    getRealJoke().then(d => res.send(d))
  }
  getFakeJoke().then(d => res.send(d))
});

app.post("/validate-response", (req, res, next) => {
  console.log(req.body);
  const decision = req.body.decision;
  const joke = req.body.joke;
  let resData = {};
  console.log(decision)
  console.log(realJokes)
  console.log(joke)
  resData['correct'] =
    (realJokes.includes(joke) && decision) ||
    (!realJokes.includes(joke) && !decision);

  res.send(JSON.stringify(resData));
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("listening"));
