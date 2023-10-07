import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCategory, getCategories, getCourses } from '../../features/CourseSlice'
import bulb from '../../icons/bulb.png'

function AddCategoryPage() {

    const dispatch = useDispatch()
    const items = useSelector((state) => state.courses)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    //for toggleing the screen
    const [toggle, setToggle] = useState(false)
    const [displayToggle, setDisplayToggle] = useState(false)

    const [title, setTitle] = useState('')
    const [image, setImage] = useState()
    const [description, setDescription] = useState('')

    const handleAddCategory = async () => {
        await setToggle(true)
    }

    const updateImage = (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        setImage(formData);
    };


    const handleAddNewCateogory = async () => {

        const credentials = {
            title: title,
            image: await image.get('image'),
        }
        // await dispatch(AddCategory(credentials))
        clearfields()
    }

    const clearfields = () => {
        setTitle('')
        setImage('')
        setDescription('')
        setDisplayToggle(true)
    }

    const [category, setCategory] = useState()

    useEffect(() => {
        if (items.category.length >= 1) {
            setCategory(items.category)
        }
    }, [items.category])

    //Search option
    const [find, setFind] = useState();
    const searchItem = async (e) => {
        if (!find) {
            setFind(category);
        }
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === '') {
            setCategory(find);
        } else {
            setCategory(await category.filter((item) => {
                return item.title.toLowerCase().startsWith(searchTerm);
            }));
        }
    }

    return (
        <div className='min-h-screen mx-[50px]'>
            <div className='grid lg:grid-cols-9 w-full gap-10 mt-10'>
                <div className='lg:col-span-3 xs:col-span-1 rounded-xl bg-white min-h-[450px]'>
                    <div className='mx-12'>
                        <div className='relative mx-5 mt-5'>
                            <input onChange={(e) => searchItem(e)} type="text" placeholder="Search..." className="input input-sm input-bordered w-full relative" />
                        </div>
                        <div>
                            {
                                !items.isLoading && items.category.length >= 1 ?
                                    <>
                                        <ul className='mx-5 mt-3 max-h-[350px] overflow-y-auto scrollbar-none'>
                                            {
                                                category?.map((item) => {
                                                    return (
                                                        <li key={item.id} className='flex cursor-pointer items-center p-2 w-full my-5 rounded-lg bg-[#e8e8e8] hover:bg-[#bec0c2]'>
                                                            <h1>{item.title}</h1>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </> :
                                    <div class="flex justify-center relative top-44  h-screen">
                                        <div class="rounded-full h-12 w-12 bg-blue-400 animate-ping"></div>
                                    </div>
                            }
                        </div>
                        <div className='my-5'>
                            <button onClick={handleAddCategory} className="btn btn-md w-[310px] btn-outline mx-5">ADD CATEGORY</button>
                        </div>
                    </div>
                </div>

                {
                    !toggle ?
                        <>
                            <div className='lg:col-span-6 xs:col-span-1 bg-white w-full rounded-xl h-[500px] grid items-center justify-center my-auto'>
                                <img className='h-[150px] opacity-60 mx-auto' src={bulb} alt="" />
                                <h1 className='font-bold text-2xl relative bottom-32 mx-auto text-[#1F2937] opacity-60'>ADD A NEW CATEGORY</h1>
                            </div>
                        </> :
                        <div className='lg:col-span-6 xs:col-span-1 bg-white w-full rounded-xl h-[500px] flex flex-col '>
                            <div className='w-full flex justify-end relative right-3 top-2'>
                                <button onClick={() => setToggle(false)} className="btn btn-sm btn-circle btn-outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div className='relative '>
                                <h1 className='font-semibold text-xl mx-5 relative left-5 '>CATEGORY DETAILS</h1>
                                <div className='grid lg:grid-cols-2 mx-[40px] my-10'>
                                    <div className='grid relative bottom-5'>
                                        <small>Title</small>
                                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Title for Category" className="input input-bordered w-full max-w-sm" />
                                    </div>
                                    {
                                        !displayToggle ?
                                            <>
                                                <div className='grid xs:mt-5 lg:mt-0 relative bottom-5'>
                                                    <small>Image</small>
                                                    <input onChange={(e) => {
                                                        updateImage(e)
                                                    }} type="file" name='image' accept='image/*' id='image' className="file-input  file-input-bordered w-full " />
                                                </div>
                                            </> :
                                            <>
                                                <div className='grid xs:mt-5 lg:mt-0 relative bottom-5'>
                                                    <small>Image</small>
                                                    <input onChange={(e) => {
                                                        setDisplayToggle(false)
                                                        updateImage(e)
                                                    }} value={''} type="file" name='image' accept='image/*' id='image' className="file-input  file-input-bordered w-full " />
                                                </div>
                                            </>
                                    }
                                </div>
                                <div className='grid lg:h-[180px] xs:h-[100px] relative bottom-10 mx-[40px]'>
                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="textarea textarea-bordered" placeholder="Description of the Cateogry (optional...)"></textarea>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <button onClick={handleAddNewCateogory} className="btn font-bold btn-wide btn-outline">ADD</button>
                                </div>
                            </div>
                        </div>
                }
            </div>

            <div className='mt-10 h-[80px]'>

            </div>
        </div>
    )
}

export default AddCategoryPage
