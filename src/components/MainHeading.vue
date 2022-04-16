<template>
    <h1 ref="element"><slot></slot></h1>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class MainHeading extends Vue {
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