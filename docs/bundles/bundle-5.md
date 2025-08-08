===== FILE: src/types/hookform-resolvers.d.ts =====
`$Lang
declare module '@hookform/resolvers/yup';
``r

===== FILE: src/types/lucide-react.d.ts =====
`$Lang
declare module 'lucide-react';
``r

===== FILE: public/index.html =====
`$Lang
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

``r

===== FILE: public/manifest.json =====
`$Lang
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

``r

===== FILE: public/robots.txt =====
`$Lang
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

``r

===== FILE: README.md =====
`$Lang
# Tension - AI-Powered Psychological Platform

A sophisticated web application designed for couples, particularly those in the swinging community, who want to explore their psychological depths, understand compatibility, and discover hidden desires through AI-powered analysis.

## 🚀 Quick Start

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables** (in Vercel dashboard):
   ```
   REACT_APP_API_URL=/api
   ```

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Router DOM** for routing
- **React Hook Form** with Yup validation
- **Axios** for API communication

### Backend (Vercel API Routes)
- **Express.js** serverless functions
- **CORS** enabled for cross-origin requests
- **JWT** authentication with refresh tokens
- **Mock data** storage (in-memory for demo)

### Key Features
- ✅ **User Authentication** (Register/Login/Logout)
- ✅ **Multi-step Onboarding** with psychological questionnaire
- ✅ **AI-Powered Assessment** with dynamic questioning
- ✅ **Psychological Profiling** with behavioral analysis
- ✅ **Responsive Design** with dark theme
- ✅ **Protected Routes** and smart navigation
- ✅ **Token Management** with automatic refresh

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/validate` - Validate token
- `POST /api/auth/refresh` - Refresh token

### User Profile
- `PUT /api/users/:userId/profile` - Update profile
- `POST /api/users/:userId/complete-onboarding` - Complete onboarding

### AI Assessment
- `POST /api/ai/session/start` - Start AI session
- `POST /api/ai/questions/generate` - Generate questions
- `POST /api/ai/questions/next` - Get next question
- `POST /api/ai/analyze/answers` - Analyze answers

### Integrations
- `POST /api/integrations/sdc/connect` - Connect SDC
- `POST /api/integrations/sdc/sync` - Sync SDC profile

## 🎨 UI/UX Features

### Design System
- **Dark Theme** with gold and rose accents
- **Modern UI** with smooth animations
- **Responsive Design** for all devices
- **Accessibility** compliant (WCAG AA)

### Components
- **Multi-step Forms** with progress indicators
- **Dynamic Question Types** (multiple choice, scale, text, etc.)
- **Real-time Validation** with error handling
- **Loading States** and error boundaries

## 🔐 Security Features

### Authentication
- **JWT Tokens** with automatic refresh
- **Secure Token Storage** in localStorage
- **Token Validation** on protected routes
- **Automatic Logout** on token expiration

### Data Protection
- **CORS** configuration for cross-origin requests
- **Input Validation** on client and server
- **Error Handling** without exposing sensitive data

## 🧠 AI Features

### Psychological Assessment
- **Dynamic Question Generation** based on responses
- **Behavioral Analysis** with pattern recognition
- **Emotional Intelligence** scoring
- **Compatibility Analysis** for couples

### Question Types
- **Multiple Choice** with adaptive options
- **Scale Questions** with emotional mapping
- **Text Responses** with sentiment analysis
- **Scenario-based** questions
- **Image Choice** for visual preferences
- **Emotion Wheel** for emotional expression
- **Word Association** for psychological triggers

## 📱 User Flow

1. **Landing Page** - Introduction and call-to-action
2. **Registration/Login** - User authentication
3. **Onboarding** - Multi-step profile setup
4. **AI Assessment** - Psychological questionnaire
5. **Dashboard** - Results and insights
6. **Profile Management** - Settings and preferences

## 🚀 Deployment

### Vercel (Recommended)
- **Automatic Deployments** from Git
- **Serverless Functions** for API
- **Global CDN** for fast loading
- **Environment Variables** management

### Environment Variables
```env
REACT_APP_API_URL=/api
```

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start development: `npm start`
4. Build for production: `npm run build`

### Project Structure
```
src/
├── components/     # Reusable UI components
├── contexts/      # React Context providers
├── pages/         # Page components
├── services/      # API services
├── types/         # TypeScript definitions
└── utils/         # Utility functions

api/
└── index.js       # Vercel API routes
```

## 📈 Performance

### Optimization
- **Code Splitting** with React.lazy()
- **Image Optimization** with WebP support
- **Bundle Analysis** and tree shaking
- **Caching** strategies for static assets

### Monitoring
- **Error Tracking** with console logging
- **Performance Metrics** with web-vitals
- **User Analytics** (to be implemented)

## 🔮 Future Features

### Planned Enhancements
- [ ] **Real AI Integration** with OpenAI/Claude
- [ ] **Database Integration** (PostgreSQL/MongoDB)
- [ ] **Real-time Chat** for couples
- [ ] **Video Sessions** with AI therapist
- [ ] **Mobile App** (React Native)
- [ ] **Advanced Analytics** dashboard
- [ ] **Partner Matching** algorithm
- [ ] **Community Features** and forums

### Technical Roadmap
- [ ] **GraphQL** API for better data fetching
- [ ] **WebSocket** for real-time features
- [ ] **PWA** capabilities for offline use
- [ ] **Microservices** architecture
- [ ] **Docker** containerization
- [ ] **CI/CD** pipeline automation

## 📄 License

This project is private and proprietary. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or support, please contact the development team.

---

**Tension** - Exploring psychological depths through AI-powered analysis.
``r

===== FILE: env.example =====
`$Lang
# Tension App Environment Variables

# API Configuration
REACT_APP_API_URL=http://localhost:3000/mock-api
REACT_APP_ENVIRONMENT=development

# OpenAI Configuration (for AI services)
# IMPORTANT: Never commit real API keys! Use placeholder values in .env.example
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Authentication
REACT_APP_JWT_SECRET=your_jwt_secret_here

# External Integrations
REACT_APP_SDC_API_URL=https://api.sdc.com
REACT_APP_SDC_CLIENT_ID=your_sdc_client_id_here

# Analytics
REACT_APP_ANALYTICS_ID=your_analytics_id_here

# Error Reporting
REACT_APP_SENTRY_DSN=your_sentry_dsn_here

# Feature Flags
REACT_APP_ENABLE_DEMO_MODE=true
REACT_APP_ENABLE_PARTNER_SIMULATION=true
REACT_APP_ENABLE_SDC_INTEGRATION=false
REACT_APP_ENABLE_MOCK_MODE=true

# Privacy & Security
REACT_APP_ENCRYPTION_KEY=your_encryption_key_here
REACT_APP_SESSION_TIMEOUT=3600000

# AI Model Configuration
REACT_APP_DEFAULT_AI_MODEL=gpt-3.5-turbo
REACT_APP_PREMIUM_AI_MODEL=gpt-4
REACT_APP_MAX_TOKENS_PER_REQUEST=2000
REACT_APP_TOKEN_OPTIMIZATION_ENABLED=true

# Development Settings
REACT_APP_DEBUG_MODE=true
REACT_APP_MOCK_AUTHENTICATION=true
REACT_APP_SKIP_REAL_API=true
``r

===== FILE: src/reportWebVitals.ts =====
`$Lang
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

``r

===== FILE: src/setupTests.ts =====
`$Lang
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

``r

===== FILE: src/App.test.tsx =====
`$Lang
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

``r

