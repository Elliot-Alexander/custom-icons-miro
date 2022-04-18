<template>
    <!-- full width search field with icon using tailwindcss -->
    <div
        class="flex flex-row items-center bg-neutral-700 appearance-none rounded w-full py-2 px-4 transition ring-blue-600 ring-offset-2 ring-offset-transparent text-white leading-tight focus-within:ring-2"
    >
        <input
            class="flex-grow focus:outline-none p-0 shadow-none focus:ring-transparent focus:ring-offset-transparent outline-none bg-transparent border-none"
            type="text"
            placeholder="Search"
            :value="modelValue"
            @input="$emit('update:modelValue', handleInput)"
        />
        <SearchIcon class="h-8 w-8 text-white"/>
    </div>
</template>

<script lang='ts'>
import { SearchIcon } from '@heroicons/vue/solid'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        SearchIcon,
    },
    props: {
        modelValue: String,
    },
    methods: {
        handleInput (event: Event) {
            return (event.target as HTMLInputElement).value
        }
    }
})



</script>

<style scoped>

</style>