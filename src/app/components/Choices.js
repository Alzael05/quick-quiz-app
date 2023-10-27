import { useAppContext } from "../context/app-context";

const Choices = ({
  questionId,
  choice,
  choiceIndex,
  // selectedAnswers,
  // setSelectedAnswers,
}) => {
  const { data, setData } = useAppContext();

  const handleChoiceSelect = (question_id, choice) => {
    // Save the selected choice to storage or state for later validation

    const selectedAnswers = [...data.selected_answers];

    selectedAnswers[question_id] = choice;

    setData({ selected_answers: selectedAnswers });
  };

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={["answer", questionId].join("_")}
        id={["answer", questionId, choiceIndex].join("_")} // for selecting using label
        onChange={() => handleChoiceSelect(questionId, choice)}
        checked={choice === data.selected_answers[questionId]}
      />
      <label
        className="form-check-label"
        htmlFor={["answer", questionId, choiceIndex].join("_")} // for selecting using label
      >
        {choice}
      </label>
    </div>
  );
};

export default Choices;
