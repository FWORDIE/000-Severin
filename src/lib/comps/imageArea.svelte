<script lang="ts">
    import { Image } from "@datocms/svelte";
    export let ImageData;

    export let bgColour: boolean = false;

    export let lightBoxed = true;
</script>

<div class="fullscreen">
    <div class="imageHolder" style="--focalPoint: {ImageData.focalPoint.x * 100}% {ImageData.focalPoint.y * 100}%; " class:lightBoxed>
        {#if !bgColour}
            <Image data={ImageData.responsiveImage} layout="{lightBoxed ? 'responsive' : 'fill'}" fadeInDuration={500}></Image>
        {/if}
    </div>
</div>

<!-- {JSON.stringify(ImageData.responsiveImage)} -->
<style lang="scss">
    .fullscreen {
        width: 100dvw;
        height: 100dvh;
        overflow: none;
        background-color: var(--pageBgColour);
        // position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 1;
        position: relative;
        .imageHolder {
            width: 100dvw;
            height: 100dvh;
            object-fit: cover;
            position: relative;

            :global(img) {
                object-fit: cover;
                object-position: var(--focalPoint);
                
            }
            :global(div img) {
                height: 100dvh !important;
                top: 0px !important;
            }

            &.lightBoxed {
                object-fit: contain;
                padding: calc(2 * var(--largePadding));
                width: 100dvw;
                height: 60vh;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                :global(img) {
                    object-fit: contain;
                    object-position: var(--focalPoint);
                    height: 100% !important;
                    max-height: 60vh;

                }
                :global(div img) {
                    height: 100% !important;
                    top: 0px !important;
                }
            }
        }
    }
</style>
