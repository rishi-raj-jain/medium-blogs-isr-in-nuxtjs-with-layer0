<template>
  <div
    v-if="resp"
    class="bg-black flex flex-col items-center justify-center min-h-screen p-5 sm:p-2"
  >
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
  <LazyPlaceholder v-else>
</template>

<script>
export default {
  data() {
    return {
      slug: '',
      resp: null,
    }
  },
  head() {
    const title = this.resp ? this.resp.title : 'In Progress'
    const description = this.resp ? this.resp.items[0].title : 'In Progress'
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
          content: `https://rishi-raj-jain-try-default.layer0.link/${this.slug}`,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `https://rishi-raj-jain-try-default.layer0.link/${this.slug}`,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          property: 'twitter:url',
          content: `https://rishi-raj-jain-try-default.layer0.link/${this.slug}`,
        },
      ],
    }
  },
  async fetch() {
    this.slug = this.$nuxt.context.params.slug
    let resp = await fetch(`https://rishi-raj-jain-try-default.layer0.link/api/blogs/${this.slug}.json`).then((res) => res.json())
    console.log(resp)
    if (resp['code'] == 0) this.$nuxt.redirect(404, '/error')
    this.resp = resp['resp']
    if (typeof window !== "undefined" && window.__client__ === true) {
      window.__client__= false
      console.log('Client Side Transition, Populating the cache...')
      // cache the HTML on the edge (limitations of nuxt)
      fetch(`https://rishi-raj-jain-try-default.layer0.link/blogs/${this.slug}`)
    }
  },
}
</script>