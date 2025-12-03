<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KCodeBlock"
  >
    <div class="kcodeblock-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent
        class="limited-width"
        title="code & language"
      >
        <KCodeBlock
          id="code-language-props"
          :code="code"
          language="json"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="initialFilterMode & initialRegExpMode & searchable"
      >
        <KCodeBlock
          id="filter-regex-modes-props"
          :code="code"
          initial-reg-exp-mode
          language="json"
          searchable
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="highlightedLineNumbers"
      >
        <KCodeBlock
          id="highlighted-codeblock"
          :code="code"
          :highlighted-line-numbers="[2, 4, 6]"
          language="json"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="highlightedLineNumbers & searchable"
      >
        <KCodeBlock
          id="highlighted-and-searchable"
          :code="code"
          :highlighted-line-numbers="[2, 4, 6]"
          language="json"
          searchable
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="programmatic highlightedLineNumbers & syntax highlighting"
      >
        <KCheckbox
          v-model="highlightedToggle"
          label="Highlighted"
          @change="codeModified = true"
        >
          Toggle highlighted code
        </KCheckbox>
        <br>
        <KLabel>Showing: {{ highlightedToggle ? 'Code chunk 1 [2-4]' : 'Code chunk 2 [6-8]' }}</KLabel>
        <KCodeBlock
          id="syntax-highlighted-codeblock"
          :code="`${code}\n`.repeat(100)"
          :highlighted-line-numbers="highlightedLines"
          language="json"
          max-height="500"
          searchable
          theme="dark"
          @code-block-render="highlight"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="highlightedLineNumbers expression"
      >
        <KCodeBlock
          id="highlighted-expression"
          :code="code"
          highlighted-line-numbers="2,4,6-12,17-19"
          language="json"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="singleLine"
      >
        <KCodeBlock
          id="single-line-prop"
          :code="singleLineCode"
          language="plaintext"
          single-line
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="processing"
      >
        <KCodeBlock
          id="processing-prop"
          :code="code"
          language="json"
          processing
          searchable
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="maxHeight"
      >
        <KCodeBlock
          id="max-height-prop"
          :code="`${code}\n`.repeat(100)"
          language="json"
          max-height="200"
          searchable
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="query"
      >
        <KCodeBlock
          id="query-prop"
          :code="code"
          language="json"
          max-height="200"
          query="compilerOptions"
          searchable
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="showCopyButton"
      >
        <KCodeBlock
          id="show-copy-button-prop"
          :code="code"
          language="json"
          searchable
          :show-copy-button="false"
        />
        <p>Always show action buttons:</p>
        <KCodeBlock
          id="always-show-copy-button"
          :code="code"
          language="json"
          searchable
          show-copy-button="always"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="showLineNumberLinks"
      >
        <KCodeBlock
          id="show-line-number-links-prop"
          :code="code"
          language="json"
          searchable
          show-line-number-links
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="showLineNumbers"
      >
        <KCodeBlock
          id="show-line-numbers-prop"
          :code="code"
          language="json"
          searchable
          :show-line-numbers="false"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        class="limited-width"
        title="theme"
      >
        <KCodeBlock
          id="theme-prop"
          :code="code"
          initial-reg-exp-mode
          language="json"
          max-height="200"
          processing
          query="compilerOptions"
          searchable
          theme="dark"
        />
        <KCodeBlock
          id="single-line-dark-prop"
          :code="singleLineCode"
          language="plaintext"
          single-line
          theme="dark"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        class="limited-width"
        title="secondary-actions"
      >
        <KCodeBlock
          id="secondary-actions-slot"
          :code="code"
          language="json"
        >
          <template #secondary-actions>
            <KButton>
              Secondary Action
            </KButton>
          </template>
        </KCodeBlock>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { computed, ref, inject, watch, nextTick } from 'vue'
import type { CodeBlockEventData } from '@/types'
import { codeToHtml } from '../utils/shiki'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'

const origLines = [2, 3, 4]
const newLines = [6, 7, 8]
const highlightedLines = ref<number[]>(origLines)

// checkbox causes updates to `code` computed as well as `highlightedLines`
// track if code has been modified by toggling the checkbox
const highlightedToggle = ref(true)
const codeModified = ref(false)

