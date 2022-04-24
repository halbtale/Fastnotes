export enum TextElementType {
    MAIN_HEADING = "MainHeading",
    CHAPTER_HEADING = "ChapterHeading",
    SECTION_HEADING = "SectionHeading",
    PARAGRAPH_HEADING = "ParagraphHeading",
    LIST_ELEMENT_PRIMARY = "ListElementPrimary",
    LIST_ELEMENT_SECONDARY = "ListElementSecondary",
    LIST_ELEMENT_TERTIARY = "ListElementTertiary",
    KEYWORD_PRIMARY = "KeywordPrimary",
    KEYWORD_SECONDARY = "KeywordSecondary",
    SUP = "sup",
    SUB = "sub"
}

export class TextElement {
    textContent = "";
    elementType: TextElementType;

    constructor(elementType: TextElementType, textContent?: string){
        this.elementType = elementType;
        if (textContent) this.textContent = textContent;
    }
}