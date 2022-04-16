<template>
    <h4 ref="element"><slot></slot></h4>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class ParagraphHeading extends Vue {
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

h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
    margin-top: 1.1rem;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    font-weight: bold;
}
</style>