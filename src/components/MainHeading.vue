<template>
    <h1 ref="element" @focusout="handleInput" v-html="value"></h1>
</template>

<script lang="ts">
import BlockMixin from '@/mixins/BlockMixin';
import { mixins } from 'vue-class-component';

export default class MainHeading extends mixins(BlockMixin) {
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 4.5rem;
    text-align: center;
    padding-top: 3rem;
    padding-bottom: 1.5rem;
    margin: 0;
    font-weight: bold;
    text-transform: uppercase;
    color: rgb(205, 0, 0);
}
</style>