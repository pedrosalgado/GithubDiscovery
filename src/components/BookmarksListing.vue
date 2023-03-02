<script setup>
import { repoStore } from '@/stores/repositories'
const store = repoStore()

function openRepoLink(url) {
  window.open(url, '_blank')
}

function removeFromBookmarks(index) {
  return store.bookmarks.splice(index, 1)
}
</script>
<template>
  <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10 overflow-auto">
    <h1 class="block">Bookmarks</h1>
    <div class="flex">
      <div
        class="w-50 h-50 px-6"
        v-for="(repository, index) in store.bookmarks"
        :key="repository.id"
      >
        <button
          class="w-24 py-3 bookmark flex justify-end button-hover mb-3"
          @click="removeFromBookmarks(index)"
        >
          <span class="inline-block p-1">rem</span>
        </button>
        <button
          class="rounded p-3 w-34 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 duration-300"
          @click="openRepoLink(repository.html_url)"
        >
          <span class="text-green-600 mb-3 flex justify-center">{{ repository.name }}</span>
          <span class="line-clamp text-sm text-ellipsis overflow-hidden w-32">
            {{ repository.description }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
