<script lang="ts">
    import ImageArea from "$lib/comps/imageArea.svelte";
    import type { alldatodata, datocmsdata } from "$lib/types/types";
    import { Image } from "@datocms/svelte";

    export let data: alldatodata;
    $: albumIndex = -1;

    const background = (i: number) => {
        albumIndex = i;
    };
    const hideBackground = () => {
        albumIndex = -1;
    };
</script>

<!-- {JSON.stringify(data.data)} -->
<div class="homescreen">
    <div class="list">
        <h1>severin's albums</h1>
        {#each data.data.allAlbums as album, index}
            <a href="/{album.title}" on:mouseenter={() => background(index)} on:mouseleave={hideBackground}> <h1>/{album.title}</h1></a>
        {/each}

        <a href="https://www.fredwordie.com/"><h1>...back</h1></a>
    </div>
    {#if albumIndex >= 0}
    <div class="imageBackground">
        <ImageArea ImageData={data.data.allAlbums[albumIndex].pictures[0]}></ImageArea>
    </div>
{/if}
</div>

<style lang="scss">
    .homescreen {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100dvh;
        flex-direction: column;
        h1{
            margin: 0px;
            z-index: 2;

        }
        .list{
            display: flex;
            flex-direction: column;

        }
        a {
            z-index: 2;
            color: var(--white);
            text-decoration: none;
            h1 {
                color: inherit;
            }
        }
        a:hover {
            color: var(--green);
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
