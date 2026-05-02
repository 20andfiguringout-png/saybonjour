#!/usr/bin/env node

/**
 * SECURE Password Change System for Production
 * 
 * This script allows you to change your admin password securely
 * even when your website is deployed on Google Cloud or other platforms.
 * 
 * Usage:
 *   node backend/change-password.js
 */

import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

// Function to ask for password (hidden input)
function askPassword(question) {
  return new Promise((resolve) => {
    process.stdout.write(question)
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    
    let password = ''
    
    process.stdin.on('data', function(char) {
      char = char + ''
      
      switch(char) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdout.write('\n')
          resolve(password)
          break
        case '\u0003':
          process.exit()
          break
        case '\u007f': // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1)
            process.stdout.write('\b \b')
          }
          break
        default:
          password += char
          process.stdout.write('*')
          break
      }
    })
  })
}

// Hash password function (same as setup-admin.js)
function hashPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

// Main function
async function changePassword() {
  console.log('🔐 Secure Password Change System')
  console.log('================================\n')
  
  // Check if .env file exists
  const envPath = path.join(__dirname, '..', '.env')
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ Error: .env file not found!')
    console.log('Please make sure you are running this from the correct directory.')
    process.exit(1)
  }
  
  try {
    // Read current .env file
    const envContent = fs.readFileSync(envPath, 'utf8')
    
    // Check if admin is already configured
    if (!envContent.includes('ADMIN_USERNAME') || !envContent.includes('ADMIN_PASSWORD_HASH')) {
      console.log('❌ Error: Admin not configured yet!')
      console.log('Please run "node setup-admin.js" first to set up your admin account.')
      process.exit(1)
    }
    
    console.log('⚠️  SECURITY WARNING:')
    console.log('This will change your admin password permanently.')
    console.log('Make sure you remember the new password!\n')
    
    const confirm = await askQuestion('Do you want to continue? (yes/no): ')
    
    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
      console.log('❌ Password change cancelled.')
      process.exit(0)
    }
    
    console.log('\n📝 Enter your new admin credentials:')
    
    // Get new username
    const username = await askQuestion('New Admin Username: ')
    
    if (!username || username.trim().length < 3) {
      console.log('❌ Error: Username must be at least 3 characters long.')
      process.exit(1)
    }
    
    // Get new password
    const password = await askPassword('New Admin Password: ')
    
    if (!password || password.length < 6) {
      console.log('❌ Error: Password must be at least 6 characters long.')
      process.exit(1)
    }
    
    // Confirm password
    const confirmPassword = await askPassword('Confirm Password: ')
    
    if (password !== confirmPassword) {
      console.log('❌ Error: Passwords do not match.')
      process.exit(1)
    }
    
    console.log('\n🔄 Updating credentials...')
    
    // Hash the new password
    const hashedPassword = hashPassword(password)
    
    // Update .env file
    let newEnvContent = envContent
    
    // Replace or add ADMIN_USERNAME
    if (newEnvContent.includes('ADMIN_USERNAME=')) {
      newEnvContent = newEnvContent.replace(/ADMIN_USERNAME=.*/, `ADMIN_USERNAME=${username}`)
    } else {
      newEnvContent += `\nADMIN_USERNAME=${username}`
    }
    
    // Replace or add ADMIN_PASSWORD_HASH
    if (newEnvContent.includes('ADMIN_PASSWORD_HASH=')) {
      newEnvContent = newEnvContent.replace(/ADMIN_PASSWORD_HASH=.*/, `ADMIN_PASSWORD_HASH=${hashedPassword}`)
    } else {
      newEnvContent += `\nADMIN_PASSWORD_HASH=${hashedPassword}`
    }
    
    // Write updated .env file
    fs.writeFileSync(envPath, newEnvContent)
    
    console.log('✅ Password changed successfully!')
    console.log('\n📋 Summary:')
    console.log(`   Username: ${username}`)
    console.log(`   Password: ${'*'.repeat(password.length)} (hidden)`)
    console.log('\n⚠️  Important Notes:')
    console.log('   • Please restart your server for changes to take effect')
    console.log('   • Keep your new credentials safe')
    console.log('   • This change only affects THIS server/deployment')
    console.log('\n🔄 To restart your server:')
    console.log('   • If running locally: Stop and restart "npm run server"')
    console.log('   • If deployed: Restart your deployment/container')
    
  } catch (error) {
    console.log('❌ Error changing password:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

// Run the script
changePassword().catch(error => {
  console.error('❌ Unexpected error:', error)
  process.exit(1)
})
