<template>
    <span><slot></slot></span>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class KeywordSecondary extends Vue {
}
</script>

<style lang="scss" scoped>

span {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    text-transform: uppercase;
    font-weight: bold;
}
</style>