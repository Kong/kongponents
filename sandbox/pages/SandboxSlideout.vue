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
            title="Long Slideout Title Wraps To Next Line Instead Of Overflowing"
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
            :close-on-blur="false"
            :visible="data.slideoutVisible"
            @close="data.slideoutVisible = false"
          />
        </KComponent>
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

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="default">
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
            title="Slotted Title"
            :visible="data.slideoutVisible"
            @close="data.slideoutVisible = false"
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus viverra vitae congue eu consequat ac felis. Netus et malesuada fames ac turpis. Donec massa sapien faucibus et molestie ac feugiat. Cursus turpis massa tincidunt dui. Eget nullam non nisi est sit amet facilisis magna. Porttitor eget dolor morbi non arcu risus quis. Tempus urna et pharetra pharetra massa massa ultricies mi. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Elit eget gravida cum sociis natoque penatibus et. Lobortis mattis aliquam faucibus purus in massa tempor nec. Aliquet eget sit amet tellus cras adipiscing enim eu. Diam vulputate ut pharetra sit amet aliquam. Ultricies mi quis hendrerit dolor magna eget est lorem. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Pellentesque habitant morbi tristique senectus et netus et. Aliquam ultrices sagittis orci a scelerisque purus.</p>
            <p>Tincidunt dui ut ornare lectus sit amet. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Egestas erat imperdiet sed euismod nisi porta lorem. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed. Sit amet cursus sit amet dictum sit amet justo donec. Augue mauris augue neque gravida in fermentum. Tristique risus nec feugiat in. Purus viverra accumsan in nisl. Massa sapien faucibus et molestie ac feugiat. Pharetra magna ac placerat vestibulum. Consequat mauris nunc congue nisi vitae.</p>
            <p>Turpis tincidunt id aliquet risus feugiat in ante. Congue nisi vitae suscipit tellus. Tincidunt id aliquet risus feugiat in ante. Tincidunt ornare massa eget egestas purus. Velit dignissim sodales ut eu sem. Suspendisse sed nisi lacus sed. At lectus urna duis convallis convallis tellus id interdum velit. Dignissim diam quis enim lobortis. Ullamcorper sit amet risus nullam eget. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor.</p>
            <p>Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet. Dui vivamus arcu felis bibendum ut. Enim neque volutpat ac tincidunt vitae semper. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Nulla aliquet enim tortor at auctor urna nunc id. Faucibus in ornare quam viverra orci sagittis eu volutpat. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Amet tellus cras adipiscing enim eu turpis. Aliquet risus feugiat in ante. Cursus in hac habitasse platea dictumst. Fringilla ut morbi tincidunt augue interdum. Elementum curabitur vitae nunc sed. Egestas dui id ornare arcu odio ut sem nulla. Nisi vitae suscipit tellus mauris a. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Tortor at risus viverra adipiscing at in tellus integer.</p>
            <p>Porta lorem mollis aliquam ut porttitor leo a. Egestas diam in arcu cursus euismod quis viverra. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Sociis natoque penatibus et magnis dis parturient montes nascetur. Malesuada nunc vel risus commodo viverra maecenas. Viverra nam libero justo laoreet sit amet. Eu augue ut lectus arcu. Sagittis eu volutpat odio facilisis mauris. Etiam non quam lacus suspendisse faucibus interdum posuere. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Maecenas ultricies mi eget mauris pharetra et ultrices neque ornare. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Ut enim blandit volutpat maecenas.</p>
            <p>Gravida quis blandit turpis cursus in hac habitasse platea. Ornare quam viverra orci sagittis eu volutpat odio. Habitant morbi tristique senectus et netus. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Nec dui nunc mattis enim ut tellus. Nunc eget lorem dolor sed viverra ipsum nunc. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Varius vel pharetra vel turpis nunc eget lorem dolor. Cursus risus at ultrices mi tempus. Velit scelerisque in dictum non. Aliquet bibendum enim facilisis gravida neque convallis a.</p>
            <p>Enim ut tellus elementum sagittis vitae et leo duis. Luctus venenatis lectus magna fringilla. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Vitae congue eu consequat ac felis donec et odio pellentesque. Purus viverra accumsan in nisl nisi. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Vestibulum lectus mauris ultrices eros in cursus. Ipsum suspendisse ultrices gravida dictum fusce ut. Et netus et malesuada fames ac turpis egestas integer eget. Sed lectus vestibulum mattis ullamcorper.</p>
          </KSlideout>
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
            title="Slotted Title"
            :visible="data.slideoutVisible"
            @close="data.slideoutVisible = false"
          >
            <template #title>
              <KongIcon />
              Custom Long Title That Wraps To Next Line
            </template>
          </KSlideout>
        </KComponent>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { inject } from 'vue'
import { KongIcon } from '@kong/icons'
</script>

<style lang="scss" scoped>
.kslideout-sandbox {
  p {
    margin: 0;
  }
}
</style>
