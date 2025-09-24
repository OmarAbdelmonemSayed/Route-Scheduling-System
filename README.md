# Route-Scheduling-System

A simple API for managing drivers, routes, and schedules using **Node.js**, **Express**, and **Prisma (SQLite)**.

---

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   npm install
3. Apply Prisma migrations:
   npx prisma migrate dev --name init
4. Start the development server:
   npm run dev
5. The API will be available at:
   http://localhost:3000

---

## Assumptions Made

- A driver can only be assigned to one active route at a time.
- `availability = true` → driver is free to take new routes.
- When a route is finished, the driver automatically becomes available again.
- Route statuses:
  - `UNASSIGNED` → No driver available at assignment.
  - `ACTIVE` → Driver assigned and currently handling the route.
  - `COMPLETED` → Route finished and driver freed.
- License types follow standard categories:
  - A → Motorcycle
  - B → Car / small vehicles
  - C → Truck / heavy vehicles
  - D → Bus
  - E → Trailer / articulated vehicles

---

## Features Implemented

- Add drivers with license type and availability status.
- Create routes:
  - Automatically assigns an available driver.
  - Marks route as `UNASSIGNED` if no driver is available.
- View schedule of drivers and their assigned routes.
- Retrieve driver history of completed routes.
- Mark a route as finished → frees the driver for new assignments.
- Support for listing routes with pagination.

---

## Database Schema
### Driver
- `id` (PK, UUID)  
- `name` (string)  
- `licenseType` (enum: `A`, `B`, `C`, `D`, `E`)  
- `availability` (boolean, default = true)  
- `routes` (relation → Route[])  

### Route
- `id` (PK, UUID)  
- `startLocation` (string)  
- `endLocation` (string)  
- `distance` (int, km)  
- `estimatedTime` (int, hours)  
- `status` (enum: `UNASSIGNED`, `ACTIVE`, `COMPLETED`, default = `UNASSIGNED`)  
- `driverId` (FK, nullable)  
- `driver` (relation → Driver)  
