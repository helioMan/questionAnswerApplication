import React, { useRef, useState } from 'react'
import './Quiz.css'
import QuizData from '../../assets/data'

const Quiz = () => {
    let[index, setIndex] = useState(0)
    let[question, setQuestion] = useState(QuizData[index])
    let [lock, setLock] = useState(false)
    let[score, setScore] = useState(0)

    let Option1 = useRef(null)
    let Option2 = useRef(null)
    let Option3 = useRef(null)
    let Option4 = useRef(null)
    let [result, setResult] = useState(false)

    let option_array = [Option1, Option2, Option3, Option4]

    const checkAns = (e, answer) => {
        if(lock === false)
        {
            if (question.answer === answer)
            {
            e.target.classList.add("correct")
            setLock(true)
            setScore(prev => prev + 1)
            }
        else
            {
            e.target.classList.add("wrong")
            setLock(true)
            option_array[question.answer-1].current.classList.add("correct")
            }
        }
        
    }

    const next = () => {
        if(index === QuizData.length - 1)
            {
                setResult(true)
                return 0
            }
        if(lock === true)
        {
            setIndex(++index);
            setQuestion(QuizData[index])
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setQuestion(QuizData[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

  return (
    <div className='container'>
      <h1>App Quiz</h1>
      <hr />
      {result?<></>:<><h2>{index+1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=>{checkAns(e, 1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e, 2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e, 3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e, 4)}}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>

      <div>
        <div className="index">{index + 1} of {QuizData.length} questions</div>
      </div></>}
      {result?<>
        <h2>You Scored {score} out of {QuizData.length}</h2>
      <button onClick={reset}>Reset</button>
      </>:<></>}
      
    </div>
  )
}

export default Quiz
