const Question = ({ question }) => {
  return (
    <div className="row" key={index}>
      <div className="pt-2">
        <div className="card">
          <div className="card-header">
            <h5>{question}</h5>
            {/* <Question question={} /> */}
          </div>

          <div className="card-body">
            {choices.map((choice, choiceIndex) => (
              <div key={choiceIndex} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={["answer", id].join("_")}
                  id={["answer", id, choiceIndex].join("_")} // for selecting using label
                  onChange={() => handleChoiceSelect(id, choice)}
                  checked={choice === selectedAnswers[id]}
                />
                <label
                  className="form-check-label"
                  htmlFor={["answer", id, choiceIndex].join("_")} // for selecting using label
                >
                  {choice}
                </label>
              </div>
            ))}
            {/* <Choices choices={question.choices} handleChoiceSelect={handleChoiceSelect} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
