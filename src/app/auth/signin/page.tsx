'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Chrome, Github, Linkedin } from 'lucide-react'
import { SignInButtons } from '@/components/auth-button'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-50 dark:from-blue-950 dark:via-pink-950 dark:to-blue-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
          </div>
          <CardTitle className="text-xl">Sign In to Continue</CardTitle>
          <CardDescription>
            Sign in to download and save your amazing AI-generated stickers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInButtons />
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              By signing in, you agree to our terms of service and privacy policy.
            </p>
          </div>
          
          <div className="text-center">
            <Link 
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              ← Back to Generator
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}