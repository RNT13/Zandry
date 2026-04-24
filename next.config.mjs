/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['placehold.co', 'res.cloudinary.com', 'api.cloudinary.com', 'localhost']
  }
}

export default nextConfig
