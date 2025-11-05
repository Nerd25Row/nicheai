# 🧠 Niche AI — Web App

**Date:** October 1, 2025

## 📘 Overview

The **Niche AI Web App** is a production-ready B2B application enabling users to sign up, manage their accounts, test AI image models for image segmentation, fusion or immersion and visualize API usage data. 

**Figma Design:**
[👉 Niche Tech AI Wireframes & Assets](https://www.figma.com/design/YbkTNVGMrU5p3YxSl2Ureb/Niche-Tech-AI?node-id=4142-4412&t=3SDu0lpS33T5PWnS-0)

---

## 🚀 Tech Stack

| Technology                     | Purpose                                            |
| ------------------------------ | -------------------------------------------------- |
| **React (TypeScript)**         | Reliable, scalable frontend                        |
| **Vite**                       | Fast, lightweight build tool                       |
| **Supabase (Auth + DB)**       | Authentication, trial tracking, API key management |
| **React Query (TanStack)**     | Data fetching & caching for Supabase/API           |
| **Zustand / Context API**      | Lightweight state management                       |
| **React Hook Form + Zod**      | Robust forms & schema validation                   |
| **TailwindCSS**                | Rapid, consistent styling                          |
| **React Router v6**            | Navigation (Auth → Dashboard → Models → Gallery)   |
| **Framer Motion** *(optional)* | Smooth UI transitions                              |
| **Cloudflare Pages**           | Deployment target (or alternative cloud provider)  |

---

## 🧩 Infrastructure & Deployment

* Pages deployed on **Cloudflare Pages** *(recommended)* or equivalent host.
* Supabase handles **authentication, database, and API tracking**.
* Environment variables managed via `.env` and validated with **Zod**.
* Responsive across mobile, tablet, and desktop.

---

## 📄 Web App Pages & Features

### 1. **Auth Pages**

* **Login / Signup Page**

  * Email + Google login
  * Company name setup
  * Trial started automatically after signup
* **Forgot Password / Set Password / Verify Email**

  * Secure password reset flow
  * Email verification required

---

### 2. **API Key Generation**

* Display API key and trial limits
* Explain trial API call quota and expiration
* Allow regeneration (if permitted)

---

### 3. **Main Dashboard**

* Show key metrics:

  * Total API calls used
  * Remaining API calls
  * Trial expiration date
* API usage chart (time-series from Supabase data)
* Cards for each **model family** (3 available)

  * Clicking a model card → navigates to Models Page with pre-selected model

---

### 4. **Models Page**

* Show available **AI model families**
* Upon selecting a model:

  * User uploads or captures a **selfie/image**
  * API call made to backend model endpoint using user’s API key
  * Show **processing screen** during request
  * Redirect to **Gallery/Results Page** on completion

---

### 5. **Gallery / Results Page**

* Grid of processed model outputs
* Each card shows:

  * Original image
  * Generated results (1+ variations)
* Expandable view for detailed comparison

---

### 6. **User Settings Page**

* Update profile information
* Change password
* View / Copy / Delete API key

---


## 🏗️ Folder Structure 

```
src/
 ┣ assets/
 ┣ components/
 ┣ constants/
 ┣ context/
 ┣ features/
 ┣ hooks/
 ┣ layouts/
 ┣ libs/
 ┣ pages/
 ┣ schemas/
 ┣ services/
 ┣ store/
 ┣ styles/
 ┣ types/
 ┣ utils/
 ┣ App.tsx
 ┗ main.tsx
```

---

## 📦 Deployment

1. **Install dependencies**

   ```bash
   npm install
   ```
2. **Run locally**

   ```bash
   npm run dev
   ```
3. **Build for production**

   ```bash
   npm run build
   ```
4. **Deploy**

   * Cloudflare Pages → drag and drop `dist/`
   * or alternative (Vercel, Netlify, etc.)

