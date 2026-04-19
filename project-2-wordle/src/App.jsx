import { useEffect, useState } from "react";
import words from "../../words.js";
import {easy, medium, hard} from "../../words.js";
import LetterButtons from "./components/LetterButtons.jsx";
import Answer from "./components/Answer.jsx";
import Progress from "./components/Progress.jsx";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState([]); // Array to store the user's guesses
  const [restartGame, setRestartGame] = useState(false) // Dependency data to restart the game

  useEffect(getRandomWord, [restartGame]);

  // FUNCTION TO FETCH THE RANDOM WORD TO BE GUESSED
  function getRandomWord() {
    const i = Math.floor(Math.random() * easy.length);
    const randomWord = words[i];

    setRandomWord(randomWord);
  }

  // FUNCTION TO HANDLE USER'S INPUT
  function handleUserAnswer(e) {
    const { value } = e.target;

    const formattedAnswer = value.trim().toUpperCase();

    setUserInput(formattedAnswer);
    setEnableSubmitButton(formattedAnswer.length === 5);
  }

  // FUNCTION TO HANDLE CLICK SUBMIT BUTTON
  function handleSubmitButton(e) {
    e.preventDefault();

    const guess = userInput;
    console.log(randomWord);

    // CHECK IF THE INPUT WORD IS A VALID 5-LETTER ENGLISH WORD
    if (!words.includes(guess)) {
      alert("Invalid word.");
      setUserInput("");
      setEnableSubmitButton(false);
      return;
    }

    // ADD THE USER'S GUESS TO THE ANSWERS ARRAY
    setAnswers(prevAnswers => [...prevAnswers, guess]);

    // CHECK IF THE USER'S GUESS IS CORRECT
    if (guess === randomWord) {
      setTimeout(() => {
        alert(`You guessed the word! (${randomWord})`);
        setAnswers([]);
        setRestartGame(prevValue => !prevValue);
      }, 500);
    }

    // CLEAR THE INPUT FIELD AND DISABLE THE SUBMIT BUTTON
    setUserInput("");
    setEnableSubmitButton(false);
  }

  return (
    <div className="app">
      {!startGame &&
        <button
          type="button"
          className="starting-button"
          onClick={() => setStartGame(true)}
        >
          PLAY
        </button>
      }
      {startGame &&
        <main className="the-game">
          <Progress
            randomWord={randomWord}
            answers={answers}
          />

          <Answer
            userInput={userInput}
            enableSubmitButton={enableSubmitButton}
            handleUserAnswer={handleUserAnswer}
            handleSubmitButton={handleSubmitButton}
          />

          <LetterButtons
          />

        </main>
      }
    </div>
  )
}

export default App;