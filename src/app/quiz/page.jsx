// `app/page.js` is the UI for the `/question` URL
"use client";

// import { redirect } from "next/navigation";

import { useState, useEffect } from "react";

import Logo from "../components/Logo";
// import Question from "../components/Question";
// import Choices from "../components/Choices";
// import PreviousQuestions from "../components/PreviousQuestions";
// import NextQuestions from "../components/NextQuestions";
// import SubmitAnswers from "../components/SubmitAnswers";

import { useAppContext } from "../context/app-context";

const NO_OF_QUESTION_PER_PAGE = 3;

const QuestionsPage = () => {
  const { data, setData } = useAppContext();

  const [questions, setQuestions] = useState([]);
  const [totalNumberOfQuestion, setTotalNumberOfQuestion] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    // TODO - DEBUG WHY THIS IS INVOKED TWICE
    console.log("TEST");

    (async () => {
      const response = await fetch(
        "https://j24695wfx2.execute-api.ap-southeast-1.amazonaws.com/sbx/questions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const responseJSON = await response.json();

      const questions = responseJSON.questions;

      setQuestions(questions);
      setTotalNumberOfQuestion(questions.length);

      let defaultAnswers = [];

      for (let index = 0; index < questions.length; index++) {
        const { id } = questions[index];

        defaultAnswers[id] = null;
      }

      setSelectedAnswers(defaultAnswers);
    })();
  }, []);

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
    if (currentQuestionIndex < NO_OF_QUESTION_PER_PAGE) {
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex - NO_OF_QUESTION_PER_PAGE);
  };

  const handleNext = () => {
    if (currentQuestionIndex + NO_OF_QUESTION_PER_PAGE > totalNumberOfQuestion) {
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + NO_OF_QUESTION_PER_PAGE);
  };

  const handleSubmit = () => {
    if (currentQuestionIndex + NO_OF_QUESTION_PER_PAGE < totalNumberOfQuestion) {
      return;
    }

    setData();
    console.log("DONE");

    // redirect("/result");
  };

  return (
    <main>
      <div
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="pt-5">
          <div className="container ">
            <Logo width={200} height={100} />

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
                  ) : (
                    /*  <PreviousQuestions handlePrevious={handlePrevious} /> */
                    ""
                  )}
                </div>

                <div className="col text-end">
                  {currentQuestionIndex + NO_OF_QUESTION_PER_PAGE >
                  totalNumberOfQuestion ? (
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
