<script lang="ts">
	import '$lib/scss/global.scss';
    import { siteName,forcedColours } from '$lib/store/store.js';
    import type { SiteConfig } from '$lib/types/types';
    export let data;

    let siteConfig:SiteConfig = data.data.siteConfig

    $: $siteName = siteConfig.title
    $: $forcedColours  =siteConfig.strictColours
    const handleKey = (event: KeyboardEvent) => {
        if (event.repeat) return;

        switch (event.key) {
            case "c":
                $forcedColours = !$forcedColours
                // By using `preventDefault`, it tells the Browser not to handle the
                // key stroke for its own shortcuts or text input.
                event.preventDefault();
                break;


        }
    };
</script>
<svelte:window on:keydown={(e) => handleKey(e)} />

<main class:forced={siteConfig.strictColours} style="
--bgColour:{siteConfig.defaultBgColour.hex};
--txtColour:{siteConfig.defaultTxtColour.hex};
--hlColour:{siteConfig.defaultHlColour.hex};
--hoverColourTxt:{siteConfig.defaultHlTxtColour.hex};
--defaultBgColour:{siteConfig.defaultBgColour.hex};
--defaultTxtColour:{siteConfig.defaultTxtColour.hex};
--defaultHlColour:{siteConfig.defaultHlColour.hex};
--defaultHlTxtColour:{siteConfig.defaultHlTxtColour.hex};
">
    <slot ><!-- optional fallback --></slot>
    
</main>

<style lang="scss">
    main{
        max-width: 100dvw;
        max-height: 100dvh;
        overflow: hidden;
    }

    .forced{
        --bgColour: var(--defaultBgColour) !important;
        --txtColour: var(--defaultTxtColour) !important;
        --hlColour: var(--defaultHlColour) !important;
        --hoverColourBg: var(--defaultHlColour) !important;

    }
</style>