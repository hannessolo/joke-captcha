import React, { useState, useEffect } from "react";
import capchaStyle from "./Captcha.module.css";

function Capcha({ serverURL, onSuccess, onFail }) {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (joke != "") {
      return;
    }
    console.log("sending request");
    setLoading(true);
    fetch(serverURL + "/get-challenge")
      .then(async res => {
        let text = await res.text();
        setJoke(
          text
            .split(".")
            .slice(0, -1)
            .join(".") + "."
        );
        setLoading(false);
      })
      .catch(e => setError(e));
  }, [joke]);

  function onSubmit(thinkIsReal) {
    setSuccess(null);
    fetch(serverURL + "/validate-response", {
      method: "POST",
      body: JSON.stringify({
        decision: thinkIsReal,
        joke: joke
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSuccess(data.correct);
      });
  }

  if (success != null && success) {
    setTimeout(onSuccess, 1000)

    return (
      <div className={capchaStyle.container}>
        <div className={capchaStyle.joke}>Success. Redirecting...</div>
      </div>
    );
  }

  if (success != null && !success) {
    setTimeout(onFail, 1000)

    return (
      <div className={capchaStyle.container}>
        <div className={capchaStyle.joke}>You're a bot!</div>
      </div>
    );
  }

  if (loading) {
    return <div className={capchaStyle.container}>
      <div className={capchaStyle.joke}>We just need to make sure you're not a robot.</div>
      <div className={capchaStyle.jokesubhead}>
        Loading...
      </div>
    </div>
  }

  if (error) {
    return <div>Error.</div>;
  }

  return (
    <div className={capchaStyle.container}>
      <div className={capchaStyle.joke}>{joke}</div>
      <div className={capchaStyle.jokesubhead}>
        Is this a joke written by a human or an AI?
      </div>
      <div className={capchaStyle.selector}>
        <div
          className={capchaStyle.option}
          id="real"
          onClick={() => onSubmit(true)}
        >
          Real
        </div>
        <div
          className={capchaStyle.option}
          id="fake"
          onClick={() => onSubmit(false)}
        >
          Fake
        </div>
      </div>
    </div>
  );
}

export default Capcha;
