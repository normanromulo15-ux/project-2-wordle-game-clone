import { useState } from "react";

function Letters() {

  const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  function handleLetterClick(e) {

    const { value } = e.target;

    console.log(value)
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

export default Letters;