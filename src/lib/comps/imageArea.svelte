<script lang="ts">
    import { Image } from "@datocms/svelte";
    export let ImageData;

    export let bgColour:boolean =  false
</script>

<div class="fullscreen">
    <div class="imageHolder" >
        {#if !bgColour}
        <Image data={ImageData.responsiveImage} layout='fill' fadeInDuration={500}></Image>
        {/if}
    </div>
</div>

<!-- {JSON.stringify(ImageData.responsiveImage)} -->
<style lang="scss">
    .fullscreen {
        width: 100dvw;
        height: 100dvh;
        overflow: none;
        background-color: var(--bgColour);
        // position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 1;
        position: relative;
        .imageHolder{
            width: 100dvw;
        height: 100dvh;
            object-fit: cover;
            position: relative;
            :global(img){
                object-fit: cover;
            }
            :global(div img){
                height: 100dvh !important;
                top: 0px !important;

            }
            
        }
    }
</style>
