import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCourseProgress, getLessons, individualCourse, updateOverallProgress, updateProgress } from '../features/CourseSlice';
import jwtDecode from 'jwt-decode';

function CourseViewPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.courses);
  const access = jwtDecode(localStorage.getItem('authToken'));

  const [videoTime, setVideoTime] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [selectVideo, setSelectedVideo] = useState()
  const [videoData, setVideoData] = useState()

  useEffect(() => {
    dispatch(individualCourse(id));
    dispatch(getLessons(id))
    const credentials = {
      course_id: id,
      user: access.user_id
    }
    dispatch(getCourseProgress(credentials))
  }, [dispatch, id]);


  useEffect(() => {
    if (video.lessons.length >= 1) {
      setVideoData(video.lessons)
    }
  }, [video.lessons])


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

  const [lessonId, setLessonId] = useState()

  useEffect(() => {
    if (videoData && videoData.length > 0) {
      setLessonId(videoData[0].lesson_id);
    }
  }, [videoData]);



  useEffect(() => {
    const overallUpdateFunction = async () => {
      console.log("This is the lesson id: ", lessonId)
      console.log("This is the videoData: ", videoData)
      const lesson = await videoData.find((item) => item.lesson_id == lessonId);
      console.log("This is the lesson: ", lesson)
      if (videoProgress == 100 && lesson.progress != 100) {
        let credential = {
          id: lessonId,
          progress: 100
        }
        let credential1 = {
          user: access.user_id,
          course_id: id,
          progress: (100 / videoData.length).toFixed(2)
        }
        await dispatch(updateProgress(credential))
        await dispatch(getLessons(id))
        await dispatch(updateOverallProgress(credential1))
      }
    }
    overallUpdateFunction()
  }, [videoProgress, lessonId])



  return (
    <>
      <div className='min-h-screen mx-[50px] mt-10'>
        {!video.isLoading && video.mycourses.course && video.lessons && videoData?.length >= 1 ?
          <div className='min-h-screen'>
            <div className='relative top-5 grid lg:grid-cols-9 gap-x-7'>
              <video key={selectVideo} className='h-[550px] lg:col-span-7 w-full hover:shadow-2xl' controls onLoadedMetadata={handleMetadataLoaded}>
                <source src={selectVideo ? selectVideo : (videoData[0]?.video_url ? videoData[0]?.video_url : video?.lessons[0]?.video_url)} type="video/mp4" />
                <source src="video.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <div className='lg:col-span-2 lg:my-0 xs:my-5  h-[550px] overflow-y-auto shadow-md hover:shadow-2xl bg-white relative'>
                <div className='flex mx-5 flex-col items-center max-h-[500px] justify-center my-5'>
                  <h1 className='font-semibold sticky top-0  text-lg text-[#4D4848]'>LESSONS</h1>
                  <div className='w-full max-h-[430px] min-h-[400px] scrollbar-thin my-2 overflow-y-auto'>
                    {videoData?.map((item, index) => (

                      <>
                        <button
                          onClick={async (e) => {
                            if (index === 0 || videoData[index - 1].progress == 100) {
                              await setSelectedVideo(item.video_url);
                              await setLessonId(item.lesson_id)
                            }
                          }}
                          key={item.id}
                          className={`w-full cursor-pointer mt-5 rounded-xl flex items-center justify-start h-[45px] bg-[#ececec] hover:bg-[#ddd] ${(index > 0 && videoData[index - 1].progress !== 100) ? 'cursor-not-allowed opacity-60' : ''
                            }`}
                          disabled={(index > 0 && videoData[index - 1].progress != 100)}
                        >
                          <div className='group grid items-center grid-cols-7'>
                            <span className='col-span-7 w-full relative '>
                              <p className='ms-3 truncate'>{index + 1}. {item.title}</p>
                              <div className="absolute hidden z-20 group-hover:block bg-gray-800 text-white text-xs py-1 px-2 mt-2 rounded-lg shadow-md whitespace-nowrap">
                                {item.title}
                              </div>
                            </span>
                          </div>

                        </button>
                      </>
                    ))}
                    {
                      video.progress == 100 ?
                        <>
                          <Link to={`/take_quiz/${id}`}>
                            <button className="btn absolute lg:left-5 xs:left-14 bottom-3 btn-sm btn-outline btn-wide">GET CERTIFICATE</button>
                          </Link>
                        </> :
                        <button disabled className="btn absolute lg:left-5 xs:left-14 bottom-3 btn-sm btn-outline btn-wide">GET CERTIFICATE</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div> : null
        }
      </div>
    </>
  );
}

export default CourseViewPage;
