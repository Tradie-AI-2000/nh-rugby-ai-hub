// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, getDocs, query, orderBy, type Firestore } from "firebase/firestore";
import { UserProfile } from "./types";

// TODO: Add your own Firebase configuration from the Firebase console
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Conditionally initialize Firebase
const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
} else {
  console.log("Firebase is not configured. Skipping initialization.");
}

export { db };

// Guarded Firebase functions

export async function getOrCreateUserProfile(userId: string): Promise<UserProfile> {
  if (!db) {
    console.log("DB not configured, returning default profile.");
    return {
      id: userId,
      name: "Guest User",
      email: "guest@example.com",
      earnedBadges: [],
      totalHoursSaved: 0,
      reportsSubmitted: 0,
    };
  }
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  } else {
    const defaultProfile: UserProfile = {
      id: userId,
      name: "Guest User",
      email: "guest@example.com",
      earnedBadges: [],
      totalHoursSaved: 0,
      reportsSubmitted: 0,
    };
    await setDoc(userRef, defaultProfile);
    return defaultProfile;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  if (!db) return;
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, updates);
}

export async function getUseCases() {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }
  const useCasesCollection = collection(db, 'use-cases');
  const q = query(useCasesCollection, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  const useCases = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return useCases;
}