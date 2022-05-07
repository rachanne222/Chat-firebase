import myFirebase from "../utility/MyFirebase";
//import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import React from "react";
import { getDatabase, ref, set, child, push, update } from "firebase/database";

let x = true;

function Chats() {
  let messageInput = React.useRef();
  let [messages, setMessages] = React.useState([]);
  let [counter, setcounter] = React.useState(0);
  //let [username, setUsername] = React.useState([]);
  let ob = [];
  const location = useLocation();
  const username= location.state.login

  if (x) {
    if (!location) {
      return <div> Not logged in </div>;
    }
  
    
    let firebase2DBRef = myFirebase.getFirebaseRef();
    firebase2DBRef.once("value").then((snapshot) => {
      console.log(snapshot.val());
      ob = snapshot.val();
      console.log(ob);
      for (let key in ob.posts) {
        console.log(key);
          //const noUsername = ob[key].username.replace(/\s/g, "");
          if (username===ob.posts[key].username) {
            console.log("try");
            messages.push({
              id: key,
              username: ob.posts[key].username,
              time: ob.posts[key].time,
              message: ob.posts[key].message,
            });
            console.log(ob.posts[key].message);
            setMessages(messages);
            console.log(messages);

        }
      }

      x = false;
    });
  }
  console.log(messages);
  
  let messageElements = messages.map((chat) => (
    <div>
      <Chat
        username={chat.username}
        message={chat.message}
        id={chat.id}
        time={chat.time}
        key={chat.id}
      />
    </div>
  ));
  console.log(messageElements);
  

  function handleSubmit() {
    console.log("submitted");
    x = true;
    let message = messageInput.current.value;
    let time = new Date();
    let newMessageObject = {
      username: username,
      message: message,
      time: Date(),
      key: counter,
    };
    
    
  const db = getDatabase();
    
  // A post entry=newMessageObject.
  

  // Get a key for a new Post.
 const newPostKey = push(child(ref(db), 'posts')).key;
 console.log(newPostKey)
 console.log(newMessageObject)
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = newMessageObject;
  
  
  setcounter(counter+1)
  console.log(updates)
  update(ref(db), updates);
  messages.push(newMessageObject);
  console.log(messages)
 

  }

  return (
    <>
    {messageElements}
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            Write your Review:{" "}
          </label>
          <textarea
            ref={messageInput}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          />
        </div>
      </form>
      <button onClick={handleSubmit}>Submit Review </button>
    </>
  );
}

export default Chats;
