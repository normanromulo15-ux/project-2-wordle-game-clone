import letters from "./Letters.js";

function LetterButtons(props) {
  const { answers, getGuessColors } = props;

  // OBJECT TO TRACK THE COLORS OF THE LETTER BUTTONS, INITIALLY EMPTY
  const keyboardColors = {};

  // COLOR RANK: GREEN > ORANGE > BLACK
  const rank = { green: 3, orange: 2, black: 1 };

  // LOOP THROUGH THE USER'S GUESSES TO DETERMINE THE COLOR OF EACH LETTER BUTTON
  answers.forEach(guess => {
    const colors = getGuessColors(guess); // RETURNS AN ARRAY CONTAINING ['green', 'orange', 'black', ...]

    guess.split("").forEach((letter, index) => {
      const currentColor = keyboardColors[letter];
      const newColor = colors[index];

      // ONLY UPDATE THE COLOR IF IT IS A NEW COLOR OR A STRONGER COLOR (GREEN > ORANGE > BLACK)
      if (!currentColor || (rank[newColor] > rank[currentColor])) {
        keyboardColors[letter] = newColor;
      }
    })
  })

  function handleClickButton(e) {
    const { value } = e.target;

    console.log(value); // FOR TESTING PURPOSES ONLY --- IGNORE ---
  }

  return (
    < div className="letters-container" >
      {
        // RENDER THE LETTER BUTTONS
        letters.map((letter, index) => {
          return (
            <button
              name="letter-button"
              key={index}
              type="button"
              className="letter-button"
              value={letter}
              style={{ backgroundColor: keyboardColors[letter] || 'rgb(115,115,115)' }}
              onClick={handleClickButton}
            >
              {letter}
            </button>
          )
        }
        )
      }
    </div >
  )
}

export default LetterButtons;