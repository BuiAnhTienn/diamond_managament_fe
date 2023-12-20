// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkSxrUfAuTKn5WrEDp2DLC71tj865jBKk',
  authDomain: 'diamond-management-76c5a.firebaseapp.com',
  projectId: 'diamond-management-76c5a',
  storageBucket: 'diamond-management-76c5a.appspot.com',
  messagingSenderId: '814294624068',
  appId: '1:814294624068:web:8748f3c21d6f1366781911',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
