/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['supports-color', 'debug', 'googleapis', 'googleapis-common', 'gaxios', 'https-proxy-agent'],
};

module.exports = nextConfig;
