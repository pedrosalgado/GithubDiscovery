<script setup>
import { repoStore } from '@/stores/repositories'

const store = repoStore()
const props = defineProps(['filter', 'currentRepo'])

function onChange(e) {
  store.fetchRepos(props.filter, e.target.value)
}

function openRepoLink(url) {
  window.open(url, '_blank')
}

function addToBookmarks(repo) {
  store.bookmarks.push(repo)
}
</script>

<template>
  <div>
    <h3>Top {{ props.filter }}</h3>
    <select name="sortType" @change="onChange" class="form-control">
      <option value="">sort by Default</option>
      <option value="stars">sort by Stars</option>
      <option value="forks">sort by Forks</option>
      <option value="help-wanted-issues">sort by help wanted issues</option>
      <option value="updated">sort by updated</option>
    </select>
  </div>
  <div class="flex container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10 overflow-auto">
    <div class="w-50 h-50 px-6" v-for="repository in props.currentRepo[0]" :key="repository.id">
      <button class="w-24 py-3 bookmark flex justify-end button-hover mb-3" @click="addToBookmarks(repository)">
        <span class="inline-block p-1">fav</span>
      </button>
      <button class="rounded p-3 w-34 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 duration-300" @click="openRepoLink(repository.html_url)">
        <!--      <p class="flex">{{ repository.id }}</p>-->
        <span class="text-green-600 mb-3 flex justify-center">{{ repository.name }}</span>
        <span class="line-clamp text-sm text-ellipsis overflow-hidden w-32">
          {{ repository.description }}
        </span>
      </button>
    </div>
  </div>
</template>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.button-hover :hover {
  text-decoration: none;
  background-color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  border-radius: 0.25rem;
}
</style>
