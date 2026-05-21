/**
* DeafAUTHMiddleware
* Identity cortex — verifies, issues, and refreshes MBTQ identities.
* Works as both a Socket.io guard and Express middleware adapter.
*/
import { FibonroseLogger } from '../logging/FibonroseLogger.js'
import jwt from 'jsonwebtoken'
const logger = new FibonroseLogger('deafauth:middleware')
const JWT_SECRET = process.env.DEAFAUTH_JWT_SECRET ?? 'dev-secret-replace-in-prod'
const JWT_EXPIRY = process.env.DEAFAUTH_JWT_EXPIRY ?? '24h'
export class DeafAUTHMiddleware {
// ─── Token Ops ────────────────────────────────────────────────────────────
static async verifyToken(rawToken) {
const token = rawToken?.replace(/^Bearer\s+/i, '')
if (!token) throw new Error('No token provided')
try {
const payload = jwt.verify(token, JWT_SECRET)
return DeafAUTHMiddleware._normalizeIdentity(payload)
} catch (err) {
logger.warn('token.verify.failed', { error: err.message })
throw new Error('Invalid or expired DeafAUTH token')
}
}
static async issueToken(identity) {
const payload = {
uid: identity.uid,
role: identity.role,
email: identity.email ?? null,
accessibilityClaims: identity.accessibilityClaims ?? {},
fibonroseScore: identity.fibonroseScore ?? 0,
daoMember: identity.daoMember ?? false,
iss: 'deafauth',
aud: 'mbtquniverse'
}
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY })
logger.trust('token.issued', { uid: identity.uid, role: identity.role })
return token
}
static async refreshIdentity(uid) {
// TODO: fetch fresh identity from Firebase / DeafAUTH store
// Stubbed for now — replace with your DB call
logger.info('identity.refresh', { uid })
return { uid, role: 'member', refreshedAt: Date.now() }
}
static async authenticate(credential, provider) {
// Provider-based authentication routing
const handlers = {
firebase: DeafAUTHMiddleware._authenticateFirebase,
google: DeafAUTHMiddleware._authenticateOAuth,
email: DeafAUTHMiddleware._authenticateEmail,
dao: DeafAUTHMiddleware._authenticateDAO
}
const handler = handlers[provider]
if (!handler) throw new Error(`Unknown auth provider: ${provider}`)
return handler(credential)
}
// ─── Express Adapter ──────────────────────────────────────────────────────
/**
*
*/
* expressAdapter() — drops into any Express app as standard middleware.
* Backwards-compatible with any existing Express middleware chain.
* Usage: app.use(DeafAUTHMiddleware.expressAdapter())
static expressAdapter(options = {}) {
const { required = false, roles = null } = options
return async (req, res, next) => {
const authHeader = req.headers.authorization
const cookieToken = req.cookies?.deafauth_token
const raw = authHeader ?? cookieToken
if (!raw) {
if (required) {
return res.status(401).json({
ok: false,
error: 'DEAFAUTH_TOKEN_REQUIRED',
message: 'Authentication required'
})
}
req.deafAuthIdentity = null
return next()
}
try {
const identity = await DeafAUTHMiddleware.verifyToken(raw)
req.deafAuthIdentity = identity
// Optional role-gating
if (roles && !roles.includes(identity.role)) {
return res.status(403).json({
ok: false,
error: 'DEAFAUTH_INSUFFICIENT_ROLE',
required: roles,
current: identity.role
})
}
next()
} catch (err) {
if (required) {
return res.status(401).json({ ok: false, error: err.message })
}
req.deafAuthIdentity = null
next()
}
}
}
/**
*
*/
* requireRole() — role-specific gate, fully Express-compatible
* Usage: router.post('/admin', DeafAUTHMiddleware.requireRole('admin'), handler)
static requireRole(...roles) {
return DeafAUTHMiddleware.expressAdapter({ required: true, roles })
}
/**
* requireDeaf() — Deaf-first gate, only allows Deaf/HoH identity claims
*/
static requireDeaf() {
return async (req, res, next) => {
const identity = req.deafAuthIdentity
if (!identity) {
return res.status(401).json({ ok: false, error: 'DEAFAUTH_TOKEN_REQUIRED' })
}
const mode = identity.accessibilityClaims?.mode
const deafModes = ['deaf', 'hard-of-hearing', 'asl-primary', 'deaf-blind']
if (!deafModes.includes(mode)) {
return res.status(403).json({
ok: false,
error: 'DEAFAUTH_DEAF_IDENTITY_REQUIRED',
message: 'This resource requires a verified Deaf identity'
})
}
next()
}
}
// ─── Normalizer ───────────────────────────────────────────────────────────
static _normalizeIdentity(raw) {
return {
uid: raw.uid ?? raw.sub ?? raw.user_id,
role: raw.role ?? 'member',
email: raw.email ?? null,
accessibilityClaims: raw.accessibilityClaims ?? {},
fibonroseScore: raw.fibonroseScore ?? 0,
daoMember: raw.daoMember ?? false,
iss: raw.iss,
aud: raw.aud,
iat: raw.iat,
exp: raw.exp
}
}
// ─── Auth Handlers (stubs — wire to your Firebase/DAO) ───────────────────
static async _authenticateFirebase(credential) {
// TODO: verify Firebase ID token
// const decoded = await admin.auth().verifyIdToken(credential)
logger.info('auth.firebase', { stub: true })
throw new Error('Firebase auth — connect to Firebase Admin SDK')
}
static async _authenticateOAuth(credential) {
logger.info('auth.oauth', { stub: true })
throw new Error('OAuth auth — connect to your OAuth provider')
}
static async _authenticateEmail(credential) {
logger.info('auth.email', { stub: true })
throw new Error('Email auth — connect to your user store')
}
static async _authenticateDAO(credential) {
// DAO wallet signature verification
logger.info('auth.dao', { stub: true })
throw new Error('DAO auth — connect to Fibonrose/blockchain verifier')
}
}