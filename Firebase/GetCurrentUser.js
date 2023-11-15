import {
    getAuth,
  } from "firebase/auth";

export const GetCurrentUser=()=>{
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("current User",user.email);
    return user;
}