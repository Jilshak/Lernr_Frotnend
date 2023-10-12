import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../features/CourseSlice';
import { useParams } from 'react-router-dom';

function TakeQuizPage() {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.courses);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getQuiz(id));
    }, []);


    const [quizQuestions, setQuizQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
        if (questions.quiz.length >= 1) {
            setQuizQuestions(questions.quiz);
            setSelectedAnswers(new Array(questions.quiz.length).fill(null));
        }
    }, [questions.quiz]);


    const handleAnswerSelection = (questionIndex, answerIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(newSelectedAnswers);
    };


    const handleSubmitQuiz = () => {
        const score = quizQuestions.reduce((totalScore, question, index) => {
            return totalScore + (selectedAnswers[index] === question.correct_anwer ? 1 : 0);
        }, 0);
        alert(`Your score: ${score}/${quizQuestions.length}`);
    };

    return (
        <div className="min-h-screen flex justify-center mt-10">
            <div className="lg:w-3/5 xs:w-full h-[600px] relative shadow-xl hover:shadow-2xl bg-white">
                <div className="flex items-center justify-center">
                    <h1 className="my-5 text-xl font-bold text-[#4D4848]">QUESTIONS</h1>
                </div>
                <div className="overflow-y-auto scrollbar-none h-[500px] mx-[30px]">
                    {quizQuestions && quizQuestions.length >= 1 && quizQuestions
                        ? quizQuestions.map((item, index) => (
                            <div className="flex flex-col" key={index}>
                                <p className="font-semibold">
                                    {index + 1}. {item.question}
                                </p>
                                <div className="grid grid-cols-2 items-center justify-center w-full mt-5">
                                    {["a", "b", "c", "d"].map((letter, answerIndex) => (
                                        <div className="flex items-center gap-x-3 mx-2" key={answerIndex}>
                                            <input
                                                type="radio"
                                                name={`radio-${index}`}
                                                className="radio radio-xs radio-success"
                                                value={answerIndex}
                                                onChange={() => handleAnswerSelection(index, answerIndex)}
                                                checked={selectedAnswers[index] === answerIndex}
                                            />
                                            <p className={selectedAnswers[index] === answerIndex ? "text-green-300" : ""}>
                                                {letter}) {item["option" + (answerIndex + 1)]}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                        : null}
                </div>
                <div className="bg-white h-[70px] flex items-center justify-center">
                    <button onClick={handleSubmitQuiz} className="btn btn-wide btn-outline btn-sm">
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TakeQuizPage;
