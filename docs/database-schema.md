# 🗄️ Database Schema Documentation

## Overview

This document describes the Supabase database schema for the MBTQ.dev VR Agency Platform. The schema is designed to support multi-tenant agency operations with a focus on vocational rehabilitation, LGBTQ+ services, and Deaf community support.

## Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Agencies   │──────<│    Users     │──────<│    Cases     │
└──────────────┘       └──────────────┘       └──────────────┘
                                                       │
                                                       │
                                              ┌────────▼────────┐
                                              │    Services     │
                                              └─────────────────┘
```

## Schema Definitions

### Agencies Table

Stores information about vocational rehabilitation agencies, LGBTQ+ organizations, and Deaf service providers.

```sql
-- Agencies table
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('VR', 'LGBTQ', 'Deaf', 'Multi')),
  branding JSONB DEFAULT '{}'::jsonb,
  settings JSONB DEFAULT '{}'::jsonb,
  contact_info JSONB DEFAULT '{}'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_agencies_type ON agencies(type);
CREATE INDEX idx_agencies_active ON agencies(active);
```

### Users Table

Stores user information with role-based access control and accessibility preferences.

```sql
-- Users with role-based access
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'supervisor', 'counselor', 'client')),
  accessibility_prefs JSONB DEFAULT '{}'::jsonb,
  notification_prefs JSONB DEFAULT '{}'::jsonb,
  active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_users_agency_id ON users(agency_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
```

### Cases Table

Stores vocational rehabilitation cases with comprehensive tracking.

```sql
-- Cases
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number TEXT UNIQUE NOT NULL,
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  counselor_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  supervisor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('intake', 'assessment', 'planning', 'services', 'employment', 'follow_up', 'closed')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  accessibility_needs JSONB DEFAULT '{}'::jsonb,
  demographics JSONB DEFAULT '{}'::jsonb,
  eligibility JSONB DEFAULT '{}'::jsonb,
  goals JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  opened_at TIMESTAMPTZ DEFAULT now(),
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_cases_agency_id ON cases(agency_id);
CREATE INDEX idx_cases_client_id ON cases(client_id);
CREATE INDEX idx_cases_counselor_id ON cases(counselor_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_priority ON cases(priority);
CREATE INDEX idx_cases_case_number ON cases(case_number);
```

### Services Table

Tracks services provided to clients as part of their vocational rehabilitation plan.

```sql
-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN (
    'assessment',
    'counseling',
    'job_training',
    'job_placement',
    'education',
    'assistive_technology',
    'interpreter_services',
    'transportation',
    'mental_health',
    'other'
  )),
  service_name TEXT NOT NULL,
  provider TEXT,
  status TEXT NOT NULL CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  start_date DATE,
  end_date DATE,
  cost DECIMAL(10, 2),
  funding_source TEXT,
  outcomes JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_services_case_id ON services(case_id);
CREATE INDEX idx_services_service_type ON services(service_type);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_start_date ON services(start_date);
```

## Row Level Security (RLS) Policies

### Agencies RLS

```sql
-- Enable RLS on agencies
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;

-- Users can only see their own agency
CREATE POLICY "Users can view their own agency"
  ON agencies FOR SELECT
  USING (id = (SELECT agency_id FROM users WHERE users.id = auth.uid()));
```

### Users RLS

```sql
-- Enable RLS on users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can view others in their agency
CREATE POLICY "Users can view agency members"
  ON users FOR SELECT
  USING (agency_id = (SELECT agency_id FROM users WHERE users.id = auth.uid()));
```

### Cases RLS

```sql
-- Enable RLS on cases
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Users can view cases in their agency
CREATE POLICY "Users can view agency cases"
  ON cases FOR SELECT
  USING (agency_id = (SELECT agency_id FROM users WHERE users.id = auth.uid()));
```

## Database Functions

### Update Updated_At Timestamp

```sql
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_agencies_updated_at
  BEFORE UPDATE ON agencies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

**Last Updated**: 2025-12-19  
**Schema Version**: 1.0.0  
**Compatible With**: Supabase PostgreSQL 15+
