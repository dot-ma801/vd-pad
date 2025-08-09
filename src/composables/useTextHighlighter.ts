import { computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { HighlightedPart, KeywordMap } from '@/types/wordTypes'

export const useTextHighlighter = (
  textRef: Ref<string>,
  tokenColorsRef: Ref<KeywordMap>,
): { highlightedParts: ComputedRef<HighlightedPart[]> } => {
  const getHighlightedParts = () => {
    const tokens = Object.keys(tokenColorsRef.value)
    if (tokens.length === 0) {
      return [{ text: textRef.value }]
    }

    const regex = new RegExp(
      tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
      'g',
    )

    const parts: HighlightedPart[] = []
    let lastIndex = 0
    textRef.value.replace(regex, (match, offset) => {
      if (offset > lastIndex) {
        parts.push({ text: textRef.value.slice(lastIndex, offset) })
      }
      parts.push({ text: match, color: tokenColorsRef.value[match] })
      lastIndex = offset + match.length
      return match
    })
    if (lastIndex < textRef.value.length) {
      parts.push({ text: textRef.value.slice(lastIndex) })
    }
    return parts
  }

  const highlightedParts = computed(() => getHighlightedParts())

  return { highlightedParts }
}
