<template>
  <div class="bg-black flex flex-col items-center justify-center min-h-screen p-5 sm:p-2">
    <div class="flex flex-col max-w-[450px]">
      <h1 class="font-bold text-white text-3xl md:text-5xl">
        {{ data.title }}
      </h1>
      <li class="mt-5 list-none text-white" v-for="article of data['items']" :key="article.link">
        <a target="_blank" :href="article.link">
          <h2>&middot; {{ article.title }}</h2>
        </a>
      </li>
      <span class="text-gray-400 mt-5"> Page generated at: {{ data.random }} </span>
      <button
        @click="testISR"
        class="mt-5 cursor-pointer text-gray-300 hover:text-white hover:bg-black shadow rounded border border-gray-500 py-2 px-3 w-[320px]"
      >
        Test ISR (refresh page in 60 seconds)
      </button>
      <span class="text-gray-400 mt-5">
        &larr; Back to
        <NuxtLink class="underline" to="/">home</NuxtLink>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    testISR() {
      setTimeout(() => {
        window.location.reload()
      }, 60 * 1000)
    },
  },
  mounted() {
    if (typeof window !== 'undefined' && window.__client__ === true) {
      window.__client__ = false
      console.log('Client Side Transition, Populating the cache...')
      fetch(`/blogs/${this.slug}`)
    }
  },
  head() {
    const title = `${this.data.title} | Static Medium [ISG in Nuxt.js with Layer0]`
    const description = this.data.items && this.data.items.length > 0 ? this.data.items[0].title : ''
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
  async asyncData({ req, params, redirect }) {
    let link = undefined
    let data = undefined
    // If in browser (i.e. on client side)
    if (typeof window !== 'undefined') {
      link = window.location.origin
    }
    // If on server side (either on Layer0 or on local)
    else {
      let hostURL = req ? req.headers.host : process.env.API_URL
      // You have access to req.headers.host when running npm run dev
      // You have access to process.env.API_URL on Layer0 env after deployment, but there is no req header
      // Why's that? It's an added benefit of being on Layer0, as the project is compiled with target: 'static',
      // Which removes the req object from asyncData in nuxt to produce a full static application.
      // This rather is the beauty to ISG with Nuxt.js and Layer0, that you can combine full static site with
      // server side capabilities
      if (hostURL) {
        hostURL = hostURL.replace('http://', '')
        hostURL = hostURL.replace('https://', '')
        if (hostURL.includes('localhost:')) {
          link = `http://${hostURL}`
        } else {
          link = `https://${hostURL}`
        }
      }
    }
    let resp = await fetch(`${link}/api/blogs/${params.slug}.json`)
    if (!resp.ok) {
      redirect(404, '/error')
    } else {
      data = await resp.json()
      if (data['code'] === 0) {
        redirect(404, '/error')
      }
    }
    data = data['resp']
    data['items'] = data['items'].filter((item, index) => index <= 3).map((i) => ({ title: i.title, link: i.link }))
    return {
      data,
      link,
      slug: params.slug,
    }
  },
}
</script>
