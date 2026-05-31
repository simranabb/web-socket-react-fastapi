import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket';

function App() {
  const [text, setText]=useState("")
    const [message, setMessage] =    useState ([]);

  const { sendMessage, lastMessage  } = useWebSocket("ws://localhost:8000/chatroom/");

  
const submitMessage=(e) => {
  e.preventDefault();
  sendMessage(text);
  setMessage((prev) => [...prev, {value:text, sent:true} ]);

  setText("");

}

    useEffect(() => {
    if (lastMessage !== null) {
      setMessage((prev) => [...prev, {value:lastMessage.data, sent:false} ]);
    }
  }, [lastMessage]);

  console.log(message);
  

  return (
  <div className="bg-black">
    <div className="bg-white h-screen max-w-xl mx-auto flex flex-col justify-between ">
      
    <div className="bg-blue-500 p-4">
      <span className="text-3xl text-white font-bold">
        Sohbet Uygulamasi
      </span>
    </div>

    <div className="h-full p-4 overflow-y-auto">
      <div className="flex flex-col space-y-2">

      {
        message.map((msj)=>(
          msj.sent  ? 
            <div className="flex justify-end">
              <div className="bg-blue-200 p-4 text-xl rounded-lg">
                {msj.value}
              </div>
            </div>
            :
            <div className="flex justify-start">
              <div className="bg-gray-300 p-4 text-xl rounded-lg">
                {msj.value}
              </div>
            </div>

        ))
      }


      </div>
    </div>

    <form className="p-4" onSubmit={submitMessage}>
      <input
        type="text"
        placeholder="Mesajiniz:"
        className="border-2 border-black rounded-full w-full text-xl p-4"
        onChange={(e)=>setText(e.target.value)}
        value={text}
      />
    </form>

    </div>
  </div>
  )
}

export default App