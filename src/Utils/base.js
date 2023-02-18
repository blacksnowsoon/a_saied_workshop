import { initilaizeApp } from 'firebase';


const config = process.env.FIREBASE_CONFIG;

initilaizeApp(config);