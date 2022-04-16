<template>
<div class="document">
	<template v-for="(element, i) of content" :key="i">
		<component :is="element.elementType" contenteditable="true" @beforeinput="handleBeforeInputEvent($event, i)" :ref="'block'+i" v-model="element.textContent"></component>
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
import { TextElement, TextElementType } from './modules/TextElement';

@Options({
  components: {
    MainHeading,
    ChapterHeading,
    SectionHeading,
    ParagraphHeading,
    ListElementPrimary,
    ListElementSecondary,
    ListElementTertiary
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
			}, 10)
		} 
		else if (event.inputType === "deleteContentBackward") {
			const target = event.target as HTMLElement;
			if (target) {
				if (!target.innerText) {
					this.content.splice(blockIndex, 1)
				}
			}
		}
	}

	mounted() {
		document.addEventListener("keypress", this.handleKeyPress)
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
				case "8":
					this.addInlineBlock(TextElementType.KEYWORD_PRIMARY);
					break;
				case "9":
					this.addInlineBlock(TextElementType.KEYWORD_SECONDARY);
					break;
				case "I":
					this.importContent()
					break;
				case "O":
					this.outputContent()
					break;
			}
		}
	}

	importContent() {
		const content = prompt("Input your content");
		if (content) {
			this.content = JSON.parse(content);
		}
	}

	outputContent() {
		alert(JSON.stringify(this.content))
	}

	addInlineBlock(type: TextElementType) {
		const userSelection = window.getSelection();
		if (!userSelection) return;
		const selectedTextRange = userSelection.getRangeAt(0);
		const parentElement = selectedTextRange.commonAncestorContainer.parentElement;
		console.log(parentElement)
		if (parentElement?.tagName === "SPAN") {
			parentElement.classList.toggle(type.toLowerCase())
		} else {
			const spanElement = document.createElement("span");
			spanElement.classList.toggle(type.toLowerCase())
			selectedTextRange.surroundContents(spanElement);
		}
	}
}
</script>