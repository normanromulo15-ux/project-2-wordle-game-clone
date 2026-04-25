import { useEffect, useState } from "react";
import words from "../../words.js";
import LetterButtons from "./components/LetterButtons.jsx";
import AnswersDisplay from "./components/AnswersDisplay.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState([]); // Array to store the user's guesses
  const [restartGame, setRestartGame] = useState(false) // Dependency data to restart the game
  const [reachedLimit, setReachedLimit] = useState(false);
  const [guessCount, setGuessCount] = useState(1);

  useEffect(getRandomWord, [restartGame]);

  // FUNCTION TO FETCH THE RANDOM WORD TO BE GUESSED
  function getRandomWord() {
    const i = Math.floor(Math.random() * 2315);
    const randomWord = words[i];

    setRandomWord(randomWord);
  }

  // FUNCTION TO HANDLE CLICK LETTER BUTTON
  function handleClickButton(e) {
    const { value } = e.target;

    setUserInput(
      prevInput => prevInput + value
    );

    // SETTING THE ENABLE SUBMIT BUTTON AND REACHED LIMIT TO TRUE WHEN THE USER INPUT REACHES 5 LETTERS
    setReachedLimit(userInput.length === 4);
  }

  // FUNCTION TO HANDLE SUBMIT ANSWER
  function handleSubmitButton(e) {
    e.preventDefault();

    const guess = userInput;

    // CHECK IF THE INPUT WORD IS A VALID 5-LETTER ENGLISH WORD
    if (!words.includes(guess)) {

      alert("Invalid word.");

      setUserInput("");
      setReachedLimit(false);
      return;
    }

    // ADD THE USER'S GUESS TO THE ANSWERS ARRAY
    setAnswers(prevAnswers => [...prevAnswers, guess]);

    // INCREASE THE NUMBER OF ATTEMPT 
    setGuessCount(prevVal => prevVal + 1);

    // CHECK IF THE USER'S GUESS IS CORRECT
    if (guess === randomWord) {
      setTimeout(() => {
        alert(`You guessed the word in ${guessCount} attempts! Starting a new game...`);
        setAnswers([]);
        setRestartGame(prevValue => !prevValue);
        setReachedLimit(false);
        setGuessCount(1);
      }, 500);
    }

    // THE GAME IS OVER IF THE USER HAS REACHED THE 6TH ATTEMPT AND HAS AN INCORRECT GUESS
    else if (guessCount === 6) {
      alert(`Game over! The word was ${randomWord}! Starting a new game...`);
      setGuessCount(1);
      setAnswers([]);
      setRestartGame(prevValue => !prevValue);
    }

    // CLEAR THE INPUT FIELD AND DISABLE THE ENTER BUTTON
    setUserInput("");
    setReachedLimit(false);
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

  // FUNCTION TO HANDLE DELETE BUTTON CLICK
  function handleDeleteButton() {
    setUserInput(prevInput => prevInput.slice(0, -1));
    setReachedLimit(false);
  }

  return (
    <div
      className="h-screen flex flex-col items-center justify-start bg-[rgb(245,245,245)] pt-8"
    >
      {!startGame &&
        <button
          type="button"
          className="p-4 mt-40 bg-green-500 text-xl text-white font-bold tracking-wide transition hover:scale-105 rounded-4xl cursor-pointer"
          onClick={() => setStartGame(true)}
        >
          PLAY
        </button>
      }
      {startGame &&
        <div
          className="the-game"
        >
          <main
            className="flex flex-col gap-6"
          >
            <AnswersDisplay
              userInput={userInput}
              answers={answers}
              getGuessColors={getGuessColors}
            />

            <LetterButtons
              answers={answers}
              reachedLimit={reachedLimit}
              getGuessColors={getGuessColors}
              handleClickButton={handleClickButton}
              handleSubmitButton={handleSubmitButton}
              handleDeleteButton={handleDeleteButton}
            />
          </main>
          <Footer />
        </div>
      }
    </div>
  )
}

export default App;