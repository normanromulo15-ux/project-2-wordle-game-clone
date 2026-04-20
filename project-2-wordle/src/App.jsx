import { useEffect, useState } from "react";
import { easy, medium, hard } from "../../words.js";
import words from "../../words.js";
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

  // COUNT THE NUMBER OF GUESSES THE USER HAS MADE
  const guessCount = answers.length;

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

    // CHECK IF THE INPUT WORD IS A VALID 5-LETTER ENGLISH WORD
    if (!words.includes(guess)) {
      alert("Invalid word.");
      setUserInput("");
      setEnableSubmitButton(false);
      return;
    }

    // CHECK IF THE USER HAS ALREADY REACHED THE MAXIMUM NUMBER OF GUESSES (6)
    if (guessCount > 5) {
      alert(`Game over! The word was "${randomWord}". Starting a new game...`);
      setAnswers([]);
      setUserInput("");
      setEnableSubmitButton(false);
      setRestartGame(prevValue => !prevValue);
      return;
    }

    // ADD THE USER'S GUESS TO THE ANSWERS ARRAY
    setAnswers(prevAnswers => [...prevAnswers, guess]);

    // CHECK IF THE USER'S GUESS IS CORRECT
    if (guess === randomWord) {
      setTimeout(() => {
        alert(`You guessed the word! The word was "${randomWord}". Starting a new game...`);
        setAnswers([]);
        setRestartGame(prevValue => !prevValue);
      }, 500);
    }

    // CLEAR THE INPUT FIELD AND DISABLE THE SUBMIT BUTTON
    setUserInput("");
    setEnableSubmitButton(false);
  }

  // FUNCTION TO DISPLAY THE USER'S GUESSES WITH COLOR-CODED BACKGROUND
  function getGuessColors(guess) {

    // INITIALIZE AN ARRAY TO HOLD THE COLOR FOR EACH LETTER IN THE GUESS, DEFAULTING TO BLACK
    const colors = Array(guess.length).fill('black');

    // CREATE A COPY OF THE RANDOM WORD AS AN ARRAY TO TRACK USED LETTERS
    const randomWordLetters = randomWord.split("");

    // PASS 1: CHECK FOR CORRECT LETTERS IN THE CORRECT POSITION (GREEN)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === randomWordLetters[i]) {
        // MARK THIS LETTER AS GREEN
        colors[i] = 'green';

        // MARK THIS LETTER AS AN EMPTY STRING TO AVOID DUPLICATE MATCHES IN THE NEXT PASS
        randomWordLetters[i] = '';
      }
    }

    // PASS 2: CHECK FOR CORRECT LETTERS IN THE WRONG POSITION (ORANGE)
    for (let i = 0; i < guess.length; i++) {

      // SKIP LETTERS ALREADY MARKED AS GREEN
      if (colors[i] === 'green') continue;

      // RETURNS THE INDEX OF THE FIRST OCCURRENCE OF THE LETTER IN THE REMAINING LETTERS ARRAY
      const letterIndex = randomWordLetters.indexOf(guess[i]);

      // IF THERE IS A MATCH, MARK THE LETTER AS ORANGE
      if (letterIndex !== -1) {
        // MARK THIS LETTER AS ORANGE
        colors[i] = 'orange';

        // MARK THIS LETTER AS AN EMPTY STRING TO AVOID DUPLICATE MATCHES
        randomWordLetters[letterIndex] = '';
      }
    }

    // RETURNS AN ARRAY OF COLORS CORRESPONDING TO EACH LETTER IN THE GUESS
    return colors;
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
            answers={answers}
            getGuessColors={getGuessColors}
          />

          <Answer
            userInput={userInput}
            enableSubmitButton={enableSubmitButton}
            handleUserAnswer={handleUserAnswer}
            handleSubmitButton={handleSubmitButton}
          />

          <LetterButtons
            answers={answers}
            getGuessColors={getGuessColors}
          />

        </main>
      }
    </div>
  )
}

export default App;