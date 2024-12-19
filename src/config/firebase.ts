import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Validate Firebase config to prevent runtime errors
const validateFirebaseConfig = (config: Record<string, string>) => {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'databaseURL',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];

  const missingFields = requiredFields.filter(field => 
    !config[field] || config[field].includes('YOUR_')
  );

  if (missingFields.length > 0) {
    throw new Error(
      'Firebase configuration is incomplete. Please update the following fields in src/config/firebase.ts: ' +
      missingFields.join(', ')
    );
  }
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

validateFirebaseConfig(firebaseConfig);

let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  throw error;
}

export const db = database;