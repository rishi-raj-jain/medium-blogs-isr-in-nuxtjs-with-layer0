<template>
  <div class="bg-black flex flex-col items-center justify-center min-h-screen p-5 sm:p-2">
    <div class="flex flex-col max-w-[450px]">
      <h1 class="font-bold text-white text-3xl md:text-5xl">
        {{ resp.title }}
      </h1>
      <li
        class="mt-5 list-none text-white"
        v-for="story of resp['items'].filter((item, index) => index <= 3)"
        :key="story.link"
      >
        <a target="_blank" :href="story.link">
          <h2>&middot; {{ story.title }}</h2>
        </a>
      </li>
      <span class="text-gray-400 mt-5">
        &larr; Back to
        <NuxtLink class="underline" to="/">home</NuxtLink>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (typeof window !== 'undefined' && window.__client__ === true) {
      window.__client__ = false
      console.log('Client Side Transition, Populating the cache...')
      fetch(`/blogs/${this.slug}`)
    }
  },
  head() {
    const title = `${this.resp.title} | Static Medium [ISG in Nuxt.js with Layer0]`
    const description = this.resp.items[0].title
    return {
      title: title,
      meta: [
        {
          hid: 'title',
          name: 'title',
          property: 'title',
          content: title,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          property: 'twitter:description',
          content: description,
        },
        {
          hid: 'url',
          name: 'url',
          content: `${this.link}/blogs/${this.slug}`,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `${this.link}/blogs/${this.slug}`,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          property: 'twitter:url',
          content: `${this.link}/blogs/${this.slug}`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: `${this.link}/cover.png`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          property: 'twitter:image',
          content: `${this.link}/cover.png`,
        },
      ],
    }
  },
  async asyncData({ params, redirect }) {
    let link = process.env.API_URL
    if (typeof window !== 'undefined') link = window.location.origin
    let blogsData = await fetch(`${link}/api/blogs/${params.slug}.json`).then((res) => res.json())
    if (blogsData['code'] == 0) redirect(404, '/error')
    return {
      resp: blogsData['resp'],
      slug: params.slug,
      link,
    }
  },
}
</script>