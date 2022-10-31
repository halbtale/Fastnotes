<template>
	<div class="document" ref="document">
		<template v-for="(element, i) of content" :key="i">
			<component
				:is="element.elementType"
				contenteditable="true"
				@focus="syncBlockIndex($event, i)"
				@beforeinput="handleBeforeInputEvent($event, i)"
				:ref="'block' + i"
				v-model="element.textContent"
			></component>
		</template>
		<AppDialog :open="isOutputDialogOpen">
			{{ content }}
		</AppDialog>
		<AppDialog :open="isHelpDialogOpen">
			<h2>Main commands</h2>
			<h3>Text styles (press command and then press enter)</h3>
			<ul>
				<li>Shift + Alt + 1 = Main Heading</li>
				<li>Shift + Alt + 2 = Charapter Heading</li>
				<li>Shift + Alt + 3 = Chapter Heading</li>
				<li>Shift + Alt + 4 = Section Heading</li>
				<li>Shift + Alt + 5 = List Element Primary</li>
				<li>Shift + Alt + 6 = List Element Secondary</li>
				<li>Shift + Alt + 7 = List Element Tertiary</li>
			</ul>
			<h3>Text decorations (select text and then press command)</h3>
			<ul>
				<li>Shift + Alt + 8 = Keyword+</li>
				<li>Shift + Alt + 9 = Keyword</li>
				<li>Shift + Alt + _ = Sub text</li>
				<li>Shift + Alt + ^ = Sup text</li>
			</ul>
			<h3>Text position</h3>
			<ul>
				<li>Shift + Alt + ↑ = Move text block up</li>
				<li>Shift + Alt + ↓ = Move text block down</li>
				<li>Shift + Alt + → = Decrease text hierarchy</li>
				<li>Shift + Alt + ← = Increase text hierarchy</li>
			</ul>
			<h3>Utility commands</h3>
			<ul>
				<li>Shift + Alt + I = Import data</li>
				<li>Shift + Alt + O = Export data</li>
				<li>Shift + Alt + S = Save data</li>
				<li>Shift + Alt + R = Restore data previously saved</li>
				<li>Shift + Alt + E = Print</li>
				<li>Shift + Alt + F = Toggle Fullscreen</li>
				<li>Shift + Alt + H = Help commands</li>
			</ul>
		</AppDialog>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainHeading from '@/components/MainHeading.vue';
import ChapterHeading from '@/components/ChapterHeading.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import ParagraphHeading from './components/ParagraphHeading.vue';
import ListElementPrimary from './components/ListElementPrimary.vue';
import ListElementSecondary from './components/ListElementSecondary.vue';
import ListElementTertiary from './components/ListElementTertiary.vue';
import { TextElement, TextElementType, textHierarchy } from './modules/TextElement';
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
	}
})
export default class App extends Vue {
	currentTextElementType = TextElementType.MAIN_HEADING;
	isOutputDialogOpen = false;
	isHelpDialogOpen = false;
	isFullscreen = false;
	currentBlockIndex = 0;
	canMove = true;
	content: TextElement[] = [new TextElement(TextElementType.MAIN_HEADING, 'Title')];

	handleBeforeInputEvent(e: Event, blockIndex: number) {
		const event = e as InputEvent;
		if (event.inputType === 'insertParagraph') {
			this.content.splice(
				blockIndex + 1,
				0,
				new TextElement(this.currentTextElementType)
			);
			event.preventDefault();
			setTimeout(() => {
				const element = this.$refs['block' + (blockIndex + 1)] as {
					focusBlock: () => void;
				}[];
				element[0].focusBlock();
			}, 10);
		} else if (event.inputType === 'deleteContentBackward') {
			const target = event.target as HTMLElement;
			if (target) {
				if (!target.innerText || !target.innerText.replace("\n", "")) {
					this.content.splice(blockIndex, 1);
				}
			}
		}
	}

	syncBlockIndex(e: Event, blockIndex: number) {
		this.currentBlockIndex = blockIndex;
	}

