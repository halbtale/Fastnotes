<template>
    <h2><slot></slot></h2>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class ChapterHeading extends Vue {
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 2.2rem;
    text-transform: uppercase;
    padding: 1rem 1rem;
    margin: 0;
    color: rgb(205, 0, 0);
    font-weight: bold;
}
</style>