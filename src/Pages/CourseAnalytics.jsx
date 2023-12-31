import React, { useEffect, useState } from 'react'
import { storage } from '../services/firebase'
import delete1 from '../icons/delete1.png'
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { courseAnalyticsProfit, courseAnalyticsRating, courseAnalyticsReviews, courseAnalyticsStudents } from '../features/ChartSlice'
import { addNewLessons, deleteCourse, deleteLesson, finishCourse, getLessons, individualCourse, updateProgress } from '../features/CourseSlice';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Barchart from '../Components/ChartComponents/Barchart'
import LineChart from '../Components/ChartComponents/LineChart'
import InstructorProfitChart from '../Components/ChartComponents/InstructorProfitChart'
import star from '../icons/star.png'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2';



function CourseAnalytics() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const video = useSelector((state) => state.courses);
  const access = jwtDecode(localStorage.getItem('authToken'));

  useEffect(() => {
    dispatch(individualCourse(id));
  }, [dispatch, id]);


  const updateVideoProgress = async () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      const progress = await (videoElement.currentTime / videoElement.duration) * 100;
      await setVideoProgress(progress);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateVideoProgress, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleMetadataLoaded = () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      setVideoTime(videoElement.duration);
    }
  };

  const analytics = useSelector((state) => state.chart)

  const [toggle, setToggle] = useState(1)


  useEffect(() => {
    dispatch(courseAnalyticsStudents(id))
    dispatch(courseAnalyticsReviews(id))
    dispatch(courseAnalyticsProfit(id))
    dispatch(courseAnalyticsRating(id))
    dispatch(getLessons(id))
  }, [id])

  //for storing the videos data
  const [videoData, setVideoData] = useState()
  const [selectVideo, setSelectedVideo] = useState()

  //video uploading states
  const [toggleVideoUpload, setToggleVideoUpload] = useState(false)
  const [title, setTitle] = useState('')
  const [video_url, setVideoUrl] = useState()

  useEffect(() => {
    setVideoData(video.lessons)
  }, [video.lessons, id,])

  useEffect(() => {
    if (video.lessons.length >= 1) {
      setVideoData(video.lessons)
    }
  }, [video.lessons])


  const [videoUpload, setVideoUpload] = useState(null)
  const [videoUploadButton, setVideoUploadButton] = useState(false)


  const handleVideoUpload = async () => {
    console.log("Its being called here")
    if (videoUpload == null) return
    const videoRef = ref(storage, `videos/user_id_${access.user_id}_${title != '' ? title : videoUpload.name}`)
    console.log("This is the videoref: ", videoRef)

    let timerInterval
    Swal.fire({
      title: 'HEY!!!',
      html: 'The video is being uploaded You will be informed once its done<b></b> milliseconds.',
      timer: 60000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

    await uploadBytes(videoRef, videoUpload);

    const videoURL = await getDownloadURL(videoRef);

    await setVideoUrl(videoURL);

    await Swal.fire({
      background: '#fff',
      icon: 'success',
      title: 'Video Uploaded!',
      text: 'The video uploading has been completed successfully',
    });

    setVideoUploadButton(false)
  }

  const handleAddLesson = async () => {
    const credentials = {
      title: title,
      course: id,
      video_url: video_url
    }
    if (title != '' && video_url != undefined) {
      await dispatch(addNewLessons(credentials))
      await dispatch(getLessons(id))
    } else {
      await Swal.fire({
        background: '#fff',
        icon: 'error',
        title: 'Field Missing!',
        text: 'One of the following field is missing!!',
      });
    }
    await setToggleVideoUpload(false)
  }

  //to handle the finish course
  const handleFinish = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to add any more lessons or add an quiz after this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Finish It!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(finishCourse(id))
        dispatch(getLessons(id))
        dispatch(individualCourse(id));
      }
    })
  }

  const deleteVideoByURL = async (videoUrl, lesson_id) => {
    try {
      if (videoData.length == 1) {

        const storage = getStorage()
        const deleteRef = ref(storage, videoUrl)

        const result = await Swal.fire({
          background: '#fff',
          icon: 'warning',
          title: 'Last video of the course!',
          text: 'This is the last video of the course if you delete this file then the entire course will be removed!!',
          showCancelButton: true,
          confirmButtonText: 'DELETE',
          cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
          await dispatch(deleteLesson(lesson_id))
          await dispatch(deleteCourse(id))
          await deleteObject(deleteRef)
          navigate('/add_course')
        }
      } else {
        const storage = getStorage()
        const deleteRef = ref(storage, videoUrl)
        console.log("Thsi is the lesson id from else block: ", lesson_id)
        console.log("Thsi is the  id from else block: ", id)
        await dispatch(deleteLesson(lesson_id))
        await dispatch(getLessons(parseInt(id)))
        // await deleteObject(deleteRef)
        await dispatch(individualCourse(parseInt(id)));
      }
    } catch (error) {
      console.error('Error deleting the video:', error);
    }
  };


  return (
    <>
      <div className='min-h-screen mx-[50px]'>
        {
          toggleVideoUpload ?
            <>
              <div className='absolute lg:left-[600px] bottom-24 h-[500px] w-[400px] shadow-2xl bg-[#fff] z-20'>
                <div className='flex items-center justify-center mt-5  '>
                  <h1 className='text-lg font-bold'>ADD NEW LESSON</h1>
                </div>
                <div className='mx-[30px] mt-8'>
                  <div className='my-4'>
                    <label className='text-xs'>Lesson Name</label>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Lesson title" className="input input-bordered w-full max-w-xs" />
                  </div>
                  <div >
                    <label className='text-xs'>Your Course id</label>
                    <input type="number" disabled placeholder={`Course Id: ${id}`} className="input disabled input-bordered w-full max-w-xs" />
                  </div>
                  <div className='my-4'>
                    <label className='text-xs'>Upload the video here</label>
                    <input onChange={(e) => {
                      setVideoUpload(e.target.files[0])
                      setVideoUploadButton(true)
                    }} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    {
                      videoUploadButton ?
                        <>
                          <div className='w-full flex items-center justify-center'>
                            <button onClick={(e) => {
                              handleVideoUpload()
                            }} className="btn btn-sm mt-3 btn-outline">Upload</button>
                          </div>
                        </> : null
                    }
                  </div>
                </div>
                <div className='h-full w-full bottom-0 '>
                  <div className='grid'>
                    {
                      title != '' && video_url != undefined ?
                        <>
                          <button onClick={(e) => handleAddLesson()} className="btn btn-sm w-[300px] btn-outline absolute bottom-16 left-14">ADD LESSON</button>
                        </> :
                        <button disabled className="btn btn-sm w-[300px] btn-outline absolute bottom-16 left-14">ADD LESSON</button>
                    }
                    <button onClick={(e) => setToggleVideoUpload(false)} className="btn btn-sm w-[300px] btn-outline absolute hover:bg-red-300 bottom-5 left-14">CANCEL</button>
                  </div>
                </div>
              </div>
            </> : null
        }
        <div className='mt-10'>
          <select onChange={(e) => setToggle(toggle == 1 ? 2 : 1)} className="select font-bold focus:outline-none text-[#4D4848] text-2xl w-full max-w-xs bg-[#D9D9D9]">
            <option className='text-lg' value={1}>COURSE ALANLYTICS</option>
            <option className='text-lg' value={2}>COURSE VIEW PAGE</option>
          </select>
        </div>
        {
          toggle == 1 ?
            <>
              <div className='grid lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-1 xs:grid-cols-1 mt-10 xs:gap-5'>
                {
                  !analytics.isLoading && analytics.ca_students ?
                    <>
                      <div className='lg:col-span-4 md:col-span-4  sm:col-span-1 xs:col-span-1 mx-5 bg-white h-[320px] shadow-2xl'>
                        <h1 className='font-semibold text-xl mx-4 my-2'>Students</h1>
                        <Barchart title={'Total No Of Students'} count={analytics.ca_students} />

                      </div>
                    </> : null
                }
                {
                  !analytics.isLoading && analytics.ca_students ?
                    <>
                      <div className='lg:col-span-4 md:col-span-4  sm:col-span-1 xs:col-span-1 mx-5 bg-white h-[320px] shadow-2xl'>
                        <h1 className='font-semibold text-xl mx-4 my-2'>Reviews</h1>
                        <LineChart title={'Reviews'} count={analytics.ca_review} />
                      </div>
                    </> : null
                }

                <div className='lg:col-span-2 md:col-span-2 sm:col-span-1 xs:col-span-1 mx-5 grid gap-y-5 h-[320px] '>
                  <div className='w-full bg-white shadow-2xl'>
                    <h1 className='font-semibold text-lg mx-4 my-4'>Total Watch Time</h1>
                  </div>
                  {
                    !analytics.isLoading ?
                      <>
                        <div className='w-full bg-white shadow-2xl'>
                          <h1 className='font-semibold text-lg mx-4 my-4'>Rating</h1>
                          <div className='flex items-center justify-start relative mx-3'>
                            <img className='h-14 mx-4' src={star} alt="" />
                            <h1 className='font-bold text-2xl'>{analytics.rating}</h1>
                          </div>
                        </div>
                      </> : null
                  }
                </div>
              </div>
              <div className='mt-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 '>
                <div className='mx-4 bg-white col-span-1 shadow-2xl '>
                  <h1 className='font-bold text-[#4D4848] text-xl mx-4 my-2'>Profit</h1>
                  <InstructorProfitChart title={'Profit'} count={analytics.ca_profit} />
                </div>

              </div>
            </> :
            <>
              <div className='min-h-screen '>
                {!video.isLoading && video.mycourses.course && video.lessons && videoData.length >= 1 ?
                  <div className='min-h-screen'>
                    <div className='relative top-5 grid lg:grid-cols-9 gap-x-7'>
                      <video key={selectVideo} className='h-[550px] lg:col-span-7 w-full hover:shadow-2xl' controls onLoadedMetadata={handleMetadataLoaded}>
                        <source src={selectVideo ? selectVideo : (videoData[0]?.video_url ? videoData[0]?.video_url : video?.lessons[0]?.video_url)} type="video/mp4" />
                        <source src="video.webm" type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                      <div className='lg:col-span-2  h-[550px] overflow-y-auto shadow-md hover:shadow-2xl bg-white relative'>
                        <div className='flex mx-5 flex-col items-center max-h-[500px] justify-center my-5'>
                          <h1 className='font-semibold sticky top-0  text-lg text-[#4D4848]'>LESSONS</h1>
                          <div className='w-full min-h-[400px] max-h-[390px] scrollbar-thin my-2 overflow-y-auto'>
                            {videoData?.map((item, index) => (

                              <>
                                <button
                                  onClick={async (e) => {
                                    await setSelectedVideo(item.video_url);
                                  }}
                                  key={item.id}
                                  className={`w-full cursor-pointer mt-5 rounded-xl flex items-center justify-start h-[45px] bg-[#ececec] hover:bg-[#ddd] `}>
                                  <div className='group grid items-center grid-cols-7'>
                                    <span className='col-span-6 w-full relative flex items-center justify-around'>
                                      <div className='grid grid-cols-8 grid-flow-row justify-start items-center w-[300px]'>
                                        <div className='col-span-7 flex'>
                                          <p className='ms-3 truncate  relative'>{index + 1}. {item.title}</p>
                                        </div>
                                        {!video.mycourses.course.finished ? <img onClick={(e) => deleteVideoByURL(item.video_url, item.id)} className='h-4 relative lg:left-8 xs:left-8 z-40 cursor-pointer hover:bg-[#d59e9e] w-4 rounded-full col-span-1' src={delete1} alt="" /> : null}
                                      </div>
                                    </span>
                                  </div>
                                </button>
                              </>
                            ))}
                          </div>


                        </div>
                        {
                          video.mycourses.course.finished ?
                            <>
                              <div className='flex items-center justify-center absolute bottom-2 lg:mx-4 xs:mx-[75px]'>
                                <button className="btn btn-disabled btn-sm btn-wide btn-outline  ">CREATE A QUIZ</button>
                              </div>
                              <div className='flex items-center justify-center relative bottom-4'>
                                <button onClick={(e) => setToggleVideoUpload(true)} className="btn btn-disabled btn-sm btn-outline ">ADD NEW LESSON</button>
                                <button onClick={(e) => handleFinish()} className="btn w-[100px] btn-disabled btn-sm btn-outline mx-2">FINISH</button>
                              </div>
                            </> :
                            <div>
                              <div className='flex items-center justify-center absolute bottom-2 lg:mx-4 xs:mx-[75px]'>
                                <Link to={`/quiz/${id}`}>
                                  <button className="btn btn-sm btn-wide btn-outline  ">CREATE A QUIZ</button>
                                </Link>
                              </div>
                              <div className='flex items-center justify-center relative bottom-4'>
                                <button onClick={(e) => setToggleVideoUpload(true)} className="btn  btn-sm btn-outline ">ADD NEW LESSON</button>
                                <button onClick={(e) => handleFinish()} className="btn w-[100px] btn-sm btn-outline mx-2">FINISH</button>
                              </div>
                            </div>
                        }

                      </div>
                    </div>
                  </div> : null
                }
              </div>
            </>
        }
      </div>
      <div className='mt-14'>
        <Footer />
      </div>
    </>
  )
}

export default CourseAnalytics
