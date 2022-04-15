<template>
    <span><slot></slot></span>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class KeywordPrimary extends Vue {
}
</script>

<style lang="scss" scoped>

span {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2em;
    background-color: rgba(255, 255, 0, 0.423);
}
</style>