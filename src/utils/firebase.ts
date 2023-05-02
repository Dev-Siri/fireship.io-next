import useGlobalStore, { rootURL } from "@/store/globalData";

import { initializeApp } from "firebase/app";
import { getAuth, type UserCredential } from "firebase/auth";

const config = {
  apiKey: "AIzaSyBns4UUCKIfb_3xOesTSezA9GbEyuIU7XA",
  authDomain: "fireship-app.firebaseapp.com",
  databaseURL: "https://fireship-app.firebaseio.com",
  projectId: "fireship-app",
  storageBucket: "fireship-app.appspot.com",
  messagingSenderId: "176605045081",
  appId: "1:176605045081:web:d87a63bd943e3032",
  measurementId: "G-VTJV5CVC6K",
};

export const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp);

export async function signInWithGoogle() {
  const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");

  const credential = signInWithPopup(auth, new GoogleAuthProvider());
  return loginHandler(credential);
}

export async function signInWithApple() {
  const { signInWithPopup, OAuthProvider } = await import("firebase/auth");

  const provider = new OAuthProvider("apple.com");
  const credential = signInWithPopup(auth, provider);
  return loginHandler(credential);
}

// TODO update url in production
export async function sendPasswordlessEmail(email: string, url?: string) {
  const actionCodeSettings = {
    // url: 'https://fireship.io/dashboard',
    url: url ?? `${rootURL}/dashboard`, // TODO
    // This must be true.
    handleCodeInApp: true,
  };

  let res: any,
    serverError: string | null = null;
  try {
    const { sendSignInLinkToEmail } = await import("firebase/auth");

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    window.localStorage.setItem("emailForSignIn", email);
    res = `Magic signin link sent to ${email}`;
  } catch (error: any) {
    serverError = error.message;
  }

  return { res, serverError };
}
export async function passwordlessSignin() {
  const { isSignInWithEmailLink, signInWithEmailLink } = await import("firebase/auth");

  if (isSignInWithEmailLink(auth, location.href)) {
    let email = localStorage.getItem("emailForSignIn");
    if (!email) email = prompt("Please provide your email for confirmation");

    const credential = signInWithEmailLink(auth, email!, window.location.href);
    localStorage.removeItem("emailForSignIn");
    return loginHandler(credential);
  } else {
    return { res: null, serverError: "Invalid link" };
  }
}

export async function firebaseSignOut() {
  const { signOut } = await import("firebase/auth");
  const { removeCookie } = await import("./cookies");

  await signOut(auth);
  removeCookie("auth_token");

  useGlobalStore.setState({
    toast: {
      icon: "👋",
      message: "Thanks for hanging out, see ya around!",
    },
  });
}

async function loginHandler(promise: Promise<UserCredential>) {
  let res: string | null = "",
    serverError: string | null = null;

  try {
    const { user } = await promise;
    res = await user.getIdToken();

    useGlobalStore.setState({
      modal: null,
      toast: {
        message: "Access granted! Logged into the mainframe!",
        type: "success",
      },
    });
  } catch (error: any) {
    serverError = error.message;
    console.error(error);
    useGlobalStore.setState({
      toast: {
        message: serverError!,
        type: "error",
      },
    });
  }
  return { res, serverError };
}

// Callable Functions

interface UserAPIData {
  fn: string;
  payload: any;
}

export async function callUserAPI<T>(data: UserAPIData): Promise<T | undefined> {
  try {
    if (!auth.currentUser) {
      useGlobalStore.setState({
        modal: "signin",
        toast: { message: "You must be signed in first", type: "info" },
      });
      return;
    }
    const { getFunctions, httpsCallable } = await import("firebase/functions");
    const functions = getFunctions();

    const res = await httpsCallable(functions, "userAPI")(data);
    return res.data as T;
  } catch (error: any) {
    console.log(error);
    useGlobalStore.setState({
      toast: {
        message: error?.message ?? "Unknown Error. Contact hello@fireship.io for help",
        type: "error",
      },
    });
  }
}

// Progress Tracking

export async function markComplete(route: string, bonus = 0) {
  const user = auth.currentUser;

  if (!user)
    return useGlobalStore.setState({
      toast: {
        message: "You must be logged in to track progress",
        type: "error",
      },
    });

  const { doc, setDoc, getFirestore } = await import("firebase/firestore");
  const firestore = getFirestore();

  const userRef = doc(firestore, `progress/${user.uid}`);
  setDoc(userRef, { [route]: 100 + bonus }, { merge: true });
}

export async function markIncomplete(route: string) {
  const user = auth.currentUser;

  const { doc, setDoc, deleteField, getFirestore } = await import("firebase/firestore");
  const firestore = getFirestore();

  const userRef = doc(firestore, `progress/${user!.uid}`);
  setDoc(
    userRef,
    {
      [route]: deleteField(),
    },
    { merge: true }
  );
}
