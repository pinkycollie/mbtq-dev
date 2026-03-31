# MBTQ Foundational Factory: Infrastructure & Endpoints

This document maps the federated infrastructure components for `@mbtq-dev` and `@deaf-first`.

## 1. Core Supabase Projects

### 🏥 PATHWAY API (Primary Core)
- **Project Ref**: `hhgmgvhrmebkiscphirp`
- **Region**: `us-east-1`
- **Purpose**: Identity (DeafAuth), Trust (Fibonrose), and Centralized Profiles.

### 🔄 PinkSync API (Real-time & Real-time Edge)
- **Project Ref**: `ubvtrnhabtlpznqbuzrx`
- **Region**: `us-east-2`
- **Purpose**: Pulse Synchronization, Visual Alerts, and Handshake Metadata.

---

## 2. Technical Endpoints (Federated Standards)

All services follow the MBTQ standard endpoint structure to ensure S3 interoperability and database consistency.

### 🗄️ Database (Postgres)
Direct connection for engineering foundry services:
- **Host**: `db.[PROJECT_REF].supabase.co`
- **Port**: `5432` (Direct) / `6543` (Transaction Pooler)
- **Pathway DB**: `db.hhgmgvhrmebkiscphirp.supabase.co`
- **PinkSync DB**: `db.ubvtrnhabtlpznqbuzrx.supabase.co`

### 📦 Storage & S3 Interoperability
Supabase Storage is S3-compatible, allowing MBTQ tools to use standard S3 SDKs.
- **API URL**: `https://[PROJECT_REF].supabase.co/storage/v1`
- **S3 Endpoint**: `https://[PROJECT_REF].supabase.co/storage/v1/s3`
- **Region**: `us-east-1` (Pathway) / `us-east-2` (PinkSync)

#### Pathway API Storage
- **Base**: `https://hhgmgvhrmebkiscphirp.supabase.co/storage/v1`
- **S3**: `https://hhgmgvhrmebkiscphirp.supabase.co/storage/v1/s3`

#### PinkSync API Storage
- **Base**: `https://ubvtrnhabtlpznqbuzrx.supabase.co/storage/v1`
- **S3**: `https://ubvtrnhabtlpznqbuzrx.supabase.co/storage/v1/s3`

---

## 3. API Service Discovery

| Service | Federated URL | Underlying Infrastructure |
| :--- | :--- | :--- |
| **Identity** | `auth.mbtq.dev` | Supabase Auth (Pathway) |
| **Trust** | `trust.mbtq.dev` | Fibonrose Logic + Supabase DB |
| **Pulse** | `sync.mbtq.dev` | Supabase Realtime (PinkSync) |
| **Foundry** | `foundry.mbtq.dev` | Azure Container Apps |

---

## 4. Security & Access Protocols

1. **Service Role Access**: Only `@mbtq-dev` core agents may use `SERVICE_ROLE` keys.
2. **Client Access**: Public `@deaf-first` commons tools MUST use the `ANON_KEY` with Row Level Security (RLS) enforced.
3. **Handshake**: Cross-project communication requires a validated MBTQ Handshake (JWT + Fibonrose Trust Signature).
