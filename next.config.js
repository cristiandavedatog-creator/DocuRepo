/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['supports-color', 'debug', 'googleapis', 'gaxios', 'https-proxy-agent'],
};

module.exports = nextConfig;
