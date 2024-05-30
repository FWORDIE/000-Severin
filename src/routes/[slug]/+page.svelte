<script lang="ts">
    import ImageArea from "$lib/comps/imageArea.svelte";
    import type { datocmsdata } from "$lib/types/types";
    import { imageNum } from "$lib/store/store";
    import { goto } from "$app/navigation";
    export let data: datocmsdata;
    import { onMount } from "svelte";
    import { random,getTxt } from "$lib/funcs";

    let pageX = 0;
    let pageY = 0;

    let numOfPictures = data.data.album.pictures.length;

    let window: HTMLElement;

    let mouseText = "";

    $: txtColour = getTxt(data.data.album.pictures[$imageNum].responsiveImage.bgColor);

    var bgImage = true;

    onMount(() => {
        $imageNum = Math.floor(random(0, numOfPictures));
    });

    

    const next = () => {
        console.log($imageNum, numOfPictures);
        if ($imageNum < numOfPictures - 1) {
            $imageNum += 1;
        } else {
            $imageNum = 0;
        }
    };

    const prev = () => {
        if ($imageNum > 0) {
            $imageNum -= 1;
        } else {
            $imageNum = numOfPictures - 1;
        }
    };

    const showInfo = () => {
        mouseText = "back";
        bgImage = false;
    };

    const back = () => {
        mouseText = `[${$imageNum + 1}/${numOfPictures}]`;
        bgImage = true;
    };

    const mousemovement = (e: MouseEvent) => {
        pageX = e.clientX;
        pageY = e.clientY;
        let box = window.getBoundingClientRect();
        if (mouseText == "back") {
            return;
        }
        if (e.clientX < box.width / 4 && e.clientY > box.height / 8) {
            mouseText = "prev";
            return;
        } else if (e.clientX > box.width - box.width / 4 && e.clientY > box.height / 8) {
            mouseText = "next";
            return;
        } else if (e.clientY < box.height / 8) {
            mouseText = "/home";
            return;
        } else if (e.clientY > box.height - box.height / 8) {
            mouseText = "info";
            return;
        }

        mouseText = `[${$imageNum + 1}/${numOfPictures}]`;
    };

    const click = () => {
        if (mouseText == "prev") {
            prev();
            return;
        } else if (mouseText == "next") {
            next();
            return;
        } else if (mouseText == "/home") {
            goto("/");
            return;
        } else if (mouseText == "info") {
            showInfo();
            return;
        } else if (mouseText == "back") {
            back();
            return;
        }
    };
</script>

<svelte:window on:mousemove={(e) => mousemovement(e)} on:mousedown={click} />
<div class="invisable" bind:this={window} style="--bgColour:{data.data.album.pictures[$imageNum].responsiveImage.bgColor};--txtColour:{txtColour};">
    <h1 class="follow" style="position: absolute; top: {pageY}px; left: {pageX}px">{mouseText}</h1>

    {#if data}
        {#key data.data.album.pictures[$imageNum].responsiveImage.bgColor}
            <!-- {JSON.stringify(picture.responsiveImage)} -->
            <ImageArea ImageData={data.data.album.pictures[$imageNum]} bgColour={!bgImage}></ImageArea>
        {/key}
    {/if}
    {#if mouseText === "back"}
        <div class="info">
            <h1>/{data.data.album.title}</h1>
            <h1>{data.data.album.location}</h1>
            <h1>{data.data.album.date}</h1>
            <h1>{data.data.album.description}</h1>
        </div>
    {/if}
</div>

<style lang="scss">
    h1 {
        color: var(--txtColour);
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none;
        z-index: 99;
    }

    .follow {
        transition: all 100ms;
        transform: translate(-50%, -50%);
        margin: 0px;
    }

    .invisable {
        height: 100dvh;
        width: 100%;
        position: absolute;
        cursor: none;
    }
    .info {
        position: fixed;
        top: var(--padding);
        left: var(--padding);
        z-index: 9;
        max-width: calc(100dvw - var(--largePadding));
        max-height: calc(100dvh - var(--largePadding));
    }
</style>
