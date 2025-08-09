import { computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

/**
 * 背景色に応じて、コントラストの高いテキスト色（黒または白）を計算する Composable。
 * @param color - 色の参照（RefまたはComputedRef）。HEX形式（例: '#RRGGBB'）である必要があります。
 * @returns コントラストカラー（'#000000' または '#FFFFFF'）のComputedRef。
 */
export const useContrastingColor = (
  color: Ref<string> | ComputedRef<string>,
): ComputedRef<string> => {
  /**
   * 輝度計算のしきい値。この値より大きい（明るい）か小さい（暗い）かで文字色を決定します。
   * 0（黒）から255（白）の中間である128を基準とします。
   * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html
   */
  const LUMINANCE_THRESHOLD = 128

  const contrastingColor = computed(() => {
    const hexColor = color.value

    if (!/^#[0-9a-fA-F]{6}$/.test(hexColor)) {
      return '#000000' // デフォルトまたはエラー時の色
    }

    // 16進数カラーコードからRGB値を取得
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)

    // sRGB輝度計算（W3C推奨）。色の知覚的な明るさを判断します。
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

    // 輝度がしきい値より大きい（明るい）場合は黒、そうでない（暗い）場合は白を返す
    return luminance > LUMINANCE_THRESHOLD ? '#000000' : '#FFFFFF'
  })

  return contrastingColor
}
