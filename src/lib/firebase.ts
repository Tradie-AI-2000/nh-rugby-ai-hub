// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserProfile } from "./types";

// TODO: Add your own Firebase configuration from the Firebase console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };

export async function getOrCreateUserProfile(userId: string): Promise<UserProfile> {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  } else {
    // Create a default profile if it doesn't exist
    const defaultProfile: UserProfile = {
      id: userId,
      name: "Guest User", // Placeholder, ideally from auth
      email: "guest@example.com", // Placeholder, ideally from auth
      earnedBadges: [],
      totalHoursSaved: 0,
      reportsSubmitted: 0,
    };
    await setDoc(userRef, defaultProfile);
    return defaultProfile;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, updates);
}