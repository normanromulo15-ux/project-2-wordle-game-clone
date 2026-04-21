

function AnswersDisplay() {


  return (
    <div className="answers-display-2">
      {
        Array(30).fill(null).map((_, index) =>
          <div key={index} className="letter-box"></div>
        )
      }
    </div>
  )
}