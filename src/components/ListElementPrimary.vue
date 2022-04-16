<template>
    <p ref="element" @focusout="handleInput" v-html="value"></p>
</template>

<script lang="ts">
import BlockMixin from '@/mixins/BlockMixin';
import { mixins } from 'vue-class-component';

export default class ListElementPrimary extends mixins(BlockMixin) {
}
</script>


<style lang="scss" scoped>

p {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 1.2rem;
    margin-left: 2rem;
    margin-bottom: 0.5rem;
    margin-top: 1.2rem;
    display: list-item;
    line-height: 1.5em;
}
</style>