import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Your web app's Firebase configuration
const config = {
	apiKey: "AIzaSyCIho1fCUbI2ArXWQ1nexNYX8wH7kEsBR0",
	authDomain: "chat-project-425e4.firebaseapp.com",
	databaseURL: "https://chat-project-425e4-default-rtdb.firebaseio.com",
	projectId: "chat-project-425e4",
	storageBucket: "chat-project-425e4.appspot.com",
	messagingSenderId: "115532493282",
	appId: "1:115532493282:web:fd00e5563d9f9bb40649bb"
};

firebase.initializeApp(config);

function getFirebaseRef(refPath) {
	return firebase.database().ref(refPath);
}

export default {
	getFirebaseRef: getFirebaseRef
};
