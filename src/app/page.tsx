'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Loader2, Download, Sparkles, Image as ImageIcon, Settings, Zap, Palette, Wand2, Lock, User } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { StructuredData } from '@/components/structured-data'
import { AuthButton, SignInButtons } from '@/components/auth-button'

const AI_MODELS = [
  { id: 'dall-e-3', name: 'DALL-E 3', description: 'High-quality, detailed images' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', description: 'Open-source, versatile' },
  { id: 'midjourney', name: 'Midjourney', description: 'Artistic, creative style' },
  { id: 'nano-banana', name: 'Nano Banana', description: 'Fast, efficient generation' },
  { id: 'dall-e-2', name: 'DALL-E 2', description: 'Classic, reliable' }
]

const RESOLUTIONS = [
  { id: '512x512', name: 'Standard', description: '512x512 - Quick generation' },
  { id: '1024x1024', name: 'HD', description: '1024x1024 - High quality' },
  { id: '1920x1080', name: 'Full HD', description: '1920x1080 - Desktop wallpaper' },
  { id: '2048x2048', name: '2K', description: '2048x2048 - Ultra quality' },
  { id: '3840x2160', name: '4K', description: '3840x2160 - Premium quality' },
  { id: '4096x4096', name: '4K Square', description: '4096x4096 - Maximum detail' }
]

const STYLES = [
  { id: 'cartoon', name: 'Cartoon', emoji: '🎨' },
  { id: 'realistic', name: 'Realistic', emoji: '📸' },
  { id: 'anime', name: 'Anime', emoji: '🌸' },
  { id: 'pixel-art', name: 'Pixel Art', emoji: '👾' },
  { id: 'watercolor', name: 'Watercolor', emoji: '🎭' },
  { id: 'minimalist', name: 'Minimalist', emoji: '⚪' }
]

export default function StickerGenerator() {
  const { data: session, status } = useSession()
  const [keyword, setKeyword] = useState('')
  const [selectedModel, setSelectedModel] = useState('dall-e-3')
  const [selectedResolution, setSelectedResolution] = useState('1024x1024')
  const [selectedStyle, setSelectedStyle] = useState('cartoon')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string; prompt: string; model: string; resolution: string }>>([])

  // Add global image protection on mount
  React.useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' && target.closest('.sticker-container')) {
        e.preventDefault()
        toast({
          title: "Protected Content",
          description: "Please sign in to download this sticker",
          variant: "destructive"
        })
      }
    }

    const preventDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' && target.closest('.sticker-container')) {
        e.preventDefault()
        toast({
          title: "Protected Content",
          description: "Dragging is disabled for protected images",
          variant: "destructive"
        })
      }
    }

    const preventKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S, Ctrl+C, Ctrl+U, F12, etc.
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'c' || e.key === 'u')) ||
        e.key === 'F12'
      ) {
        const target = e.target as HTMLElement
        if (target.closest('.sticker-container')) {
          e.preventDefault()
          toast({
            title: "Protected Content",
            description: "Keyboard shortcuts are disabled for protected content",
            variant: "destructive"
          })
        }
      }
    }

    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('dragstart', preventDragStart)
    document.addEventListener('keydown', preventKeyDown)

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('dragstart', preventDragStart)
      document.removeEventListener('keydown', preventKeyDown)
    }
  }, [])

  const generateSticker = async () => {
    if (!keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword for your sticker",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-sticker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword,
          model: selectedModel,
          resolution: selectedResolution,
          style: selectedStyle
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate sticker')
      }

      const data = await response.json()
      
      setGeneratedImages(prev => [...prev, {
        url: data.imageUrl,
        prompt: keyword,
        model: selectedModel,
        resolution: selectedResolution
      }])

      toast({
        title: "Success!",
        description: "Your sticker has been generated successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate sticker. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = async (imageUrl: string, prompt: string) => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to download stickers",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sticker-${prompt.replace(/\s+/g, '-')}-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast({
        title: "Downloaded!",
        description: "Your sticker has been downloaded"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header with Auth */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sticker Generator
              </h1>
            </div>
            <AuthButton />
          </div>
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Create Amazing AI Stickers
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Generate stunning stickers with multiple AI models. Sign in to download your creations!
            </p>
            {!session && (
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center justify-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Sign in required to download stickers
                </p>
              </div>
            )}
          </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generator Panel */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Create Your Sticker
              </CardTitle>
              <CardDescription>
                Enter your keyword and choose your preferred settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Keyword Input */}
              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword or Prompt</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., cute cat, happy dog, rainbow unicorn"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Style Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Style
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {STYLES.map((style) => (
                    <Button
                      key={style.id}
                      variant={selectedStyle === style.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStyle(style.id)}
                      className="flex items-center gap-1 h-12"
                    >
                      <span className="text-lg">{style.emoji}</span>
                      <span className="text-xs">{style.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Model Selection */}
              <div className="space-y-2">
                <Label>AI Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-xs text-gray-500">{model.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Resolution Selection */}
              <div className="space-y-2">
                <Label>Resolution</Label>
                <Select value={selectedResolution} onValueChange={setSelectedResolution}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOLUTIONS.map((resolution) => (
                      <SelectItem key={resolution.id} value={resolution.id}>
                        <div>
                          <div className="font-medium">{resolution.name}</div>
                          <div className="text-xs text-gray-500">{resolution.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={generateSticker} 
                disabled={isGenerating}
                className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Sticker
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Images Panel */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Generated Stickers
              </CardTitle>
              <CardDescription>
                Your created stickers will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImages.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No stickers generated yet</p>
                  <p className="text-sm text-gray-400 mt-2">Create your first sticker to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-2 sticker-container">
                      <div 
                        className="relative group"
                        onContextMenu={(e) => {
                          e.preventDefault()
                          toast({
                            title: "Protected Content",
                            description: "Please sign in to download this sticker",
                            variant: "destructive"
                          })
                        }}
                        onDragStart={(e) => {
                          e.preventDefault()
                          toast({
                            title: "Protected Content", 
                            description: "Dragging is disabled for protected images",
                            variant: "destructive"
                          })
                        }}
                      >
                        <img 
                          src={image.url} 
                          alt={image.prompt}
                          className="w-full h-48 object-cover rounded-md protected-image"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-md flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Lock className="w-6 h-6 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="font-medium truncate">{image.prompt}</p>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {AI_MODELS.find(m => m.id === image.model)?.name}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {image.resolution}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {session ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadImage(image.url, image.prompt)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Lock className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Sign In Required</DialogTitle>
                                  <DialogDescription>
                                    Please sign in to download your generated stickers. It's quick and easy!
                                  </DialogDescription>
                                </DialogHeader>
                                <SignInButtons />
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Multiple AI Models</h3>
              <p className="text-sm text-gray-600">Choose from DALL-E, Midjourney, Stable Diffusion and more</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">HD to 4K Quality</h3>
              <p className="text-sm text-gray-600">Generate stickers in various resolutions up to 4K quality</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">No Copyright Issues</h3>
              <p className="text-sm text-gray-600">All generated images are copyright-free for commercial use</p>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </>
  )
}