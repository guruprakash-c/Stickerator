'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Beaker, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/sr-logo.svg"
                alt="Stickerator"
                width={200}
                height={48}
                className="inline-block mr-3"
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Create amazing AI-powered stickers with multiple models and resolutions. 
              Copyright-free for commercial use.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Links</h4>
            <div className="space-y-2">
              <Link 
                href="https://laererlabs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Beaker className="w-4 h-4" />
                <span>Laerer Labs</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link 
                href="https://github.com/guruprakash-c/Stickerator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Legal/Info Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <div className="space-y-2">
              <Link 
                href="/auth/signin"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="#"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <Link 
                href="#"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; { new Date().getFullYear() } Stickerator. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by{' '}
              <Link 
                href="https://laererlabs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors font-medium"
              >
                Laerer Labs
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}