import { getDatabase, ref, onValue } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../Config.js";

export const SignIn = async (email, password) => {
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("user is ==", user.uid);

    const db = getDatabase();
    const dbRef = ref(db, "student/" + user.uid);

    const data = await new Promise((resolve) => {
      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        console.log("data is ==", userData);
        resolve({ data: userData, error: null });
      });
    });

    // Returning the resolved data outside the promise
    return data;
  } catch (error) {
    const errorCode = error.code;
    console.log("error is ==", errorCode);
    return { data: null, error: errorCode };
  }
};
