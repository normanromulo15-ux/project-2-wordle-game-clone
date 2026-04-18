function Answer(props) {
  const { userInput, handleUserAnswer, handleSubmitButton, enableSubmitButton } = props;

  return (
    <form className="answer-tab">
      <input
        placeholder="Guess the hidden 5-letter word!"
        name="user-answer"
        type="text"
        maxLength={5}
        value={userInput}
        onChange={handleUserAnswer}
        autoFocus
      />

      <button
        className="submit-button"
        type="submit"
        onClick={handleSubmitButton}
        disabled={!enableSubmitButton}
      >
        Enter
      </button>

    </form>
  )
}

export default Answer;