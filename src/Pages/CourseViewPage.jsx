import React from 'react'
import { useParams } from 'react-router-dom'

function CourseViewPage() {

    const {id} = useParams()

  return (
    <div className='min-h-screen'>
      <h1>hello world</h1>
    </div>
  )
}

export default CourseViewPage
