import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export async function loginAdmin(email, password, setLoggedInfo) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged in as:", userCredential.user.email);
    console.log(userCredential.user);
    setLoggedInfo(userCredential.user.email);
  } catch (err) {
    console.error("Login failed:", err.message);
    throw err;
  }
}

export function logoutAdmin() {
  return signOut(auth);
}
