<template>
    <dialog :open="open">
		<slot></slot>
	</dialog>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class AppDialog extends Vue {
    @Prop({required: true})
    open!: boolean;
}
</script>

<style lang="scss" scoped>
dialog {
    border: none;
    border-radius: calc(5px * var(--ratio));
    box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 2rem;
    max-width: min(80vw, 600px);
    position: fixed;
    top: 30vh;
    max-height: 40vh;
    overflow-y: scroll;
}

p {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
}
</style>