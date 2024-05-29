<script lang="ts">
    import { Image } from "@datocms/svelte";
    export let ImageData;
</script>

<div class="fullscreen">
    <div class="imageHolder">
        <Image data={ImageData.responsiveImage} layout='fill'></Image>
    </div>
</div>

<!-- {JSON.stringify(ImageData.responsiveImage)} -->
<style lang="scss">
    .fullscreen {
        width: 100dvw;
        height: 100dvh;
        overflow: none;
        // position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 1;
        position: relative;
        .imageHolder{
            max-height: 90%;
            max-width: 90%;
            object-fit: contain;
            :global(img){
                object-fit: contain;
            }
        }
    }
</style>
