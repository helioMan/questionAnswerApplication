import React, { useRef, useState } from 'react';
import './Quiz.css';
import QuizData from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(QuizData[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, answer) => {
        if (!lock) {
            if (question.answer === answer) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.answer - 1].current.classList.add("correct");
            }
        }
    }

    const next = () => {
        if (index === QuizData.length - 1) {
            setResult(true);
        } else if (lock) {
            setIndex(prev => prev + 1);
            setQuestion(QuizData[index + 1]);
            setLock(false);
            option_array.forEach(option => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
            });
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(QuizData[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <div className='container'>
            <h1>App Quiz</h1>

            {result ?
                <>
                    <h2>You Scored {score} out of {QuizData.length} ({((score / QuizData.length) * 100).toFixed(2)}%)</h2>
                    <button onClick={reset}>Reset</button>
                </>
                :
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div>
                        <div className="index">{index + 1} of {QuizData.length} questions</div>
                    </div>
                </>
            }
        </div>
    );
}

export default Quiz;
