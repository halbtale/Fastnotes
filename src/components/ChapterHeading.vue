<template>
    <h2 ref="element" @focusout="handleInput">{{value}}</h2>
</template>

<script lang="ts">
import BlockMixin from '@/mixins/BlockMixin';
import { mixins } from 'vue-class-component';

export default class ChapterHeading extends mixins(BlockMixin) {
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