<template>
    <div class="image-box draggable-item h-full flex flex-col items-center justify-start gap-1">
        <img class="w-16 h-16" :src="imageUrl" :data-image-url="imageUrl"/>
        <p class="text-sm font-inter text-center line-clamp-2 text-white">{{ iconName }}</p>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        imageUrl: {
            type: String,
            default: '',
        },
        iconName: {
            type: String,
            default: '',
        }
    },
})

</script>

<style scoped>

</style>