<script setup>
import { repoStore } from '@/stores/repositories'
import { computed } from 'vue'
import RepoListing from '../components/RepoListing.vue'
import BookmarksListing from '@/components/BookmarksListing.vue'

const store = repoStore()
const allFilters = ['Vue', 'Javascript', 'Typescript', 'Go', 'CSS', 'Node']

const getFilters = computed(() => {
  return store.getFilters
})
const getRepos = computed(() => {
  return store.getRepos
})
function toggleFilter(e) {
  const filterValue = e.target.value
  store.addFilter(filterValue)
  store.fetchRepos(filterValue)
}
function checkForFilter(filter) {
  return getFilters.value.indexOf(filter) !== -1
}

function sortRepos(filter) {
  const selectedRepos = []
  getRepos.value.filter(function (e) {
    if (e.topic === filter) selectedRepos.push(e.values)
  })
  return selectedRepos
}
</script>
<template>
  <BookmarksListing v-if="store.bookmarks.length"/>
  <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    <ul class="flex flex-row space-x-8">
      <li v-for="filter in allFilters" :key="filter">
        <button
          :class="{ active: checkForFilter(filter) }"
          class="toggle-button"
          @click="toggleFilter"
          :value="filter"
        >
          {{ filter }}
        </button>
      </li>
    </ul>
  </div>
  <div v-for="filter in getFilters.slice().reverse()" :key="filter.id">
    <RepoListing v-if="checkForFilter(filter)" :filter="filter" :currentRepo="sortRepos(filter)" />
  </div>
</template>

<style>
.active {
  color: rgb(22 163 74);
}
</style>
