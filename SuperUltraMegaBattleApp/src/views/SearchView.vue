
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
const id = props.id

async function fetchHero() {
    try {
        console.log(id)
    const response = await fetch(`/api/api/29886e1708e8eb7c81aebfac3130d8a9/${id}`)
    data.value = await response.json()
  } catch (err) {
    error.value = "Erreur lors de l'appel API - " + err
  }
}

onMounted(fetchHero)

</script>

<template>
  <div v-if="error">{{ error }}</div>
    <pre v-else-if="data">
        {{ data }}
    </pre>
    <div v-else>Chargement...</div>
</template>