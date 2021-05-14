<template>
  <span class="hidden" v-if="loading"></span>
  <div
    class="bg-black flex flex-col items-center justify-center min-h-screen p-5 sm:p-2"
    v-else
  >
    <div class="flex flex-col max-w-[450px]">
      <h1 class="font-bold text-white text-3xl md:text-5xl">
        {{ resp["feed"]["title"] }}
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
  head() {
    return {
      title: this.resp["feed"]["title"],
      meta: [
        {
          hid: "title",
          name: "title",
          property: "title",
          content: this.resp["feed"]["title"],
        },
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: this.resp["feed"]["title"],
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          property: "twitter:title",
          content: this.resp["feed"]["title"],
        },
        {
          hid: "description",
          name: "description",
          content: this.resp["items"][0]["title"],
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content: this.resp["items"][0]["title"],
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          property: "twitter:description",
          content: this.resp["items"][0]["title"],
        },
        {
          hid: "url",
          name: "url",
          content: `https://rishi-raj-jain-try-default.layer0.link/${this.slug}`,
        },
        {
          hid: "og:url",
          name: "og:url",
          property: "og:url",
          content: `https://rishi-raj-jain-try-default.layer0.link/${this.slug}`,
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          property: "twitter:url",
          content: `https://rishi-raj-jain-try-default.layer0.link/${this.slug}`,
        },
      ],
    };
  },
  async asyncData({ params, redirect }) {
    let loading = true;
    let resp = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${params.slug}`
    ).then((res) => res.json());
    if (!resp) {
      redirect("/someone/something");
    }
    if ((resp && !resp.hasOwnProperty("items")) || resp["items"].length <= 0) {
      redirect(404, "/error");
    }
    loading = false;
    return {
      resp,
      slug: params.slug,
      loading,
    };
  },
};
</script>