	mounted() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress(event: KeyboardEvent) {
		if (event.altKey && event.shiftKey) {
			switch (event.code) {
				case 'Digit1':
					this.currentTextElementType = TextElementType.MAIN_HEADING;
					break;
				case 'Digit2':
					this.currentTextElementType = TextElementType.CHAPTER_HEADING;
					break;
				case 'Digit3':
					this.currentTextElementType = TextElementType.SECTION_HEADING;
					break;
				case 'Digit4':
					this.currentTextElementType = TextElementType.PARAGRAPH_HEADING;
					break;
				case 'Digit5':
					this.currentTextElementType = TextElementType.LIST_ELEMENT_PRIMARY;
					break;
				case 'Digit6':
					this.currentTextElementType = TextElementType.LIST_ELEMENT_SECONDARY;
					break;
				case 'Digit7':
					this.currentTextElementType = TextElementType.LIST_ELEMENT_TERTIARY;
					break;
				case 'Digit8':
					this.addInlineBlock(TextElementType.KEYWORD_PRIMARY);
					break;
				case 'Digit9':
					this.addInlineBlock(TextElementType.KEYWORD_SECONDARY);
					break;
				case 'KeyI':
					this.importContent();
					break;
				case 'KeyO':
					this.isOutputDialogOpen = !this.isOutputDialogOpen;
					break;
				case 'KeyE':
					window.print();
					break;
				case 'KeyR':
					this.restore();
					break;
				case 'KeyS':
					this.save();
					break;
				case 'KeyH':
					this.isHelpDialogOpen = !this.isHelpDialogOpen;
					break;
				case 'Slash':
					this.addInlineBlock(TextElementType.SUB, 'SUB');
					break;
				case 'Equal':
					this.addInlineBlock(TextElementType.SUP, 'SUP');
					break;
				case 'KeyF':
					this.toggleFullscreen();
					break;
				case 'ArrowUp':
					this.moveBlockUp();
					break;
				case 'ArrowDown':
					this.moveBlockDown();
					break;
				case 'ArrowLeft':
					this.increaseBlockHierarchy();
					break;
				case 'ArrowRight':
					this.decreaseBlockHierarchy();
					break;
			}
			event.preventDefault();
		}
	}

	importContent() {
		const content = prompt('Input your content');
		if (content) {
			this.content = JSON.parse(content);
		}
	}

	save() {
		localStorage.setItem('fastnotes_data', JSON.stringify(this.content));
	}

	restore() {
		const data = localStorage.getItem('fastnotes_data');
		if (data) {
			this.content = JSON.parse(data);
		}
	}

	addInlineBlock(type: TextElementType, elementTag = 'SPAN') {
		const userSelection = window.getSelection();
		if (!userSelection) return;
		const selectedTextRange = userSelection.getRangeAt(0);
		const parentElement = selectedTextRange.commonAncestorContainer.parentElement;
		if (parentElement?.tagName === elementTag.toUpperCase()) {
			parentElement.classList.toggle(type.toLowerCase());
		} else {
			const spanElement = document.createElement(elementTag.toLowerCase());
			spanElement.classList.toggle(type.toLowerCase());
			selectedTextRange.surroundContents(spanElement);
		}
	}

	moveBlockUp() {
		if (this.currentBlockIndex < 1) return;
		const oldContent = [...this.content];
		const block = oldContent[this.currentBlockIndex];
		const blockListToMove = [block];
		let analyze: boolean;
		let analyzedBlockIndex: number;

		analyze = true;
		analyzedBlockIndex = this.currentBlockIndex + 1;
		while (analyze) {
			if (analyzedBlockIndex > oldContent.length - 1 || analyzedBlockIndex < 0) {
				analyze = false;
				break;
			}
			const analyzedBlock = oldContent[analyzedBlockIndex];
			if (
				textHierarchy.indexOf(analyzedBlock.elementType) >
				textHierarchy.indexOf(block.elementType)
			) {
				blockListToMove.push(analyzedBlock);
				analyzedBlockIndex++;
			} else {
				analyze = false;
				break;
			}
		}

		let adiacentSameKindBlockIndex = 0;
		analyze = true;
		analyzedBlockIndex = this.currentBlockIndex - 1;
		while (analyze) {
			if (analyzedBlockIndex > oldContent.length - 1 || analyzedBlockIndex < 0) {
				analyze = false;
				break;
			}
			const analyzedBlock = oldContent[analyzedBlockIndex];
			if (
				textHierarchy.indexOf(analyzedBlock.elementType) <=
				textHierarchy.indexOf(block.elementType)
			) {
				analyze = false;
				adiacentSameKindBlockIndex = analyzedBlockIndex;
				break;
			} else {
				analyzedBlockIndex--;
			}
		}

		const blockListToMoveStartingIndex = this.currentBlockIndex;
		const blockListToMoveEndIndex =
			this.currentBlockIndex + blockListToMove.length - 1;

		const contentWithoutSelectedBlock = [
			...oldContent.filter((_, i) => i < blockListToMoveStartingIndex),
			...oldContent.filter((_, i) => i > blockListToMoveEndIndex)
		];
		const newContent = [
			...contentWithoutSelectedBlock.filter(
				(_, i) => i < adiacentSameKindBlockIndex
			),
			...blockListToMove,
			...contentWithoutSelectedBlock.filter(
				(_, i) => i >= adiacentSameKindBlockIndex
			)
		];
		this.content = newContent;
		setTimeout(() => {
			const element = this.$refs['block' + adiacentSameKindBlockIndex] as {
				focusBlock: () => void;
			}[];
			element[0].focusBlock();
		}, 10);
	}

