<template>
    <div>
        <img :src="value"/>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Model } from 'vue-property-decorator';

export default class ImageElement extends Vue {
    @Model('modelValue')
    readonly value!: string
}
</script>


<style lang="scss" scoped>
div {
    display: grid;
    place-content: center;
    padding: 3mm;
}
img {
    max-width: 100%;
    max-height: 100mm;
}
</style>