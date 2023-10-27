// `app/page.js` is the UI for the `/question` URL
"use client";

import Link from "next/link";
// import { redirect } from "next/navigation";

import { useState, useEffect } from "react";

import Logo from "../components/Logo";
import Question from "../components/Question";

import { useAppContext } from "../context/app-context";

const NO_OF_QUESTION_PER_PAGE = 3;

const QuestionsPage = () => {
  const { data, setData } = useAppContext();

  const [questions, setQuestions] = useState([]);
  const [totalNumberOfQuestion, setTotalNumberOfQuestion] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [selectedAnswers, setSelectedAnswers] = useState([]);

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

        defaultAnswers[id] = "null";
      }

      setData({ selected_answers: defaultAnswers });
      // setSelectedAnswers(defaultAnswers);
    })();
  }, []);

  const visibleQuestions = questions.slice(
    currentQuestionIndex,
    currentQuestionIndex + NO_OF_QUESTION_PER_PAGE,
  );

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

    console.log("TEST");

    // setData({ selected_answers: selectedAnswers });
  };

  return (
    <main>
      <div
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="pt-2">
          <div className="container ">
            <Logo maxWidth={"25%"} />

            <div className="pt-2">
              {/* <div className="d-flex justify-content-center align-items-center"> */}
              {visibleQuestions.map((questions, index) => (
                <Question
                  key={index}
                  questions={questions}
                  // selectedAnswers={selectedAnswers}
                  // setSelectedAnswers={setSelectedAnswers}
                />
              ))}
              {/* </div> */}
            </div>

            <div className="pt-2 pt-">
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
                    <Link
                      href="/result"
                      className="btn btn-primary btn-lg"
                      role="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Link>
                  ) : (
                    /* <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button> */
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
