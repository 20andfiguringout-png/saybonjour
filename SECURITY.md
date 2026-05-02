# Security Guide - French Learning Platform

## 🔒 Security Overview

This document outlines the security measures implemented in the French Learning Platform and provides guidance for secure deployment.

## ⚠️ CRITICAL: Remove Hardcoded Credentials

**The hardcoded admin credentials have been removed from the codebase.** You must now set up secure credentials using environment variables.

## 🚀 Quick Setup

### 1. Set Up Admin Credentials

Run the setup script to create secure admin credentials:

```bash
npm run setup-admin
```

This will:
- Prompt you for a secure admin username and password
- Generate a cryptographically secure JWT secret
- Create a `.env` file with hashed credentials
- Provide security recommendations

### 2. Manual Setup (Alternative)

If you prefer manual setup:

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Generate a password hash:
```javascript
// Run this in Node.js to generate a hash for your password
import crypto from 'crypto'
const password = 'your-secure-password'
const hash = crypto.pbkdf2Sync(password, 'salt', 1000, 64, 'sha512').toString('hex')
console.log('Password hash:', hash)
```

3. Update `.env` with your values:
```env
JWT_SECRET=your-super-secure-jwt-secret-key-here-minimum-64-characters-long
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD_HASH=your-generated-hash-here
```

## 🛡️ Security Features Implemented

### Authentication & Authorization
- ✅ **Password Hashing**: PBKDF2 with 1000 iterations
- ✅ **JWT Tokens**: Secure token-based authentication
- ✅ **CSRF Protection**: Cross-Site Request Forgery protection
- ✅ **Environment Variables**: No hardcoded credentials
- ✅ **Token Expiration**: 24-hour token lifetime

### Data Protection
- ✅ **Input Validation**: Server-side validation
- ✅ **CORS Configuration**: Cross-origin request control
- ✅ **Error Handling**: Secure error messages

## 📊 Current Database

**Current Storage**: JSON files in `backend/data/`
- `articles.json` - Learning content
- `quizzes.json` - Quiz data  
- `sections.json` - Content organization

**Recommendation**: Migrate to a proper database for production:
- **PostgreSQL** (recommended for structured data)
- **MongoDB** (for flexible document storage)
- **MySQL** (traditional relational database)

## 🔐 Production Security Checklist

### Environment Variables
- [ ] Set strong `JWT_SECRET` (minimum 64 characters)
- [ ] Configure secure `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH`
- [ ] Set `NODE_ENV=production`
- [ ] Configure database connection strings

### Server Security
- [ ] Use HTTPS in production
- [ ] **CRITICAL**: Implement rate limiting (express-rate-limit)
- [ ] **CRITICAL**: Add security headers (helmet.js)
- [ ] Add request logging
- [ ] Set up proper CORS policies
- [ ] Use a reverse proxy (nginx/Apache)
- [ ] **CRITICAL**: Add request size limits
- [ ] **CRITICAL**: Implement input validation middleware

### Database Security
- [ ] Migrate from JSON files to proper database
- [ ] Use database connection pooling
- [ ] Implement database backups
- [ ] Set up database user permissions
- [ ] Enable database encryption at rest

### Monitoring & Logging
- [ ] **CRITICAL**: Implement security logging
- [ ] **CRITICAL**: Set up intrusion detection
- [ ] **CRITICAL**: Monitor failed login attempts
- [ ] **CRITICAL**: Log admin actions
- [ ] Track IP addresses for admin access
- [ ] Set up alerts for suspicious activity

## 🚨 Security Warnings

1. **Never commit `.env` files** to version control
2. **Change default credentials** immediately
3. **Use strong passwords** (minimum 12 characters)
4. **Rotate JWT secrets** regularly
5. **Monitor admin access** logs
6. **Keep dependencies updated**

## 📞 Security Contact

If you discover security vulnerabilities, please report them responsibly:
- Create a private issue in the repository
- Email the development team
- Do not disclose publicly until fixed

## 🔄 Regular Security Tasks

### Weekly
- [ ] Review access logs
- [ ] Check for failed login attempts
- [ ] Monitor system resources

### Monthly  
- [ ] Update dependencies
- [ ] Review user permissions
- [ ] Backup security configurations

### Quarterly
- [ ] Rotate JWT secrets
- [ ] Update admin passwords
- [ ] Security audit
- [ ] Penetration testing

## ✅ SECURITY STATUS: IMPROVED

### ✅ Implemented Security Features:
1. **Rate Limiting**: ✅ Protection against brute force attacks (5 attempts per 15 minutes)
2. **Security Headers**: ✅ Helmet.js protecting against XSS, clickjacking
3. **Request Size Limits**: ✅ 10MB limit to prevent DoS attacks
4. **Input Validation**: ✅ Server-side validation for all admin inputs
5. **Security Logging**: ✅ All admin actions and security events logged

### 🛡️ What's Protecting You Now:
- **Rate limiting** on login attempts
- **CSRF protection** for all admin actions
- **JWT tokens** with 24-hour expiration
- **Password hashing** with PBKDF2
- **Security headers** preventing common attacks
- **Input validation** on all forms
- **Admin action logging** for audit trail

## 🚨 EMERGENCY RECOVERY PLAN

### If Someone Gets Admin Access:

1. **IMMEDIATE ACTIONS:**
   ```bash
   # 1. Change admin password immediately
   node setup-admin.js

   # 2. Backup your content
   node backup-content.js

   # 3. Check for malicious content in admin panel
   ```

2. **RESTORE FROM BACKUP:**
   - Your content is in `backend/data/` folder
   - Backups are in `backups/` folder
   - Simply copy backup files back to `backend/data/`

3. **PREVENTION:**
   ```bash
   # Run backup regularly (weekly recommended)
   node backup-content.js

   # Keep your .env file secure
   # Never share your admin credentials
   ```

---

**Remember**: Security is an ongoing process, not a one-time setup. Stay vigilant and keep your system updated!
