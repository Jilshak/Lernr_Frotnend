import React, { useEffect, useRef, useState } from 'react'
import Footer from '../Components/Footer'
import jwtDecode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { AddNewCourse, getCategories } from '../features/CourseSlice'
import Swal from 'sweetalert2'
import { storage } from '../services/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

function AddCoursePage() {

  //redux
  const dispatch = useDispatch()
  const categoryAvailable = useSelector((state) => state.courses)

  const [toggle, setToggle] = useState(false)

  //TOKEN
  const access = jwtDecode(localStorage.getItem('authToken'))

  //STATES
  const [title, setTitle] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const [course_length, setCourseLength] = useState()
  const [minor_description, setMinorDescription] = useState()
  const [requirements, setRequirements] = useState()
  const [category, setCategory] = useState()
  const [whatyoulearn, setWhatYouLearn] = useState()
  const [video_link, setVideoLink] = useState('')

  //display
  const [displayThumbanil, SetDisplayThumbnail] = useState()
  const [toggleField, setToggleField] = useState(false)

  //for video
  const [videoUpload, setVideoUpload] = useState(null)


  const handleVideoUpload = async () => {
    if (videoUpload == null) return
    const videoRef = ref(storage, `videos/user_id_${access.user_id}_${videoUpload.name}`)

    let timerInterval
    Swal.fire({
      title: 'HEY!!!',
      html: 'The video is being uploaded You will be informed once its done<br> </br> </b> milliseconds.',
      timer: 5000,
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

    await setVideoLink(videoURL);

    await Swal.fire({
      background: '#fff',
      icon: 'success',
      title: 'Video Uploaded!',
      text: 'The video uploading has been completed successfully',
    });
  }

  const updateThumbnail = async (e) => {
    const formData = new FormData();
    formData.append('thumbnail_image', e.target.files[0]);
    await setThumbnail(formData);
  };

  const showDisplayThumbanil = (e) => {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      SetDisplayThumbnail(event.target.result)
    }
    reader.readAsDataURL(selectedFile)
  }


  const AddCourse = async (e) => {
    if (title && thumbnail && description && price && course_length && requirements && category && whatyoulearn) {
      const credentials = {
        course_by: access.user_id,
        title: title,
        description: description,
        price: price,
        thumbnail: await thumbnail.get('thumbnail_image'),
        course_length: course_length,
        minor_description: minor_description,
        requirements: requirements,
        what_you_learn: whatyoulearn,
        category: category,
        video: video_link
      };
      console.log("This is the credentials: ", credentials)
      await dispatch(AddNewCourse(credentials));
      await setToggleField(true)
      await removeState()
    } else {
      await Swal.fire({
        background: '#fff',
        icon: 'error',
        title: 'FAILED!',
        text: "Some of the fields are missing please add them all and try again",
      });
    }
  };

  const removeState = async () => {
    setCategory('')
    setCourseLength('')
    setThumbnail(null)
    setCourseLength('')
    setDescription('')
    setPrice('')
    setRequirements('')
    setTitle('')
    setVideoLink('')
    setWhatYouLearn('')
    setMinorDescription('')
    showDisplayThumbanil(null)
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <>
      {
        !categoryAvailable.isLoading && categoryAvailable.category.length >= 1 ?
          <>
            <div className='min-h-screen '>
              <div className='mx-[50px] min-h-screen'>
                <h1 className='mt-[50px] text-[#3D3D3D] text-2xl font-bold'>ADD COURSE</h1>
                <div className='bg-white rounded-xl min-h-[340px] mt-[50px] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'>
                  <div className='my-5 mx-10'>
                    {
                      !toggleField ?
                        <>
                          <div className='bg-[#D9D9D9]  h-[210px] rounded-lg'>
                            {displayThumbanil && <img className='object-cover w-full rounded-lg h-[210px]' src={displayThumbanil} alt="" />}
                          </div>
                          <div className=' h-[50px] my-5 rounded-lg'>
                            <input onChange={(e) => {
                              updateThumbnail(e)
                              showDisplayThumbanil(e)
                            }} type="file" name='thumbnail_image' accept='image/*' id='thumbnail_image' className="file-input bg-[#D9D9D9] file-input-bordered w-full " />
                          </div>
                        </> :
                        <>
                          <div className='bg-[#D9D9D9]  h-[210px] rounded-lg'>
                            
                          </div>
                          <div className=' h-[50px] my-5 rounded-lg'>
                            <input onChange={(e) => {
                              setToggleField(false)
                              showDisplayThumbanil(e)
                            }} value={''} placeholder='hello world' type="file" name='thumbnail_image' accept='image/*' id='thumbnail_image' className="file-input bg-[#D9D9D9] file-input-bordered w-full " />
                          </div>
                        </>
                    }
                  </div>
                  <div className='my-5 mx-10'>
                    <p className='text-sm'>Title</p>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Course Title" className="input input-md mb-5 input-bordered w-full bg-[#D9D9D9]" />
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Course Description" className="textarea bg-[#D9D9D9] text-sm textarea-lg h-[190px] textarea-bordered  w-full " ></textarea>
                  </div>
                  <div className='my-5 mx-10'>
                    <div className='bg-[#D9D9D9] h-[50px] mb-5 rounded-lg flex'>
                      <input onChange={(e) => setCourseLength(e.target.value)} value={course_length} type="number" placeholder="Course Length (hr)" className="input text-sm w-full h-[30px] my-auto mx-2" />
                      <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="Price" className="input text-sm w-full h-[30px] my-auto mx-2" />

                    </div>
                    <textarea onChange={(e) => setWhatYouLearn(e.target.value)} value={whatyoulearn} placeholder="What you'll learn..." className="textarea bg-[#D9D9D9]  text-sm textarea-lg h-[90px] mb-4 textarea-bordered  w-full " ></textarea>
                    <textarea onChange={(e) => setRequirements(e.target.value)} value={requirements} placeholder="Prior Requirements if any" className="textarea bg-[#D9D9D9]  text-sm textarea-lg h-[90px] mb-4 textarea-bordered  w-full " ></textarea>
                  </div>
                </div>

                <div className=' grid lg:grid-cols-2 xs:grid-cols-1 mt-10 w-full gap-x-10 xs:gap-y-10'>
                  <div className='bg-[#fff]  w-full h-[350px]'>
                    <h1 className='text-xl font-bold text-[#4D4848] my-6 mx-[30px]'>ADDITIONAL</h1>
                    <div className='mx-[30px]'>
                      <select onChange={(e) => setCategory(e.target.value)} value={category} className="select select-bordered w-full max-w-sm bg-[#D9D9D9]">
                        <option disabled selected>SELECT CATEGORY</option>
                        {
                          !categoryAvailable.isLoading && categoryAvailable.category ?
                            <>
                              {
                                categoryAvailable.category.map((item) => {
                                  return (
                                    <option key={item.id} value={item.id}>{item.title}</option>
                                  )
                                })
                              }
                            </> : null
                        }
                      </select>

                      <textarea onChange={(e) => setMinorDescription(e.target.value)} value={minor_description} placeholder="Minor Description..." className="textarea bg-[#D9D9D9] mt-10 text-sm textarea-lg h-[130px] textarea-bordered  w-full " ></textarea>
                    </div>
                  </div>
                  <div className='bg-[#403F3F]  w-full h-[350px] flex flex-col items-center justify-center'>
                    <input onChange={(e) => {
                      setVideoUpload(e.target.files[0])
                      setToggle(true)
                    }} value={video_link} type="file" className="file-input w-full max-w-xs " />
                    {
                      toggle ?
                        <>
                          <button className="btn glass mt-5" onClick={(e) => {
                            handleVideoUpload()
                            setToggle(false)
                          }}>Upload</button>
                        </> : null
                    }
                  </div>
                </div>
                <div className='flex items-center justify-center my-14'>
                  <button onClick={AddCourse} className="btn btn-wide bg-[#A435F0] hover:bg-[#6e3892] text-white font-semibold">UPLOAD AND PUBLISH</button>
                </div>
              </div>
              <div>
                <Footer />
              </div>
            </div>
          </> : null
      }
    </>
  )
}

export default AddCoursePage
