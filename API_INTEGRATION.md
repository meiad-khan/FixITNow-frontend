# API Integration Documentation

## FixItNow Frontend

This document describes the backend API endpoints integrated into the FixItNow frontend application.

| Endpoint | Called From | UI / Page |
|---|---|---|
| `POST /api/auth/register` | `authActions.ts → registerAction` | `/register` |
| `POST /api/auth/login` | `authActions.ts → loginAction` | `/login` |
| `GET /api/auth/me` | `getProfile.ts → getProfile` | Navbar, Dashboard |
| `GET /api/admin/users` | `adminDashboard.ts → getAllUsers` | `/dashboard/admin/users` |
| `PATCH /api/admin/users/:id` | `updateStatus.ts → updateUserStatus` | `/dashboard/admin/users` |
| `GET /api/categories` | `serviceActions.ts → getAllCategory` | `/service`, Admin Category Management |
| `POST /api/categories` | `create-category.ts → createCategory` | `/admin-dashboard/category`, Create category modal |
| `GET /api/services` | `serviceActions.ts → getAllServices` | `/service` |
| `GET /api/services/:id` | `serviceActions.ts → getSingleService` | `/service/:id` |
| `POST /api/services` | `create-service.ts → createService` | `/admin-dashboard/create-service` Admin Service Create Page |
| `GET /api/technician` | `technicianActions.ts → getAllTechnician` | `/technician` |
| `GET /api/technician/:id` | `technicianActions.ts → getSingleTechnician` | `/technician/:id` |
| `PATCH api/technician/profile` | `update-profile.ts → updateTechnicianProfile` | `/technician-dashboard/profile` |
| `POST /api/bookings` | `bookingActions.ts → createBooking` | `/service/:id`, `/technician/:id` |
| `GET api/bookings` | `customerDashboard.ts → getMyBookings` | Customer Dashboard |
| `GET /api/admin/bookings` | `adminDashboard.ts → getAllBookings` | Admin Dashboard |
| `GET /api/bookings/technician` | `technician-bookings.ts → getAllBookingsForTechnician` | `/technician-dashboard/bookings` |
| `PATCH /api/bookings/:id` | `updateBookingStatus.ts → updateBookingStatus` | Technician Dashboard |
| `POST /api/payment/init` | `customerDashboard.ts → makePayment` | Customer Dashboard / Pay Button |
| `GET /api/payment` | `customerDashboard.ts → getMyPayments` | `/dashboard/payments` |
| `GET /api/payments/:id` | `customerDashboard.ts → getPaymentDetails` | `/dashboard/payment-success` |
| `POST /api/reviews` | `customerDashboard.ts → makeReview` | `/dashboard` |

