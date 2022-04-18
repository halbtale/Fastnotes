<template>
    <h4 ref="element" @focusout="handleInput" v-html="value"></h4>
</template>

<script lang="ts">
import BlockMixin from '@/mixins/BlockMixin';
import { mixins } from 'vue-class-component';

export default class ParagraphHeading extends mixins(BlockMixin) {
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-left: 1.7rem;
    margin-top: 1.1em;
    margin-bottom: 0.4em;
    font-weight: bold;
    text-decoration: underline;
}
</style>