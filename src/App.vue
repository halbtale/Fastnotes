<template>
<div class="document" @keypress="handleKeyPress">
  <template v-for="(element, i) of content" :key="i">
    <component :is="element.elementType" contenteditable="true" @beforeinput="handleBeforeInputEvent($event, i)" :ref="'block'+i">{{element.textContent}}</component>
  </template>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainHeading from "@/components/MainHeading.vue"
import ChapterHeading from "@/components/ChapterHeading.vue"
import SectionHeading from "@/components/SectionHeading.vue"
import ParagraphHeading from "./components/ParagraphHeading.vue"
import ListElementPrimary from "./components/ListElementPrimary.vue"
import ListElementSecondary from "./components/ListElementSecondary.vue"
import ListElementTertiary from "./components/ListElementTertiary.vue"
import KeywordPrimary from "./components/KeywordPrimary.vue"
import KeywordSecondary from "./components/KeywordSecondary.vue"
import { TextElement, TextElementType } from './modules/TextElement';

@Options({
  components: {
    MainHeading,
    ChapterHeading,
    SectionHeading,
    ParagraphHeading,
    ListElementPrimary,
    ListElementSecondary,
    ListElementTertiary,
    KeywordPrimary,
    KeywordSecondary
  },
})
export default class App extends Vue {
	currentTextElementType = TextElementType.MAIN_HEADING;

	content: TextElement[] = [
		new TextElement(TextElementType.MAIN_HEADING, "Title")
	];
	
	handleBeforeInputEvent(event: InputEvent, blockIndex: number) {
		if (event.inputType === "insertParagraph") {
			this.content.splice(blockIndex + 1, 0, new TextElement(this.currentTextElementType))
			event.preventDefault()
			setTimeout(() => {
				const element = this.$refs["block"+ (blockIndex + 1)] as {focusBlock: () => void}[];
				element[0].focusBlock();
			}, 1)
		}
	}

	handleKeyPress(event: KeyboardEvent) {
		if (event.shiftKey && event.ctrlKey) {
			switch (event.key) {
				case "1":
					this.currentTextElementType = TextElementType.MAIN_HEADING;
					break;
				case "2":
					this.currentTextElementType = TextElementType.CHAPTER_HEADING;
					break;
				case "3":
					this.currentTextElementType = TextElementType.SECTION_HEADING;
					break;
				case "4":
					this.currentTextElementType = TextElementType.PARAGRAPH_HEADING;
					break;
				case "5":
					this.currentTextElementType = TextElementType.LIST_ELEMENT_PRIMARY;
					break;
				case "6":
					this.currentTextElementType = TextElementType.LIST_ELEMENT_SECONDARY;
					break;
				case "7":
					this.currentTextElementType = TextElementType.LIST_ELEMENT_TERTIARY;
					break;
			}
		}
	}
}
</script>