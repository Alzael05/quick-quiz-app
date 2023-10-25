// `app/page.js` is the UI for the `/question` URL
"use client";

import { useState } from "react";
import Image from "next/image";

// import Question from "../components/Question";
// import Choices from "../components/Choices";
// import PreviousQuestions from "../components/PreviousQuestions";
// import NextQuestions from "../components/NextQuestions";
// import SubmitAnswers from "../components/SubmitAnswers";

import questions from "../model/questions";

const QuestionsPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const defaultAnswers = [];

  for (let index = 0; index < questions.length; index++) {

    const { id } = questions[index];

    defaultAnswers[id] = null;
  }

  const [selectedAnswers, setSelectedAnswers] = useState(defaultAnswers);

  const TOTAL_NO_OF_QUESTION = questions.length;
  const NO_OF_QUESTION_PER_PAGE = 3;

  const visibleQuestions = questions.slice(
    currentQuestionIndex,
    currentQuestionIndex + NO_OF_QUESTION_PER_PAGE,
  );

  const handleChoiceSelect = (question_id, choice) => {
    // Save the selected choice to storage or state for later validation
    setSelectedAnswers((_selectedAnswers) => {
      _selectedAnswers[question_id] = choice;

      return {
        ..._selectedAnswers,
      };
    });
  };

  const handlePrevious = () => {
    console.log(selectedAnswers);

    if (currentQuestionIndex < NO_OF_QUESTION_PER_PAGE) {
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex - NO_OF_QUESTION_PER_PAGE);
  };

  const handleNext = () => {
    console.log(selectedAnswers);

    if (currentQuestionIndex + NO_OF_QUESTION_PER_PAGE > TOTAL_NO_OF_QUESTION) {
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + NO_OF_QUESTION_PER_PAGE);
  };

  const handleSubmit = () => {
    if (currentQuestionIndex + NO_OF_QUESTION_PER_PAGE < TOTAL_NO_OF_QUESTION) {
      return;
    }

    console.log("DONE");

    console.log(selectedAnswers);
  };

  return (
    <main>
      <div
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="pt-5">
          <div className="container ">
            <div className="row">
              <div className="d-flex justify-content-center align-items-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={200}
                  height={100}
                  priority
                />
              </div>
            </div>

            <div className="pt-5">
              {/* <div className="d-flex justify-content-center align-items-center"> */}
              {visibleQuestions.map(({ id, question, choices }, index) => (
                <div className="row" key={index}>
                  <div className="pt-2">
                    <div className="card">
                      <div className="card-header">
                        <h5>{question}</h5>
                        {/* <Question question={} /> */}
                      </div>

                      <div className="card-body">
                        {choices.map((choice, choiceIndex) => (
                          <div
                            key={choiceIndex}
                            className="form-check"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name={["answer", id].join("_")}
                              id={["answer", id, choiceIndex].join("_")} // for selecting using label
                              onChange={() => handleChoiceSelect(id, choice)}
                              checked={choice === selectedAnswers[id]}
                            />
                            < label
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
              ))}
              {/* </div> */}
            </div>

            <div className="pt-5">
              <div className="row">
                <div className="col text-start">
                  {currentQuestionIndex >= NO_OF_QUESTION_PER_PAGE ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={handlePrevious}
                    >
                      Back
                    </button>
                    /*  <PreviousQuestions handlePrevious={handlePrevious} /> */
                  ) : (
                    ""
                  )}
                </div>

                <div className="col text-end">
                  {currentQuestionIndex + NO_OF_QUESTION_PER_PAGE >
                    TOTAL_NO_OF_QUESTION ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  ) : (
                    /* <SubmitAnswers handleSubmit={handleSubmit} /> */
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                    /* <NextQuestions handleNext={handleNext} /> */
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuestionsPage;
