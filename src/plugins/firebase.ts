import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'

let firebaseApp: FirebaseApp

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
      authDomain: import.meta.env.VITE_APP_FIREBASE_DOMAIN,
      projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
      appId: import.meta.env.VITE_APP_FIREBASE_APPID,
    })
  } catch (error) {
    console.error({ error })
  }
}

let auth: Auth

export const useAuth = () => {
  auth = getAuth(firebaseApp)
  return auth
}
