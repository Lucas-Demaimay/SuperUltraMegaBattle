<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const data = ref(null)
const error = ref(null)

async function fetchHero() {
  try {
    const response = await fetch(`/api/api/29886e1708e8eb7c81aebfac3130d8a9/${props.id}`)
    const result = await response.json()

    if (result.response === "error") {
      throw new Error(result.error)
    }

    data.value = result
  } catch (err) {
    error.value = "Erreur lors de l'appel API - " + err.message
  }
}

onMounted(fetchHero)
</script>

<template>
  <div class="container">
    <div v-if="error" class="error">{{ error }}</div>

    <div v-else-if="data" class="card">
      
      <!-- Image -->
      <img :src="data.image.url" :alt="data.name" class="hero-image" />

      <!-- Nom -->
      <h1>{{ data.name }}</h1>
      <p class="publisher">
        {{ data.biography.publisher }} • {{ data.biography.alignment }}
      </p>

      <!-- Stats -->
      <div class="stats">
        <h2>Powerstats</h2>
        <div v-for="(value, key) in data.powerstats" :key="key" class="stat">
          <span class="stat-name">{{ key }}</span>
          <div class="bar">
            <div
              class="fill"
              :style="{ width: value + '%' }"
            ></div>
          </div>
          <span class="stat-value">{{ value }}</span>
        </div>
      </div>

      <!-- Infos supplémentaires -->
      <div class="info">
        <p><strong>Nom complet :</strong> {{ data.biography['full-name'] || 'N/A' }}</p>
        <p><strong>Race :</strong> {{ data.appearance.race }}</p>
        <p><strong>Taille :</strong> {{ data.appearance.height[1] }}</p>
        <p><strong>Poids :</strong> {{ data.appearance.weight[1] }}</p>
        <p><strong>Première apparition :</strong> {{ data.biography['first-appearance'] }}</p>
      </div>

    </div>

    <div v-else>Chargement...</div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 600px;
  max-width: 95%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.hero-image {
  width: 200px;
  display: block;
  margin: 0 auto 20px auto;
  border-radius: 12px;
}

h1 {
  text-align: center;
  margin-bottom: 5px;
}

.publisher {
  text-align: center;
  color: gray;
  margin-bottom: 20px;
}

.stats h2 {
  margin-bottom: 10px;
}

.stat {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.stat-name {
  width: 100px;
  text-transform: capitalize;
}

.bar {
  flex: 1;
  background: #eee;
  height: 10px;
  border-radius: 5px;
  margin: 0 10px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: #7D0080;
}

.stat-value {
  width: 30px;
  text-align: right;
}

.info {
  margin-top: 20px;
  font-size: 14px;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
