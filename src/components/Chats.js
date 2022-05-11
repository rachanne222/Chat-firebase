import myFirebase from "../utility/MyFirebase";
//import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import React from "react";
import { getDatabase, ref, set, child, push, update } from "firebase/database";
import {v4 as uuidv4} from 'uuid';
import  '../css/chats.css';

function Chats() {
  const location = useLocation();
  let messageInput = React.useRef();
  let [messages, setMessages] = React.useState([]);
  let [messageElements, setMessageSet] = React.useState(0);
  
  let ob = [];
  
  const username = location.state.login;

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


  function handleSubmit() {
    console.log("submitted");

    let message = messageInput.current.value;
    let time = new Date();
    let newMessageObject = {
      id: uuidv4(),
      username: username,
      message: message,
      time: Date(),
      
    };

    const db = getDatabase();

    // A post entry=newMessageObject.

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), "posts")).key;
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
      if (username === ob.posts[key].username && messages[ob.posts[key]]===undefined) {
        
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

 // }
 
  // if (messageElements==undefined) {
  //   console.log(messageElements)
  //   //load()
    

  //   return <button onClick={load}>Nothing</button>;
  // } else {
    return (
      <>
      <h1>Welcome {username} 
      </h1>
      <img id="icon" src="https://wallpaperaccess.com/full/4922409.jpg" alt="icon" ></img>
      <div>{messageElements}</div>
      <div className="chat-message clearfix">
      <div className="input-group mb-0">
          <div className="input-group-prepend">
              <span className="input-group-text"><i class="fa fa-send"></i></span>
          </div>
          <input type="text" ref={messageInput} class="form-control" placeholder="Enter text here..."/>                                    
      </div>
      </div>
      <button onClick={handleSubmit} className="button">Enter </button>
      </>
    );
  }
// }

export default Chats;

