<script lang="ts">
	import '$lib/scss/global.scss';
    import { siteName,forcedColours } from '$lib/store/store.js';
    import type { SiteConfig } from '$lib/types/types';
    export let data;

    let siteConfig:SiteConfig = data.data.siteConfig

    $: $siteName = siteConfig.title
    $: $forcedColours  =siteConfig.strictColours
</script>
<main class:forced={siteConfig.strictColours} style="
--bgColour:{siteConfig.defaultBgColour.hex};
--txtColour:{siteConfig.defaultTxtColour.hex};
--hlColour:{siteConfig.defaultHlColour.hex};
--defaultBgColour:{siteConfig.defaultBgColour.hex};
--defaultTxtColour:{siteConfig.defaultTxtColour.hex};
--defaultHlColour:{siteConfig.defaultHlColour.hex};
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