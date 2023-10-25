const Choices = ({ choices, handleChoiceClick }) => {
  return (
    <div>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => handleChoiceClick(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default Choices;
