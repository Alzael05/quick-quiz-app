// `app/page.js` is the UI for the `/result` URL
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Logo from "../components/Logo";
import { useAppContext } from "../context/app-context";

import B2First from "../components/recommendation/B2First";
import C1Advanced from "../components/recommendation/C1Advanced";
import B2FirstForSchool from "../components/recommendation/B2FirstForSchool";
import B1PreliminaryForSchools from "../components/recommendation/B1PreliminaryForSchools";
import A2KeyForSchools from "../components/recommendation/A2KeyForSchools";

export default function ResultPage() {
  const { data, setData } = useAppContext();

  const [result, setResult] = useState([]);

  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [score, setScore] = useState(0);
  const [lowScore, setLowScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  const THIRTY_PERCENT = 0.3;
  const SEVENTY_PERCENT = 0.7;

  useEffect(() => {
    // TODO - DEBUG WHY THIS IS INVOKED TWICE
    console.log("TEST");

    (async () => {
      const response = await fetch(
        "https://j24695wfx2.execute-api.ap-southeast-1.amazonaws.com/sbx/check",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.selected_answers),
        },
      );

      const responseJSON = await response.json();

      console.log(responseJSON);

      setResult(responseJSON.result);

      setNoOfQuestions(responseJSON.result.length);
      setScore(responseJSON.score);
      setLowScore(responseJSON.result.length * THIRTY_PERCENT);
      setAverageScore(responseJSON.result.length * SEVENTY_PERCENT);
    })();
  }, []);

  const handleStartAgain = () => {
    setData(0);
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
              <div className="row">
                <h1 className="score text-center text-bold">
                  Score: {score}/{noOfQuestions}
                </h1>
              </div>
            </div>

            <div className="pt-1">
              <div className="row">
                <div className="col">
                  <h3 className="score text-center">
                    Recommended by
                    <img
                      className="pb-1 ps-2"
                      src="https://www.testandtrain.com/img/Logo%20flat%20negative.svg"
                      alt="Test and Learn"
                      style={{ width: "150px" }}
                    />
                  </h3>
                </div>
              </div>
              <div className="row">
                {score <= lowScore ? (
                  <>
                    <div className="col-sm-12 col-md-6">
                      <B2First />
                    </div>
                    <div className="d-md-none p-1"></div>
                    <div className="col-sm-12 col-md-6">
                      <C1Advanced />
                    </div>
                  </>
                ) : score <= averageScore ? (
                  <div className="col">
                    <B2FirstForSchool />
                  </div>
                ) : (
                  <>
                    <div className="col-sm-12 col-md-6">
                      <B1PreliminaryForSchools />
                    </div>
                    <div className="d-md-none p-1"></div>
                    <div className="col-sm-12 col-md-6">
                      <A2KeyForSchools />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="pt-3">
              <div className="row ">
                <div className="col text-center">
                  <Link
                    href="/"
                    className="btn btn-primary btn-lg"
                    role="button"
                    onClick={handleStartAgain}
                  >
                    Start Again
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
