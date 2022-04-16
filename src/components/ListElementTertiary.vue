<template>
    <p ref="element"><slot></slot></p>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class ListElementTertiary extends Vue {
    focusBlock() {
        const htmlElement = this.$refs.element as HTMLElement;
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(htmlElement, 0);
        range.collapse(true);
        selection && selection.removeAllRanges();
        selection && selection.addRange(range);
        htmlElement.focus();
    }
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