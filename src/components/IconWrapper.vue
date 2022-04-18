<template>
    <div class="w-full h-[500px]">
        <div v-if="filteredIcons" id="container" class="w-full grid grid-cols-3 items-start h-[500px] overflow-y-auto">
            <IconPreview
                v-for="icon in filteredIcons"
                :image-url="icon.url"
                :icon-name="icon.name"
            />
        </div>
        <Loader v-else />
    </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import IconPreview from '@/components/IconPreview.vue'
import axios from 'axios'
import Loader from '@/components/Loader.vue'

type IconInfo = {
    name: string
    url: string
}

let iconUrls = ref([] as IconInfo[])

let availableIcons;

axios.get(import.meta.env.VITE_BUCKET_URL + '?max-keys=8000')
    .then(res => {
        const xmlParser = new DOMParser()
        const xmlDoc = xmlParser.parseFromString(res.data as string, 'text/xml')
        availableIcons = xmlDoc.querySelectorAll('Contents Key')
        availableIcons.forEach(iconPath => {
            const assetPath = new URL(iconPath.textContent as string, import.meta.env.VITE_BUCKET_URL).href
            let iconName: string = ''
            assetPath?.split('/').pop()?.split('.')?.shift()?.split('-').forEach(
                (part) => {
                    iconName += part.charAt(0).toUpperCase() + part.slice(1) + ' '
                })
            iconUrls.value.push({
                name: iconName,
                url: assetPath
            })
        })
    })
    .catch(err => {
        console.log(err)
    })

const props = defineProps({
    search: {
        type: String,
        default: '',
        required: false
    }
})

const filteredIcons = computed(() => {
    const search = props.search.toLowerCase()
    return iconUrls.value.filter((icon) => {
        return icon.name.toLowerCase().includes(search)
    })
})

console.log(iconUrls)

function createShape(canvasX: number, canvasY: number, iconUrl: any) {
    console.log(iconUrl)
    return miro.board.widgets.create({
        type: 'image',
        url: iconUrl,
        x: canvasX,
        y: canvasY,
    })
}

function bootstrap() {
    const container = document.getElementById('container')

    let currentImageUrl: string | null
    const imageOptions = {
        draggableItemSelector: 'img',
        onClick: async (targetElement) => {
            const url = targetElement.getAttribute('data-image-url')
            const widget = (await createShape(0, 0, url))[0]
            miro.board.viewport.zoomToObject(widget)
        },
        getDraggableItemPreview: (targetElement) => {
            //drag-started
            currentImageUrl = targetElement.getAttribute('data-image-url')
            console.log(currentImageUrl)
            return {
                width: 100,
                height: 100,
                url: currentImageUrl,
            }
        },
        onDrop: (canvasX, canvasY) => {
            console.log('onDrop 1')
            createShape(canvasX, canvasY, currentImageUrl)
        },
    }
    miro.board.ui.initDraggableItemsContainer(container, imageOptions)
}

onMounted(() => {

    bootstrap()
})

</script>

<style scoped>

</style>