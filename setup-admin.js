#!/usr/bin/env node

/**
 * Setup script for creating secure admin credentials
 * Run with: node setup-admin.js
 */

import crypto from 'crypto'
import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Helper function to hash passwords
const hashPassword = (password) => {
  return crypto.pbkdf2Sync(password, 'salt', 1000, 64, 'sha512').toString('hex')
}

// Helper function to generate secure JWT secret
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex')
}

// Helper function to ask questions
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

// Helper function to ask for password (hidden input)
const askPassword = (question) => {
  return new Promise((resolve) => {
    process.stdout.write(question)
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    
    let password = ''
    process.stdin.on('data', (char) => {
      char = char.toString()
      
      if (char === '\n' || char === '\r' || char === '\u0004') {
        process.stdin.setRawMode(false)
        process.stdin.pause()
        process.stdout.write('\n')
        resolve(password)
      } else if (char === '\u0003') {
        process.exit()
      } else if (char === '\u007f') {
        if (password.length > 0) {
          password = password.slice(0, -1)
          process.stdout.write('\b \b')
        }
      } else {
        password += char
        process.stdout.write('*')
      }
    })
  })
}

async function setupAdmin() {
  console.log('🔐 French Learning Platform - Admin Setup')
  console.log('=========================================\n')
  
  try {
    // Get admin username
    const username = await askQuestion('Enter admin username: ')
    if (!username.trim()) {
      console.log('❌ Username cannot be empty!')
      process.exit(1)
    }
    
    // Get admin password
    const password = await askPassword('Enter admin password (hidden): ')
    if (!password || password.length < 8) {
      console.log('❌ Password must be at least 8 characters long!')
      process.exit(1)
    }
    
    // Confirm password
    const confirmPassword = await askPassword('Confirm admin password (hidden): ')
    if (password !== confirmPassword) {
      console.log('❌ Passwords do not match!')
      process.exit(1)
    }
    
    // Generate secure values
    const hashedPassword = hashPassword(password)
    const jwtSecret = generateJWTSecret()
    
    // Create .env file content
    const envContent = `# French Learning Platform Environment Variables
# Generated on ${new Date().toISOString()}

# Server Configuration
PORT=3001

# Security Configuration
JWT_SECRET=${jwtSecret}
ADMIN_USERNAME=${username}
ADMIN_PASSWORD_HASH=${hashedPassword}

# Database Configuration (for future use)
# DATABASE_URL=your-database-connection-string

# Other Configuration
NODE_ENV=development
`
    
    // Write .env file
    fs.writeFileSync('.env', envContent)
    
    console.log('\n✅ Admin credentials configured successfully!')
    console.log('✅ .env file created with secure settings')
    console.log('\n📝 Next steps:')
    console.log('   1. Keep your .env file secure and never commit it to version control')
    console.log('   2. Start the server with: npm run server')
    console.log('   3. Login with your admin credentials')
    console.log('\n🔒 Security notes:')
    console.log('   - Password is hashed using PBKDF2')
    console.log('   - JWT secret is cryptographically secure')
    console.log('   - Change these credentials regularly')
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

setupAdmin()
