import { Resend } from 'resend';
import { render } from '@react-email/render';
import QuestionnaireSubmissionEmail from '../emails/questionnaire-submission';
import { QuestionnaireData } from './types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendQuestionnaireEmail(data: QuestionnaireData) {
  const emailHtml = render(
    <QuestionnaireSubmissionEmail questionnaireData={data} />
  );

  try {
    await resend.emails.send({
      from: 'onboarding@tradieai.co.nz', // This should be a verified domain in Resend
      to: 'joe@tradieai.co.nz', // The recipient email address
      subject: `New AI Questionnaire Submission from ${data.name}`,
      html: emailHtml,
    });
    console.log('Questionnaire email sent successfully.');
    return { success: true };
  } catch (error) {
    console.error('Failed to send questionnaire email:', error);
    return { success: false, error: (error as Error).message };
  }
}