<script lang="ts">
    import ImageArea from "$lib/comps/imageArea.svelte";
    import type { datocmsdata } from "$lib/types/types";
    import { imageNum, siteName } from "$lib/store/store";
    import { goto } from "$app/navigation";
    export let data: datocmsdata;
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    import { random, getTxt } from "$lib/funcs";

    import moment from "moment";

    let pageX = 0;
    let pageY = 0;

    $: numOfPictures = data.data.album.pictures.length;

    let window: HTMLElement;

    let mouseText = "";

    $: txtColour = data.data.album.pictures[$imageNum] ? getTxt(data.data.album.pictures[$imageNum].responsiveImage.bgColor) : '';

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
        mouseText = `${$imageNum + 1}/${numOfPictures}`;
        bgImage = true;
    };

    const numberFinder = (x:number, width:number) => {
        const quotient = Math.floor(width/numOfPictures);
        console.log(width,numOfPictures, Math.floor(width/quotient))
        return (Math.floor(x/quotient) +1).toString()
    }

    const mousemovement = (e: MouseEvent) => {
        pageX = e.clientX;
        pageY = e.clientY;
        let box = window.getBoundingClientRect();
        if (mouseText == "back") {
            return;
        }
        if (e.clientX < box.width / 4 && e.clientY > box.height / 8 && e.clientY < box.height -  box.height / 8) {
            mouseText = "prev";
            return;
        } else if (e.clientX > box.width - box.width / 4 && e.clientY > box.height / 8 && e.clientY < box.height -  box.height / 8) {
            mouseText = "next";
            return;
        } else if (e.clientY < box.height / 8) {
            mouseText = "*";
            return ;
        } else if (e.clientY > box.height -  box.height / 8) {
            mouseText = numberFinder(e.clientX, box.width);
            return ;
        }

        mouseText = `${$imageNum + 1}/${numOfPictures}`;
        // mouseText = `*`
    };

    const click = () => {
        if (mouseText == "prev") {
            prev();
            return;
        } else if (mouseText == "next") {
            next();
            return;
        } else if (mouseText == "back") {
            back();
            return;
        } else if (Number(mouseText)){
            $imageNum = Number(mouseText)-1
        }
    };
</script>

<svelte:window on:mousemove={(e) => mousemovement(e)} />
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if data.data.album.pictures[$imageNum]}
<div
    class="invisable"
    bind:this={window}
    style="--bgColour:{data.data.album.pictures[$imageNum].responsiveImage.bgColor};--txtColour:{txtColour};"
    on:mousedown={click}
>
    <h1 class="follow" style="position: absolute; top: {pageY}px; left: {pageX}px">{mouseText}</h1>
    <div class="headerArea">
        <div class="left">
            <h1 on:click={()=>goto('/')} class="hoverer">{$siteName}</h1>
            <h1>/{data.data.album.title}</h1>
        </div>
        <div class="right">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            {#if mouseText != "back"}
                <h1 on:click={showInfo} class="hoverer">info</h1>
            {/if}
        </div>
    </div>
    {#if data}
        {#key data.data.album.pictures[$imageNum].responsiveImage.bgColor}
            <!-- {JSON.stringify(picture.responsiveImage)} -->
            <ImageArea ImageData={data.data.album.pictures[$imageNum]} bgColour={!bgImage}></ImageArea>
        {/key}
    {/if}
    {#if mouseText === "back"}
        <div class="info" >
            <div class="left">
                <h1 on:click={()=>goto('/')} class="hoverer">{$siteName}</h1>
                <h1>/{data.data.album.title}</h1>
            </div>
            <h1>{moment(data.data.album.date).format("MMMM YY")}</h1>
            <h1>{data.data.album.location}</h1>
            <h1>{data.data.album.description}</h1>
        </div>
    {/if}
</div>
{/if}

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
        pointer-events: none;
    }
    .left {
        display: flex;
        justify-content: flex-start;
        @media only screen and (max-width: 700px) {
            flex-direction: column;
        }
    }
    .headerArea {
        position: absolute;
        top: var(--padding);
        left: var(--padding);
        width: calc(100svw - var(--largePadding));
        z-index: 10;
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--largePadding);

        @media only screen and (max-width: 700px) {
            flex-direction: column;
        }
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
        z-index: 11;
        max-width: calc(100dvw - var(--largePadding));
        max-height: calc(100dvh - var(--largePadding));
        display: flex;
        gap: var(--halfPadding);
        flex-direction: column;
    }

    button {
        padding: 0px;
        margin: 0px;
        outline: none;
        background: none;
        border: none;
    }
</style>
