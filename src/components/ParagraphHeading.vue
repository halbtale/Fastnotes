<template>
    <h4><slot></slot></h4>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class ParagraphHeading extends Vue {
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-top: 1.1rem;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    font-weight: bold;
    width: fit-content;
}
</style>