// Ce fichier centralise tous les headers de sécurité pour une meilleure lisibilité.
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    // Politique de sécurité de contenu (CSP) stricte
    value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://*.djpsound.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.djpsound.com https://ssc-dao.genesysgo.net; frame-src 'none'; base-uri 'self'; form-action 'self';`.replace(/\s{2,}/g, ' ').trim()
  }
];

module.exports = securityHeaders;