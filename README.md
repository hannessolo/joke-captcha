# joke-captcha

Project at ICHack 20.

A captcha system that tells bots from humans by having the user distinguish real jokes from machine generated jokes.

## Running the example

1. Start the generation server. Run `docker build -t gptprog . && docker run -p 5000:5000 --rm -it gptprog` in `/joke-generator`.
2. Start the back-end service. Run `npm i && npm start` in `/backend`.
3. Start the front-end example application. Run `npm i && npm start` in `/frontend`.
