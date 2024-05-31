<script lang="ts">
    import ImageArea from "$lib/comps/imageArea.svelte";
    import { getTxt } from "$lib/funcs";
    import type { alldatodata, datocmsdata } from "$lib/types/types";
    import { Image } from "@datocms/svelte";
    export let data: alldatodata;

    let pageX = 0;
    let pageY = 0;

    $: albumIndex = -1;
    $: txtColour = albumIndex >= 0 ? getTxt(data.data.allAlbums[albumIndex].pictures[0].responsiveImage.bgColor) : data.data.siteConfig.defaultTxtColour.hex;

    const background = (i: number) => {
        albumIndex = i;
    };
    const hideBackground = () => {
        albumIndex = -1;
    };

    const mousemovement = (e: MouseEvent) => {
        pageX = e.clientX;
        pageY = e.clientY;

    };

</script>
<svelte:window on:mousemove={(e) => mousemovement(e)} />

<div
    class="homescreen"
    style="--bgColour:{albumIndex >= 0
        ? data.data.allAlbums[albumIndex].pictures[0].responsiveImage.bgColor
        : data.data.siteConfig.defaultBgColour.hex}; --txtColour:{txtColour};"
>
    <div class="list">
        <h1 class="follow" style="position: absolute; top: {pageY}px; left: {pageX}px">*</h1>

        <h1>{data.data.siteConfig.title}</h1>
        {#each data.data.allAlbums as album, index}
            <a href="/{album.title}" on:mouseenter={() => background(index)} on:mouseleave={hideBackground}> <h1 class="hoverer">/{album.title}</h1></a>
        {/each}

        <a class='back' href={data.data.siteConfig.backLink}><h1 class="hoverer">...back</h1></a>
    </div>
    {#if albumIndex >= 0}
        <div class="imageBackground">
            <ImageArea ImageData={data.data.allAlbums[albumIndex].pictures[0]} bgColour={true}></ImageArea>
        </div>
    {/if}
</div>

<style lang="scss">
    .homescreen {
        display: flex;
        align-items: left;
        justify-content: top;
        min-height: 100dvh;
        flex-direction: column;
        color: var(--txtColour);
        background-color: var(--bgColour);
        cursor: none;
        gap: var(--padding);
        h1 {
            margin-bottom: var(--halfPadding);
            z-index: 2;
        }
        .list {
            display: flex;
            flex-direction: column;
            margin: var(--padding);
            align-items: flex-start;
        }
        a {
            z-index: 2;
            color: var(--txtColour);
            text-decoration: none;
            cursor: none;
            h1 {
                color: inherit;
            }
        }
        a.back:hover {
            color: var(--hlColour);
        }
        .imageBackground {
            height: 100dvh;
            width: 100dvw;
            z-index: 1;
            pointer-events: 0;
            position: absolute;
        }
    }
</style>
