<template>
    <p ref="element" @focusout="handleInput">{{value}}</p>
</template>

<script lang="ts">
import BlockMixin from '@/mixins/BlockMixin';
import { mixins } from 'vue-class-component';

export default class ListElementTertiary extends mixins(BlockMixin) {
}
</script>

<style lang="scss" scoped>

p {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 1.2rem;
    margin-left: 6rem;
    margin-top: 0.9rem;
    margin-bottom: 0.5rem;
    padding: 0;
    margin-left: 5rem;
    display: list-item;
    list-style-type: circle;
    line-height: 1.5em;
}
</style>