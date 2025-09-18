# Form Submission Backend

This is the backend for the Form Submission App. It uses **Express**, **TypeScript**, **MySQL**, and **Prisma** as the ORM. The backend handles user registration, login, JWT authentication, and form submissions with file uploads.

---

## Prerequisites

- Node.js >= 20
- npm
- MySQL server running locally
- Optional: [Postman](https://www.postman.com/) for API testing

---

## Environment Variables

Create a `.env` file at the root:

```env
PORT=4000
JWT_SECRET=super_secret_access_key
JWT_REFRESH_SECRET=super_secret_refresh_key
DATABASE_URL="mysql://root:@localhost:3306/customer_db"
```

## Setup & Development

1. Install dependencies

```
npm install
```


2. Generate Prisma client

```
npm run prisma:generate
```

3. Run database migrations

```
npx prisma migrate
```

4. Seed the database

```
npm run prisma:seed
```

5. Start the development server

```
npm run dev
```