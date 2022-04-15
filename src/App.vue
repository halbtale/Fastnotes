<template>
<div class="document">
  <MainHeading>Main Heading</MainHeading>
  <ChapterHeading>Charapter Heading</ChapterHeading>
  <SectionHeading>Section Heading</SectionHeading>
  <ParagraphHeading>Paragraph Heading</ParagraphHeading>
  <ListElementPrimary>List element primary 1 and <KeywordPrimary>Keyword</KeywordPrimary> </ListElementPrimary>
  <ListElementSecondary>List element secondary 1</ListElementSecondary>
  <ListElementSecondary>List element secondary 2</ListElementSecondary>
  <ListElementTertiary>List element tertiary 1 and <KeywordSecondary>Keyword</KeywordSecondary></ListElementTertiary>
  <ListElementPrimary>List element primary 1</ListElementPrimary>
  <ListElementPrimary>List element primary 1</ListElementPrimary>
  <ListElementPrimary>List element primary 1</ListElementPrimary>
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
export default class App extends Vue {}
</script>