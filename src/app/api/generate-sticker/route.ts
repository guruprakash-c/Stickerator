import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const MODEL_CONFIGS = {
  'dall-e-3': {
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid'
  },
  'stable-diffusion': {
    size: '1024x1024',
    quality: 'standard',
    style: 'natural'
  },
  'midjourney': {
    size: '1024x1024',
    quality: 'hd',
    style: 'artistic'
  },
  'nano-banana': {
    size: '512x512',
    quality: 'standard',
    style: 'cartoon'
  },
  'dall-e-2': {
    size: '512x512',
    quality: 'standard',
    style: 'natural'
  }
}

const STYLE_PROMPTS = {
  'cartoon': 'cute cartoon style, vibrant colors, simple design, sticker art',
  'realistic': 'photorealistic, high detail, professional photography',
  'anime': 'anime style, manga art, Japanese animation style',
  'pixel-art': 'pixel art style, 8-bit, retro gaming aesthetic',
  'watercolor': 'watercolor painting, soft edges, artistic brush strokes',
  'minimalist': 'minimalist design, clean lines, simple shapes, modern'
}

const RESOLUTION_MAP = {
  '512x512': '512x512',
  '1024x1024': '1024x1024',
  '1920x1080': '1792x1024',
  '2048x2048': '1024x1792',
  '3840x2160': '1792x1024',
  '4096x4096': '1024x1792'
}

export async function POST(request: NextRequest) {
  try {
    const { keyword, model, resolution, style } = await request.json()

    if (!keyword || !model || !resolution || !style) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Create ZAI instance
    const zai = await ZAI.create()

    // Build the enhanced prompt
    const stylePrompt = STYLE_PROMPTS[style as keyof typeof STYLE_PROMPTS]
    const enhancedPrompt = `${keyword}, ${stylePrompt}, sticker design, transparent background, high quality, no copyright issues`

    // Get the appropriate size for the model
    const modelConfig = MODEL_CONFIGS[model as keyof typeof MODEL_CONFIGS]
    const targetResolution = RESOLUTION_MAP[resolution as keyof typeof RESOLUTION_MAP] || '1024x1024'

    // Generate the image
    const response = await zai.images.generations.create({
      prompt: enhancedPrompt,
      size: targetResolution,
      quality: modelConfig.quality,
      n: 1
    })

    // Get the base64 image data
    const imageBase64 = response.data[0]?.base64
    
    if (!imageBase64) {
      throw new Error('No image data received from AI service')
    }

    // Convert base64 to a data URL
    const imageUrl = `data:image/png;base64,${imageBase64}`

    // Return the image URL
    return NextResponse.json({
      success: true,
      imageUrl,
      prompt: keyword,
      model,
      resolution,
      style
    })

  } catch (error: any) {
    console.error('Sticker generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate sticker',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Sticker Generator API',
    endpoints: {
      'POST /api/generate-sticker': {
        description: 'Generate a new sticker',
        parameters: {
          keyword: 'string - The main keyword or prompt',
          model: 'string - AI model to use (dall-e-3, stable-diffusion, midjourney, nano-banana, dall-e-2)',
          resolution: 'string - Image resolution (512x512, 1024x1024, 1920x1080, 2048x2048, 3840x2160, 4096x4096)',
          style: 'string - Art style (cartoon, realistic, anime, pixel-art, watercolor, minimalist)'
        }
      }
    }
  })
}