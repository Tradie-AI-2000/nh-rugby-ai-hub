import * as React from 'react';
import { Html, Head, Body, Container, Text, Heading, Section, Hr, Img } from '@react-email/components';
import { QuestionnaireData } from '../lib/types';

interface QuestionnaireSubmissionEmailProps {
  questionnaireData: QuestionnaireData;
}

export const QuestionnaireSubmissionEmail: React.FC<QuestionnaireSubmissionEmailProps> = ({ questionnaireData }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://static.wixstatic.com/media/7b20bf_0dbf2020f3f74eebbaa018bcbec2bddf~mv2.png"
          width="100"
          height="100"
          alt="TradieAI Logo"
          style={logo}
        />
        <Heading style={h1}>New AI Questionnaire Submission</Heading>
        <Text style={paragraph}>
          A new questionnaire has been submitted by <strong>{questionnaireData.name}</strong> ({questionnaireData.role}).
        </Text>
        <Hr style={hr} />
        <Section style={section}>
          <Heading as="h2" style={h2}>Personal Information</Heading>
          <Text style={paragraph}><strong>Name:</strong> {questionnaireData.name}</Text>
          <Text style={paragraph}><strong>Role:</strong> {questionnaireData.role}</Text>
        </Section>
        <Hr style={hr} />
        <Section style={section}>
          <Heading as="h2" style={h2}>Role & Team Overview</Heading>
          <Text style={paragraph}><strong>Role and Team Responsibilities:</strong> {questionnaireData.roleAndTeam}</Text>
          <Text style={paragraph}><strong>Team Goals:</strong> {questionnaireData.teamGoals}</Text>
          <Text style={paragraph}><strong>Team Structure:</strong> {questionnaireData.teamStructure}</Text>
        </Section>
        <Hr style={hr} />
        <Section style={section}>
          <Heading as="h2" style={h2}>Core Processes & Workflow</Heading>
          <Text style={paragraph}><strong>Critical Processes:</strong> {questionnaireData.criticalProcesses}</Text>
          <Text style={paragraph}><strong>Bottlenecks:</strong> {questionnaireData.bottlenecks}</Text>
          <Text style={paragraph}><strong>Hour Consuming Tasks:</strong> {questionnaireData.hourConsumingTasks}</Text>
        </Section>
        <Hr style={hr} />
        <Section style={section}>
          <Heading as="h2" style={h2}>My Business Processes</Heading>
          <Text style={paragraph}><strong>Daily Tasks:</strong></Text>
          <ul>
            {questionnaireData.dailyTasks.map((task, index) => (
              <li key={index} style={listItem}>{task.description}</li>
            ))}
          </ul>
          <Text style={paragraph}><strong>Task Time Split:</strong> {questionnaireData.taskTimeSplit}</Text>
          <Text style={paragraph}><strong>Daily Software:</strong> {questionnaireData.dailySoftware}</Text>
          <Text style={paragraph}><strong>AI Assistants Used:</strong> {Object.entries(questionnaireData.aiAssistants).filter(([, value]) => value).map(([key]) => key).join(', ')}</Text>
          {questionnaireData.aiAssistants.other && <Text style={paragraph}><strong>Other AI Assistant:</strong> {questionnaireData.otherAiAssistant}</Text>}
          <Text style={paragraph}><strong>Other AI Tools:</strong> {questionnaireData.otherAiTools}</Text>
          <Text style={paragraph}><strong>Tool Frustrations:</strong> {questionnaireData.toolFrustrations}</Text>
          <Text style={paragraph}><strong>Data Entry Duplication:</strong> {questionnaireData.dataEntry}</Text>
        </Section>
        <Hr style={hr} />
        <Section style={section}>
          <Heading as="h2" style={h2}>Pain Points & Strategic Challenges</Heading>
          <Text style={paragraph}><strong>Biggest Challenges:</strong> {questionnaireData.biggestChallenges}</Text>
          <Text style={paragraph}><strong>Boring Tasks:</strong> {questionnaireData.boringTasks}</Text>
          <Text style={paragraph}><strong>Tasks for an Assistant:</strong> {questionnaireData.assistantTasks}</Text>
          <Text style={paragraph}><strong>Magic Wand Solution:</strong> {questionnaireData.magicWand}</Text>
          <Text style={paragraph}><strong>Inefficiency Cause:</strong> {questionnaireData.inefficiencyCause}</Text>
          <Text style={paragraph}><strong>Work Tracking:</strong> {questionnaireData.workTracking}</Text>
        </Section>
        <Hr style={hr} />
        <Section style={section}>
          <Heading as="h2" style={h2}>Training</Heading>
          <Text style={paragraph}><strong>AI Training Preference:</strong> {questionnaireData.aiTraining}</Text>
        </Section>
        <Hr style={hr} />
        <Section style={section}>
          <Heading as="h2" style={h2}>Process Step Drill-Down</Heading>
          {questionnaireData.drillDownProcesses.length > 0 ? (
            questionnaireData.drillDownProcesses.map((process, pIndex) => (
              <div key={pIndex}>
                <Text style={paragraph}><strong>Process Name:</strong> {process.processName}</Text>
                <Text style={paragraph}><strong>Steps:</strong></Text>
                <ul>
                  {process.steps.map((step, sIndex) => (
                    <li key={sIndex} style={listItem}>{step.description}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <Text style={paragraph}>No specific processes detailed.</Text>
          )}
        </Section>
        <Hr style={hr} />
        <Section style={section}>
          <Heading as="h2" style={h2}>Future Vision & Notes</Heading>
          <Text style={paragraph}><strong>Future Vision:</strong> {questionnaireData.futureVision}</Text>
          <Text style={paragraph}><strong>Tech Adoption:</strong> {questionnaireData.techAdoption}</Text>
          <Text style={paragraph}><strong>Additional Notes:</strong> {questionnaireData.freeText}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          This email was sent from the TradieAI AI Questionnaire.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default QuestionnaireSubmissionEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#171a1f',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  padding: '0 20px',
};

const h2 = {
  color: '#171a1f',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const section = {
  padding: '0 20px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '32px',
};

const listItem = {
  marginBottom: '5px',
};