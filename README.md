# Poll App

A simple poll creation and voting application built with React (frontend) and Express.js (backend).

## Features

- Create polls with multiple questions and options
- Vote on polls
- View active polls
- Remove extra options and questions
- Auto-refresh poll list every 5 seconds

## Tech Stack

**Frontend:** React, Bootstrap, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB

## Installation & Setup

### Backend

Clone the repository:

```sh
git clone https://github.com/your-repo/poll-app-backend.git
cd poll-app-backend
```

Install dependencies:

```sh
npm install
```

Start the server:

```sh
npm start
```

### Frontend

Clone the repository:

```sh
git clone https://github.com/your-repo/poll-app-frontend.git
cd poll-app-frontend
```

Install dependencies:

```sh
npm install
```

Start the frontend:

```sh
npm start
```

## API Endpoints

### Polls

#### Get all polls

```http
GET /polls
```

#### Create a poll

```http
POST /polls
```

**Request Body:**

```json
{
  "pollName": "Sample Poll",
  "questionAndOptions": [
    {
      "question": "What is your favorite color?",
      "answer": [
        { "option": "Red", "votes": 0 },
        { "option": "Blue", "votes": 0 }
      ]
    }
  ]
}
```

#### Vote on a poll

```http
POST /polls/:pollId/vote
```

**Request Body:**

```json
{
  "questionIndex": 0,
  "optionIndex": 1
}
```

#### Delete a poll

```http
DELETE /polls/:pollId
```

## Deployment

**Backend:** Hosted on Vercel: [https://poll-app-be.vercel.app](https://poll-app-be.vercel.app)  
**Frontend:** Deployed on Netlify/Vercel (Provide URL)

## License

This project is open-source and free to use. 🎉
