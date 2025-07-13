# 🧠 Job Board Backend

This is the backend server for the **Job Board** full-stack web application. It provides a RESTful API built with **Node.js**, **Express**, and **MongoDB** (or **PostgreSQL**, if preferred), handling authentication, job CRUD operations, resume uploads, and email notifications.

---

## 🚀 Tech Stack

- ⚙️ Node.js
- 🚂 Express.js
- 🗃️ MongoDB / PostgreSQL
- 🔐 JWT Authentication
- 🧂 bcrypt for password hashing
- 📧 NodeMailer for email notifications
- 📝 Multer for file (resume) uploads
- 📄 dotenv for environment config

---

## 📦 Folder Structure

```

server/
├── controllers/       # Route logic
├── models/            # Mongoose/Prisma models
├── routes/            # Express routes
├── middleware/        # Auth, error handling, etc.
├── config/            # DB & email config
├── utils/             # Utility functions (email, token, etc.)
├── uploads/           # Resume storage (local)
├── app.js             # Express setup
├── server.js          # Entry point
├── .env.example       # Environment variables
└── package.json

```

---

## 🛠️ Setup & Installation

### 1. Clone the repository and navigate to `server/`

```bash
cd job-board/server
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Copy `.env.example` to `.env` and update your values:

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=supersecretkey
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
```

> ✅ For PostgreSQL, change `MONGO_URI` to `DATABASE_URL` and adapt models using Prisma.

---

### 4. Start the development server

```bash
# Start the dev server with nodemon
npm run dev
```

Server will run on `http://localhost:5000`

---

## 🔐 Authentication

* **JWT-based login**
* **Role-based access** (`admin`, `employer`, `candidate`)
* Routes are protected using custom middleware

---

## ✉️ Email Notifications

Emails are sent using **NodeMailer** for:

* New job application confirmations
* Employer alerts on new applications

---

## 📄 API Endpoints (Preview)

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/api/jobs`          | Get all jobs             |
| POST   | `/api/jobs`          | Create a job (employer)  |
| GET    | `/api/jobs/:id`      | Get single job           |
| DELETE | `/api/jobs/:id`      | Delete job (employer)    |
| POST   | `/api/auth/register` | Register user            |
| POST   | `/api/auth/login`    | Login user               |
| POST   | `/api/apply/:jobId`  | Apply to job (upload CV) |

> Full API docs coming soon in `docs/api.md`

---

## 📤 Resume Uploads

* Resumes are uploaded using **Multer**
* Stored locally in `uploads/` or can be configured to use S3/Cloudinary

---

## 🔍 Linting & Formatting

```bash
npm run lint
npm run format
```

---

## 🧪 Testing (optional)

Coming soon: unit + integration tests using **Jest** & **Supertest**

---

## 🙌 Contributing

Please check the main [CONTRIBUTING.md](../CONTRIBUTING.md) in the root repo.

---

## 👨‍💻 Maintainer

**Ajay Dhangar**

🔗 [GitHub](https://github.com/ajay-dhangar)

---

## 📄 License

This project is licensed under the MIT License.