<template>
    <h3 ref="element" @focusout="handleInput" v-html="value"></h3>
</template>

<script lang="ts">
import BlockMixin from '@/mixins/BlockMixin';
import { mixins } from 'vue-class-component';

export default class SectionHeading extends mixins(BlockMixin) {
}
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    border: 1px solid black;
    text-transform: uppercase;
    padding: 0.4rem 0.8rem;
    margin: 0.1rem 1rem;
    font-weight: bold;
    width: fit-content;
}
</style>