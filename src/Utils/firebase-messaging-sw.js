import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { getAppConfig } from "./FirebaseConfig";

const firebaseApp = initializeApp(getAppConfig());
getMessaging(firebaseApp);
console.info('Firebase messaging servie worker is setup now');
