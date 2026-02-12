<script setup>
import { ref, watch, onMounted } from 'vue'

const query = ref('')
const suggestions = ref([])
const attempts = ref([])
const loading = ref(false)
const error = ref(null)
const targetHero = ref(null)
const gameOver = ref(false)
const revealedHeroName = ref('')

let timeout = null

// 🔎 Recherche héros
async function searchHeroes() {
  if (!query.value || gameOver.value) {
    suggestions.value = []
    return
  }

  loading.value = true

  try {
    const response = await fetch(`/api/api/29886e1708e8eb7c81aebfac3130d8a9/search/${query.value}`)
    const data = await response.json()
    suggestions.value = data.results || []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// 🎲 Choisit un héros mystère aléatoire
async function generateTargetHero() {
  const randomId = Math.floor(Math.random() * 731) + 1
  const response = await fetch(`/api/api/29886e1708e8eb7c81aebfac3130d8a9/${randomId}`)
  targetHero.value = await response.json()
}

// 📥 Quand on clique sur un héros
async function selectHero(hero) {
  if (gameOver.value) return

  const response = await fetch(`/api/api/29886e1708e8eb7c81aebfac3130d8a9/${hero.id}`)
  const fullHero = await response.json()

  attempts.value.unshift(fullHero)
  query.value = ''
  suggestions.value = []

  if (fullHero.id === targetHero.value.id) {
    gameOver.value = true
    alert("🎉 Bravo ! Tu as trouvé le héros mystère !")
    return
  }

  if (attempts.value.length >= 5) {
    gameOver.value = true
    revealedHeroName.value = targetHero.value.name
  }
}

// 📊 Compare stats et flèches
function compareStat(stat, value) {
  const targetValue = parseInt(targetHero.value.powerstats[stat])
  const currentValue = parseInt(value)

  let arrow = "✓"
  const sens = currentValue - targetValue
  if (currentValue !== targetValue) {
    arrow = sens > 0 ? "↓" : "↑"
  }

  const diff = Math.abs(currentValue - targetValue)

  if (currentValue === targetValue) return { class: "equal", arrow }
  if (diff <= 10) return { class: "close", arrow }
  return { class: "wrong", arrow }
}

// Debounce recherche
watch(query, () => {
  clearTimeout(timeout)
  timeout = setTimeout(searchHeroes, 300)
})

onMounted(generateTargetHero)
</script>

<template>
  <div class="game-container">
    <h1>SuperHeroDle</h1>

    <!-- Search -->
    <input
      v-model="query"
      placeholder="Devine le héros..."
      :disabled="gameOver"
    />

    <ul v-if="suggestions.length" class="suggestions">
      <li
        v-for="hero in suggestions"
        :key="hero.id"
        @click="selectHero(hero)"
      >
        {{ hero.name }}
      </li>
    </ul>

    <!-- Attempts horizontal scroll -->
    <div v-if="attempts.length" class="attempts-horizontal">
      <div
        v-for="hero in attempts"
        :key="hero.id + Math.random()"
        class="attempt-card"
      >
        <h2>{{ hero.name }}</h2>

        <div
          v-for="(value, stat) in hero.powerstats"
          :key="stat"
          class="stat"
          :class="compareStat(stat, value).class"
        >
          <span class="stat-name">{{ stat + " "}}</span>
          <span class="stat-value">{{ value + " "}}</span>
          <span class="arrow">{{ compareStat(stat, value).arrow }}</span>
        </div>
      </div>
    </div>

    <!-- Reveal after 5 guesses -->
    <div v-if="gameOver && revealedHeroName" class="reveal">
      💀 Le héros mystère était : <strong>{{ revealedHeroName }}</strong>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  max-width: 700px;
  margin: auto;
  padding: 40px 20px;
  text-align: center;
}

input {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.suggestions {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  list-style: none;
  padding: 5px;
  margin-bottom: 20px;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background: #7D0080;
  color: white;
}

/* Horizontal scroll for attempts */
.attempts-horizontal {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

/* Cards style */
.attempt-card {
  min-width: 220px;
  flex-shrink: 0;
  background: #f4f4f4;
  padding: 15px;
  border-radius: 10px;
}

/* Stats inside card */
.stat {
  padding: 5px;
  margin: 3px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Comparaison visuelle */
.equal {
  background: #4CAF50;
  color: white;
}

.close {
  background: #FFC107;
  color: black;
}

.wrong {
  background: #f44336;
  color: white;
}

.reveal {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #7D0080;
  font-weight: bold;
}
</style>
