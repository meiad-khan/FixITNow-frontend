# API Integration Documentation

## FixItNow Frontend

This document describes the backend API endpoints integrated into the FixItNow frontend application.

| Endpoint | Called From | UI / Page |
|---|---|---|
| `POST /auth/register` | `authActions.ts → registerAction` | `/register` |
| `POST /auth/login` | `authActions.ts → loginAction` | `/login` |
| `POST /auth/logout` | `authActions.ts → logoutAction` | Navbar / Logout Button |
| `GET /users/me` | `getMe.ts → getMe` | Navbar, Dashboard |
| `GET /users` | `getAllUsers.ts → getAllUsers` | `/dashboard/admin/users` |
| `PATCH /users/:id` | `updateUser.ts → updateUser` | `/dashboard/admin/users` |
| `GET /categories` | `getCategories.ts → getCategories` | `/services`, Admin Category Management |
| `GET /categories/:id` | `getCategory.ts → getCategory` | Category Details / Edit Page |
| `POST /categories` | `categoryActions.ts → createCategoryAction` | `/dashboard/admin/categories/create` |
| `PATCH /categories/:id` | `categoryActions.ts → updateCategoryAction` | Category Edit Form |
| `DELETE /categories/:id` | `categoryActions.ts → deleteCategoryAction` | Admin Category Management |
| `GET /services` | `getServices.ts → getServices` | `/services`, Home Page |
| `GET /services/:id` | `getService.ts → getService` | `/services/:id` |
| `POST /services` | `serviceActions.ts → createServiceAction` | Admin Service Create Page |
| `PATCH /services/:id` | `serviceActions.ts → updateServiceAction` | Admin Service Edit Page |
| `DELETE /services/:id` | `serviceActions.ts → deleteServiceAction` | Admin Service Management |
| `GET /technicians` | `getTechnicians.ts → getTechnicians` | `/technicians` |
| `GET /technicians/:id` | `getTechnician.ts → getTechnician` | `/technicians/:id` |
| `GET /technicians/me` | `getMyTechnicianProfile.ts → getMyTechnicianProfile` | Technician Dashboard |
| `PATCH /technicians/me` | `technicianActions.ts → updateTechnicianProfileAction` | Technician Profile Page |
| `PATCH /technicians/me/availability` | `technicianActions.ts → updateAvailabilityAction` | Technician Availability Scheduler |
| `POST /bookings` | `bookingActions.ts → createBookingAction` | Service / Technician Booking Form |
| `GET /bookings/my` | `getMyBookings.ts → getMyBookings` | Customer Dashboard |
| `GET /bookings` | `getAllBookings.ts → getAllBookings` | Admin Dashboard |
| `GET /bookings/technician` | `getTechnicianBookings.ts → getTechnicianBookings` | Technician Booking Management |
| `GET /bookings/:id` | `getBookingDetails.ts → getBookingDetails` | Booking Details Page |
| `PATCH /bookings/:id/status` | `bookingActions.ts → updateBookingStatusAction` | Technician Booking Management |
| `PATCH /bookings/:id/cancel` | `bookingActions.ts → cancelBookingAction` | Customer Booking History |
| `POST /payments/checkout/:bookingId` | `paymentActions.ts → checkoutAction` | Customer Dashboard / Pay Button |
| `GET /payments/my` | `getMyPayments.ts → getMyPayments` | `/dashboard/payments` |
| `GET /payments/:id` | `getPaymentDetails.ts → getPaymentDetails` | `/dashboard/payment-success` |
| `POST /reviews` | `reviewActions.ts → createReviewAction` | Completed Booking Review Form |
| `GET /reviews` | `getReviews.ts → getReviews` | Service / Technician Details |
| `GET /admin/dashboard` | `getAdminDashboard.ts → getAdminDashboard` | `/dashboard/admin` |
| `GET /technician/dashboard` | `getTechnicianDashboard.ts → getTechnicianDashboard` | `/dashboard/technician` |

## Authentication Flow

1. A new user registers through the `/register` page.
2. The frontend sends a request to `POST /auth/register`.
3. Existing users log in through `/login` using `POST /auth/login`.
4. Protected routes use `GET /users/me` to retrieve the currently authenticated user.
5. If an unauthenticated user tries to access a protected page, they are redirected to `/login`.
6. After successful login, the user is redirected back to the originally requested page.

## Booking Flow

1. The customer browses available services.
2. The customer selects a service and technician.
3. The customer selects an available date and time.
4. The frontend creates the booking using `POST /bookings`.
5. The booking appears in the customer dashboard.
6. The technician manages the booking status from the technician dashboard.
7. The customer can cancel eligible bookings.
8. Once payment is required, the customer starts the checkout process through `POST /payments/checkout/:bookingId`.

## Payment Flow

1. The customer selects the **Pay** option for an eligible booking.
2. The frontend calls `POST /payments/checkout/:bookingId`.
3. The user is redirected to the payment provider.
4. After successful payment, the user returns to `/dashboard/payment-success`.
5. Payment information is retrieved using `GET /payments/:id`.
6. Payment history is available through `GET /payments/my`.

## Role-Based API Usage

### Customer

- Browse categories, services, and technicians.
- Create bookings.
- View personal booking history.
- Cancel eligible bookings.
- Make payments.
- View payment history.
- Submit reviews after completed services.

### Technician

- View assigned bookings.
- Update booking status.
- Manage profile information.
- Manage service availability.
- View technician dashboard information.

### Admin

- View dashboard statistics.
- Manage users.
- Create, update, and delete categories.
- Create, update, and delete services.
- Monitor bookings and platform activity.