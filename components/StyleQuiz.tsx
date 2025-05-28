"use client";

import { Button } from "@/components/ui/button";
import { questions } from "@/constants";
import { useState } from "react";
import { MdOutlineLibraryAdd, MdOutlineLibraryAddCheck } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateUser } from "@/actions/auth";
import { useRouter } from "next/navigation";

type Answer = {
  index: number;
  answer: string;
  text: string;
};

const StyleQuiz = () => {
  const router = useRouter();

  const [styleResult, setStyleResult] = useState<string>("");
  const [answersArr, setAnswersArr] = useState<Answer[]>([]);
  const [styleObj, setStyleObj] = useState({});
  const [addToDashboard, setAddToDashboard] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const handleAnswerClick = (
    questionIndex: number,
    answerValue: string,
    textValue: string
  ) => {
    const answer: Answer = {
      index: questionIndex,
      answer: answerValue,
      text: textValue,
    };

    // The first answer is not being added to the answers array annd is then not counted in the styleObj so the result is not always correct. need to fix this

    setAnswersArr((prevAnswersArr) => {
      const existingAnswerIndex = prevAnswersArr.findIndex(
        (item) => item.index === questionIndex
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswersArr];
        updatedAnswers[existingAnswerIndex].answer = answerValue;
        updatedAnswers[existingAnswerIndex].text = textValue;
        return updatedAnswers;
      } else {
        return [...prevAnswersArr, answer];
      }
    });
    // Update the selected answer for the specific question
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionIndex]: textValue,
    }));

    // Debugging logs
    console.log("Selected Answers:", selectedAnswers);
    console.log("Answers Array:", answersArr);

    handleFindStyle();

    // Check if the answer already exists
    // const existingAnswerIndex = answersArr.findIndex(
    //   (item) => item.index === questionIndex
    // );

    // if (existingAnswerIndex !== -1) {
    //   // Update existing answer
    //   const updatedAnswers = [...answersArr];
    //   updatedAnswers[existingAnswerIndex].answer = answerValue;
    //   updatedAnswers[existingAnswerIndex].text = textValue;
    //   setAnswersArr(updatedAnswers);
    // } else {
    //   // Add new answer
    //   setAnswersArr([...answersArr, answer]);
    // }
    // console.log("Answers array", answersArr);
    // // Update the selected answer for the specific question
    // setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: textValue }));

    // console.log("Selected Answers", selectedAnswers);

    // handleFindStyle();
  };

  const handleFindStyle = () => {
    const style = {
      Boho: 0,
      Chic: 0,
      Classic: 0,
      Edgy: 0,
      Sporty: 0,
    };

    answersArr.forEach((answerObj) => {
      const userAnswerValue = answerObj.answer;

      if (userAnswerValue === "boho") {
        style.Boho += 1;
      } else if (userAnswerValue === "chic") {
        style.Chic += 1;
      } else if (userAnswerValue === "classic") {
        style.Classic += 1;
      } else if (userAnswerValue === "edgy") {
        style.Edgy += 1;
      } else if (userAnswerValue === "sporty") {
        style.Sporty += 1;
      } else {
        return userAnswerValue;
      }

      setStyleObj(style);
    });
  };

  function getTheResult(obj: { [key: string]: number }) {
    let highestCategory = 0;
    let winningCategory = "";

    for (const style in obj) {
      if (obj[style] > highestCategory) {
        highestCategory = obj[style];
        winningCategory = style;
      }
    }
    return setStyleResult(winningCategory);
  }

  // save style to database
  const handleSaveStyle = async () => {
    try {
      const result = await updateUser({ fashionStyle: styleResult });
      setAddToDashboard((prevAddToDashboard) => !prevAddToDashboard);
      console.log("Update result:", result);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error saving to profile: ", error);
    }
  };

  // const saveStyleToProfile = async () => {
  //   console.log(styleResult);
  //   try {
  //     const fashionResults = styleResult;
  //     console.log(styleResult);
  //     // const fashionResults = "Edgy";

  //     if (!fashionResults) {
  //       throw new Error("Invalid data");
  //     }
  //     const result = await updateUser({
  //       fashionStyle: fashionResults,
  //     });
  //     console.log("Update userStyle:", result);
  //     console.log("Saving to profile:", fashionResults);
  //   } catch (error) {
  //     console.log("Error saving to profile: ", error);
  //   }
  //   router.push("/dashboard");
  // };

  function handleStartOver() {
    setStyleObj({});
    setStyleResult("");
    setSelectedAnswers({});
    setAnswersArr([]);
  }

  return (
    <div className="max-h-screen">
      <div id="quiz">
        {questions.map((option, i) => (
          <div key={i}>
            <p className="mb-2 mt-8 font-semibold">
              <span>{option.id}.</span>
              {option.text}
            </p>
            <div className="">
              {option.answers.map((answer, j) => (
                <p
                  className={`${
                    selectedAnswers[i] === answer.text
                      ? "bg-red-300"
                      : "bg-white"
                  } my-2 ml-4 flex  cursor-pointer rounded border-2 border-black px-2 py-1 text-center text-sm shadow hover:bg-red-300 hover:shadow-lg hover:transition-all focus:outline-none focus:ring-2`}
                  key={j}
                  onClick={() =>
                    handleAnswerClick(i, answer.value, answer.text)
                  }
                >
                  {answer.text}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div className="mx-auto mt-8 flex w-full items-center gap-4 md:mx-0 md:w-1/2 md:flex-row">
          <Button
            size="lg"
            className="rounded-none border-4 border-black bg-red-300  text-black hover:bg-white hover:text-black cursor-pointer"
            onClick={() => {
              getTheResult(styleObj);
            }}
          >
            Get Your Style
          </Button>

          <Button
            variant="link"
            className=" md:ml-2 cursor-pointer"
            onClick={handleStartOver}
          >
            Start over
          </Button>
        </div>
      </div>
      {/* Display the result */}
      <div className="mt-12 h-[300px] w-full">
        {styleResult && (
          <div id="result" className="flex h-24 w-full items-center gap-4">
            <h2 className="text-2xl font-semibold">
              Your Fashion Style is: <span>{styleResult}</span>
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleSaveStyle}>
                  {addToDashboard ? (
                    <MdOutlineLibraryAddCheck />
                  ) : (
                    <MdOutlineLibraryAdd />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleQuiz;
