<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const heroes = ref([])
const loading = ref(false)
const error = ref(null)

let timeout = null

async function searchHeroes() {
  if (!query.value) {
    heroes.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/api/29886e1708e8eb7c81aebfac3130d8a9/search/${query.value}`)
    const data = await response.json()
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

// Debounce 300ms
watch(query, () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    searchHeroes()
  }, 300)
})
</script>

<template>
  <div class="center">
    <h1>SuperHerosDle</h1>

    <RouterLink :to="{ name: 'game' }" class="nav-link">
      START
</RouterLink>

    <div class="search-hero">
      <input
        v-model="query"
        type="text"
        placeholder="Rechercher un héros..."
      />

      <div v-if="loading" class="info">Chargement...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="heroes.length">
        <li
          v-for="hero in heroes"
          :key="hero.id"
          @click="goToHero(hero.id)"
        >
          {{ hero.name }} [{{ hero.id }}]
        </li>
      </ul>

      <div v-else-if="!loading && query" class="info">
        Aucun résultat
      </div>
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  min-height: 100vh;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  margin-bottom: 20px;
}

.search-hero {
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  font-size: 16px;
}

ul {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  margin-top: 5px;
  list-style: none;
}

li {
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

li:hover {
  background: #7D0080;
  color: white;
}

/* Scroll custom */
ul::-webkit-scrollbar {
  width: 6px;
}

ul::-webkit-scrollbar-thumb {
  background-color: #7D0080;
  border-radius: 4px;
}

.info {
  margin-top: 5px;
  font-size: 14px;
}

.error {
  color: red;
  margin-top: 5px;
}

.nav-link {
  display: inline-block;
  padding: 14px 28px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  background: linear-gradient(135deg, #7D0080, #b300b3);
  color: white;
  transition: all 0.25s ease;
  box-shadow: 0 6px 15px rgba(125, 0, 128, 0.3);
  letter-spacing: 1px;
}

/* Hover */
.nav-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(125, 0, 128, 0.5);
}

/* Click */
.nav-link:active {
  transform: scale(0.95);
}

/* Route active */
.router-link-active {
  background: linear-gradient(135deg, #4CAF50, #2e7d32);
  box-shadow: 0 6px 15px rgba(76, 175, 80, 0.4);
}
</style>
