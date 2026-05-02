# 🚀 Deployment Security Guide

## 🔑 Password Management for Deployed Website

### **IMPORTANT: Local vs Production Passwords**

Your **local** and **deployed** websites have **completely separate passwords**:

- 🏠 **Local** (your computer): Uses `.env` file on your computer
- 🌐 **Production** (Google Cloud): Uses `.env` file on the server

**Changing one does NOT change the other!**

---

## 📋 How to Change Passwords

### **1. Local Development (Your Computer)**
```bash
# Method 1: Initial setup
npm run setup-admin

# Method 2: Change existing password
npm run change-password
```

### **2. Production/Deployed Website**

#### **Option A: SSH Access (Recommended)**
```bash
# 1. SSH into your server
ssh your-server

# 2. Navigate to your app directory
cd /path/to/your/app

# 3. Change password
npm run change-password

# 4. Restart your application
pm2 restart your-app
# OR
sudo systemctl restart your-app
```

#### **Option B: Google Cloud Console**
1. Open Google Cloud Console
2. Go to your VM instance or App Engine
3. Open SSH terminal
4. Navigate to your app directory
5. Run `npm run change-password`
6. Restart your application

#### **Option C: Through Deployment Pipeline**
1. Change password locally: `npm run change-password`
2. Commit and push changes
3. Redeploy your application

---

## 🛡️ Security Best Practices for Deployment

### **Before Deploying:**

1. **Set Strong Production Password**
   ```bash
   npm run change-password
   ```

2. **Remove Development Files**
   - Delete or secure `setup-admin.js` on production
   - Ensure `.env` file is not publicly accessible

3. **Environment Variables**
   ```bash
   # Set these on your production server
   NODE_ENV=production
   JWT_SECRET=your-super-long-random-secret-here
   ADMIN_USERNAME=your-admin-username
   ADMIN_PASSWORD_HASH=your-hashed-password
   ```

### **After Deploying:**

1. **Test Admin Access**
   - Try logging into your admin panel
   - Verify all features work

2. **Secure Your Server**
   - Use HTTPS (SSL certificate)
   - Configure firewall
   - Regular security updates

3. **Regular Backups**
   ```bash
   # Run this on your production server regularly
   npm run backup
   ```

---

## 🚨 Emergency Recovery

### **If You're Locked Out:**

1. **SSH into your server**
2. **Reset password:**
   ```bash
   cd /path/to/your/app
   npm run change-password
   ```
3. **Restart application**

### **If Someone Hacked Your Admin:**

1. **Immediately change password:**
   ```bash
   npm run change-password
   ```

2. **Check for malicious content:**
   - Review all articles, quizzes, phrases
   - Check uploaded files

3. **Restore from backup if needed:**
   ```bash
   # Copy backup files to data directory
   cp backups/latest/* backend/data/
   ```

---

## 📱 Google Cloud Specific Instructions

### **App Engine:**
```bash
# 1. Open Cloud Shell
# 2. Clone your repository or access your files
# 3. Change password
npm run change-password
# 4. Deploy updated version
gcloud app deploy
```

### **Compute Engine (VM):**
```bash
# 1. SSH into your VM
gcloud compute ssh your-vm-name
# 2. Navigate to app directory
cd /path/to/your/app
# 3. Change password
npm run change-password
# 4. Restart application
sudo systemctl restart your-app
```

### **Cloud Run:**
```bash
# 1. Update your container image with new password
# 2. Deploy new revision
gcloud run deploy your-service --image your-image
```

---

## ✅ Security Checklist for Production

- [ ] Strong admin password set
- [ ] HTTPS enabled
- [ ] Environment variables properly configured
- [ ] Regular backups scheduled
- [ ] Server firewall configured
- [ ] Admin access tested
- [ ] Security monitoring enabled
- [ ] `.env` file secured (not publicly accessible)
- [ ] Development files removed/secured
- [ ] Database properly secured

---

## 🆘 Quick Commands Reference

```bash
# Change password (works locally and on server)
npm run change-password

# Create backup
npm run backup

# Initial admin setup (first time only)
npm run setup-admin

# Start server
npm run server

# Check if admin is configured
cat .env | grep ADMIN
```

---

## 💡 Pro Tips

1. **Use different passwords** for local and production
2. **Change passwords regularly** (every 3-6 months)
3. **Keep backups** in multiple locations
4. **Monitor admin access** through server logs
5. **Use strong passwords** (12+ characters, mixed case, numbers, symbols)
6. **Never share credentials** via email or chat

---

**Remember:** Security is ongoing, not a one-time setup. Stay vigilant! 🛡️
