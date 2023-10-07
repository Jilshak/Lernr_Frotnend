import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { individualCourse, updateProgress } from '../features/CourseSlice';
import jwtDecode from 'jwt-decode';

function CourseViewPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.courses);
  const access = jwtDecode(localStorage.getItem('authToken'));

  const [videoTime, setVideoTime] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    dispatch(individualCourse(id));
  }, [dispatch,id]);
  

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

  const [threshold1, setThreshold1] = useState(false)
  const [threshold2, setThreshold2] = useState(false)
  const [threshold3, setThreshold3] = useState(false)
  const [threshold4, setThreshold4] = useState(false)

  useEffect(() => {
    if (videoProgress >= 25 && !threshold1) {
      let credentials = {
        user: access.user_id,
        course_id: id,
        progress: 25
      }
      dispatch(updateProgress(credentials))
      setThreshold1(true)
    } else if (videoProgress >= 50 && videoProgress <= 55 && !threshold2) {
      let credentials = {
        user: access.user_id,
        course_id: id,
        progress: 50
      }
      dispatch(updateProgress(credentials))
      setThreshold2(true)
    } else if (videoProgress >= 75 && videoProgress <= 80 && !threshold3) {
      let credentials = {
        user: access.user_id,
        course_id: id,
        progress: 75
      }
      dispatch(updateProgress(credentials))
      setThreshold3(true)
    } else if (videoProgress >= 95 && videoProgress <= 100 && !threshold4) {
      let credentials = {
        user: access.user_id,
        course_id: id,
        progress: 100
      }
      dispatch(updateProgress(credentials))
      setThreshold4(true)
    }
  }, [videoProgress]);

  return (
    <div className='min-h-screen mx-[100px]'>
      {!video.isLoading && video.mycourses.length >= 1 ?
        <>
          <div className='relative top-28'>
            <video
              className='h-[550px] w-screen'
              controls
              onLoadedMetadata={handleMetadataLoaded}
            >
              <source src={video.mycourses[0].video} type="video/mp4" />
              <source src="video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div>
            Video progress: {videoProgress.toFixed(2)}%
          </div>
        </> : null
      }
    </div>
  );
}

export default CourseViewPage;
