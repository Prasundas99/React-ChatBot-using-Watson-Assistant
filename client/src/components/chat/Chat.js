import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

//  Import action
import { userMessage, sendMessage } from "../../actions/watson";

const Chat = () => {
  // Handle Users Message
  const [message, setMessage] = useState("");
  const endOfMessages = useRef(null);
  const dispatch = useDispatch();

  const { messages: fetchMessages } = useSelector((state) => state.watson);

  const scrollToBottom = () => {
    endOfMessages.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [fetchMessages]);

  //  Function that handles user submission
  const handleClick = async (e) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      // console.log(message);
      dispatch(userMessage(message));
      dispatch(sendMessage(message));
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <h1>Chatty the Chatbot</h1>
      {/* Handle Messages */}
      <div class="historyContainer">
        {fetchMessages.length === 0
          ? ""
          : fetchMessages.map((msg) => (
              <div className={msg.type}>{msg.message}</div>
            ))}
        <div ref={endOfMessages}></div>
      </div>
      {/* Input Box */}
      <input
        id="chatBox"
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleClick}
        value={message}
      ></input>
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   chat: state.watson.messages,
// });

export default Chat;
