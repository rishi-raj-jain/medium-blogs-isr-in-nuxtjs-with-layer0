<template>
  <div
    class="bg-black flex flex-col items-center justify-center min-h-screen p-5 sm:p-2"
  >
    <span
      class="absolute bottom-10 left-[50%] transform -translate-x-1/2 text-md text-gray-400"
    >
      <a
        target="_blank"
        rel="noopener"
        class="underline"
        href="https://github.com/rishi-raj-jain/static-medium-isr-in-nuxtjs-with-layer0"
      >
        GitHub</a
      >
      | By
      <a
        target="_blank"
        rel="noopener"
        class="underline"
        href="https://twitter.com/rishi_raj_jain_"
      >
        Rishi Raj Jain</a
      >
      😄
    </span>
    <div class="flex flex-col max-w-[450px]">
      <h1 class="font-bold text-white text-3xl md:text-5xl">
        Oops! Author Not Found 🙁
      </h1>
      <div class="mt-5 w-full bg-[#ffffff50] h-[1px]" />
      <span class="text-gray-400 mt-5">
        Try
        <NuxtLink class="underline" to="/">/</NuxtLink>
      </span>
      <span class="text-gray-400 mt-5">
        Try
        <NuxtLink class="underline" to="/rishi-raj-jain"
          >/rishi-raj-jain</NuxtLink
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  head: {
    title:
      "404: The author could not be found | Static Medium [ISR in Nuxt.js with Layer0]",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "title",
        name: "title",
        property: "title",
        content:
          "404: The author could not be found | Static Medium [ISR in Nuxt.js with Layer0]",
      },
      {
        hid: "og:title",
        name: "og:title",
        property: "og:title",
        content:
          "404: The author could not be found | Static Medium [ISR in Nuxt.js with Layer0]",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        property: "twitter:title",
        content:
          "404: The author could not be found | Static Medium [ISR in Nuxt.js with Layer0]",
      },
      {
        hid: "url",
        name: "url",
        content: "https://rishi-raj-jain-try-default.layer0.link/error",
      },
      {
        hid: "og:url",
        name: "og:url",
        property: "og:url",
        content: "https://rishi-raj-jain-try-default.layer0.link/error",
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        property: "twitter:url",
        content: "https://rishi-raj-jain-try-default.layer0.link/error",
      },
    ],
  },
};
</script>