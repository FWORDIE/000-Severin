<script lang="ts">
    import ImageArea from "$lib/comps/imageArea.svelte";
    import type { datocmsdata } from "$lib/types/types";
    import { imageNum } from "$lib/store/store";
    import { goto } from "$app/navigation";
    export let data: datocmsdata;
    let pageX = 0;
    let pageY = 0;

    let numOfPictures = data.data.album.pictures.length;

    let window:HTMLElement 

    let mouseText = ''

    const next = () => {
        console.log( $imageNum, numOfPictures)
        if ($imageNum < numOfPictures -1) {
            $imageNum += 1;
        } else {
            $imageNum = 0;
        }
    };

    const prev = () => {
        if ($imageNum > 0) {
            $imageNum -= 1;
        } else {
            $imageNum = numOfPictures -1;
        }
    };

    const mousemovement = (e:MouseEvent)=> {
        pageX = e.clientX;
        pageY = e.clientY
        let box = window.getBoundingClientRect()
        if(e.clientX < box.width/4 && e.clientY > box.height/8){
            mouseText = 'prev'
            return
        }else if(e.clientX > box.width - box.width/4 && e.clientY > box.height/8) {
            mouseText = 'next'
            return
        }else if(e.clientY < box.height/8){
            mouseText = 'home'
            return
        }
        
        mouseText = `[${$imageNum +1}/${numOfPictures}]`
    }

    const click = ()=>{
        if(mouseText == 'prev'){
            prev()
            return
        }

        else if(mouseText == 'next'){
            next()
            return
        }        else if(mouseText == 'home'){
            goto('/')
            return
        }
    }


</script>

<svelte:window on:mousemove={(e) => mousemovement(e)}  on:mousedown={click} />
<div class="invisable" bind:this={window}>
    <h1 style="position: absolute; top: {pageY}px; left: {pageX}px"> {mouseText}</h1>

    {#if data}
        <!-- {JSON.stringify(picture.responsiveImage)} -->
        <ImageArea ImageData={data.data.album.pictures[$imageNum]}></ImageArea>
    {/if}
</div>


<style lang="scss">
    h1 {
        color: var(--white);
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none;
        z-index: 99;
        transition: all 100ms;
        transform: translate(-50%, -50%);
        margin: 0px;
    }

    .invisable{
        height: 100dvh;
        width: 100%;
        position: absolute;
        cursor: none;

    }
</style>
