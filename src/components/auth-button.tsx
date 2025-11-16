'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { LogIn, LogOut, User, Chrome, Github, Linkedin } from 'lucide-react'

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
              <AvatarFallback>
                {session.user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {session.user?.name && (
                <p className="font-medium">{session.user.name}</p>
              )}
              {session.user?.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button onClick={() => signIn()} variant="outline">
      <LogIn className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  )
}

export function SignInButtons() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <Button
          onClick={() => signIn('google')}
          variant="outline"
          className="w-full"
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          onClick={() => signIn('github')}
          variant="outline"
          className="w-full"
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>
        <Button
          onClick={() => signIn('linkedin')}
          variant="outline"
          className="w-full"
        >
          <Linkedin className="mr-2 h-4 w-4" />
          Continue with LinkedIn
        </Button>
      </div>
    </div>
  )
}