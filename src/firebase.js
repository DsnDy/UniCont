// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCLr-udX4ZgV0Z96EDAITJb_9xfpzPiRWs',
	authDomain: 'unicont-efb2e.firebaseapp.com',
	projectId: 'unicont-efb2e',
	storageBucket: 'unicont-efb2e.appspot.com',
	messagingSenderId: '66997763091',
	appId: '1:66997763091:web:d647adaa0d12a48f5b93e6',
	measurementId: 'G-ZEMYMC5DWG'
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fs = initializeFirestore(app, {
	experimentalForceLongPolling: true
});
