<template>
<div class="document">
	<template v-for="(element, i) of content" :key="i">
		<component :is="element.elementType" contenteditable="true" @beforeinput="handleBeforeInputEvent($event, i)" :ref="'block'+i" v-model="element.textContent"></component>
	</template>
	<AppDialog :open="isOutputDialogOpen">
		{{content}}
	</AppDialog>
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
import AppDialog from './components/AppDialog.vue';

@Options({
  components: {
    MainHeading,
    ChapterHeading,
    SectionHeading,
    ParagraphHeading,
    ListElementPrimary,
    ListElementSecondary,
    ListElementTertiary,
	AppDialog
  },
})
export default class App extends Vue {
	currentTextElementType = TextElementType.MAIN_HEADING;
	isOutputDialogOpen = false;

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
		document.addEventListener("keydown", this.handleKeyPress)
	}

	handleKeyPress(event: KeyboardEvent) {
		if (event.altKey && event.shiftKey) {
			switch (event.code) {
				case "Digit1":
					this.currentTextElementType = TextElementType.MAIN_HEADING;
					break;
				case "Digit2":
					this.currentTextElementType = TextElementType.CHAPTER_HEADING;
					break;
				case "Digit3":
					this.currentTextElementType = TextElementType.SECTION_HEADING;
					break;
				case "Digit4":
					this.currentTextElementType = TextElementType.PARAGRAPH_HEADING;
					break;
				case "Digit5":
					this.currentTextElementType = TextElementType.LIST_ELEMENT_PRIMARY;
					break;
				case "Digit6":
					this.currentTextElementType = TextElementType.LIST_ELEMENT_SECONDARY;
					break;
				case "Digit7":
					this.currentTextElementType = TextElementType.LIST_ELEMENT_TERTIARY;
					break;
				case "Digit8":
					this.addInlineBlock(TextElementType.KEYWORD_PRIMARY);
					break;
				case "Digit9":
					this.addInlineBlock(TextElementType.KEYWORD_SECONDARY);
					break;
				case "KeyI":
					this.importContent()
					break;
				case "KeyO":
					this.outputContent()
					break;
				case "KeyE":
					window.print()
					break;
				case "KeyR":
					this.restore();
					break;
				case "KeyS":
					this.save();
					break;
				case "Slash":
					this.addInlineBlock(TextElementType.SUB, "SUB");
					break;
				case "Equal":
					this.addInlineBlock(TextElementType.SUP, "SUP");
					break;
			}
			event.preventDefault();
		}
	}

	importContent() {
		const content = prompt("Input your content");
		if (content) {
			this.content = JSON.parse(content);
		}
	}

	outputContent() {
		this.isOutputDialogOpen = !this.isOutputDialogOpen;
	}

	save() {
		localStorage.setItem('fastnotes_data', JSON.stringify(this.content))
	}

	restore() {
		const data = localStorage.getItem('fastnotes_data');
		if (data) {
			this.content = JSON.parse(data);
		}
	}

	addInlineBlock(type: TextElementType, elementTag = "SPAN") {
		const userSelection = window.getSelection();
		if (!userSelection) return;
		const selectedTextRange = userSelection.getRangeAt(0);
		const parentElement = selectedTextRange.commonAncestorContainer.parentElement;
		if (parentElement?.tagName === elementTag.toUpperCase()) {
			parentElement.classList.toggle(type.toLowerCase())
		} else {
			const spanElement = document.createElement(elementTag.toLowerCase());
			spanElement.classList.toggle(type.toLowerCase())
			selectedTextRange.surroundContents(spanElement);
		}
	}
}
</script>