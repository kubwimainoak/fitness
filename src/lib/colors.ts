/**
 * Application color palette based on frontend guidelines
 * These colors should be used consistently across the application
 */

// Primary colors
export const primaryBlue = {
  DEFAULT: '#1E3A8A', // Rich blue for main UI elements
  light: '#2E4A9A',   // Lighter blue for gradients and hover states
  lighter: '#4C6EF5', // Very light blue for backgrounds
  5: 'rgba(30, 58, 138, 0.05)', // 5% opacity for very subtle backgrounds
  10: 'rgba(30, 58, 138, 0.1)', // 10% opacity for subtle backgrounds
  20: 'rgba(30, 58, 138, 0.2)', // 20% opacity for hover states
}

// Accent colors
export const accentRed = {
  DEFAULT: '#8B0000', // Dark red for action buttons
  light: '#A52A2A',   // Slightly lighter red for hover states
  5: 'rgba(139, 0, 0, 0.05)', // 5% opacity for very subtle backgrounds
  10: 'rgba(139, 0, 0, 0.1)', // 10% opacity for backgrounds
  20: 'rgba(139, 0, 0, 0.2)', // 20% opacity for hover states
}

// Neutral colors
export const neutral = {
  dark: '#333333',     // Dark gray for text
  medium: '#6B7280',   // Medium gray for secondary text
  light: '#E5E7EB',    // Light gray for borders
  lighter: '#F5F5F5',  // Very light gray for backgrounds
}

// Status colors
export const status = {
  success: '#22C55E',  // Green for success messages
  warning: '#F59E0B',  // Amber for warnings
  error: '#EF4444',    // Red for errors
  info: '#3B82F6',     // Blue for information
}

// Gradients
export const gradients = {
  bluePrimary: 'linear-gradient(135deg, #1E3A8A 0%, #2E4A9A 100%)',
  blueLight: 'linear-gradient(135deg, #2E4A9A 0%, #4C6EF5 100%)',
  redPrimary: 'linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)',
  blueToRed: 'linear-gradient(135deg, #1E3A8A 0%, #8B0000 100%)',
  blueOverlay: 'linear-gradient(rgba(30, 58, 138, 0.9), rgba(46, 74, 154, 0.85))',
  redOverlay: 'linear-gradient(rgba(139, 0, 0, 0.9), rgba(165, 42, 42, 0.85))'
}

// Tailwind utility class combinations for common components
export const colorClasses = {
  // Card backgrounds
  cardBg: 'bg-white hover:bg-[#1E3A8A]/[0.02]',
  cardHeaderBg: 'bg-[#1E3A8A]/[0.03]',
  
  // Section backgrounds
  sectionBgBlue: 'bg-[#1E3A8A]/[0.03]',
  sectionBgRed: 'bg-[#8B0000]/[0.03]',
  
  // Button variants
  primaryButton: 'bg-[#8B0000] hover:bg-[#A52A2A] text-white',
  secondaryButton: 'bg-[#1E3A8A] hover:bg-[#2E4A9A] text-white',
  outlineBlueButton: 'border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10',
  outlineRedButton: 'border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10',
  
  // Text colors
  textBlue: 'text-[#1E3A8A]',
  textRed: 'text-[#8B0000]',
  
  // Status indicators
  activeStatus: 'bg-[#1E3A8A]/10 text-[#1E3A8A]',
  inactiveStatus: 'bg-[#8B0000]/10 text-[#8B0000]',
}

// Use these colors in your application by importing them:
// import { primaryBlue, accentRed, colorClasses } from '@/lib/colors'
// 
// Example usage:
// <div className="bg-[#1E3A8A]"> becomes:
// <div className={`bg-[${primaryBlue.DEFAULT}]`}>
//
// Or using the utility classes:
// <div className={colorClasses.sectionBgBlue}>
//
// This ensures color consistency throughout the application 