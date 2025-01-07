import type { Ref, DeepReadonly } from 'vue'
import { ref, readonly } from 'vue'
import { createHighlighterCore } from 'shiki/core'
import type { HighlighterCore } from 'shiki/core'


const shikiInstance = ref<HighlighterCore>()

export default function useShiki(): {
  highlighter: DeepReadonly<Ref<HighlighterCore | undefined>>
  createHighlighter: () => Promise<void>
} {

  const createHighlighter = async (): Promise<void> => {
    if (shikiInstance.value) {
      return
    }

    shikiInstance.value = await createHighlighterCore({
      themes: [
        // if we ever need a light theme use catppuccino-latte
        //import('shiki/themes/catppuccin-latte.mjs'),
        import('shiki/themes/material-theme-palenight.mjs'),
      ],
      langs: [
        import('shiki/langs/json.mjs'),
      ],
      loadWasm: () => {
        // @ts-ignore - in client, use the wasm loader
        return import('shiki/wasm?init')
      },
    })
  }

  return {
    highlighter: readonly(shikiInstance),
    createHighlighter,
  }
}
