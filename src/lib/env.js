export function getEnv(env, Astro, name) {
  const runtimeConfig = Astro?.locals?.config
  if (runtimeConfig) {
    const mapping = {
      CHANNEL: 'site.channel',
      LOCALE: 'site.locale',
      TIMEZONE: 'site.timezone',
      STATIC_PROXY: 'site.staticProxy',
      TELEGRAM: 'social.telegram',
      TWITTER: 'social.twitter',
      GITHUB: 'social.github',
      DISCORD: 'social.discord',
      MASTODON: 'social.mastodon',
      BLUESKY: 'social.bluesky',
      COMMENTS: 'site.comments',
    }

    const path = mapping[name]
    if (path) {
      const value = path.split('.').reduce((obj, key) => obj?.[key], runtimeConfig)
      if (value !== undefined && value !== null) {
        return value
      }
    }
  }

  if (env?.[name] !== undefined) {
    return env[name]
  }

  return Astro?.locals?.runtime?.env?.[name]
}
