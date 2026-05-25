# Agent Do / Don't Rules

## ✅ DO:
- Ask clarifying questions before generating code
- Reference the user's existing codebase (file paths, patterns)
- Explain trade-offs when multiple solutions exist
- Suggest related improvements ("While we're here, consider…")
- Confirm before creating PRs/issues
- Cite documentation/sources when recommending libraries
- Validate accessibility & security implications

## ❌ DON'T:
- Generate large code blocks without context
- Assume the user's tech stack without checking
- Overwrite user code without explicit permission
- Recommend experimental/unstable dependencies for production
- Ignore error messages—always diagnose first
- Use condescending language ("just," "simply," "obviously")
- Provide solutions that bypass user learning

Security Policy

## 🔒 Security Best Practices

### Reporting Security Vulnerabilities

If you discover a security vulnerability in MBTQ.dev, please report it by:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: [Repository Owner]
3. Include detailed information about the vulnerability
4. Allow reasonable time for the issue to be addressed before public disclosure

### Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## 🛡️ Security Features

### Environment Variables

#### Frontend (Client)
- ✅ **Safe to expose**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- ❌ **Never expose**: Service role keys, private API keys, database credentials

#### Backend (Server)
- All sensitive credentials should be stored in server environment variables
- Use `.env` files locally (never commit these)
- Use GitHub Secrets, AWS SSM, or similar for production

### Authentication

1. **Always use HTTPS in production**
2. **Implement Row Level Security (RLS)** in Supabase
3. **Validate user sessions** on both client and server
4. **Use secure password requirements**:
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers, symbols
5. **Implement rate limiting** on authentication endpoints

### Input Validation

```typescript
// Example: Sanitize user input
import DOMPurify from 'isomorphic-dompurify';

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [] 
  });
}
```

### SQL Injection Prevention

- ✅ Use Supabase client (parameterized queries)
- ✅ Use prepared statements for raw SQL
- ❌ Never concatenate user input into SQL queries

### XSS (Cross-Site Scripting) Prevention

- ✅ React automatically escapes JSX content
- ✅ Use `DOMPurify` for any HTML rendering
- ❌ Avoid `dangerouslySetInnerHTML` unless absolutely necessary

### CSRF (Cross-Site Request Forgery) Prevention

- ✅ Use SameSite cookies
- ✅ Implement CSRF tokens for state-changing operations
- ✅ Verify Origin/Referer headers

### API Security

```typescript
// Example: Rate limiting middleware
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```

### CORS Configuration

```typescript
// Server CORS setup
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### Security Headers

Recommended security headers for production:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## 🔍 Security Checklist

### Before Production Deployment

- [ ] All environment variables are properly configured
- [ ] No secrets committed to git repository
- [ ] HTTPS is enforced
- [ ] Security headers are configured
- [ ] Rate limiting is enabled
- [ ] Input validation is implemented
- [ ] SQL injection prevention is verified
- [ ] XSS prevention is tested
- [ ] CSRF protection is enabled
- [ ] Authentication is secure
- [ ] Authorization checks are in place
- [ ] Error messages don't leak sensitive information
- [ ] Logging doesn't include sensitive data
- [ ] Dependencies are up to date
- [ ] Vulnerability scan passed
- [ ] Penetration testing completed (if applicable)

### Regular Security Maintenance

- [ ] Run `npm audit` weekly
- [ ] Update dependencies monthly
- [ ] Review access logs regularly
- [ ] Monitor for unusual activity
- [ ] Backup data regularly
- [ ] Test disaster recovery plan
- [ ] Review and update security policies

## 🚨 Incident Response

In case of a security incident:

1. **Contain**: Immediately isolate affected systems
2. **Assess**: Determine scope and impact
3. **Notify**: Inform affected users and stakeholders
4. **Remediate**: Fix the vulnerability
5. **Document**: Record incident details and response
6. **Review**: Analyze and improve security measures

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security Best Practices](https://react.dev/learn/escape-hatches#security-considerations)

## 🔐 Dependency Security

### Automated Scanning

This repository uses:
- **Dependabot**: Automatic dependency updates and security alerts
- **npm audit**: Regular vulnerability scanning
- **GitHub Security Advisories**: Automated vulnerability detection

### Manual Review

Before adding new dependencies:
1. Check package reputation and maintenance status
2. Review package size and dependencies
3. Check for known vulnerabilities
4. Verify package authenticity
5. Review source code if critical

## 📝 License

This security policy is part of the MBTQ.dev project and follows the same license terms.

---

**Last Updated**: 2025-12-15

**Contact**: GitHub Issues (for general security questions, not vulnerabilities)