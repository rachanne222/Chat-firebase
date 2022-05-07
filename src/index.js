import React from 'react';
import ReactDOM from 'react-dom/client';
import LogIn from './components/LogIn';
import Chats from './components/Chats'
import Header from './components/Header';
import index from './index.css'
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from "react-router-dom";





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		 {/* <Header></Header>  */}
		<Router>
		<div>
		
		  <Routes>
			<Route path="/" element={<LogIn />} />		
			<Route path="/chats" element={<Chats />} />
		  </Routes>
		</div>
	  </Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

