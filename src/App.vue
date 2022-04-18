<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchField from '@/components/SearchField.vue'
import IconWrapper from '@/components/IconWrapper.vue'

const search = ref('')

</script>

<template>
    <SearchField class='mb-8' v-model="search"/>
    <div id="container">
      <IconWrapper :search="search"/>
  </div>
</template>
