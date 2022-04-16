import { Vue } from 'vue-class-component';
import {Model} from "vue-property-decorator"

export default class BlockMixin extends Vue {
    @Model('modelValue')
    readonly value!: string

    handleInput() {
        const htmlElement = this.$refs.element as HTMLElement;
        if (!htmlElement) return;
        this.$emit("update:modelValue", htmlElement.innerHTML)
    }

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