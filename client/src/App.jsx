import { useEffect, useState } from "react";
import axios from "axios";
import BACKEND_API_URL from "../API/localhost.js";
import words from "./components/js_files/words.js";
import StartPage from "./components/StartPage.jsx";
import LetterButtons from "./components/LetterButtons.jsx";
import AnswersDisplay from "./components/AnswersDisplay.jsx";
import InvalidWordMessage from "./components/user_feedback/InvalidWordMessage.jsx";
import CorrectGuessMessage from "./components/user_feedback/CorrectGuessMessage.jsx";
import GameOverMessage from "./components/user_feedback/GameOverMessage.jsx";
import StatsDisplay from "./components/StatsDisplay.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const [displayInvalidWordMessage, setDisplayInvalidWordMessage] =
    useState(false);
  const [displayCorrectGuessMessage, setDisplayCorrectGuessMessage] =
    useState(false);
  const [displayUserStats, setDisplayUserStats] = useState(false);
  const [userStats, setUserStats] = useState([]);
  const [winRate, setWinRate] = useState([]);
  const [averageScore, setAverageScore] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [restartGame, setRestartGame] = useState(false);

  const reachedLimit = userInput.length === 5;
  const guessCount = answers.length + 1;

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
      } else if (key === "Enter") {
        e.preventDefault();
        submitGuess();
      } else if (key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      }
    }

    return () => window.removeEventListener("keydown", handleKeyboardInput);
  }, [startGame, userInput]);

  // FUNCTION TO REDIRECT TO THE HOME SCREEN
  function handleRedirectToHome() {
    setDisplayUserStats(false);
    setStartGame(false);
    handleRestartGame();
  }

  // FUNCTION TO START THE GAME
  function handleStartGame() {
    setStartGame(true);
  }

  // FUNCTION TO FETCH THE RANDOM WORD TO BE GUESSED
  function getRandomWord() {
    const i = Math.floor(Math.random() * 2315);
    const randomWord = words[i];

    setRandomWord(randomWord);
  }

  // FUNCTION TO HANDLE THE GAME LOGIC
  function submitGuess() {
    if (userInput.length !== 5) return;

    const guess = userInput;

    // CHECK IF THE INPUT WORD IS A VALID 5-LETTER ENGLISH WORD
    if (!words.includes(guess)) {
      handleGuessValidity();
      return;
    }

    // ADD THE USER'S GUESS TO THE ANSWERS ARRAY
    setAnswers((prevAnswers) => [...prevAnswers, guess]);

    // CHECK IF THE USER'S GUESS IS CORRECT
    if (guess === randomWord) {
      handleCorrectGuessMessage();
    }

    // THE GAME IS OVER IF THE USER HAS REACHED THE 6TH ATTEMPT AND HAS AN INCORRECT GUESS
    else if (guessCount === 6) {
      handleGameOver();
    }

    // CLEAR THE INPUT FIELD
    setUserInput("");
  }

  // FUNCTION TO ADD A LETTER
  function addLetter(letter) {
    setUserInput((prevInput) => prevInput + letter.toUpperCase());
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

  // FUNCTION TO HANDLE THE USER'S GUESS VALIDITY
  function handleGuessValidity() {
    setDisplayInvalidWordMessage(true);
    setTimeout(() => {
      setDisplayInvalidWordMessage(false);
    }, 1000);
  }

  // FUNCTION TO DISPLAY THE USER'S GUESSES WITH COLOR-CODED BACKGROUND
  function getGuessColors(guess) {
    // INITIALIZE AN ARRAY TO HOLD THE COLOR FOR EACH LETTER IN THE GUESS, DEFAULTING TO BLACK
    const colors = Array(guess.length).fill("black");

    // CREATE A COPY OF THE RANDOM WORD AS AN ARRAY TO TRACK USED LETTERS
    const randomWordLetters = randomWord.split("");

    // PASS 1: CHECK FOR CORRECT LETTERS IN THE CORRECT POSITION (GREEN)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === randomWordLetters[i]) {
        // MARK THIS LETTER AS GREEN
        colors[i] = "green";

        // MARK THIS LETTER AS AN EMPTY STRING TO AVOID DUPLICATE MATCHES IN THE NEXT PASS
        randomWordLetters[i] = "";
      }
    }

    // PASS 2: CHECK FOR CORRECT LETTERS IN THE WRONG POSITION (ORANGE)
    for (let i = 0; i < guess.length; i++) {
      // SKIP LETTERS ALREADY MARKED AS GREEN
      if (colors[i] === "green") continue;

      // RETURNS THE INDEX OF THE FIRST OCCURRENCE OF THE LETTER IN THE REMAINING LETTERS ARRAY
      const letterIndex = randomWordLetters.indexOf(guess[i]);

      // IF THERE IS A MATCH, MARK THE LETTER AS ORANGE
      if (letterIndex !== -1) {
        // MARK THIS LETTER AS ORANGE
        colors[i] = "orange";

        // MARK THIS LETTER AS AN EMPTY STRING TO AVOID DUPLICATE MATCHES
        randomWordLetters[letterIndex] = "";
      }
    }

    // RETURNS AN ARRAY OF COLORS CORRESPONDING TO EACH LETTER IN THE GUESS
    return colors;
  }

  // FUNCTION TO HANDLE DELETE BUTTON CLICK
  function handleBackspace() {
    setUserInput((prevInput) => prevInput.slice(0, -1));
  }

  // FUNCTION TO DISPLAY THE CORRECT GUESS MESSAGE
  function handleCorrectGuessMessage() {
    setTimeout(() => {
      setDisplayCorrectGuessMessage(true);
    }, 400);

    submitUserScore(guessCount);
  }

  // FUNCTION TO DISPLAY THE GAME OVER MESSAGE
  function handleGameOver() {
    setTimeout(() => {
      setGameOver(true);
    }, 300);

    const userScore = null;

    submitUserScore(userScore);
  }

  // FUNCTION TO RESTART THE GAME
  function handleRestartGame() {
    setGameOver(false);
    setDisplayCorrectGuessMessage(false);
    setUserInput("");
    setAnswers([]);
    setRestartGame((prevValue) => !prevValue);
  }

  // FUNCTION TO SHOW USER'S STATS
  async function handleShowStats() {
    setDisplayUserStats(true);
    setGameOver(false);
    setDisplayCorrectGuessMessage(false);

    try {
      const response1 = await axios.get(`${BACKEND_API_URL}/stats`);
      const response2 = await axios.get(`${BACKEND_API_URL}/stats/scores`);
      const response3 = await axios.get(`${BACKEND_API_URL}/stats/average`);

      setUserStats(response1.data);
      setWinRate(response2.data);
      setAverageScore(response3.data);
    } catch (error) {
      console.log(error.stack);
    }
  }

  // FUNCTION TO PASS THE USER'S RATING AFTER THE GAME ENDS
  async function submitUserScore(score) {
    const attemptData = { attempt: score };

    try {
      await axios.post(`${BACKEND_API_URL}/stats`, attemptData);
    } catch (error) {
      console.log(error.stack);
    }
  }

  return (
    <div
      className={
        startGame ? `bg-[rgb(245,245,245)] h-dvh flex justify-center` : null
      }
    >
      {!startGame && (
        <StartPage
          handleStartGame={handleStartGame}
          handleShowStats={handleShowStats}
        />
      )}
      {displayUserStats && (
        <StatsDisplay
          userStats={userStats}
          winRate={winRate}
          averageScore={averageScore}
          handleRedirectToHome={handleRedirectToHome}
        />
      )}
      {startGame && (
        <div className="flex flex-col w-dvw lg:py-8">
          {displayCorrectGuessMessage && (
            <CorrectGuessMessage
              randomWord={randomWord}
              handleRestartGame={handleRestartGame}
              handleShowStats={handleShowStats}
            />
          )}
          {displayInvalidWordMessage && <InvalidWordMessage />}
          {gameOver && (
            <GameOverMessage
              randomWord={randomWord}
              handleRestartGame={handleRestartGame}
              handleShowStats={handleShowStats}
            />
          )}

          <main className="flex-1 flex flex-col justify-evenly lg:gap-8">
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
      )}
    </div>
  );
}

export default App;
