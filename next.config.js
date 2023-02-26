/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: false,
 experimental: {
  appDir: true,
 },
 eslint: {
  dirs: ['src'],
 },
 images: {
  domains: ['static.upbit.com', 'i.seadn.io'],
 },
 webpack(config) {
  config.module.rules.push({
   test: /\.svg$/,
   use: ['@svgr/webpack'],
  })

  return config
 },
}

module.exports = nextConfig
