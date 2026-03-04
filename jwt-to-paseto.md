 a skeleton template focused on migrating from JWT to PASETO, with placeholders for your project-specific details. Use it to guide your implementation.

---

🔐 Skeleton Template: JWT → PASETO Migration

Project Context

· Name: [ProjectName]
· Auth Provider: [DeafAuth / Supabase / Custom]
· Runtime: [Deno / Node.js / Python]
· Token Type: [JWT (current)] → [PASETO (target)]

---

1. Current JWT Implementation

File: auth/jwt.ts

```typescript
// Current JWT utility (example using Deno)
import { create, verify, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts";

const secretKey = Deno.env.get("JWT_SECRET") || "[fallback-dev-only]";

export async function createToken(payload: Record<string, unknown>) {
  return await create(
    { alg: "HS512", typ: "JWT" },
    { ...payload, exp: getNumericDate(3600) },
    secretKey
  );
}

export async function verifyToken(token: string) {
  return await verify(token, secretKey, "HS512");
}
```

Usage:

· Issued at login, stored client-side, sent in Authorization: Bearer <token> header.

Problems with JWT (why migrate):

· Weak algorithm defaults (alg: none attacks)
· No versioning or easy rotation
· Complex parsing libraries
· Not cryptographically auditable (can be tampered if secret is weak)

---

2. Migration Plan to PASETO

Step 1: Add PASETO Library

For Deno:

```typescript
import { 
  V2,  // version 2 (recommended)
  generateKey 
} from "https://deno.land/x/paseto@v2.1.0/mod.ts";
```

Step 2: Generate Keys

PASETO uses symmetric (local) or asymmetric (public) keys. For most web apps, local (symmetric) is fine.
Generate a secure 256-bit key and store in environment:

```bash
# Generate via command line
openssl rand -base64 32
```

Environment variable:

```
PASETO_SECRET=[base64-encoded-256-bit-key]
```

Step 3: Create PASETO Token Utility

File: auth/paseto.ts

```typescript
import { V2, decode } from "https://deno.land/x/paseto@v2.1.0/mod.ts";

const secretKeyBase64 = Deno.env.get("PASETO_SECRET") || "[fallback-dev]";
const key = Uint8Array.from(atob(secretKeyBase64), c => c.charCodeAt(0));

export async function createPaseto(payload: Record<string, unknown>) {
  // Add expiration as footer (optional)
  const footer = { exp: Math.floor(Date.now() / 1000) + 3600 };
  return await V2.encrypt(payload, key, footer);
}

export async function verifyPaseto(token: string) {
  try {
    const { payload, footer } = await V2.decrypt(token, key);
    // Check expiration from footer
    if (footer.exp && footer.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Token expired");
    }
    return payload;
  } catch (err) {
    throw new Error("Invalid token");
  }
}
```

Step 4: Dual‑Running Phase (Optional)

During migration, accept both JWT and PASETO tokens to avoid breaking existing clients.

File: auth/middleware.ts

```typescript
import { verifyToken as verifyJwt } from "./jwt.ts";
import { verifyPaseto } from "./paseto.ts";

export async function authenticate(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  
  // Try PASETO first
  try {
    return await verifyPaseto(token);
  } catch {
    // Fallback to JWT
    try {
      return await verifyJwt(token);
    } catch {
      return null;
    }
  }
}
```

After all clients are updated, remove JWT code.

Step 5: Update Token Issuance

Replace login endpoint to issue PASETO instead of JWT.

File: routes/login.ts

```typescript
import { createPaseto } from "../auth/paseto.ts";

export async function login(req: Request) {
  // ... validate credentials ...
  const user = { id: "123", role: "user" };
  const token = await createPaseto(user);
  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" }
  });
}
```

---

3. Configuration Changes

Environment Variables (old):

```
JWT_SECRET=...
```

Environment Variables (new):

```
PASETO_SECRET=...   # base64 32-byte key
# JWT_SECRET can be removed after migration
```

CI/CD: Ensure secret is injected securely.

---

4. Testing Strategy

· Unit tests: Verify token creation and verification.
· Integration tests: Ensure endpoints accept PASETO.
· Backward compatibility tests: During dual phase, test both token types.
· Expiration tests: Check that expired tokens are rejected.

---

5. Security Considerations

· Key rotation: Implement key versioning (e.g., kid in footer) to allow seamless key change.
· Footer usage: Store non‑sensitive metadata like expiration, key ID.
· Audience/issuer: Include in payload if needed; PASETO supports arbitrary claims.
· No algorithm confusion: PASETO avoids JWT's "alg: none" vulnerability.

---

6. Project Skeleton (Simplified)

```
[ProjectName]/
├── auth/
│   ├── jwt.ts          (to be removed)
│   ├── paseto.ts       (new)
│   └── middleware.ts   (dual‑phase auth)
├── routes/
│   └── login.ts        (issues PASETO)
├── .env.example
├── deno.json / package.json
└── README.md
```

---

7. Placeholder Values to Fill

Placeholder Description Your Value
[ProjectName] Name of your project 
[DeafAuth / Supabase / Custom] Auth provider 
[Deno / Node.js / Python] Runtime 
[fallback-dev-only] Dev fallback secret (never in prod) 
[base64-encoded-256-bit-key] Your generated PASETO key 

---

8. Next Steps

1. Generate a strong PASETO key and store securely.
2. Implement paseto.ts and integrate into your auth flow.
3. During dual phase, update all services to accept both tokens.
4. Monitor for any issues; after full adoption, remove JWT code.
5. Document the change for your team.

---

This skeleton gives you a clean starting point to move from JWT to PASETO. Let me know if you need deeper details on any specific part (like key rotation or asymmetric PASETO).