import jwtDecode from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import send from '../icons/send.png'
import leftarrow_copy from '../icons/leftarrow_copy.png'
import { base } from '../services/Axios';
import { UserMessages } from '../features/ChatSlice';
import { individualCourse } from '../features/CourseSlice';




function ChatPage() {


    //jwt decoding
    let access = localStorage.getItem("authToken")
    let decode = jwtDecode(access)

    //scroll to the last message send
    const lastMessageRef = useRef(null);

    //states for the handling of the functions
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState()
    const [socket, setSocket] = useState()

    //redux tools
    const dispatch = useDispatch()
    const message = useSelector((state) => (state.chat))
    const title = useSelector((state) => state.courses)

    //these are the user id required to create the chat_room id
    //the chat room id will look somethin like this : group_id
    const { id } = useParams()

    //setting up the room id and credentials
    const credential = id
    const room_id = `group_${credential}`

    //back button functionality
    const navigate = useNavigate()
    const backButton = async () => {
        await navigate(-1)
        socket.close()
    }


    useEffect(() => {
        if (socket) {

            socket.onmessage = async (event) => {
                const message = await JSON.parse(event.data);

                setMessages(prevMessages => {
                    if (!prevMessages) {
                        return [message];
                    } else {
                        console.log("Message received: ", message)
                        console.log(decode)
                        return [...prevMessages, message];
                    }
                });
            };
        }
    }, [socket]);


    useEffect(() => {
        let credential = id
        let room_id = `group_${credential}`
        let retryAttempts = 0;
        const maxRetries = 3;
        const createSocket = async () => {
            try {
                const request = await new WebSocket(`${base}/ws/chat/${credential}/`)
                request.onopen = async () => {
                    await setSocket(request);
                }
                request.onclose = (event) => {
                    if (event.code === 1006 && retryAttempts < maxRetries) {
                        retryAttempts++;
                        setTimeout(createSocket, 1000);
                    } else {
                        console.log("WebSocket connection closed.");
                    }
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        createSocket();
        dispatch(UserMessages(room_id));
        dispatch(individualCourse(id))
    }, []);


    useEffect(() => {
        const decode = jwtDecode(localStorage.getItem('authToken'))
        if (message?.messages?.length >= 1 && decode?.user_id) {
            setMessages(message?.messages)
        }
    }, [message.messages])




    //logic for sending the messages
    const handleSendMessage = async () => {
        if (socket && socket.readyState === socket.OPEN && input !== '') {
            await socket.send(JSON.stringify({ message: input, sender_username: decode?.user_id }));
        } else {
            console.log("Websocket is not open for you to send message")
        }
        await setInput('')


        //using use ref to scroll back into view of the messages
        if (lastMessageRef.current) {
            await lastMessageRef.current.scrollIntoView({ behavior: 'smooth', target: lastMessageRef.current });
        }
    };



    return (
        <div className='h-screen w-screen'>
            <div className='h-16 bg-[#fff] flex items-center'>
                <div onClick={backButton} className='hover:bg-[#D9D9D9] z-50 cursor-pointer ms-5 h-9 w-9 flex items-center justify-center rounded-full'>
                    <img className='h-5' src={leftarrow_copy} alt="" />
                </div>
                <div className='absolute w-full right-0'>
                    {
                        title.mycourses && title.mycourses.length >= 1 ?
                            <>
                                {
                                    title?.mycourses.map((item) => {
                                        return (
                                            <div className='flex items-center justify-end'>
                                                <p className=' font-bold text-2xl relative me-10'>{item.title}</p>
                                                
                                            </div>
                                        )
                                    })
                                }
                            </> : null
                    }
                </div>
            </div>
            <div>
                <div className="w-full h-[88vh] px-5 flex flex-col justify-between">
                    <div className="flex flex-col mt-5 overflow-x-auto scrollbar-none">
                        {
                            !message.isLoading && message.messages.length >= 1 ?
                                <>
                                    {
                                        messages?.map((item, index) => {
                                            const messageRef = index === messages.length - 1 ? lastMessageRef : null;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex ${item.senderUsername == decode.user_id || item.sender == decode.user_id ? 'justify-end' : 'justify-start'} mb-4`}
                                                    ref={messageRef}
                                                >
                                                    <div
                                                        className={`py-3 px-4 ${item.senderUsername == decode.user_id || item.sender == decode.user_id ? 'bg-gray-300 rounded-br-3xl rounded-tr-3xl rounded-tl-xl' : 'bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'}`}
                                                    >
                                                        {item.message}
                                                    </div>
                                                    {
                                                        decode.user_id == item.sender || item.senderUsername == decode.user_id ?
                                                            <>
                                                                
                                                            </> :
                                                            <div className='rounded-full h-8 w-8 bg-white mx-2'>
                                                                <small className='flex items-center justify-center mt-1'>
                                                                    {item.sender || item.senderUsername}
                                                                </small>
                                                            </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </> :
                                <div className='flex items-center justify-center h-screen'>
                                    <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
                                </div>
                        }
                    </div>
                    <div className="py-5 flex relative lg:mx-[300px] md:mx-[200px]">
                        <input
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full min-w-[350px] bg-[#ffff] text-black pl-6 outline-none py-3  px-3 rounded-s-xl"
                            type="text"
                            placeholder="type your message here..."
                            value={input}
                        />
                        {
                            // socket ?
                            <>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSendMessage()
                                    }}
                                    className="bg-[#fff] hover:bg-[#b6b6b6]  text-white px-5 me-0 relative right-0 py-3 rounded-e-lg"
                                >
                                    <img className='h-5 min-w-[15px]' src={send} alt="" />
                                </button>
                            </>
                            // : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage
