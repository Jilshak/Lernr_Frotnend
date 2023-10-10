import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLessons, individualCourse, updateProgress } from '../features/CourseSlice';
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
    if (videoProgress == 100) {
      let credential = {
        id: lessonId,
        progress: 100
      }
      dispatch(updateProgress(credential))
      dispatch(getLessons(id))
    }
  }, [videoProgress])



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
              <div className='lg:col-span-2  h-[550px] overflow-y-auto shadow-md hover:shadow-2xl bg-white relative'>
                <div className='flex mx-5 flex-col items-center max-h-[500px] justify-center my-5'>
                  <h1 className='font-semibold sticky top-0  text-lg text-[#4D4848]'>LESSONS</h1>
                  <div className='w-full max-h-[430px] scrollbar-thin my-2 overflow-y-auto'>
                    {videoData?.map((item, index) => (

                      <>
                        <button
                          onClick={async (e) => {
                            if (index === 0 || videoData[index - 1].progress === 100) {
                              await setSelectedVideo(item.video_url);
                              await setLessonId(item.lesson_id)
                            }
                          }}
                          key={item.id}
                          className={`w-full cursor-pointer mt-5 rounded-xl flex items-center justify-start h-[45px] bg-[#ececec] hover:bg-[#ddd] ${(index > 0 && videoData[index - 1].progress !== 100) ? 'cursor-not-allowed opacity-60' : ''
                            }`}
                          disabled={(index > 0 && videoData[index - 1].progress !== 100)}
                        >
                          <div className='grid items-center grid-cols-7'>
                            <span className='col-span-6 w-full'>
                              <p className='ms-3'>{index + 1}. {item.title}</p>
                            </span>
                          </div>
                        </button>
                      </>
                    ))}
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
