# Alumni Connect Web

Alumni Connect is a full-stack web application designed to help students and alumni stay connected, share opportunities, post success stories, and participate in college initiatives and events.

The platform enables alumni to contribute back to their college community while helping students find guidance, opportunities, and resources.

---

## Features

### Authentication

* User registration and login
* Role-based access (student / alumni / admin)

### Alumni Network

* Browse alumni profiles
* Search alumni by name, company, or location
* Expandable cards with details and contact links

### Success Stories

* Alumni can post success stories
* Stories are visible to all users
* Authors can delete their own stories

### Job Board

* Alumni can post job or internship opportunities
* Expandable job cards
* Posters can delete their own openings

### Events

* View upcoming college events
* Alumni-only event support

### Projects / Donations

* Student/Alumni-led initiatives and projects
* Donation links supported

---

## Tech Stack

**Frontend**

* React
* Tailwind CSS
* Axios
* React Router

**Backend**

* Node.js
* Express.js
* Prisma ORM

**Database**

* PostgreSQL

**Authentication**

* JWT (JSON Web Tokens)

---

## Project Structure

```
alumni-connect-web
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── middleware
│   ├── prisma
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/sanketsdeore/alumni-connect-web.git
cd alumni-connect-web
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
```

Run migrations:

```
npx prisma migrate dev
npx prisma generate
```

Start server:

```
npm start
```

---

### 3. Frontend Setup

Open another terminal:

```
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Backend `.env`

```
DATABASE_URL=
JWT_SECRET=
```

Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
```

---

## Future Improvements

* Messaging between alumni and students
* Notifications
* Profile picture uploads
* Admin moderation panel
* Advanced search and filters

---

## Contributors

* Abhinandan Gaikwad
* Sanket Deore
