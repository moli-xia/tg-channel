import process from 'node:process'
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import cloudflare from '@astrojs/cloudflare'
import netlify from '@astrojs/netlify'
import node from '@astrojs/node'
import { provider } from 'std-env'
import sentry from '@sentry/astro'

const providers = {
  vercel: vercel({
    isr: false,
    edgeMiddleware: false,
  }),
  cloudflare_pages: cloudflare(),
  netlify: netlify({
    cacheOnDemandPages: false,
    edgeMiddleware: false,
  }),
  node: node({
    mode: 'standalone',
  }),
}

const adapterProvider = process.env.SERVER_ADAPTER || provider

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: providers[adapterProvider] || providers.node,
  // 新增：显式绑定到 0.0.0.0 并固定端口
  server: {
    host: true,
    port: 4321,
  },
  integrations: [
    ...(process.env.SENTRY_DSN
      ? [
          sentry({
            enabled: {
              client: false,
              server: process.env.SENTRY_DSN,
            },
            dsn: process.env.SENTRY_DSN,
            sourceMapsUploadOptions: {
              enabled: process.env.SENTRY_PROJECT && process.env.SENTRY_AUTH_TOKEN,
              project: process.env.SENTRY_PROJECT,
              authToken: process.env.SENTRY_AUTH_TOKEN,
            },
          }),
        ]
      : []),
  ],
  // 开发服务器配置
  vite: {
    server: {
      port: 4321,
      host: true,
    },
    ssr: {
      noExternal: process.env.DOCKER ? !!process.env.DOCKER : undefined,
      external: [
        ...adapterProvider === 'cloudflare_pages'
          ? [
              'module',
              'url',
              'events',
              'worker_threads',
              'async_hooks',
              'util',
              'node:diagnostics_channel',
              'node:net',
              'node:tls',
              'node:worker_threads',
              'node:util',
              'node:fs',
              'node:path',
              'node:process',
              'node:buffer',
              'node:string_decoder',
              'node:readline',
              'node:events',
              'node:stream',
              'node:assert',
              'node:os',
              'node:crypto',
              'node:zlib',
              'node:http',
              'node:https',
              'node:url',
              'node:querystring',
              'node:child_process',
              'node:inspector',
            ]
          : [],
      ],
    },
  },
})
