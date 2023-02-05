/** @type {import('next').NextConfig} */
const nextConfig = {
 experimental: {
  appDir: true,
 },
 eslint: {
  dirs: ['src'],
 },
}

module.exports = nextConfig
