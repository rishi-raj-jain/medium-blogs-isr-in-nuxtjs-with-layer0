<template>
  <div class="bg-black flex flex-col items-center justify-center min-h-screen p-5 sm:p-2">
    <span class="absolute bottom-10 left-[50%] transform -translate-x-1/2 text-sm text-gray-400">
      <a target="_blank" rel="noopener" class="underline" href="https://github.com/rishi-raj-jain/static-medium-isr-in-nuxtjs-with-layer0"> GitHub</a>
      | By
      <a target="_blank" rel="noopener" class="underline" href="https://twitter.com/rishi_raj_jain_"> Rishi Raj Jain</a>
      😄
    </span>
    <div class="flex flex-col max-w-[450px]">
      <h1 class="font-bold text-white text-3xl md:text-5xl">Static Medium [ISR in Nuxt.js with Layer0]</h1>
      <div class="relative flex items-center w-full">
        <input
          v-model="searchQuery"
          class="appearence-none w-full bg-black mt-5 p-2 outline-none text-white border border-white border-opacity-25 rounded hover:border-opacity-75 focus:hover:border-opacity-75"
          type="text"
          placeholder="Enter your medium handle"
        />
        <NuxtLink class="border-none" :to="{ path: getPath(searchQuery) }">
          <svg width="10" height="12" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-5 bottom-4">
            <path d="M20 12L0.499999 23.2583L0.5 0.741669L20 12Z" fill="white" />
          </svg>
        </NuxtLink>
      </div>
      <span class="text-gray-400 mt-5">
        Try
        <NuxtLink class="underline" to="/blogs/rishi-raj-jain">rishi-raj-jain</NuxtLink>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getPath(searchQuery) {
      if (typeof window !== 'undefined') window.__client__ = true
      return `/blogs/${searchQuery}`
    },
  },
  data() {
    return {
      searchQuery: '',
    }
  },
  head() {
    let link = process.env.API_URL
    if (typeof window !== 'undefined') link = window.location.origin
    return {
      title: 'Static Medium [ISG in Nuxt.js with Layer0]',
      meta: [
        {
          hid: 'title',
          name: 'title',
          property: 'title',
          content: 'Static Medium [ISG in Nuxt.js with Layer0]',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Static Medium [ISG in Nuxt.js with Layer0]',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          property: 'twitter:title',
          content: 'Static Medium [ISG in Nuxt.js with Layer0]',
        },
        {
          hid: 'url',
          name: 'url',
          content: link,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: link,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          property: 'twitter:url',
          content: link,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: `${link}/cover.png`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          property: 'twitter:image',
          content: `${link}/cover.png`,
        },
        {
          hid: 'description',
          name: 'description',
          content: 'A demo showing off ISG in Nuxt.js with Layer0.',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: 'A demo showing off ISG in Nuxt.js with Layer0.',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          property: 'twitter:description',
          content: 'A demo showing off ISG in Nuxt.js with Layer0.',
        },
      ],
    }
  },
}
</script>
