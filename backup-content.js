#!/usr/bin/env node

/**
 * Simple Content Backup Script for French Learning Platform
 * 
 * This script creates a backup of all your content (articles, quizzes, phrases, etc.)
 * Run this regularly to protect your content!
 * 
 * Usage:
 *   node backup-content.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create backups directory if it doesn't exist
const backupsDir = path.join(__dirname, 'backups')
if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir)
}

// Get current timestamp for backup folder name
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' + 
                 new Date().toISOString().replace(/[:.]/g, '-').split('T')[1].split('.')[0]

const backupDir = path.join(backupsDir, `backup_${timestamp}`)
fs.mkdirSync(backupDir)

// Files to backup
const filesToBackup = [
  'backend/data/articles.json',
  'backend/data/quizzes.json', 
  'backend/data/sections.json',
  'backend/data/worksheets.json',
  'src/data/phrases.json',
  'src/data/phraseSections.json'
]

// Additional directories to backup
const dirsToBackup = [
  'backend/uploads'
]

console.log('🔄 Starting content backup...')
console.log(`📁 Backup location: ${backupDir}`)

let backedUpFiles = 0
let skippedFiles = 0

// Backup individual files
filesToBackup.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath)
  
  if (fs.existsSync(fullPath)) {
    const fileName = path.basename(filePath)
    const destPath = path.join(backupDir, fileName)
    
    try {
      fs.copyFileSync(fullPath, destPath)
      console.log(`✅ Backed up: ${fileName}`)
      backedUpFiles++
    } catch (error) {
      console.log(`❌ Failed to backup ${fileName}: ${error.message}`)
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`)
    skippedFiles++
  }
})

// Backup directories
dirsToBackup.forEach(dirPath => {
  const fullPath = path.join(__dirname, dirPath)
  
  if (fs.existsSync(fullPath)) {
    const dirName = path.basename(dirPath)
    const destPath = path.join(backupDir, dirName)
    
    try {
      copyDirectory(fullPath, destPath)
      console.log(`✅ Backed up directory: ${dirName}`)
      backedUpFiles++
    } catch (error) {
      console.log(`❌ Failed to backup directory ${dirName}: ${error.message}`)
    }
  } else {
    console.log(`⚠️  Directory not found: ${dirPath}`)
    skippedFiles++
  }
})

// Helper function to copy directories recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// Create a backup info file
const backupInfo = {
  timestamp: new Date().toISOString(),
  files: filesToBackup.filter(f => fs.existsSync(path.join(__dirname, f))),
  directories: dirsToBackup.filter(d => fs.existsSync(path.join(__dirname, d))),
  stats: {
    backedUpFiles,
    skippedFiles,
    totalAttempted: filesToBackup.length + dirsToBackup.length
  }
}

fs.writeFileSync(
  path.join(backupDir, 'backup-info.json'), 
  JSON.stringify(backupInfo, null, 2)
)

console.log('\n📊 Backup Summary:')
console.log(`✅ Successfully backed up: ${backedUpFiles} items`)
console.log(`⚠️  Skipped (not found): ${skippedFiles} items`)
console.log(`📁 Backup saved to: ${backupDir}`)

// Clean up old backups (keep only last 10)
const backupFolders = fs.readdirSync(backupsDir)
  .filter(name => name.startsWith('backup_'))
  .sort()

if (backupFolders.length > 10) {
  const foldersToDelete = backupFolders.slice(0, backupFolders.length - 10)
  
  console.log('\n🧹 Cleaning up old backups...')
  foldersToDelete.forEach(folder => {
    const folderPath = path.join(backupsDir, folder)
    try {
      fs.rmSync(folderPath, { recursive: true, force: true })
      console.log(`🗑️  Deleted old backup: ${folder}`)
    } catch (error) {
      console.log(`❌ Failed to delete ${folder}: ${error.message}`)
    }
  })
}

console.log('\n✨ Backup completed successfully!')
console.log('\n💡 Pro tip: Run this script regularly to keep your content safe!')
console.log('   You can also set up a scheduled task to run it automatically.')
