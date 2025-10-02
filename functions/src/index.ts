import { onDocumentCreated } from "firebase-functions/v2/firestore"; // Use v2 Firestore trigger
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { QuestionnaireData } from "./types"; // Import from local types.ts

console.log("Initializing Firebase Admin SDK...");
admin.initializeApp();
console.log("Firebase Admin SDK initialized.");

// Configure the email transport using a Gmail account or other SMTP service.
// For production, it's recommended to use a dedicated transactional email service
// like SendGrid, Mailgun, or a similar service, and store credentials securely
// in Firebase Environment Configuration.
console.log("Creating Nodemailer transporter...");
const transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP service
  auth: {
    user: process.env.EMAIL_USER, // stored as environment variable
    pass: process.env.EMAIL_PASS, // stored as environment variable
  },
});
console.log("Nodemailer transporter created.");

export const processQuestionnaireEmailTrigger = onDocumentCreated("submissions/{submissionId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event.");
      return;
    }
    const questionnaireData = snapshot.data() as QuestionnaireData;

    // Add a check for questionnaireData.aiAssistants
    const aiAssistantsUsed = questionnaireData.aiAssistants ?
      Object.entries(questionnaireData.aiAssistants)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(", ") : "None";

    const mailOptions = {
      from: "onboarding@tradieai.co.nz", // Sender address
      to: "joe@tradieai.co.nz", // Recipient address
      subject: `New AI Questionnaire Submission from ${questionnaireData.name}`,
      html: `
        <h1>New AI Questionnaire Submission</h1>
        <p>A new questionnaire has been submitted by <strong>${questionnaireData.name}</strong> (${questionnaireData.role}).</p>
        <hr>
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> ${questionnaireData.name}</p>
        <p><strong>Role:</strong> ${questionnaireData.role}</p>
        <hr>
        <h2>Role & Team Overview</h2>
        <p><strong>Role and Team Responsibilities:</strong> ${questionnaireData.roleAndTeam}</p>
        <p><strong>Team Goals:</strong> ${questionnaireData.teamGoals}</p>
        <p><strong>Team Structure:</strong> ${questionnaireData.teamStructure}</p>
        <hr>
        <h2>Core Processes & Workflow</h2>
        <p><strong>Critical Processes:</strong> ${questionnaireData.criticalProcesses}</p>
        <p><strong>Bottlenecks:</strong> ${questionnaireData.bottlenecks}</p>
        <p><strong>Hour Consuming Tasks:</strong> ${questionnaireData.hourConsumingTasks}</p>
        <hr>
        <h2>My Business Processes</h2>
        <p><strong>Daily Tasks:</strong></p>
        <ul>
          ${questionnaireData.dailyTasks.map((task) => `<li>${task.description}</li>`).join("")}
        </ul>
        <p><strong>Task Time Split:</strong> ${questionnaireData.taskTimeSplit}</p>
        <p><strong>Daily Software:</strong> ${questionnaireData.dailySoftware}</p>
        <p><strong>AI Assistants Used:</strong> ${aiAssistantsUsed}</p>
        ${questionnaireData.aiAssistants && questionnaireData.aiAssistants.other ?
          `<p><strong>Other AI Assistant:</strong> ${questionnaireData.aiAssistants.other}</p>` : ""}
        <p><strong>Other AI Tools:</strong> ${questionnaireData.otherAiTools}</p>
        <p><strong>Tool Frustrations:</strong> ${questionnaireData.toolFrustrations}</p>
        <p><strong>Data Entry Duplication:</strong> ${questionnaireData.dataEntry}</p>
        <hr>
        <h2>Pain Points & Strategic Challenges</h2>
        <p><strong>Biggest Challenges:</strong> ${questionnaireData.biggestChallenges}</p>
        <p><strong>Boring Tasks:</strong> ${questionnaireData.boringTasks}</p>
        <p><strong>Tasks for an Assistant:</strong> ${questionnaireData.assistantTasks}</p>
        <p><strong>Magic Wand Solution:</strong> ${questionnaireData.magicWand}</p>
        <p><strong>Inefficiency Cause:</strong> ${questionnaireData.inefficiencyCause}</p>
        <p><strong>Work Tracking:</strong> ${questionnaireData.workTracking}</p>
        <hr>
        <h2>Training</h2>
        <p><strong>AI Training Preference:</strong> ${questionnaireData.aiTraining}</p>
        <hr>
        <h2>Process Step Drill-Down</h2>
        ${questionnaireData.drillDownProcesses.length > 0 ?
          questionnaireData.drillDownProcesses.map((process) => `
            <div>
              <p><strong>Process Name:</strong> ${process.processName}</p>
              <p><strong>Steps:</strong></p>
              <ul>
                ${process.steps.map((step) => `<li>${step.description}</li>`).join("")}
              </ul>
            </div>
          `).join("")
          : "<p>No specific processes detailed.</p>"
        }
        <hr>
        <h2>Future Vision & Notes</h2>
        <p><strong>Future Vision:</strong> ${questionnaireData.futureVision}</p>
        <p><strong>Tech Adoption:</strong> ${questionnaireData.techAdoption}</p>
        <p><strong>Additional Notes:</strong> ${questionnaireData.freeText}</p>
        <hr>
        <p>This email was sent from the TradieAI AI Questionnaire.</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Questionnaire email sent successfully!");
    } catch (error) {
      console.error("Error sending questionnaire email:", error);
    }
  });