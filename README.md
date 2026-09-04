# Workmate AI: Your Productivity Partner

Build a modern, responsive SaaS-style web application called Workmate AI.

Workmate AI is a single integrated AI-powered workplace productivity assistant designed to help professionals communicate, manage meetings and organise their workload.

CORE FEATURES

The application must contain exactly these three primary AI productivity features:

1. Smart Email Generator

Allow users to generate professional workplace emails.

Inputs:

Email purpose/type

User's instructions

Recipient/context

Tone: Formal, Professional, Friendly, Persuasive, Concise

Output:

Email subject

Professional email body

Actions:

Generate

Regenerate

Edit

Copy

Clear

2. Meeting Notes Summarizer

Allow users to paste long workplace meeting notes.

The AI should produce:

Meeting summary

Key discussion points

Decisions

Action items

Responsible people when explicitly mentioned

Deadlines when explicitly mentioned

Open questions

Actions:

Summarize

Edit

Copy

Clear

Include an "Add Action Items to Task Planner" button so extracted action items can be transferred into the Task Planner.

3. AI Task Planner / Scheduler

Allow users to enter multiple workplace tasks.

The AI should:

Identify task priority

Categorize tasks as High, Medium or Low priority

Consider urgency and importance

Suggest realistic time allocations

Create a daily schedule

Identify dependencies where appropriate

Provide productivity recommendations

Actions:

Generate Plan

Edit

Copy

Clear

Allow users to create an email from a task using a "Create Email Update" action that opens the Smart Email Generator with relevant task context.

DASHBOARD

Create a professional dashboard home page containing:

Welcome message

Short Workmate AI description

Productivity overview

Number of tasks planned

Number of high-priority tasks

Number of meetings summarized

Number of emails generated

Three feature cards linking to the main tools

NAVIGATION

Create a responsive sidebar containing:

Workmate AI logo/name

Dashboard

Email Generator

Meeting Summarizer

Task Planner

Settings

On mobile, convert the sidebar into a responsive navigation menu.

USER INTERFACE

Use a clean, modern professional SaaS design.

Requirements:

Responsive desktop and mobile layouts

Professional typography

Modern cards

Clear visual hierarchy

Rounded components

Accessible buttons and forms

Input and output sections

Loading states while AI responses are being generated

Empty states

Error states

Copy-to-clipboard functionality

Editable AI-generated outputs

Regenerate functionality

Do not make the application look like a generic ChatGPT clone. It should look like a professional workplace productivity platform.

AI PROMPT ENGINEERING

Use structured prompts for each AI feature.

Prompts must:

Define the AI role

Define the task

Provide clear instructions

Specify output structure

Prevent the AI from inventing information

Tell the AI to clearly identify missing information

Produce consistent workplace-friendly outputs

Keep prompts modular and easy to modify.

RESPONSIBLE AI

Include a visible Responsible AI notice:

"Workmate AI provides AI-generated workplace assistance. Always review and verify AI-generated content before sending emails, making decisions, or sharing information. Do not enter confidential, sensitive, or personal information unless your organisation's policies allow it."

Also include responsible AI principles covering:

Privacy

Human review

Accuracy

Human decision-making

APPLICATION FLOW

The three features must feel like one integrated application.

Meeting Notes → Extract Action Items → Task Planner

Task Planner → Create Email Update → Email Generator

Dashboard → Access all three tools

TECHNICAL REQUIREMENTS

Build reusable components where appropriate.

Use clear component naming and maintainable code.

Keep the application responsive and accessible.

Provide realistic demo/sample data so the interface can be demonstrated even before users enter their own information.

The final result should look polished enough for an academic project presentation and demonstrate practical AI implementation, prompt engineering, workplace problem solving, innovation, responsible AI usage and modern UI/UX design.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sync-task-mentor.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3b56651c-7c9f-482e-b78c-6fb454fe486b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
