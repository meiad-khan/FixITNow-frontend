# FixItNow — Frontend

> A modern, responsive frontend for a home-service marketplace that connects customers with skilled technicians for reliable and convenient home services.

**Live Demo:** [FixItNow](https://fix-it-now-frontend-six.vercel.app/)

---

## 📖 Overview

**FixItNow** is a full-stack home-service marketplace platform designed to make it easier for customers to discover professional services, find technicians, create bookings, make payments, and leave reviews.

The frontend provides dedicated experiences for three user roles:

* **Customer**
* **Technician**
* **Admin**

The application is built with **Next.js App Router**, **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**, with a strong focus on reusable components, type safety, responsive design, and clean API integration.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Current user profile
* Role-based access
* Protected dashboard routes
* Authentication-aware navigation

### 🛠️ Service Management

* Browse all available services
* View service details
* Browse service categories
* Admin category management
* Admin service creation
* Service pricing and information

### 👨‍🔧 Technician Management

* Browse technicians
* View technician profiles
* View technician details
* Technician profile management
* Technician booking management

### 📅 Booking Management

#### Customer

* Create service bookings
* View booking history
* Cancel bookings
* Track booking status
* Make payments
* View payment history
* View payment details
* Submit reviews

#### Technician

* View assigned bookings
* Accept booking requests
* Decline booking requests
* Update booking status
* Manage technician profile

#### Admin

* View all bookings
* Manage users
* Update user status
* Manage categories
* Create services

### 💳 Payment

* Payment initialization
* Payment gateway redirection
* Payment history
* Payment details
* Payment success flow
* Payment cancellation flow

### ⭐ Reviews

Customers can submit reviews for completed services.

### 🎨 UI / UX

* Fully responsive design
* Mobile-friendly interface
* Dark mode
* Light mode
* Reusable UI components
* Toast notifications
* Loading states
* Error handling
* Accessible components
* Consistent design system

---

# 🧰 Tech Stack

## Core Technologies

| Technology     | Purpose                                      |
| -------------- | -------------------------------------------- |
| Next.js 16     | React framework and application architecture |
| React 19       | UI development                               |
| TypeScript     | Type-safe development                        |
| Tailwind CSS 4 | Styling and responsive design                |
| shadcn/ui      | Reusable UI components                       |
| Radix UI       | Accessible UI primitives                     |

## Forms & Validation

| Technology          | Purpose                             |
| ------------------- | ----------------------------------- |
| React Hook Form     | Form state management               |
| Zod                 | Schema validation                   |
| @hookform/resolvers | React Hook Form and Zod integration |

## UI & Utilities

| Technology               | Purpose                          |
| ------------------------ | -------------------------------- |
| Lucide React             | Icons                            |
| React Icons              | Additional icons                 |
| Sonner                   | Toast notifications              |
| next-themes              | Theme management                 |
| date-fns                 | Date formatting and manipulation |
| clsx                     | Conditional class names          |
| tailwind-merge           | Tailwind class merging           |
| class-variance-authority | Component variants               |

## Development Tools

| Technology                  | Purpose                |
| --------------------------- | ---------------------- |
| TypeScript                  | Static type checking   |
| ESLint                      | Code linting           |
| Prettier                    | Code formatting        |
| prettier-plugin-tailwindcss | Tailwind class sorting |
| pnpm                        | Package management     |

---

# 📦 Package Versions

### Dependencies

```json
{
  "@hookform/resolvers": "^5.7.1",
  "@types/jsonwebtoken": "^9.0.10",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "date-fns": "^4.4.0",
  "jsonwebtoken": "^9.0.3",
  "lucide-react": "^1.31.0",
  "next": "16.2.6",
  "next-themes": "^0.4.6",
  "radix-ui": "^1.6.7",
  "react": "19.2.4",
  "react-day-picker": "^10.0.1",
  "react-dom": "19.2.4",
  "react-hook-form": "^7.85.0",
  "react-icons": "^5.7.0",
  "shadcn": "^4.16.2",
  "sonner": "^2.0.8",
  "tailwind-merge": "^3.6.0",
  "tw-animate-css": "^1.4.0",
  "zod": "^4.4.3"
}
```

### Dev Dependencies

```json
{
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.2.6",
  "prettier": "^3.8.3",
  "prettier-plugin-tailwindcss": "^0.8.0",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

---

# 🏗️ Project Structure

The project uses the **Next.js App Router** and does not use a `src/` directory.

```text
fix-it-now-frontend/
│
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── (dashboardGroup)/
│   │   ├── dashboard/
│   │   ├── admin-dashboard/
│   │   └── technician-dashboard/
│   │
│   ├── service/
│   │   └── [id]/
│   │
│   ├── technician/
│   │   └── [id]/
│   │
│   ├── payment/
│   │   ├── success/
│   │   └── cancel/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   └── ...
│
├── lib/
│   ├── actions/
│   ├── types/
│   └── ...
│
├── public/
│   └── ...
│
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prettier.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

> The exact file structure may change as the project evolves, but the application follows the Next.js App Router architecture with feature-specific routes, reusable components, and centralized API actions.

---

# 🔌 API Integration

The frontend communicates with the FixItNow backend through REST API endpoints.

API calls are organized into dedicated action files to keep API communication separate from UI components.

---

## 🔐 Authentication API

| Method | Endpoint             | Frontend Function | Used In           |
| ------ | -------------------- | ----------------- | ----------------- |
| `POST` | `/api/auth/register` | `registerAction`  | `/register`       |
| `POST` | `/api/auth/login`    | `loginAction`     | `/login`          |
| `GET`  | `/api/auth/me`       | `getProfile`      | Navbar, Dashboard |

---

## 👥 User & Admin API

| Method  | Endpoint               | Frontend Function  | Used In     |
| ------- | ---------------------- | ------------------ | ----------- |
| `GET`   | `/api/admin/users`     | `getAllUsers`      | Admin Users |
| `PATCH` | `/api/admin/users/:id` | `updateUserStatus` | Admin Users |

---

## 🗂️ Category API

| Method | Endpoint          | Frontend Function | Used In                   |
| ------ | ----------------- | ----------------- | ------------------------- |
| `GET`  | `/api/categories` | `getAllCategory`  | Services, Admin           |
| `POST` | `/api/categories` | `createCategory`  | Admin Category Management |

---

## 🛠️ Service API

| Method | Endpoint            | Frontend Function  | Used In                |
| ------ | ------------------- | ------------------ | ---------------------- |
| `GET`  | `/api/services`     | `getAllServices`   | `/service`             |
| `GET`  | `/api/services/:id` | `getSingleService` | `/service/:id`         |
| `POST` | `/api/services`     | `createService`    | Admin Service Creation |

---

## 👨‍🔧 Technician API

| Method  | Endpoint                  | Frontend Function         | Used In            |
| ------- | ------------------------- | ------------------------- | ------------------ |
| `GET`   | `/api/technician`         | `getAllTechnician`        | `/technician`      |
| `GET`   | `/api/technician/:id`     | `getSingleTechnician`     | `/technician/:id`  |
| `PATCH` | `/api/technician/profile` | `updateTechnicianProfile` | Technician Profile |

---

## 📅 Booking API

| Method  | Endpoint                   | Frontend Function             | Used In              |
| ------- | -------------------------- | ----------------------------- | -------------------- |
| `POST`  | `/api/bookings`            | `createBooking`               | Service / Technician |
| `GET`   | `/api/bookings`            | `getMyBookings`               | Customer Dashboard   |
| `PATCH` | `/api/bookings/:id/cancel` | `cancelBooking`               | Customer Dashboard   |
| `GET`   | `/api/admin/bookings`      | `getAllBookings`              | Admin Dashboard      |
| `GET`   | `/api/bookings/technician` | `getAllBookingsForTechnician` | Technician Dashboard |
| `PATCH` | `/api/bookings/:id`        | `updateBookingStatus`         | Technician Dashboard |

---

## 💳 Payment API

| Method | Endpoint            | Frontend Function   | Used In            |
| ------ | ------------------- | ------------------- | ------------------ |
| `POST` | `/api/payment/init` | `makePayment`       | Customer Dashboard |
| `GET`  | `/api/payment`      | `getMyPayments`     | Payment History    |
| `GET`  | `/api/payments/:id` | `getPaymentDetails` | Payment Success    |

---

## ⭐ Review API

| Method | Endpoint       | Frontend Function | Used In            |
| ------ | -------------- | ----------------- | ------------------ |
| `POST` | `/api/reviews` | `makeReview`      | Customer Dashboard |

---

# 📊 API Overview

```text
Authentication
│
├── Register
├── Login
└── Current User

Users
│
├── Get All Users
└── Update User Status

Categories
│
├── Get Categories
└── Create Category

Services
│
├── Get Services
├── Get Single Service
└── Create Service

Technicians
│
├── Get Technicians
├── Get Single Technician
└── Update Technician Profile

Bookings
│
├── Create Booking
├── Get Customer Bookings
├── Cancel Booking
├── Get Admin Bookings
├── Get Technician Bookings
└── Update Booking Status

Payments
│
├── Initialize Payment
├── Get Payment History
└── Get Payment Details

Reviews
│
└── Create Review
```

---

# 🔄 Booking Workflow

The customer booking workflow follows this process:

```text
Browse Services / Technicians
            │
            ▼
       Select Service
            │
            ▼
       Create Booking
            │
            ▼
      REQUESTED
            │
            ▼
 Technician Reviews Request
            │
       ┌────┴────┐
       ▼         ▼
   ACCEPTED    DECLINED
       │
       ▼
      PAYMENT
       │
       ▼
       PAID
       │
       ▼
   IN_PROGRESS
       │
       ▼
    COMPLETED
       │
       ▼
      REVIEW
```

---

# 📌 Booking Statuses

The application supports the following booking statuses:

```text
REQUESTED
ACCEPTED
DECLINED
PAID
IN_PROGRESS
COMPLETED
CANCELLED
```

These statuses are displayed across customer, technician, and admin dashboards.

---

# 💰 Payment Workflow

The payment flow works through the backend payment API.

```text
Customer
   │
   ▼
Click "Pay"
   │
   ▼
Frontend
   │
   ▼
POST /api/payment/init
   │
   ▼
Backend Initializes Payment
   │
   ▼
Payment Gateway
   │
   ▼
Customer Completes Payment
   │
   ▼
Payment Result
   │
   ├───────────────┐
   ▼               ▼
Success          Cancel
   │               │
   ▼               ▼
Payment         Payment
Success Page    Cancel Page
```

---

# 📝 Form Validation

Forms are implemented using:

```text
React Hook Form
       +
Zod
       +
@hookform/resolvers
```

This provides:

* Type-safe validation
* Client-side validation
* Reusable validation schemas
* Controlled form state
* Validation error handling
* Better user experience

> Client-side validation improves user experience, while the backend remains responsible for final data validation and security.

---

# 🎨 Design System

The project uses **shadcn/ui** together with **Radix UI** to build reusable and accessible components.

The UI system is based on:

* Tailwind CSS
* shadcn/ui
* Radix UI
* Lucide React
* React Icons
* Tailwind Merge
* Class Variance Authority

This approach allows consistent components and styling across all dashboards and application pages.

---

# 🌓 Theme Support

FixItNow supports:

* ☀️ Light Mode
* 🌙 Dark Mode

Theme management is handled using `next-themes`.

---

# 📱 Responsive Design

The application is designed to provide a consistent experience across:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop screens

Responsive layouts are implemented primarily using Tailwind CSS.

---

# ⚙️ Getting Started

## Prerequisites

Before running the project, make sure you have installed:

* [Node.js](https://nodejs.org/)
* [pnpm](https://pnpm.io/)
* Git

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd fix-it-now-frontend
```

---

## 2. Install Dependencies

```bash
pnpm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

Add any additional environment variables required by your backend integration.

> Never commit `.env.local` or any file containing sensitive credentials to GitHub.

---

## 4. Start the Development Server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

# 🏭 Production Build

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

---

# 🧹 Code Quality

Run ESLint:

```bash
pnpm lint
```

Format the project:

```bash
pnpm prettier --write .
```

---

# ☁️ Deployment

The frontend is deployed using **Vercel**.

### Production URL

https://fix-it-now-frontend-six.vercel.app/

For production deployment:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.
5. Verify the backend API URL is correctly configured.

---

# 🔒 Security

The frontend follows standard security practices, including:

* Environment variables for API configuration
* Protected dashboard routes
* Role-based application access
* Client-side form validation
* Backend-side validation
* No sensitive credentials committed to source control

> Authentication, authorization, and sensitive business logic should always be enforced by the backend. Client-side restrictions alone should not be considered a security boundary.

---

# 🚧 Future Improvements

Potential improvements for future versions include:

* Real-time booking notifications
* Real-time booking status updates
* Advanced service filtering
* Technician availability scheduling
* Customer-technician messaging
* Email notifications
* Admin analytics dashboard
* Advanced booking calendar
* Enhanced payment tracking
* Automated testing
* Performance optimization
* Progressive Web App support

---

# 👨‍💻 Author

## Md Meiad Khan

**Software Engineering Student | Full-Stack Developer**

### Primary Technologies

```text
Next.js
React
TypeScript
Node.js
Express.js
PostgreSQL
Prisma
REST API
Tailwind CSS
shadcn/ui
JWT Authentication
Payment Integration
```

---

# ⭐ Project Highlights

FixItNow demonstrates a production-oriented frontend architecture for a service marketplace with:

* ✅ Next.js App Router
* ✅ React 19
* ✅ TypeScript
* ✅ Role-based dashboards
* ✅ REST API integration
* ✅ Authentication
* ✅ Service management
* ✅ Technician management
* ✅ Booking management
* ✅ Payment integration
* ✅ Review system
* ✅ Admin management
* ✅ Responsive design
* ✅ Dark / Light mode
* ✅ Type-safe forms
* ✅ Zod validation
* ✅ React Hook Form
* ✅ shadcn/ui
* ✅ Tailwind CSS
* ✅ Vercel deployment

---

## 📄 License

This project was developed for educational, learning, and portfolio purposes.

---