	moveBlockDown() {
		if (this.currentBlockIndex === this.content.length) return;
		const oldContent = [...this.content];
		const block = oldContent[this.currentBlockIndex];
		const blockListToMove = [block];
		let analyze: boolean;
		let analyzedBlockIndex: number;

		analyze = true;
		analyzedBlockIndex = this.currentBlockIndex + 1;
		while (analyze) {
			if (analyzedBlockIndex > oldContent.length - 1 || analyzedBlockIndex < 0) {
				analyze = false;
				break;
			}
			const analyzedBlock = oldContent[analyzedBlockIndex];
			if (
				textHierarchy.indexOf(analyzedBlock.elementType) >
				textHierarchy.indexOf(block.elementType)
			) {
				blockListToMove.push(analyzedBlock);
				analyzedBlockIndex++;
			} else {
				analyze = false;
				break;
			}
		}

		let adiacentSameKindBlockIndex = 0;
		let matches = 0;
		analyze = true;
		analyzedBlockIndex = this.currentBlockIndex + 1;
		while (analyze) {
			if (analyzedBlockIndex > oldContent.length - 1 || analyzedBlockIndex < 0) {
				analyze = false;
				break;
			}
			const analyzedBlock = oldContent[analyzedBlockIndex];
			if (
				textHierarchy.indexOf(analyzedBlock.elementType) <=
				textHierarchy.indexOf(block.elementType)
			) {
				matches++;
				if (matches === 1) {
					analyzedBlockIndex++;
					continue;
				} else if (matches === 2) {
					analyze = false;
					adiacentSameKindBlockIndex = analyzedBlockIndex;
					break;
				}
			} else {
				analyzedBlockIndex++;
			}
		}

		const blockListToMoveStartingIndex = this.currentBlockIndex;
		const blockListToMoveEndIndex =
			this.currentBlockIndex + blockListToMove.length - 1;

		const contentWithoutSelectedBlock = [
			...oldContent.filter((_, i) => i < blockListToMoveStartingIndex),
			...oldContent.filter((_, i) => i > blockListToMoveEndIndex)
		];
		const newContent = [
			...contentWithoutSelectedBlock.filter(
				(_, i) => i < analyzedBlockIndex - blockListToMove.length
			),
			...blockListToMove,
			...contentWithoutSelectedBlock.filter(
				(_, i) => i >= analyzedBlockIndex - blockListToMove.length
			)
		];
		this.content = newContent;
		setTimeout(() => {
			const element = this.$refs[
				'block' + (analyzedBlockIndex - blockListToMove.length)
			] as {
				focusBlock: () => void;
			}[];
			element[0].focusBlock();
		}, 10);
	}

	decreaseBlockHierarchy() {
		this.content[this.currentBlockIndex].decreaseHierarchy()
	}

	increaseBlockHierarchy() {
		this.content[this.currentBlockIndex].increaseHierarchy()
	}

	async toggleFullscreen() {
		if (!this.isFullscreen) {
			const body = document.querySelector('html');
			if (!body) return;
			await body.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
		this.isFullscreen = !this.isFullscreen;
	}
}
</script>
