<script lang="ts">
	import '$lib/scss/global.scss';

</script>
<main>
    <slot><!-- optional fallback --></slot>

</main>

<style lang="scss">
    main{
        max-width: 100dvw;
        max-height: 100dvh;
        overflow: hidden;
    }
</style>