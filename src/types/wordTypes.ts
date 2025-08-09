/**
 * ハイライトされるテキストのパーツを表す型
 * colorが指定されている場合、その色でハイライトされる
 */
export type HighlightedPart = {
  text: string
  // 色がつかない場所もあるため
  color?: string
}

/**
 * キーワード（単語）と色のマッピングを表す型
 * e.g. { 'Vue': '#42b883', 'TypeScript': '#3178c6' }
 */
export type KeywordMap = Record<string, string>

/**
 * 新しいキーワードを追加する際のペイロードの型
 */
export type KeyWordWithColor = {
  word: string
  color: string
}
