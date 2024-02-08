/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.CODESPACES
          ? `https://${process.env.CODESPACE_NAME}-8787.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}/api/:path*`
          : `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/dario-piotrowicz/next-on-pages/blob/8e93067/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
  import("@cloudflare/next-on-pages/next-dev").then(({ setupDevBindings }) => {
    setupDevBindings({
      bindings: {
        // Add here the Cloudflare Bindings you want to have available during local development,
        // for more details on Bindings see: https://developers.cloudflare.com/pages/functions/bindings/)
        //
        // KV Example:
        // MY_KV: {
        //   type: 'kv',
        //   id: 'xxx',
        // }
      },
    });
  });
}
