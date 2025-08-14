import { computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { HighlightedPart, KeywordMap } from '@/types/wordTypes'

export const useTextHighlighter = (
  textRef: Ref<string>,
  tokenColorsRef: Ref<KeywordMap>,
  delimitersRef: Ref<string[]>
): { highlightedParts: ComputedRef<HighlightedPart[]> } => {
  const highlightedParts = computed(() => {
    const text = textRef.value
    const tokenColors = tokenColorsRef.value
    const delimiters = delimitersRef.value
    const tokens = Object.keys(tokenColors)

    if (!text) {
      return []
    }

    if (tokens.length === 0) {
      return [{ text, color: undefined }]
    }

    const regex = new RegExp(
      tokens.map((token) => token.replace(/[.*+?^${}()|[\\]/g, '\\$&')).join('|'),
      'g',
    )

    const allParts: HighlightedPart[] = []
    const lines = text.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let searchArea = line
      let remainingArea = ''

      if (delimiters && delimiters.length > 0) {
        let earliestIndex = -1
        for (const d of delimiters) {
          if (!d) continue
          const index = line.indexOf(d)
          if (index !== -1 && (earliestIndex === -1 || index < earliestIndex)) {
            earliestIndex = index
          }
        }

        if (earliestIndex !== -1) {
          searchArea = line.substring(0, earliestIndex)
          remainingArea = line.substring(earliestIndex)
        }
      }

      let lastIndex = 0
      if (searchArea) {
        searchArea.replace(regex, (match, offset) => {
          if (offset > lastIndex) {
            allParts.push({ text: searchArea.slice(lastIndex, offset), color: undefined })
          }
          allParts.push({ text: match, color: tokenColors[match] })
          lastIndex = offset + match.length
          return match
        })
        if (lastIndex < searchArea.length) {
          allParts.push({ text: searchArea.slice(lastIndex), color: undefined })
        }
      }

      if (remainingArea) {
        allParts.push({ text: remainingArea, color: undefined })
      }

      if (i < lines.length - 1) {
        allParts.push({ text: '\n', color: undefined })
      }
    }

    return allParts
  })

  return { highlightedParts }
}