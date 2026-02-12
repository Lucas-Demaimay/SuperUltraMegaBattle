<script setup>

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const heroes = ref([])   
const loading = ref(false)
const error = ref(null)

async function searchHeroes() {
  if(!query.value) {
    heroes.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/api/29886e1708e8eb7c81aebfac3130d8a9/search/${query.value}`)
    const data = await response.json()
    console.log(data.results)
    heroes.value = data.results || []
  } catch (err) {
    error.value = "Erreur API : " + err.message
  } finally {
    loading.value = false
  }
}

function goToHero(heroId) {
  router.push({ name: 'search', params: { id: heroId } })
}

watch(query, () => {
  searchHeroes()
})
</script>

<template>
  <div class="greetings">
    <h1>SuperHérosDle</h1>
    <button>START GAME</button>
    <div class="search-hero">
    <input
      v-model="query"
      type="text"
      placeholder="Rechercher un héros..."
      class="border p-2 rounded w-full mb-2"
    />

    <div v-if="loading">Chargement...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <ul v-if="heroes.length" class="border rounded p-2">
      <li
        v-for="hero in heroes"
        :key="hero.id"
        class="p-1 cursor-pointer hover:bg-gray-200"
        @click="goToHero(hero.id)"
      >
        {{ hero.name + " [" + hero.id +"]" }}
      </li>
    </ul>

    <div v-else-if="!loading && query">Aucun résultat</div>
  </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
 position: absolute;
}

button {
  opacity: 1;
  background: #7D0080;
  text-shadow: 2px 0 0 #000000, -2px 0 0 #000000, 0 2px 0 #000000, 0 -2px 0 #000000, 1px 1px #000000, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000;
  border: 3px solid #ffffffff;
  border-radius: 25px;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  cursor: pointer;
}

</style>
