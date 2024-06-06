<script lang="ts">
    import ImageArea from "$lib/comps/imageArea.svelte";
    import type { datocmsdata } from "$lib/types/types";
    import { imageNum, siteName, forcedColours } from "$lib/store/store";
    import { goto } from "$app/navigation";
    export let data: datocmsdata;
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    import { random, getTxt, pickTextColorBasedOnBgColorSimple } from "$lib/funcs";

    import moment from "moment";
    import { info } from "sass";

    let pageX = 0;
    let pageY = 0;

    $: numOfPictures = data.data.album.pictures.length;

    let window: HTMLElement;

    let mouseText = "";

    $: txtColour = data.data.album.pictures[$imageNum] ? pickTextColorBasedOnBgColorSimple(data.data.album.pictures[$imageNum].responsiveImage.bgColor) : "";

    var bgImage = true;

    onMount(() => {
        $imageNum = 0;
    });

    const next = () => {
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
        mouseText = "Back";
        bgImage = false;
    };

    const back = () => {
        mouseText = `${$imageNum + 1}/${numOfPictures}`;
        bgImage = true;
    };

    const numberFinder = (x: number, width: number) => {
        const quotient = Math.floor(width / numOfPictures);
        console.log(width, numOfPictures, Math.floor(width / quotient));
        return (Math.floor(x / quotient) + 1).toString();
    };

    const mousemovement = (e: MouseEvent) => {
        pageX = e.clientX;
        pageY = e.clientY;
        let box = window.getBoundingClientRect();
        if (mouseText == "Back") {
            return;
        }
        if (e.clientX < box.width / 4 && e.clientY > box.height / 8 && e.clientY < box.height - box.height / 8) {
            mouseText = "Prev";
            return;
        } else if (e.clientX > box.width - box.width / 4 && e.clientY > box.height / 8 && e.clientY < box.height - box.height / 8) {
            mouseText = "Next";
            return;
        } else if (e.clientY < box.height / 8) {
            mouseText = "*";
            return;
        } else if (e.clientY > box.height - box.height / 8) {
            mouseText = numberFinder(e.clientX, box.width);
            return;
        }
        mouseText = `${$imageNum + 1}/${numOfPictures}`;
        // mouseText = `*`
    };

    let lightBoxed = false;
    const click = () => {
        if (mouseText == "Prev") {
            prev();
            return;
        } else if (mouseText == "Next") {
            next();
            return;
        } else if (mouseText == "Back") {
            back();
            return;
        } else if (Number(mouseText)) {
            $imageNum = Number(mouseText) - 1;
        } else if (mouseText == `${$imageNum + 1}/${numOfPictures}`) {
            lightBoxed = !lightBoxed;
        }
    };

    const handleKey = (event: KeyboardEvent) => {
        if (event.repeat) return;

        switch (event.key) {
            case "ArrowRight":
                next();
                // By using `preventDefault`, it tells the Browser not to handle the
                // key stroke for its own shortcuts or text input.
                event.preventDefault();
                break;

            case "ArrowLeft":
                event.preventDefault();
                prev();
                break;
            case "ArrowUp":
                event.preventDefault();
                if (mouseText == "Back") {
                    back();
                } else {
                    showInfo();
                }
                break;
            case "ArrowDown":
                event.preventDefault();
                if (mouseText == "Back") {
                    back();
                } else {
                    lightBoxed = !lightBoxed;
                }
                break;
        }
    };

    $: styles = colourFunc($imageNum, mouseText, lightBoxed, $forcedColours);

    const colourFunc = (imageNum: number, mouseText: string, lightBoxed: boolean, forcedColour = true) => {
        var pageBgColour = "var(--defaultBgColour)";
        var pageTxtColour = "var(--defaultTxtColour)";
        var pageLinkColour = "var(--defaultHlColour)";
        var pageLinkColourHover = "var(--defaultHlTxtColour)";
        var pageLinkColourBgHover = "var(--defaultHlColour)";
        if ($forcedColours) {
            return `
        --pageBgColour: ${pageBgColour};
        --pageTxtColour: ${pageTxtColour};
        --pageLinkColour: ${pageLinkColour};
        --pageLinkColourHover: ${pageLinkColourHover};
        --pageLinkColourBgHover: ${pageLinkColourBgHover};
        `;
        }
        const imageColour =  data.data.album.pictures[$imageNum] ? data.data.album.pictures[$imageNum].responsiveImage.bgColor : '#fff'
        pageLinkColour = lightBoxed || mouseText == 'back' ? imageColour : pickTextColorBasedOnBgColorSimple(imageColour) ;
        pageBgColour = pickTextColorBasedOnBgColorSimple(imageColour);
        pageTxtColour = pickTextColorBasedOnBgColorSimple(pickTextColorBasedOnBgColorSimple(imageColour));
        pageLinkColourBgHover = lightBoxed || mouseText == 'back' ?  imageColour : pickTextColorBasedOnBgColorSimple(imageColour) ;
        pageLinkColourHover= lightBoxed || mouseText == 'back' ?  pickTextColorBasedOnBgColorSimple(imageColour):imageColour  ;
        return `
        --pageBgColour: ${pageBgColour};
        --pageTxtColour: ${pageTxtColour};
        --pageLinkColour: ${pageLinkColour};
        --pageLinkColourHover: ${pageLinkColourHover};
        --pageLinkColourBgHover: ${pageLinkColourBgHover};
        `;
    };
