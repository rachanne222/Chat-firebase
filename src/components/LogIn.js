import React from 'react';
import MyFirebase from '../utility/MyFirebase';
import { useNavigate } from 'react-router-dom';
import '../css/chats.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';import { useState } from "react";
import {
	getFirestore,
	// query,
	// getDocs,

	// where,
	addDoc
} from 'firebase/firestore';
//import { config } from "process";

//const app = initializeApp(myFirebase.app);
const auth = getAuth(MyFirebase.app);
const db = getFirestore(MyFirebase.app);

function Login(props) {
	let nameInput = React.useRef();
	let email = React.useRef();
	let password = React.useRef();

	function logInOrRegister() {
		logInWithEmailAndPassword();
	}

	
	const registerWithEmailAndPassword = async () => {
		console.log(auth);
		await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
		sendEmailVerification();
		logInWithEmailAndPassword(email, password).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert('Invalid email address or password Username must be 6 characters');
			login();
		});
	};

	const logInWithEmailAndPassword = async () => {
		signInWithEmailAndPassword(auth, email.current.value, password.current.value)
			.then((userCredential) => {
				// Signed in
				alert('Signed in');
				const user = userCredential.user;
				login();
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				var answer = window.confirm('Invalid email address or password do you need to register for Chat');
				if (answer) {
					registerWithEmailAndPassword();
				} else {
					logInWithEmailAndPassword();
				}
			});
	};
	/**
   * Sends an email verification to the user.
   */
	function sendEmailVerification() {
		auth().currentUser.sendEmailVerification().then(function() {
			// Email Verification sent!
			alert('Email Verification Sent!');
		});
	}

	function sendPasswordReset() {
		var email = document.getElementById('email').value;
		auth()
			.sendPasswordResetEmail(email)
			.then(function() {
				// Password Reset Email Sent!
				alert('Password Reset Email Sent!');
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode === 'auth/invalid-email') {
					alert(errorMessage);
				} else if (errorCode == 'auth/user-not-found') {
					alert(errorMessage);
				}
				console.log(error);
			});
	}

	const logout = () => {
		signOut(auth);
	};

	let navigate = useNavigate();
	function login() {
		let user = nameInput.current.value;
		console.log(user);

		if (user.length < 1) {
			window.alert('User needs to be atleast 1 character');
		} else {
			console.log(email.current.value);
			console.log(auth.currentUser.uid);
			console.log(user);
			navigate('/chats', {
				state: { login: user, auth: auth.currentUser.uid }
			});
		}
	}
	if (props.loginState===3){logout()

	}
	return (
		<div logout>
			<label htmlFor="fname">Username:</label>
			<br />
			<input type="text" ref={nameInput} id="user" name="user" />
			<br />
			<label htmlFor="fname">email Address</label>
			<br />
			<input type="text" ref={email} id="email" name="user" />
			<br />
			<label htmlFor="lname">Password:</label>
			<br />
			<input type="text" ref={password} id="password" name="password" />
			<br />
			<br />
			<input type="button" className="button" onClick={logInOrRegister} value="Login/Register" />
			<br />
		</div>
	);
}
export default Login;
