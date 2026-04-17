import { useEffect, useState } from "react";
import words from "../../words.js";
import Letters from "./components/Letters.jsx";
import Answer from "./components/Answer.jsx";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [numberOfAttempt, setNumberOfAttempt] = useState(0);
  const [restartGame, setRestartGame] = useState(false)

  useEffect(getRandomWord, [restartGame]);

  // FUNCTION TO FETCH THE RANDOM WORD TO BE GUESSED
  function getRandomWord() {

    const i = Math.floor(Math.random() * words.length);
    const word = words[i].trim();

    setRandomWord(word);
  }

  // FUNCTION TO HANDLE USER'S ANSWER
  function handleUserAnswer(e) {

    const { value } = e.target;

    const answer = value.trim().split("");
    const userAnswer = answer.map(letter => letter.toUpperCase());

    setUserInput(userAnswer.join(""));

    if (value.length === 5) {
      setEnableSubmitButton(true);
    } else {
      setEnableSubmitButton(false);
    }
  }

  // FUNCTION TO HANDLE CLICK SUBMIT BUTTON
  function handleSubmitButton(e) {
    e.preventDefault();

    if (words.includes(userInput)) {
      if (userInput === randomWord) {

        console.log("You guessed the word!");

        setRestartGame(prevValue => !prevValue);
      } else {
        const arr1 = randomWord.split(""); // the random word
        const arr2 = userInput.split(""); // the user's guess
        const exactMatches = [];
        const containsLetter = [];

        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] === arr2[i]) {
            exactMatches.push(arr2[i])
          }
          if (arr1.includes(arr2[i])) {
            containsLetter.push(`${arr2[i]}`)
          }
        }

        console.log(userInput);
        console.log(`Exact match: ${exactMatches}`);
        console.log(`Contains: ${containsLetter}`);
      }
      setAnswerFeedback("Valid word.");
    } else {
      setAnswerFeedback("Invalid word.");
    }

    setUserInput("");
    setEnableSubmitButton(false);
    setShowAnswerFeedback(true);

    setTimeout(() => {
      setAnswerFeedback(null);
      setShowAnswerFeedback(false);
    }, 1000);
  }

  return (
    <div className="app">
      {!startGame &&
        <button
          onClick={() => setStartGame(true)}
        >
          Start Game
        </button>
      }
      {startGame &&
        <section className="the-game">
          <Answer
            userInput={userInput}
            enableSubmitButton={enableSubmitButton}
            handleUserAnswer={handleUserAnswer}
            handleSubmitButton={handleSubmitButton}
          />
          {showAnswerFeedback &&
            <p>{answerFeedback}</p>
          }

          <Letters />

        </section>
      }
    </div>
  )
}

export default App;