const highlight = async ({ codeElement, language, code, theme }: CodeBlockEventData) => {
  codeElement.innerHTML = await codeToHtml(code, { lang: language, theme: theme === 'dark' ? 'material-theme-palenight' : 'catppuccin-latte', structure: 'inline' })
}

const code = computed((): string => `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": ${highlightedToggle.value ? 'false' : 'true'},
    "exactOptionalPropertyTypes": ${highlightedToggle.value ? 'true' : 'false'},
    "noFallthroughCasesInSwitch": ${highlightedToggle.value ? 'true' : 'false'},
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "jsx": "preserve"
  },
  "include": [
    "./src",
    "./types",
    "./particularly-long-value-that-will-inadvertently-cause-scrolling-for-narrower-containers"
  ]
}`)

const singleLineCode = `-----BEGIN CERTIFICATE-----
MIIDlDCCAn6gAwIBAgIBATALBgkqhkiG9w0BAQ0wNDEyMAkGA1UEBhMCVVMwJQYD
VQQDHh4AawBvAG4AbgBlAGMAdAAtAGQAZQBmAGEAdQBsAHQwHhcNMjMwMTAzMTg1
NDQxWhcNMzMwMTAzMTg1NDQxWjA0MTIwCQYDVQQGEwJVUzAlBgNVBAMeHgBrAG8A
bgBuAGUAYwB0AC0AZABlAGYAYQB1AGwAdDCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBAJ1dzsZKtwFniWQaxIEqrs2EH95fWQ4Jie+79jJL1unRJJu5oDnR
5ontJZhPFSDdGZ1ZXhjQXIzaUk3BoFn7Zel7X25hzUdlKHoOTPf/KA7+isdvS89j
nGoC5vHtXQmgzNFRdCjeKDOmfa/Arff7+41SNTT+DNitZun+V3diePoatotOT3tv
puNqc5EjHLEGOdBwxSkO7qCvzsqOcFyBshT8AzFKU8aapErlILOIJKJIYHoAkS/A
cUfm/MNNMzPBBI3p1jZKXnWCwXMWUi8jZvsALYwn8E65GE07jW2O+n9hWzC43yTu
DYW0U8vcoTsdPmsZByIFDfERaxavQiEuhf0CAwEAAaOBtDCBsTASBgNVHRMBAf8E
CDAGAQH/AgEDMAsGA1UdDwQEAwIABjAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYB
BQUHAwIwFwYJKwYBBAGCNxQCBAoMCGNlcnRUeXBlMCMGCSsGAQQBgjcVAgQWBBQB
AQEBAQEBAQEBAQEBAQEBAQEBATAcBgkrBgEEAYI3FQcEDzANBgUpAQEBAQIBCgIB
FDATBgkrBgEEAYI3FQEEBgIEABQACjALBgkqhkiG9w0BAQ0DggEBABGVFc6DTlx7
SuKgT3OhQS94VyECnJjyk2eR6/MaZYvgw0Iz8nOyg7xTtj7DKl/uyHdJWwYn5R70
+YGF7GGbkk6rkRuHEVT+dhyYwO9fKzBZkLNnzdp900VSmTubx4j6WN0+gmQS0dLW
uyBQdUiKvE/ZTjWHUAIYb3244VRRHBRLs3s40f2mJjBZ3Zm6XUxGtsnYudWOh4cv
nYKRWqogwSBtKPYAe115DLDULxe86Cu5neYTt5/kU7VjnLxhOhguWTIrGMSV0Jle
Rl1IG8evLu2zWxN3wb451/Kf5lRFLUjfjuLD8tHMlpwVIxoHct9GuKV4W14cf2Q/
cWMCwpGsAAE=
-----END CERTIFICATE-----`

watch(code, async () => {
  if (codeModified.value) {
    // wait for syntax highlighting to rerender
    await nextTick().then(() => {
      // highlight new lines
      highlightedLines.value = highlightedToggle.value ? origLines : newLines
      codeModified.value = false
    })
  }
})
</script>

<style lang="scss" scoped>
.limited-width {
  max-width: 90%;
}
</style>
