/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  compiler: {
    styledComponents: true
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*/',
        destination: 'http://localhost:8000/api/:path*/'
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*/'
      }
    ]
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'api.cloudinary.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**'
      }
    ]
  }
}

export default nextConfig
