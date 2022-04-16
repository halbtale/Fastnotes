<template>
    <h3 ref="element"><slot></slot></h3>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class SectionHeading extends Vue {
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