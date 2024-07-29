import { getAuth, signInWithPopup, OAuthProvider, AuthCredential } from "firebase/auth";
import { initializeApp } from "firebase/app";


initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export function appleSignIn(): any {
  const auth = getAuth();
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");

  return signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // Apple credential
      const credential: any = OAuthProvider.credentialFromResult(result);
      const accessToken: string | null = credential.accessToken;
      const idToken: string | null = credential.idToken;
      return user;
    })
    .catch((error) => {
      console.log("ERROR", error);
      // Handle Errors here.
      const errorCode: string = error.code;
      const errorMessage: string = error.message;
      // The email of the user's account used.
      const email: string | null = error.email;
      // The credential that was used.
      const credential: AuthCredential | null = OAuthProvider.credentialFromError(error);
      // Handle errors as needed.

    });
}


