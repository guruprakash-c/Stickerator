export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Stickerator",
    "description": "Generate amazing AI-powered stickers with DALL-E, Midjourney, Stable Diffusion and more. Choose from HD to 4K resolution. Copyright-free stickers for commercial use.",
    "url": "https://stickerator-umber.vercel.app/",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Multiple AI Models (DALL-E, Midjourney, Stable Diffusion)",
      "HD to 4K Resolution Support",
      "Various Art Styles",
      "Copyright-Free Images",
      "Commercial Use Allowed",
      "Instant Download"
    ],
    "screenshot": "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "AI Sticker Generator Team"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}