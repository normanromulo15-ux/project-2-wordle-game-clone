function Answer(props) {
  const { userInput, handleUserAnswer, handleSubmitButton } = props;

  return (
    <form
      className="answer-tab"
      onSubmit={handleSubmitButton}
    >
      <input
        placeholder="Guess the hidden 5-letter word!"
        name="user-answer"
        type="text"
        maxLength={5}
        value={userInput}
        onChange={handleUserAnswer}
        autoFocus
      />
    </form>
  )
}

export default Answer;