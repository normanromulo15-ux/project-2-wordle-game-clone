import { useState } from "react";
import letters from "./Letters.js";

function LetterButtons(props) {
  function handleLetterClick(e) {
    const { value } = e.target;
  }

  return (
    <div className="letters-container">
      {
        letters.map((letter, index) =>
          <button
            name="letter-button"
            key={index}
            type="button"
            className="letter-button"
            value={letter}
            onClick={handleLetterClick}
          >
            {letter}
          </button>
        )
      }
    
    </div>
  )
}

export default LetterButtons;