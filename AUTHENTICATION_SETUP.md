# Authentication Setup Guide

## Overview
The AI Sticker Generator now includes authentication using NextAuth.js with social media providers (Google, GitHub, LinkedIn). Users must sign in to download generated stickers.

## Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env.local` and fill in your OAuth credentials:

```bash
cp .env.example .env.local
```

### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### 3. GitHub OAuth Setup
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

### 4. LinkedIn OAuth Setup
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps/new)
2. Create a new app
3. Add Sign In with LinkedIn product
4. Set Redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
5. Copy Client ID and Client Secret to `.env.local`

### 5. NextAuth Secret
Generate a secret for NextAuth:
```bash
openssl rand -base64 32
```
Add it to `NEXTAUTH_SECRET` in `.env.local`.

## Features Added

### ✅ Authentication System
- **Social Login**: Google, GitHub, LinkedIn
- **Session Management**: JWT-based sessions
- **User Profiles**: Display user avatar and info
- **Protected Downloads**: Authentication required for downloads

### ✅ UI/UX Improvements
- **Auth Header**: User avatar/login button in header
- **Sign-in Dialog**: Modal for quick authentication
- **Download Protection**: Lock icons for non-authenticated users
- **Visual Feedback**: Clear indication of auth requirements

### ✅ Security Features
- **Protected Routes**: API routes check authentication
- **Session Validation**: Secure session handling
- **OAuth Integration**: Industry-standard authentication

## Usage Flow

1. **Generate Stickers**: Anyone can generate stickers without signing in
2. **Download Requires Auth**: Users see lock icons on download buttons
3. **Sign-in Flow**: Click download → Sign-in dialog → Choose provider
4. **Download Access**: Once signed in, users can download all stickers
5. **Persistent Session**: Users stay signed in across browser sessions

## Files Modified/Created

### New Files:
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth API routes
- `src/lib/auth.ts` - NextAuth configuration
- `src/components/providers.tsx` - Session provider wrapper
- `src/components/auth-button.tsx` - Auth UI components
- `src/app/auth/signin/page.tsx` - Dedicated sign-in page
- `.env.example` - Environment variables template

### Modified Files:
- `src/app/layout.tsx` - Added session provider
- `src/app/page.tsx` - Added authentication logic and UI

## Testing

To test the authentication system:

1. **Without Auth**: Generate stickers and try downloading (should show lock icon)
2. **Sign-in**: Click sign-in button and complete OAuth flow
3. **Download**: Try downloading after sign-in (should work)
4. **Session Persistence**: Refresh page and verify user stays signed in

## Production Deployment

For production deployment:

1. Update `NEXTAUTH_URL` to your production domain
2. Add production OAuth redirect URIs
3. Ensure HTTPS is enabled (required for OAuth)
4. Set secure cookies in production