import React, { useState, useEffect, useRef } from 'react';
import { openGameRoute, userDetailsRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { createGameRoute, deleteGameRoute } from '../../utils/APIRoutes';
import socket from "../../utils/Socket";
import 'animate.css';
import { Link, useNavigate, useParams } from 'react-router-dom';


var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'PM' : 'AM';

// Convert hours from 24-hour format to 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // The hour '0' should be '12' in 12-hour format
// Pad single digit hours and minutes with leading zeros
hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;
var current_time = hours + ':' + minutes + ' ' + ampm;




function Chat() {

  const navigate = useNavigate();

  let userId = JSON.parse(localStorage.getItem("user"))

  const [showModal, setShowModal] = useState(false);
  const [data,setData] = useState([])

  let param = useParams();

    async function fetchUserDetails(){
    try{
        let response = await axios.get(userDetailsRoute + `/${param.id}`)
        if(response.data.status){
        setData(response.data.data) 
        }
    }catch(e){
        console.log(e)
    }
    }


        const [chatMessages, setChatMessages] = useState([]);
        const [message, setMessage] = useState("");
        const [user] = useState(JSON.parse(localStorage.getItem("user")));
        const chatContainerRef = useRef(null);


        useEffect(() => {
            fetchUserDetails();
        // Emit join-room event when the socket connection is established
        socket.emit("join-room", (localStorage.getItem("room")) || 1);
        // socket.emit("send-message", {
        //     user: user.name,
        //     picture: user.profile || "https://avatar.iran.liara.run/username?username=Aman+Sharma",
        //     message: user.name + ` has joined the chat room ${(localStorage.getItem("room"))}`,
        //     time: current_time,
        //     room: (localStorage.getItem("room"))
        // });

        socket.on("receive-message", (data) => {

            setChatMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on("disconnect", () => {
            socket.emit("send-message", {
            user: user.name,
            picture: user.profile || "https://avatar.iran.liara.run/username?username=Aman+Sharma",
            message: user.name + " has left the chat",
            time: current_time,
            room: (localStorage.getItem("room"))
            });
        });

        return () => {
            // Unsubscribe from socket events here if needed
            // Note: It's generally not necessary to manually disconnect the socket here,
            // as it will be disconnected automatically when the component unmounts.
        };
        }, []);


        useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        }, [chatMessages]);

        const sendMessage = () => {
          socket.emit("send-message", {
              user: user.name,
              picture: user.profile || "https://avatar.iran.liara.run/username?username=Aman+Sharma",
              message: message,
              time: current_time,
              room: (localStorage.getItem("room"))
          });
          setMessage("");
        };


  return (
    <>

    <div className='h-screen p-5'>

    <div className='flex justify-between mb-3'>                   
        
    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => (navigate("/"))}  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
        
     <p className='text-center font-semibold text-black mb-6'>Chat</p>

     <p className='text-center font-semibold text-black mb-6'></p>
      
        
    </div>  
      <div>
        <div className='flex justify-between items-center mb-4'>
        <div className='flex justify-center items-center gap-2'>
            <div>
              <img className='size-12' src={data && data.profile} alt="" />
            </div>
            <div>
              <p className='text-black font-semibold'>{data && data.name}</p>
              <p className={`text-sm font-semibold ${data && data.isOnline ? "text-rose-600" : "text-gray-500"} `}>{data && data.isOnline ? "Online..." : data.lastSeen}</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>

      
        <div className="flex justify-center mt-5">
          <div className="rounded-[18px] w-full">
            <div>
              <div
                ref={chatContainerRef}
                id="chat"
                className="xl:h-[430px] h-[540px] overflow-y-auto"
              >
                {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 mb-2 ${
                        message.user === user.name
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {/* {message.user !== user.name && (
                        <img
                          src={message.picture}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                      )} */}
                      <div
                        className={`${
                          message.user === user.name
                            ? "bg-orange-100 text-right"
                            : "bg-gray-100 text-left"
                        } p-2 rounded-lg`}
                      >
                        <div>
                            {message.message.length > 20 ? (
                              <>
                                <p className='text-[12px]'>{message.message}</p>
                                <p className="text-[10px] text-gray-500">{message.time}</p>
                              </>
                            ) : (
                              <p className='text-[12px]'>
                                {message.message}{" "}
                                <span className="text-[10px] text-gray-500">{message.time}</span>
                              </p>
                            )}
                          </div>

                         {/* Add time here */}
                      </div>
                      {/* {message.user === user.name && (
                        <img
                          src={message.picture}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                      )} */}
                    </div>
                  ))}

              </div>
              <div className="flex justify-center items-center gap-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}

                  placeholder="Type a message..."
                  className="w-full border px-6 py-2 border-gray-600 rounded-xl p-2 focus:outline-none"
                />
                <div>
                </div>
                <button
                  type="button"
                  onClick={sendMessage}
                  className="bg-rose-600 text-white  px-3 py-2 rounded-xl focus:outline-none hover:bg-rose-600 cursor-pointer active:bg-orange-800 active:text-slate-300 focus-visible:outline-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 flex gap-2 items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                  
                </button>
              </div>
            </div>
          </div>
        </div>
   

       
      </div>

    </div>
    


    </>
  )
}

export default Chat
