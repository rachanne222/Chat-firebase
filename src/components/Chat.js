import  '../css/chat.css';
function Chat(props) {
  function handleDelete() {
    console.log(props.id);
    props.deleteHandler(props.id);
  }
  return (
    <>
        <div class="chat-history">
                    <ul className="m-b-0"/>
                        {/* <li className="clearfix"/> */}
                            <div className="message-data text-right">
                                <span   className="message other-message float-right">{props.time}</span>
                                <img id="avitar"src="https://images.unsplash.com/photo-1650638701470-e860a3dbc723?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="avatar" ></img>
                                {props.username}</div>
                            <div id="bubble-message" className="message-data-time"> {props.message} </div>
           </div>
           <button onClick={handleDelete} className="deletebutton"> Delete Post</button>
      <span class="icon icon-calendar"></span>
    </>            
            
      // {/* <p>key: {props.id}</p> */}
     
 
  );
};

export default Chat;
