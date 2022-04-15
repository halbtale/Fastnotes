export enum TextElementType {
    MAIN_HEADING = "MainHeading",
    CHAPTER_HEADING = "ChapterHeading",
    SECTION_HEADING = "SectionHeading",
    PARAGRAPH_HEADING = "ParagraphHeading",
    LIST_ELEMENT_PRIMARY = "ListElementPrimary",
    LIST_ELEMENT_SECONDARY = "ListElementSecondary",
    LIST_ELEMENT_TERTIARY = "ListElementTertiary",
    KEYWORD_PRIMARY = "KeywordPrimary",
    KEYWORD_SECONDARY = "KeywordSecondary"
}

export class TextElement {
    textContent = "";
    elementType: TextElementType;
    subElements: TextElement[] = [];

    constructor(elementType: TextElementType, textContent?: string, subElements?: TextElement[]){
        this.elementType = elementType;
        if (textContent) this.textContent = textContent;
        if (subElements && subElements.length) this.subElements = subElements;
    }
}