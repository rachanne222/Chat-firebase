import myFirebase from "../utility/MyFirebase";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import React from "react";
import { getDatabase, ref, child, push, update } from "firebase/database";
import  '../css/chats.css';


function Chats(props) {
  const location = useLocation();
  let messageInput = React.useRef();
  let [messages, setMessages] = React.useState([]);
  let messageElements;
  
  let ob = [];
  
  const username = location.state.login;
  const userId= location.state.auth;

  function deleteChat(id) {
    let updates={}
    const db = getDatabase();
    updates['/posts/' + id] = null;
    update(ref(db), updates);
    setMessages(messages);
    
  }

  if (!location) {
    return <div> Not logged in </div>;
  }

  const db = getDatabase();
  function handleSubmit() {
    console.log("submitted");
    const db = getDatabase();
    const newPostKey = push(child(ref(db), "posts")).key;
    let message = messageInput.current.value;
    let time = new Date();
    let newMessageObject = {
      userId:location.state.auth,
      id: newPostKey,
      username: username,
      message: message,
      time: Date(),
      
    };

    

    // A post entry=newMessageObject.

    // Get a key for a new Post.
    
    console.log(newPostKey);
    console.log(newMessageObject);
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/posts/" + newPostKey] = newMessageObject;

    
    console.log(updates);
    update(ref(db), updates);
    let newMessages = [...messages, newMessageObject];
    setMessages(newMessages);
    messageInput.current.value="";
    
  }
  //function load(){
  let firebase2DBRef = myFirebase.getFirebaseRef();
  firebase2DBRef.once("value").then((snapshot) => {
    //console.log(snapshot.val());
    ob = snapshot.val();
    //console.log(ob);
    messages=[]
    for (let key in ob.posts) {
      console.log( ob.posts );
      if (userId === ob.posts[key].userId && messages[ob.posts[key]]===undefined) {
        
        messages.push({
          id: key,
          username: ob.posts[key].username,
          time: ob.posts[key].time,
          message: ob.posts[key].message,
          key: key
        });
        //console.log(ob.posts[key].message);
        setMessages(messages);
        console.log(messages);
      }
    }
  });

  //console.log(messages);

  messageElements = messages.map((chat) => (
    
    <div>
      <Chat  username= {chat.username}
      message={chat.message}
      time= {chat.time } key={chat.id} id={chat.id} deleteHandler={deleteChat} />
    </div>
  ));

 
    return (
      <>
      <h1>Welcome {username} 
      </h1>
      
      
      <div>{messageElements}</div>
        <div className="chat-message clearfix">
        <div className="input-group mb-0">
          <input type="text" ref={messageInput} class="form-control" placeholder="Enter text here..."/>                                    
        </div>
      </div>
      <button onClick={handleSubmit} className="button">Enter </button>
      <footer>
      <img id="icon" src="https://wallpaperaccess.com/full/4922409.jpg" alt="icon" ></img>
     
      </footer>
      </>
    );
  }
// }

export default Chats;

