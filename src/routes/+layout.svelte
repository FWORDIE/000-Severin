<script lang="ts">
	import '$lib/scss/global.scss';
    import type { SiteConfig } from '$lib/types/types';
    export let data;

    let siteConfig:SiteConfig = data.data.siteConfig
</script>
<main style="
--bgColour:{siteConfig.defaultBgColour.hex};
--txtColour:{siteConfig.defaultTxtColour.hex};
--hlColour:{siteConfig.defaultHlColour.hex};
">
    <slot ><!-- optional fallback --></slot>
    
</main>

<style lang="scss">
    main{
        max-width: 100dvw;
        max-height: 100dvh;
        overflow: hidden;
    }
</style>