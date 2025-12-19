# VR4Deaf - VR Agency Platform

**The #1 AI Platform for VR Workforce Agencies, LGBTQ+ Organizations, and Deaf Services**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)

## 🌟 Overview

VR4Deaf is a comprehensive AI-powered platform designed specifically for vocational rehabilitation agencies, LGBTQ+ organizations, and Deaf services providers. Built with accessibility-first principles and Deaf-first design, this platform streamlines case management, automates reporting, and leverages AI to improve employment outcomes.

## ✨ Key Features

### 🏢 Multi-Tenant Agency Dashboard
- Real-time case statistics and metrics
- Role-based views (Admin, Supervisor, Counselor, Client)
- Activity feed showing recent updates
- Agency switcher for multi-agency access
- Fully accessible with ARIA labels and keyboard navigation
- Visual-only notifications (Deaf-first design)

### 📁 Comprehensive Case Management
- Complete case lifecycle tracking (intake to closure)
- Filterable and sortable case lists
- Status indicators with high-contrast visual design
- Quick search functionality
- Accessibility accommodations tracker
- ASL video upload support for client statements

### 🤖 AI-Powered Features
- **Job Matching**: Skills-to-jobs algorithm considering accessibility requirements, Deaf-friendly workplaces, and LGBTQ+ inclusive employers (0-100 match scoring)
- **Eligibility Screening**: Automated eligibility assessment and document checklist generation
- **Report Generation**: RSA-911 compliant report generation with JSON/CSV/HTML export

### ♿ Accessibility Excellence
- **WCAG 2.1 AA** compliant throughout
- **Deaf-First Design**: Visual notifications only, no audio dependencies
- **Full Keyboard Navigation**: Tab, Enter, Escape, Arrow keys
- **Screen Reader Optimized**: Semantic HTML with proper ARIA labels
- **High Contrast**: Optimized for visual accessibility
- **ASL Support**: Integration points for ASL interpretation services

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account for backend
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/pinkycollie/vr4deaf.git
cd vr4deaf

# Install dependencies
cd client
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Database Setup

The platform uses Supabase (PostgreSQL) for data storage. See [`docs/database-schema.md`](docs/database-schema.md) for the complete schema with row-level security policies.

Key tables:
- `agencies` - VR agencies, LGBTQ+ organizations, Deaf services providers
- `users` - Role-based users with accessibility preferences
- `cases` - Vocational rehabilitation cases
- `services` - Services provided to clients

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI Components**: Radix UI (accessible components)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts (accessible data visualization)
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)

### Key Components

```
client/src/
├── components/
│   ├── dashboard/
│   │   ├── AgencyDashboard.tsx      # Main dashboard with metrics
│   │   ├── AgencySelector.tsx       # Multi-agency switcher
│   │   └── DashboardMetrics.tsx     # Charts and compliance status
│   └── case-management/
│       └── CaseList.tsx              # Case listing with filters
├── services/
│   └── ai/
│       ├── AIJobMatcher.ts           # Job matching algorithm
│       ├── AIEligibilityScreener.ts  # Eligibility assessment
│       └── AIReportGenerator.ts      # RSA-911 report generation
└── test/
    └── setup.ts                      # Test configuration
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

All components include accessibility tests and keyboard navigation validation.

## 🎨 Example Usage

### Dashboard with Role-Based Views
```tsx
import AgencyDashboard from './components/dashboard/AgencyDashboard';

function App() {
  return (
    <AgencyDashboard 
      userRole="counselor" 
      userName="Jane Doe"
      agencyName="Demo VR Agency"
    />
  );
}
```

### AI Job Matching
```typescript
import { findMatchingJobs, ClientProfile, Job } from './services/ai/AIJobMatcher';

const clientProfile: ClientProfile = {
  id: '1',
  skills: ['JavaScript', 'React', 'TypeScript'],
  qualifications: ['Bachelor in CS'],
  accessibilityNeeds: {
    isDeaf: true,
    requiresASLInterpreter: true
  },
  preferences: {
    lgbtqInclusive: true,
    remoteWork: true
  }
};

const matches = await findMatchingJobs(clientProfile, jobs, 80);
// Returns jobs scored 80+ on compatibility
```

### RSA-911 Report Generation
```typescript
import { generateRSA911Report, exportReport } from './services/ai/AIReportGenerator';

const report = generateRSA911Report(cases, 'Q4 2025', 'Agency Name');
const html = exportReport(report, 'html'); // Accessible HTML export
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

### Code Style

- TypeScript for type safety
- ESLint + Prettier for code formatting
- Accessibility-first component design
- Comprehensive test coverage

## 📖 Documentation

- [Database Schema](docs/database-schema.md) - Complete Supabase schema
- [Architecture](ARCHITECTURE.md) - 25-year vision and technical architecture
- [Migration Guide](MIGRATION_TO_VR4DEAF.md) - History of project migration

## 🤝 Contributing

Contributions are welcome! This project prioritizes:
1. Accessibility (WCAG 2.1 AA minimum)
2. Deaf-first design principles
3. LGBTQ+ inclusivity
4. Open source transparency

## 🔒 Security

- Row-level security (RLS) in Supabase
- Environment variables for sensitive data
- HTTPS/TLS for all connections
- Regular security audits via GitHub Actions

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details

## 🌈 History

This project originated from PR #25 in the [mbtq-dev repository](https://github.com/pinkycollie/mbtq-dev). It has been moved to its own dedicated repository to focus specifically on vocational rehabilitation agency needs while allowing mbtq-dev to maintain its focus as an AI development platform.

## 💖 Acknowledgments

Built with ❤️ for:
- **VR Agencies**: Supporting employment outcomes for people with disabilities
- **Deaf Community**: Designed with Deaf-first principles and ASL support
- **LGBTQ+ Community**: Inclusive data collection and employer matching
- **Accessibility Advocates**: WCAG 2.1 AA compliant throughout

---

**Community. Culture. Power. 💜**

[![Accessibility First](https://img.shields.io/badge/♿-Accessibility%20First-blue)]()
[![Deaf-First Design](https://img.shields.io/badge/🤟-Deaf--First%20Design-purple)]()
[![LGBTQ+ Inclusive](https://img.shields.io/badge/🏳️‍🌈-LGBTQ%2B%20Inclusive-rainbow)]()
