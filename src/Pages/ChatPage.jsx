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

                setMessages((prevMessages) => {
                    if (!prevMessages) {
                        return [message];
                    } else {
                        console.log("Message received: ", message);
                        console.log(decode);
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
        const data = {
            room_id: room_id,
            user_id: decode.user_id
        }
        dispatch(UserMessages(data));
        dispatch(individualCourse(id))
    }, []);


    useEffect(() => {
        setMessages()
        const decode = jwtDecode(localStorage.getItem('authToken'))
        if (message?.messages?.length >= 1 && decode?.user_id) {
            setMessages(message?.messages)
        }
    }, [message.messages])




    //logic for sending the messages
    const handleSendMessage = async () => {
        if (socket && socket.readyState === socket.OPEN && input !== '') {
            await socket.send(JSON.stringify({ message: input, sender_id: decode?.user_id, sender_username: decode?.username }));
        } else {
            console.log("Websocket is not open for you to send a message");
        }
        await setInput('');

        // Using useRef to scroll back into view of the messages
        if (lastMessageRef.current) {
            await lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
                        title.mycourses.course ?
                            <>
                                {
                                    title?.mycourses.course.length >= 2 ?
                                        <>
                                            {
                                                title.mycourses.course.map((item) => {
                                                    return (
                                                        <div className='flex items-center justify-end'>
                                                            <p className=' font-bold text-2xl relative me-10'>{item.title}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </> :
                                        <div className='flex items-center justify-end'>
                                            <p className=' font-bold text-2xl relative me-10'>{title.mycourses.course.title}</p>
                                        </div>
                                }
                            </> : null
                    }
                </div>
            </div>
            <div>
                <div className="w-full h-[88vh] px-5 flex flex-col justify-between">
                    <div className="flex flex-col mt-5 overflow-x-auto scrollbar-none">
                        {
                            !message.isLoading && message.messages.length >= 0 ?
                                <>
                                    {
                                        messages?.length >= 1 ?
                                            <>
                                                {
                                                    messages?.map((item, index) => {
                                                        const messageRef = index === messages.length - 1 ? lastMessageRef : null;
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`flex ${item.senderId == decode.user_id || item.sender == decode.user_id ? 'justify-end' : 'justify-start'} mb-4`}
                                                                ref={messageRef}
                                                            >
                                                                <div
                                                                    className={`py-3 px-4 ${item.senderId == decode.user_id || item.sender == decode.user_id ? 'bg-gray-300 rounded-br-3xl rounded-tr-3xl rounded-tl-xl' : 'bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'}`}
                                                                >
                                                                    <h1 className='text-[8px] font-semibold'> {item.senderUsername || item.sender_username}</h1>
                                                                    {item.message}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </> : null
                                    }
                                </> :
                                <div class="flex justify-center items-center h-screen">
                                    <div class="rounded-full h-20 w-20 bg-blue-400 animate-ping"></div>
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
                            socket ?
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
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage
