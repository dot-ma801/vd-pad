import { computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { HighlightedPart, KeywordMap } from '@/types/wordTypes'

/**
 * テキストをキーワードごとに分割してハイライト用のパーツ配列を生成するComposable
 * 各キーワードの出現回数を count に保持
 *
 * @param textRef - ハイライト対象の文字列を保持するRef<string>
 * @param tokenColorsRef - キーワードとカラーのマッピングを保持するRef<KeywordMap>
 * @param delimitersRef - 区切りとみなしてハイライト処理を停止する文字列の配列を保持するRef<string[]>
 * @returns highlightedParts - ハイライト情報を持つパーツ配列を返すComputedRef
 */
export const useTextHighlighter = (
  textRef: Ref<string>,
  tokenColorsRef: Ref<KeywordMap>,
  delimitersRef: Ref<string[]>
): { highlightedParts: ComputedRef<HighlightedPart[]> } => {
  const highlightedParts = computed(() => {
    const text = textRef.value                     // 入力テキスト全体
    const tokenColors = tokenColorsRef.value        // キーワード→カラーのマップ
    const delimiters = delimitersRef.value          // 区切り文字列配列
    const tokens = Object.keys(tokenColors)         // ハイライト対象のキーワード一覧

    if (!text) {
      return []
    }
    if (tokens.length === 0) {
      // 全文カラーなし、count=0
      return [{ text, color: undefined, count: 0 }]
    }

    // 各トークンを特殊文字エスケープし、正規表現パターンを生成
    const escapedTokens = tokens.map((token) =>
      token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    )
    const pattern = escapedTokens.join('|')
    const regex = new RegExp(pattern, 'g')

    // 各キーワードの出現回数をカウント
    const countMap: Record<string, number> = {}
    tokens.forEach((token) => {
      countMap[token] = 0
    })
    // マッチしたトークンごとにインクリメント
    const matches = text.match(regex)
    if (matches) {
      matches.forEach((m) => {
        if (countMap[m] !== undefined) {
          countMap[m]++
        }
      })
    }

    const allParts: HighlightedPart[] = []
    const lines = text.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let searchArea = line
      let remainingArea = ''

      // 区切り文字以降を除外
      if (delimiters.length > 0) {
        let earliest = -1
        for (const d of delimiters) {
          if (!d) continue
          const idx = line.indexOf(d)
          if (idx !== -1 && (earliest === -1 || idx < earliest)) {
            earliest = idx
          }
        }
        if (earliest !== -1) {
          searchArea = line.substring(0, earliest)
          remainingArea = line.substring(earliest)
        }
      }

      let lastIndex = 0
      // ハイライト検索エリアでマッチ処理
      searchArea.replace(regex, (match, offset) => {
        // マッチ前テキスト（カラーなし、count=0）
        if (offset > lastIndex) {
          allParts.push({
            text: searchArea.slice(lastIndex, offset),
            color: undefined,
            count: 0
          })
        }
        // マッチ部分（カラーあり、count=総出現回数）
        allParts.push({
          text: match,
          color: tokenColors[match],
          count: countMap[match] ?? 0
        })
        lastIndex = offset + match.length
        return match
      })
      // 最後のマッチ以降（カラーなし、count=0）
      if (lastIndex < searchArea.length) {
        allParts.push({
          text: searchArea.slice(lastIndex),
          color: undefined,
          count: 0
        })
      }
      // 区切り後の領域（カラーなし、count=0）
      if (remainingArea) {
        allParts.push({
          text: remainingArea,
          color: undefined,
          count: 0
        })
      }
      // 行末改行（最終行以外）（カラーなし、count=0）
      if (i < lines.length - 1) {
        allParts.push({
          text: '\n',
          color: undefined,
          count: 0
        })
      }
    }

    return allParts
  })

  return { highlightedParts }
}
