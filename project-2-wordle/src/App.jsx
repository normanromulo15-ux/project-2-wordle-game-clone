import { useEffect, useState } from "react";
import words from "../../words.js";
import StartPage from "./components/StartPage.jsx";
import LetterButtons from "./components/LetterButtons.jsx";
import AnswersDisplay from "./components/AnswersDisplay.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const [guessCount, setGuessCount] = useState(1);
  const [restartGame, setRestartGame] = useState(false) // Dependency data to restart the game

  const reachedLimit = userInput.length === 5;

  useEffect(getRandomWord, [restartGame]);

  useEffect(() => {
    if (!startGame) return;

    window.addEventListener("keydown", handleKeyboardInput);

    function handleKeyboardInput(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const { key } = e;

      if (/^[a-z]$/i.test(key)) {
        addLetter(key);
        return;
      }

      else if (key === "Enter") {
        e.preventDefault();
        submitGuess();
      }

      else if (key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    }
  }, [startGame, userInput]);

  // FUNCTION TO START THE GAME
  function handleStartGame() {
    setStartGame(true);
  }

  // FUNCTION TO FETCH THE RANDOM WORD TO BE GUESSED
  function getRandomWord() {
    const i = Math.floor(Math.random() * 2500);
    const randomWord = words[i];

    setRandomWord(randomWord);
  }

  // FUNCTION TO HANDLE THE GAME LOGIC
  function submitGuess() {
    if (userInput.length !== 5) return;

    const guess = userInput;

    // CHECK IF THE INPUT WORD IS A VALID 5-LETTER ENGLISH WORD
    if (!words.includes(guess)) {
      alert("Invalid word.");
      setUserInput("");
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

    // CLEAR THE INPUT FIELD 
    setUserInput("");
  }

  // FUNCTION TO ADD A LETTER
  function addLetter(letter) {
    setUserInput(prevInput => prevInput + letter.toUpperCase());
  }

  // FUNCTION TO HANDLE CLICK LETTER BUTTON
  function handleClickButton(e) {
    addLetter(e.target.value);
  }

  // FUNCTION TO HANDLE SUBMIT ANSWER
  function handleSubmitGuess(e) {
    e.preventDefault();
    submitGuess();
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
  function handleBackspace() {
    setUserInput(prevInput => prevInput.slice(0, -1));
  }

  return (
    <div
      className={startGame ? `h-dvh flex flex-col items-center justify-center bg-[rgb(245,245,245)] ` : null}
    >
      {!startGame &&
        <StartPage
          handleStartGame={handleStartGame}
        />
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
              handleSubmitGuess={handleSubmitGuess}
              handleBackspace={handleBackspace}
            />
          </main>
          <Footer />
        </div>
      }
    </div>
  )
}

export default App;