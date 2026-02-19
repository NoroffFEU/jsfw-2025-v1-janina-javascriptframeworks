# JavaScript Frameworks Course Assignment  
Online Shop – Next.js + TypeScript

## Project Overview

This project is a fully functional online shop built with **Next.js (App Router)** and **TypeScript** as part of the Noroff JavaScript Frameworks course assignment.

The application integrates with the Noroff Online Shop REST API and demonstrates:

- API integration
- State management
- Search and sorting behaviour
- Shopping cart functionality
- Form validation
- Responsive UI design
- Type-safe architecture using strict TypeScript

---

## Live Demo

Deployed site:  
https://nimble-gnome-ae2283.netlify.app

---

## Tech Stack

- **Next.js**
- **React**
- **TypeScript (strict mode)**
- **Zustand** (cart state management)
- REST API integration (GET /online-shop, GET /online-shop/<id>)

---

## Features

### Product Listing
- Fetches products from `GET /online-shop`
- Displays:
  - Image
  - Title
  - Price
  - Discounted price (with strike-through)
  - Rating
  - Discount percentage badge

### Product Details Page
- Fetches product data from `GET /online-shop/<id>`
- Displays:
  - Title
  - Description
  - Image
  - Price (original + discounted)
  - Rating
  - Reviews (if available)
  - Tags (if available)
- Add to Cart with toast notification

### Search & Sorting
- Live search filtering
- Clickable search result dropdown
- Sorting by:
  - Title
  - Price (ascending/descending)
  - Rating

### Shopping Cart
- Persistent state across the application
- Item count indicator in header
- Adjustable quantity
- Remove item with toast notification
- Total cost calculation
- Checkout success page that clears cart

### Contact Page
TypeScript-based validation:
- Full Name (min 3 characters)
- Subject (min 3 characters)
- Email (valid format)
- Message (min 10 characters)
- Displays validation errors

### Error & Loading Handling
- Global loading UI
- Graceful error handling using App Router error boundary

---

## Project Structure
src/
├── app/
├── components/
├── services/
├── stores/
├── types/


- `services/` – API communication
- `stores/` – Zustand cart state
- `types/` – TypeScript interfaces
- `components/` – Reusable UI components
- `app/` – Route structure (App Router)

---

## Installation & Development

Clone the repository:

``bash
git clone <your-repository-url>
cd <project-folder>
Install dependencies:
npm install
Run development server:
npm run dev

Open:

http://localhost:3000

---

## Assignment Compliance

This project follows the course brief requirements:

- React/Next.js framework
- TypeScript with strict typing
- Correct API usage
- Search and sorting functionality
- Complete cart system
- Checkout success flow
- Validated contact form
- Responsive design
- Proper project structure
- Version control with descriptive commits

---

## AI Usage (Required by Brief)

AI tools (ChatGPT) were used only for allowed purposes:

- Brainstorming structure and UI flow
- Understanding framework and TypeScript concepts
- Debugging assistance
- Reviewing assignment compliance against the brief

All AI usage is documented in **AI_LOG.md**.

All code has been reviewed, integrated, and can be explained line-by-line.