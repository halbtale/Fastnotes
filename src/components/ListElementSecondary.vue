<template>
    <p ref="element" @focusout="handleInput" v-html="value"></p>
</template>

<script lang="ts">
import BlockMixin from '@/mixins/BlockMixin';
import { mixins } from 'vue-class-component';

export default class ListElementSecondary extends mixins(BlockMixin) {
}
</script>


<style lang="scss" scoped>

p {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 1.2rem;
    margin-left: 4rem;
    margin-top: 0.9rem;
    margin-bottom: 0.5rem;
    padding: 0;
    margin-left: 3rem;
    display: list-item;
    line-height: 1.5em;
    &::marker {
        content: "\2605  ";
        font-size: 1rem;
    }
}
</style>