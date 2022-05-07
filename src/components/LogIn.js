import React from "react";
import myFirebase from "../utility/MyFirebase";
import { useNavigate } from "react-router-dom";

//let firebaseDBRef = myFirebase.getFirebaseRef();
// firebaseDBRef.once("value").then((snapshot) => {
//console.log(snapshot.val().currentUser);
// });

function Login() {
  let nameInput = React.useRef();
  let navigate = useNavigate();
  function login() {
    let user = nameInput.current.value;
    console.log(user);
    
    if (user.length < 1) {
      window.alert("User needs to be atleast 1 character");
    } 
    else {
      navigate("/chats", { state: { login: user } });
    }
   
  }
 

 
    return (
      <form>
        <label htmlFor="fname">Username:</label>
        <br />
        <input type="text" ref={nameInput} id="user" name="user" />
        <br />
        <label htmlFor="lname">Password:</label>
        <br />
        <input type="text" id="password" name="password" />
        <input type="button" onClick={login} value="Click Me!" />
      </form>
    );
  
}
export default Login;
