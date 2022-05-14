import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import Home from './components/Home';
import LogIn from './components/LogIn';
import Chats from './components/Chats';
import index from './index.css'
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from "react-router-dom";
import Navbar from './components/Navbar';


function App(){
	
	let [loginState, setLoginState] = useState(0);

	return(
		<>
	
		<Router>
		<Navbar loginState={loginState} setLoginState={setLoginState}  />
		<div>
		  <Routes>
			<Route loginState={loginState}path="/" element={<Home />} />	
			<Route loginState={loginState}path="/login" element={<LogIn />} />		
			<Route loginState={loginState} path="/chats" element={<Chats />} />
		  </Routes>
		</div>
	  </Router>
	  </>
	)
	}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
	  <App />
	</React.StrictMode>
  );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
