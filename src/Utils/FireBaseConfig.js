// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB1x4LIbQGpg5waJWh0irTVKczy2wJxzo0",
  authDomain: "gk-crud.firebaseapp.com",
  databaseURL: "https://gk-crud-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gk-crud",
  storageBucket: "gk-crud.appspot.com",
  messagingSenderId: "38302112940",
  appId: "1:38302112940:web:da3d71a74416db5f77d309",
  measurementId: "G-217Q51H4TJ"
}

// return Firebase configuration
export const getAppConfig = ()=>{
  if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.apiKey) {
    throw new Error("No Firebase Configuration")
  } else {
    return FIREBASE_CONFIG
  }
  
} 