</script>

<svelte:window on:mousemove={(e) => mousemovement(e)} on:keydown={(e) => handleKey(e)} />
<svelte:head>
    <title>{data.data.album.title}</title>
</svelte:head>
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if data.data.album.pictures[$imageNum]}
    <div class="invisable" bind:this={window} style={styles} on:mousedown={click}>
        <h1 class="follow" style="position: absolute; top: {pageY}px; left: {pageX}px;">{mouseText}</h1>
        <div class="headerArea">
            <div class="left">
                <h1 on:click={() => goto("/")} class="hoverer">{$siteName}</h1>
                <!-- <h1>/{data.data.album.title}</h1> -->
            </div>
            <div class="right">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                {#if mouseText != "Back"}
                    <h1 on:click={showInfo} class="hoverer">info</h1>
                {/if}
            </div>
        </div>
        {#if data}
            <!-- {#key data.data.album.pictures[$imageNum].responsiveImage.bgColor} -->
            <!-- {JSON.stringify(picture.responsiveImage)} -->
            <ImageArea ImageData={data.data.album.pictures[$imageNum]} bgColour={!bgImage} {lightBoxed}></ImageArea>
            <!-- {/key} -->
        {/if}
        {#if mouseText === "Back"}
            <div class="info">
                <div class="left">
                    <h1 on:click={() => goto("/")} class="hoverer">{$siteName}</h1>
                    <!-- <h1>/{data.data.album.title}</h1> -->
                </div>
                <h1 class="desc">{moment(data.data.album.date).format("MMMM YY")}</h1>
                <h1 class="desc">{data.data.album.location}</h1>
                <h1 class="desc datoText">{@html data.data.album.description}</h1>
            </div>
        {/if}
    </div>
{/if}

<style lang="scss">
    h1 {
        color: var(--pageTxtColour);
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none;
        z-index: 99;

        &.desc {
            white-space: pre-wrap;
            margin-right: var(--padding);
        }
    }
    .follow {

        color: var(--pageLinkColour);
    }

    .left {
        display: flex;
        justify-content: flex-start;
        h1 {
            color: var(--pageLinkColour);

            &:hover {
                background-color: var(--pageLinkColourBgHover);
                color: var(--pageLinkColourHover);
            }
        }
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

        h1 {
            color: var(--pageLinkColour);
            &:hover {
                background-color: var(--pageLinkColourBgHover);
                color: var(--pageLinkColourHover);
            }
        }

        @media only screen and (max-width: 700px) {
            flex-direction: column;
        }
    }

    .invisable {
        height: 100dvh;
        width: 100%;
        position: absolute;
        cursor: none;
        background-color: var(--pageBgColour);
    }
    .info {
        position: absolute;
        top: 0;
        left: 0;
        padding-left: var(--padding);
        padding-top: var(--padding);
        z-index: 11;
        max-width: calc(100dvw - var(--largePadding));
        max-height: calc(100dvh - var(--largePadding));
        display: flex;
        gap: var(--quatPadding);
        flex-direction: column;
        overflow: auto;
        background-color: var(--pageBgColour);
    }

    button {
        padding: 0px;
        margin: 0px;
        outline: none;
        background: none;
        border: none;
    }
</style>
