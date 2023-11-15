import { getDatabase, ref, onValue, set, update, get } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../Config.js";


const setStudentData = async (data) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "student");
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
      update(dbRef, {
        [data.uid]: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      })
        .then(() => {
          console.log("Data updated successfully");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      set(dbRef, {
        [data.uid]: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      });
    }
  };

export const AddUser = (firstName, lastName, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const data = {
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };
        setStudentData(data);
        // checkUserState();
        return { user, errorCode: null };
      })
      .catch((error) => {
        const errorCode = error.code;
        // checkUserState();
        return { user: null, errorCode: errorCode };
      });
  };