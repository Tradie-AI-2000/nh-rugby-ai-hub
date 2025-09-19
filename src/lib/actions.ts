"use server";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, getOrCreateUserProfile, updateUserProfile } from "./firebase";
import { QuestionnaireSchema, type QuestionnaireData } from "./types";
import { allBadges } from "./badges";

export async function processQuestionnaire(data: QuestionnaireData) {
  console.log("Processing questionnaire submission...", data);

  const parsedData = QuestionnaireSchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Invalid questionnaire data:", parsedData.error);
    return {
      success: false,
      error: "Invalid data",
    };
  }

  try {
    console.log("Adding document to Firestore...");
    const docRef = await addDoc(collection(db, "submissions"), parsedData.data);
    console.log("Document written with ID: ", docRef.id);

    // --- Gamification Logic: Awarding "First AI Report" badge ---
    const userId = "test-user-123"; // Placeholder for actual user ID
    let userProfile = await getOrCreateUserProfile(userId);

    const firstReportBadge = allBadges.find(badge => badge.id === "first-ai-report");
    let newBadgesAwarded: string[] = [];

    if (firstReportBadge && userProfile.reportsSubmitted === 0 && !userProfile.earnedBadges.includes(firstReportBadge.id)) {
      userProfile.earnedBadges.push(firstReportBadge.id);
      newBadgesAwarded.push(firstReportBadge.name);
    }

    userProfile.reportsSubmitted += 1;
    await updateUserProfile(userId, { 
      earnedBadges: userProfile.earnedBadges,
      reportsSubmitted: userProfile.reportsSubmitted,
    });
    // --- End Gamification Logic ---

    return {
      success: true,
      newBadges: newBadgesAwarded,
    };
  } catch (error) {
    console.error("Error adding document to Firestore: ", error);
    return {
      success: false,
      error: "Failed to save submission.",
    };
  }
}

export async function getSubmissions() {
  try {
    console.log("Fetching submissions from Firestore...");
    const querySnapshot = await getDocs(collection(db, "submissions"));
    const submissions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Submissions fetched successfully:", submissions);
    return {
      success: true,
      data: submissions,
    };
  } catch (error) {
    console.error("Error fetching submissions from Firestore: ", error);
    return {
      success: false,
      error: "Failed to fetch submissions.",
    };
  }
}