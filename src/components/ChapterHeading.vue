<template>
    <h2 ref="element" @focusout="handleInput" v-html="value"></h2>
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
    margin-left: 1.3rem;
    margin-top: 1.1em;
    margin-bottom: 0.4em;
    color: rgb(205, 0, 0);
    font-weight: bold;
}
</style>