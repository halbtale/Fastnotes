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

    constructor(elementType: TextElementType, textContent?: string) {
        this.elementType = elementType;
        if (textContent) this.textContent = textContent;
    }
}

export const textHierarchy = [
    TextElementType.MAIN_HEADING,
    TextElementType.CHAPTER_HEADING,
    TextElementType.SECTION_HEADING,
    TextElementType.PARAGRAPH_HEADING,
    TextElementType.LIST_ELEMENT_PRIMARY,
    TextElementType.LIST_ELEMENT_SECONDARY,
    TextElementType.LIST_ELEMENT_TERTIARY
]