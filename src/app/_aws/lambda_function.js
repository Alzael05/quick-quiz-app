import questions from "./question.mjs";

export const handler = async (event) => {
  const RESOURCE = event.resource;
  // const HTTP_METHOD = event.httpMethod;

  switch (RESOURCE) {
    case "/questions":
      let questions = getQuestion();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ questions }),
      };

    case "/check":
      let selectedAnswers = JSON.parse(event.body);

      let result = checkAnswers(selectedAnswers);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ result }),
      };
  }
};

function getQuestion() {
  // TODO: Update in the future to fetch from DB
  return questions.map(({ id, question, choices }) => {
    return {
      id,
      question,
      choices,
    };
  });
}

function checkAnswers(selectedAnswers) {
  let totalCorrectAnswers = 0;
  let result = [];

  for (let index = 0; index < questions.length; index++) {
    let { id, question, correct_answer } = questions[index];

    const selectedAnswer = selectedAnswers[id] || "No Answer";

    if (selectedAnswer === correct_answer) {
      totalCorrectAnswers++;
    }

    result.push({
      question,
      correct_answer,
      selected_answer: selectedAnswer,
    });
  }

  return { score: totalCorrectAnswers, result };
}
