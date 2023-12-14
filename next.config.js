/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    env: {
        NEXT_API_URL_ADMIN: process.env.NEXT_API_URL_ADMIN,
        NEXT_API_URL_ESHOP_APP: process.env.NEXT_API_URL_ESHOP_APP,
      },
}

module.exports = nextConfig
