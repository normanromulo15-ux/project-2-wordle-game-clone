import { useEffect, useState } from "react";
import words from "../../words.js";
import LetterButtons from "./components/LetterButtons.jsx";
import Answer from "./components/Answer.jsx";
import Progress from "./components/Progress.jsx";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [inputContainer, setInputContainer] = useState([]); // Array to store the user's letters per answer 
  const [restartGame, setRestartGame] = useState(false) // Dependency data to restart the game

  useEffect(getRandomWord, [restartGame]);

  // FUNCTION TO FETCH THE RANDOM WORD TO BE GUESSED
  function getRandomWord() {

    const i = Math.floor(Math.random() * words.length);
    const randomWord = words[i];

    setRandomWord(randomWord);
  }

  // FUNCTION TO HANDLE USER'S INPUT
  function handleUserAnswer(e) {
    const { value } = e.target;

    const answer = value.trim().split("");

    const formattedAnswer = answer.map(letter => letter.toUpperCase());

    setUserInput(formattedAnswer.join(""));

    if (value.length === 5) {
      setEnableSubmitButton(true);
    } else {
      setEnableSubmitButton(false);
    }
  }

  // FUNCTION TO HANDLE CLICK SUBMIT BUTTON
  function handleSubmitButton(e) {
    e.preventDefault();

    // CHECK IF THE INPUT WORD IS A VALID 5-LETTER ENGLISH WORD
    if (words.includes(userInput)) {

      // CHECK IF THE INPUT WORD MATCHES THE HIDDEN WORD
      if (userInput === randomWord) {
        setInputContainer(userInput.split(""));

        setTimeout(() => {
          alert(`You guessed the word! (${randomWord})`)
          setInputContainer([]);
          setRestartGame(prevValue => !prevValue);
          setUserInput("");

        }, 500);

      } else {
        setInputContainer(userInput.split(""));
        console.log(randomWord)
      }

    } else {
      alert("Invalid word.")
    }

    setUserInput("");
    setEnableSubmitButton(false);
  }

  return (
    <div className="app">
      {!startGame &&
        <button
          className="starting-button"
          onClick={() => setStartGame(true)}
          type="button"
        >
          PLAY
        </button>
      }
      {startGame &&
        <main className="the-game">
          <Progress
            inputContainer={inputContainer}
            randomWord={randomWord}
          />

          <Answer
            userInput={userInput}
            enableSubmitButton={enableSubmitButton}
            handleUserAnswer={handleUserAnswer}
            handleSubmitButton={handleSubmitButton}
          />

          <LetterButtons
            inputContainer={inputContainer}
            randomWord={randomWord}
          />

        </main>
      }
    </div>
  )
}

export default App;