import React, { useState } from 'react'

function AddQuizPage() {

  const [question, setQuestion] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [answer, setAnswer] = useState()

  const [allQuestion, setAllQuestion] = useState([])

  const clearValues = async () => {
    await setQuestion('')
    await setOption1('')
    await setOption2('')
    await setOption3('')
    await setOption4('')
  }

  const handleAddQuestion = async () => {
    const data = {
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      answer: answer
    }
    if (setAllQuestion != []) {
      setAllQuestion([...allQuestion, data])
    } else {
      setAllQuestion([data])
    }
    await clearValues()
  }

  const handleAddAllQuestions = async () => {
    
  }

  return (
    <div className='min-h-[91vh] mx-[50px]'>
      <div className='grid lg:grid-cols-2 gap-x-10 xs:gap-y-10 relative top-10 w-full'>
        <div className='bg-white lg:h-[350px] xs:h-[450px] w-full shadow-xl'>
          <h1 className='font-bold my-2 mx-5 text-[#3D3D3D] text-lg'>ADD QUESTIONS AND OPTIONS</h1>
          <div className='mx-5'>
            <div className='mt-5 w-full '>
              <textarea onChange={(e) => setQuestion(e.target.value)} value={question} placeholder="Question" className="textarea text-[14px] h-[80px] textarea-bordered textarea-xs w-full " ></textarea>
            </div>
          </div>
          <div className='mx-5'>
            <div className='mt-5  w-full grid lg:grid-cols-2 gap-y-4'>
              <div className='flex'>
                <input onClick={(e) => setAnswer(1)} value={1} type="radio" name={`radio-2`} className="radio radio-xs radio-success mt-2 mx-3" />
                <input onChange={(e) => setOption1(e.target.value)} value={option1} type="text" placeholder="option 1" className="input input-sm input-bordered w-full max-w-[250px]" />
              </div>
              <div className='flex'>
                <input onClick={(e) => setAnswer(2)} value={2} type="radio" name={`radio-2`} className="radio radio-xs radio-success mt-2 mx-3" />
                <input onChange={(e) => setOption2(e.target.value)} value={option2} type="text" placeholder="option 2" className="input input-sm input-bordered w-full max-w-[250px]" />
              </div>
              <div className='flex'>
                <input onClick={(e) => setAnswer(3)}  value={3} type="radio" name={`radio-2`} className="radio radio-xs radio-success mt-2 mx-3" />
                <input onChange={(e) => setOption3(e.target.value)} value={option3} type="text" placeholder="option 3" className="input input-sm input-bordered w-full max-w-[250px]" />
              </div>
              <div className='flex'>
                <input onClick={(e) => setAnswer(4)} value={4} type="radio" name={`radio-2`} className="radio radio-xs radio-success mt-2 mx-3" />
                <input onChange={(e) => setOption4(e.target.value)} value={option4} type="text" placeholder="option 4" className="input input-sm input-bordered w-full max-w-[250px]" />
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center my-10'>
            <button onClick={handleAddQuestion} className="btn btn-sm btn-wide btn-outline">ADD</button>
          </div>
        </div>
        <div className='bg-white min-h-[470px] relative  w-full shadow-xl'>
          <h1 className='font-bold my-2 mx-5 text-[#3D3D3D] text-lg'>ALL QUESTIONS AND ANSWERS</h1>
          <div className='mx-[30px] mt-5 max-h-[400px] my-10 overflow-y-auto'>
            {
              allQuestion ?
                <>
                  {
                    allQuestion.map((item, index) => {
                      return (
                        <div className='flex flex-col'>
                          <p>{index + 1}. {item.question}</p>
                          <div className='grid grid-cols-2 items-center justify-center w-full mt-5'>
                            <div className='flex items-center gap-x-3 mx-2'>
                              <p className={item.answer == 1 ? `text-green-300` : ``}>a) {item.option1}</p>
                            </div>
                            <div className='flex items-center gap-x-3 mx-2'>
                              <p className={item.answer == 2 ? `text-green-300` : ``}>b) {item.option2}</p>
                            </div>
                            <div className='flex items-center  gap-x-3 mx-2'>
                              <p className={item.answer == 3 ? `text-green-300 my-5` : `my-5`}>c) {item.option3}</p>
                            </div>
                            <div className='flex items-center gap-x-3 mx-2'>
                              <p className={item.answer == 4 ? `text-green-300` : ``}>d) {item.option4}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </> : null
            }
          </div>
          <div className='flex  absolute  w-full h-[30px] bottom-0 justify-center my-5'>
            <button className="btn btn-sm btn-wide relative btn-neutral">ADD ALL QUESTION</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuizPage
