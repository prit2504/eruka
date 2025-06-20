
Eruka.com

A full-featured job portal web application where **recruiters can post jobs**, **manage applicants**, and **jobseekers can search, filter, and apply** for jobs with resume upload and profile tracking.

## 🚀 Features

### 👤 Job Seeker
- 🔎 **Search & Filter Jobs** – By title, company, location, mode (WFH/Office), salary, etc.
- 📄 **Apply to Jobs** – With resume URL and profile.
- 📝 **View Applied Jobs** – Track application status (applied / shortlisted / rejected).
- 🧑‍💼 **Create Profile** – Add skills, education, experience, preferred locations.

### 🧑‍💼 Recruiter
- ➕ **Post Jobs**
- 👀 **View Applicants** – For each job with profile + resume.
- ✅ **Shortlist / ❌ Reject Applicants** – With status updates.
- 🗑️ **Delete Job Posts**

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
|------------|---------------------------------|
| Frontend    | React.js + Tailwind CSS        |
| State Mgmt  | React State, Props, Zustand    |
| Backend     | Node.js, Express.js            |
| Database    | MongoDB + Mongoose             |
| Auth        | JWT with Cookie-Based Storage  |



## 🧩 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
````

### 2️⃣ Install dependencies

```bash
cd server
npm install

cd client
npm install
```

### 3️⃣ Create or Update `.env` file in `/server`

```env
PORT=7000
MONGO_URI=mongodb://localhost:27017/eruka
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run Backend Server

```bash
cd server
npm start
```

### 5️⃣ Run Frontend Client

```bash
cd client
npm run dev
```

project_eruka
eruka@123
