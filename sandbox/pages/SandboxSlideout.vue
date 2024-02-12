<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KSlideout"
  >
    <div class="kslideout-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A9543&mode=dev&t=USFhEkebi5cmYxaK-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="visible">
        <KComponent
          v-slot="{ data }"
          :data="{ slideoutVisible: false }"
        >
          <KButton
            @click="data.slideoutVisible = true"
          >
            KSlideout
          </KButton>

          <KSlideout
            :visible="data.slideoutVisible"
            @close="data.slideoutVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="title">
        <KComponent
          v-slot="{ data }"
          :data="{ slideoutVisible: false }"
        >
          <KButton
            @click="data.slideoutVisible = true"
          >
            KSlideout
          </KButton>

          <KSlideout
            title="Slideout Title"
            :visible="data.slideoutVisible"
            @close="data.slideoutVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="offsetTop">
        <KComponent
          v-slot="{ data }"
          :data="{ slideoutVisible: false }"
        >
          <KButton
            @click="data.slideoutVisible = true"
          >
            KSlideout
          </KButton>

          <KSlideout
            :offset-top="100"
            :visible="data.slideoutVisible"
            @close="data.slideoutVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hasOverlay">
        <KComponent
          v-slot="{ data }"
          :data="{ slideoutVisible: false }"
        >
          <KButton
            @click="data.slideoutVisible = true"
          >
            KSlideout
          </KButton>

          <KSlideout
            :has-overlay="false"
            :visible="data.slideoutVisible"
            @close="data.slideoutVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="closeOnBlur">
        <!-- TODO -->
      </SandboxSectionComponent>
      <SandboxSectionComponent title="maxWidth">
        <KComponent
          v-slot="{ data }"
          :data="{ slideoutVisible: false }"
        >
          <KButton
            @click="data.slideoutVisible = true"
          >
            KSlideout
          </KButton>

          <KSlideout
            max-width="90%"
            :visible="data.slideoutVisible"
            @close="data.slideoutVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { inject } from 'vue'
</script>
