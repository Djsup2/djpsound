const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withTM = require('next-transpile-modules')(['@solana/web3.js']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ['djpsound.com', 'cdn.djpsound.com'],
    formats: ['image/webp'],
    minimumCacheTTL