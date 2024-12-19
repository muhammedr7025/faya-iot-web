export const validateFirebaseConfig = (config: Record<string, string | undefined>) => {
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
    !config[field] || 
    config[field]?.includes('YOUR_') ||
    config[field] === 'undefined'
  );

  if (missingFields.length > 0) {
    throw new Error(
      'Firebase configuration is incomplete. Please update the following fields in your .env file: ' +
      missingFields.join(', ')
    );
  }
};