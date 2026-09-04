import type { EmailInput, MeetingResult, PlannedTask } from "./types";

export const SAMPLE_STATS = {
  meetingsSummarized: 7,
  emailsGenerated: 23,
};

export const SAMPLE_PLANNED_TASKS: PlannedTask[] = [
  {
    task: "Send Q3 onboarding status to Marcus Reeve",
    priority: "High",
    rationale: "Blocks Monday's launch review and a stakeholder is waiting on it.",
    estimatedMinutes: 30,
    scheduledTime: "09:00",
    dependsOn: null,
  },
  {
    task: "Review open launch risks for Monday",
    priority: "High",
    rationale: "Risk decisions must be settled before the review meeting.",
    estimatedMinutes: 45,
    scheduledTime: "11:00",
    dependsOn: "Send Q3 onboarding status to Marcus Reeve",
  },
  {
    task: "Summarize Tuesday sync into action items",
    priority: "Medium",
    rationale: "Important for the team record but not time-critical today.",
    estimatedMinutes: 20,
    scheduledTime: "13:30",
    dependsOn: null,
  },
  {
    task: "Draft onboarding help-centre article",
    priority: "Medium",
    rationale: "Supports launch but can move if risks take longer.",
    estimatedMinutes: 60,
    scheduledTime: "14:15",
    dependsOn: null,
  },
  {
    task: "File last week's expense report",
    priority: "Low",
    rationale: "Administrative and flexible within the week.",
    estimatedMinutes: 15,
    scheduledTime: "16:00",
    dependsOn: null,
  },
];

export const SAMPLE_EMAIL_INPUT: EmailInput = {
  purpose: "Status update to client",
  instructions:
    "Summarize this week's progress on the onboarding build and flag the two open launch risks for next Monday's review.",
  recipient: "Marcus Reeve — lead product, Northwind",
  tone: "Professional",
};

export const SAMPLE_MEETING_NOTES = `Weekly product sync — 14 May, 45 min
Attendees: Priya (PM), Marcus (Client lead), Dana (Design), Tom (Eng)

Priya walked through the onboarding build. Steps 1-3 are complete, step 4 (identity check) is still in review.
Tom said the identity check vendor sandbox has been unstable twice this week; he will raise a ticket with the vendor by Friday.
Dana showed the revised empty states. Marcus approved the direction but asked for a higher contrast error state.
Decision: launch date moves from 27 May to 3 June to allow a full QA pass.
Decision: we will ship without the optional SSO step in v1.
Priya to send the revised timeline to the client stakeholders by Thursday.
Dana to deliver the updated error state designs by 20 May.
Open question: who signs off the final QA checklist?
Open question: do we need legal review for the new consent copy?`;

export const SAMPLE_TASK_LIST = `Send Q3 onboarding status update to Marcus (client is waiting, due today)
Review the two open launch risks before Monday's review
Summarize Tuesday's product sync into action items
Draft the onboarding help-centre article
File last week's expense report
Prep the QA checklist for the 3 June launch`;

export const SAMPLE_MEETING_RESULT: MeetingResult = {
  summary:
    "The team reviewed onboarding build progress, agreed design changes, and moved the launch date to allow a full QA pass.",
  keyPoints: [
    "Onboarding steps 1-3 are complete; step 4 (identity check) is still in review.",
    "The identity check vendor sandbox has been unstable twice this week.",
    "Revised empty states were approved, with a request for a higher contrast error state.",
  ],
  decisions: [
    "Launch date moves from 27 May to 3 June to allow a full QA pass.",
    "v1 will ship without the optional SSO step.",
  ],
  actionItems: [
    { task: "Raise a ticket with the identity check vendor", owner: "Tom", deadline: "Friday" },
    { task: "Send the revised timeline to client stakeholders", owner: "Priya", deadline: "Thursday" },
    { task: "Deliver updated error state designs", owner: "Dana", deadline: "20 May" },
  ],
  openQuestions: [
    "Who signs off the final QA checklist?",
    "Is legal review needed for the new consent copy?",
  ],
  missingInformation: [],
};
