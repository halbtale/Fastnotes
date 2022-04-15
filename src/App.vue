<template>
<div class="document">
  <template v-for="(element, i) of content" :key="i">
    <component :is="element.elementType" contenteditable="true">{{element.textContent}}</component>
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
  content: TextElement[] = [
    new TextElement(TextElementType.MAIN_HEADING, "Hello world"),
    new TextElement(TextElementType.CHAPTER_HEADING, "Hello world")
  ];

//   mounted() {
//     document.addEventListener("beforeinput", (event) => {
//       console.log(event)
//       event.preventDefault()
//     })
//   }
}
</script>