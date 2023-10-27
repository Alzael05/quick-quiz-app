import Choices from "../components/Choices";

const Question = ({
  questions: { id, question, choices },
  // selectedAnswers,
  // setSelectedAnswers,
}) => {
  return (
    <div className="row">
      <div className="pt-2">
        <div className="card">
          <div className="card-header">
            <h5>{question}</h5>
            {/* <Question question={} /> */}
          </div>

          <div className="card-body">
            {choices.map((choice, choiceIndex) => (
              <Choices
                key={choiceIndex}
                questionId={id}
                choice={choice}
                choiceIndex={choiceIndex}
                // selectedAnswers={selectedAnswers}
                // setSelectedAnswers={setSelectedAnswers}
              />
            ))}
            {/* <Choices choices={question.choices} handleChoiceSelect={handleChoiceSelect} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
