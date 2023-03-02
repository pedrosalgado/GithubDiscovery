import { defineStore } from 'pinia'
import axios from 'axios'
import { toRaw } from 'vue'

export const repoStore = defineStore('repositories', {
  state: () => ({
    repos: [],
    filters: [],
    bookmarks: [],
    isFetching: false
  }),
  getters: {
    getRepos(state) {
      return state.repos
    },
    getFilters(state) {
      return state.filters
    },
    getBookmarks(state) {
      return state.bookmarks
    }
  },
  persist: true,
  actions: {
    addFilter(filter) {
      const filters = this.filters
      const indexOfFilter = filters.indexOf(filter)
      if (filters.indexOf(filter) === -1) {
        filters.push(filter)
      } else {
        filters.splice(indexOfFilter, 1)
      }
      this.filters = filters
    },
    async fetchRepos(filter, sort = '') {
      if (toRaw(this.filters).length <= 0) {
        this.repos = []
        return
      }
      this.isFetching = true
      try {
        const repos = await axios.get(
          'https://api.github.com/search/repositories?sort=' +
            sort +
            '&per_page=10&page=1&q=' +
            filter,
          {
            headers: {
              Authorization: 'Bearer INSERT_TOKEN_HERE'
            }
          }
        )
        this.isFetching = false
        //remove o anterior com o mesmo sort
        if (sort !== '' && sort !== undefined) {
          console.log(this.repos);
          console.log(sort);
          console.log();
          this.repos.splice(
            this.repos.findIndex((e) => e.topic === filter),
            1
          )
        }
        this.repos.push(this.sortRepoResponse(repos.data.items, filter))
      } catch (error) {
        console.log(error)
      }
    },
    sortRepoResponse(response, filter) {
      const sortedRepo = []
      response.map(
        ({ id, name, language, html_url, description, stargazers_count, forks, updated_at }) => {
          sortedRepo.push({
            id,
            name,
            language,
            html_url,
            description,
            stargazers_count,
            forks,
            updated_at
          })
        }
      )

      return {
        topic: filter,
        values: sortedRepo
      }
    }
  }
})
