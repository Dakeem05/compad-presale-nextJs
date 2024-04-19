/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      config.externals.push("pino-pretty", "lokijs", "encoding");
      config.module.rules.forEach((rule) => {
        if (rule.use && rule.use.loader === 'next-babel-loader') {
          if (rule.use.options) {
            rule.use.options.configFile = false;
            rule.use.options.presets = [['next/babel', { 'swcMinify': false }]];
          }
        }
      });
      return config;
    },
  };
  
  export default nextConfig;
  