# Souvik's Portfolio

A modern, responsive **full-stack developer portfolio** built with React, Vite, and Tailwind CSS. Features a dark/light mode toggle, smooth animations, filterable project cards, and a functional contact form.

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Motion (Framer)](https://motion.dev/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Contact Form** | [EmailJS](https://www.emailjs.com/) |
| **Router** | [React Router v7](https://reactrouter.com/) |

---

## 📁 File Structure

```
figma ai/
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite + Tailwind + React config
├── package.json
├── .gitignore
│
└── src/
    ├── main.tsx                # React app bootstrap
    ├── index.css               # Global styles (imports below)
    ├── fonts.css               # Google Fonts
    ├── tailwind.css            # Tailwind + tw-animate-css imports
    ├── theme.css               # CSS variables / design tokens
    │
    └── app/
        ├── App.tsx             # Root component (wraps ThemeProvider)
        └── components/
            ├── Navbar.tsx          # Sticky nav with active-section tracking
            ├── Hero.tsx            # Landing section with typewriter effect
            ├── About.tsx           # Bio + stats cards + GitHub activity grid
            ├── Skills.tsx          # Tech stack display
            ├── Projects.tsx        # Filterable project cards
            ├── Contact.tsx         # Contact form (EmailJS) + info cards
            ├── Footer.tsx          # Links + back-to-top
            ├── ThemeContext.tsx     # Dark / light mode context
            └── ui/                 # shadcn/ui component library
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd "figma ai"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

---

## 📧 Contact Form Setup (EmailJS)

The contact form uses **EmailJS** to deliver messages directly to your Gmail — no backend needed.

1. Create a free account at [https://emailjs.com](https://emailjs.com)
2. Add an **Email Service** → connect your Gmail (`deysouvik023@gmail.com`)
3. Create an **Email Template** using these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{message}}` — message body
4. Open `src/app/components/Contact.tsx` and fill in the three constants at the top:

```ts
const EMAILJS_SERVICE_ID  = "service_XXXXXXX";   // from EmailJS Dashboard
const EMAILJS_TEMPLATE_ID = "template_XXXXXXX";  // from Email Templates tab
const EMAILJS_PUBLIC_KEY  = "XXXXXXXXXXXX";       // Account > API Keys
```

---

## 📬 Contact

**Email:** deysouvik023@gmail.com  
**GitHub:** [github.com/souvik2812](https://github.com/souvik2812)  
**LinkedIn:** [linkedin.com/in/souvik2812](https://www.linkedin.com/in/souvik2812/)

---

> Made with ❤️ by Souvik
