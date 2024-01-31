<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KModal & KPrompt"
  >
    <div class="kmodals-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="title">
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false }"
        >
          <div class="horizontal-container">
            <KButton
              @click="data.modalVisible = true"
            >
              KModal
            </KButton>
            <KButton
              @click="data.promptVisible = true"
            >
              KPrompt
            </KButton>
          </div>

          <KModal
            class="test-class"
            data-testid="test-id"
            title="Long KModal title gets truncated with an ellipsis"
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          />
          <KPrompt
            class="test-class"
            data-testid="test-id"
            title="Long KPrompt title gets truncated with an ellipsis"
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="Only available in KModal."
        title="hideCloseIcon"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false }"
        >
          <div class="horizontal-container">
            <KButton
              @click="data.modalVisible = true"
            >
              KModal
            </KButton>
          </div>

          <KModal
            hide-close-icon
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          >
            When no title is provided and hideCloseIcon is true, the modal header is hidden.
          </KModal>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="Only available in KModal."
        title="hideCancelButton"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false }"
        >
          <div class="horizontal-container">
            <KButton
              @click="data.modalVisible = true"
            >
              KModal
            </KButton>
          </div>

          <KModal
            hide-cancel-button
            title="KModal"
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="Only available in KPrompt."
        title="message & confirmationText & confirmationPrompt"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ promptVisible: false }"
        >
          <KButton
            @click="data.promptVisible = true"
          >
            KPrompt
          </KButton>

          <KPrompt
            confirmation-prompt="KPrompt confirmation prompt: type {confirmationText} to confirm."
            confirmation-text="confirm"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            title="KPrompt"
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="actionButtonText & actionButtonAppearance & actionButtonDisabled">
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false, modalActionEnabled: true, promptActionEnabled: true }"
        >
          <div class="horizontal-container">
            <div class="vertical-container">
              <div>
                <KButton
                  @click="data.modalVisible = true"
                >
                  KModal
                </KButton>
              </div>
              <KInputSwitch
                v-model="data.modalActionEnabled"
                label="Action button enabled"
              />
            </div>
            <div class="vertical-container">
              <div>
                <KButton
                  @click="data.promptVisible = true"
                >
                  KPrompt
                </KButton>
              </div>
              <KInputSwitch
                v-model="data.promptActionEnabled"
                label="Action button enabled"
              />
            </div>
          </div>

          <KModal
            action-button-appearance="danger"
            :action-button-disabled="!data.modalActionEnabled"
            action-button-text="KModal action"
            title="KModal"
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          />
          <KPrompt
            action-button-appearance="danger"
            :action-button-disabled="!data.promptActionEnabled"
            action-button-text="KPrompt action"
            title="KPrompt"
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="cancelButtonText & cancelButtonAppearance & cancelButtonDisabled">
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false, modalCancelEnabled: true, promptCancelEnabled: true }"
        >
          <div class="horizontal-container">
            <div class="vertical-container">
              <div>
                <KButton
                  @click="data.modalVisible = true"
                >
                  KModal
                </KButton>
              </div>
              <KInputSwitch
                v-model="data.modalCancelEnabled"
                label="Cancel button enabled"
              />
            </div>
            <div class="vertical-container">
              <div>
                <KButton
                  @click="data.promptVisible = true"
                >
                  KPrompt
                </KButton>
              </div>
              <KInputSwitch
                v-model="data.promptCancelEnabled"
                label="Cancel button enabled"
              />
            </div>
          </div>

          <KModal
            cancel-button-appearance="danger"
            :cancel-button-disabled="!data.modalCancelEnabled"
            cancel-button-text="KModal cancel"
            title="KModal"
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          />
          <KPrompt
            cancel-button-appearance="danger"
            :cancel-button-disabled="!data.promptCancelEnabled"
            cancel-button-text="KPrompt cancel"
            title="KPrompt"
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="In KPrompt passed through modalAttributes prop."
        title="closeOnBackdropClick"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false, modalCloseOnBackdropClick: false, promptCloseOnBackdropClick: false }"
        >
          <div class="horizontal-container">
            <div class="vertical-container">
              <div>
                <KButton
                  @click="data.modalVisible = true"
                >
                  KModal
                </KButton>
              </div>
              <KInputSwitch
                v-model="data.modalCloseOnBackdropClick"
                label="Close on backdrop click"
              />
            </div>
            <div class="vertical-container">
              <div>
                <KButton
                  @click="data.promptVisible = true"
                >
                  KPrompt
                </KButton>
              </div>
              <KInputSwitch
                v-model="data.promptCloseOnBackdropClick"
                label="Close on backdrop click"
              />
            </div>
          </div>

          <KModal
            :close-on-backdrop-click="data.modalCloseOnBackdropClick"
            title="KModal"
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          />
          <KPrompt
            :modal-attributes="{ closeOnBackdropClick: data.promptCloseOnBackdropClick }"
            title="KPrompt"
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="In KPrompt passed through modalAttributes prop."
        title="maxWidth"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false }"
        >
          <div class="horizontal-container">
            <KButton
              @click="data.modalVisible = true"
            >
              KModal
            </KButton>
            <KButton
              @click="data.promptVisible = true"
            >
              KPrompt
            </KButton>
          </div>

          <KModal
            max-width="1000px"
            title="KModal"
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          />
          <KPrompt
            :modal-attributes="{ maxWidth: '1000px' }"
            title="KPrompt"
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="In KPrompt passed through modalAttributes prop."
        title="maxHeight"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false }"
        >
          <div class="horizontal-container">
            <KButton
              @click="data.modalVisible = true"
            >
              KModal
            </KButton>
            <KButton
              @click="data.promptVisible = true"
            >
              KPrompt
            </KButton>
          </div>

          <KModal
            max-height="200px"
            title="KModal"
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vestibulum sed arcu non odio euismod. Tristique senectus et netus et. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Justo nec ultrices dui sapien. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Purus sit amet luctus venenatis lectus magna fringilla urna. Elit sed vulputate mi sit amet mauris commodo quis. Lorem ipsum dolor sit amet. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Mollis aliquam ut porttitor leo a diam sollicitudin. Amet consectetur adipiscing elit pellentesque habitant morbi. Sapien eget mi proin sed libero enim sed faucibus turpis. Ultrices in iaculis nunc sed augue lacus viverra. Purus sit amet luctus venenatis lectus magna fringilla urna. Ut porttitor leo a diam. Auctor elit sed vulputate mi sit amet mauris commodo. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Facilisis sed odio morbi quis commodo odio aenean sed adipiscing. Diam maecenas ultricies mi eget mauris. Porta nibh venenatis cras sed. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Vitae auctor eu augue ut lectus arcu bibendum at varius. Fringilla phasellus faucibus scelerisque eleifend donec. Imperdiet massa tincidunt nunc pulvinar sapien. Sem fringilla ut morbi tincidunt augue. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Orci dapibus ultrices in iaculis nunc. Orci a scelerisque purus semper eget duis at tellus. Egestas tellus rutrum tellus pellentesque eu. Eget nunc scelerisque viverra mauris in aliquam. Aliquam vestibulum morbi blandit cursus risus at. Lorem ipsum dolor sit amet consectetur adipiscing. Lectus mauris ultrices eros in cursus turpis massa. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Enim sed faucibus turpis in eu mi bibendum. Ornare aenean euismod elementum nisi. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Sed turpis tincidunt id aliquet risus feugiat. Lectus arcu bibendum at varius. Vestibulum lectus mauris ultrices eros in cursus. Nulla aliquet porttitor lacus luctus. Ac turpis egestas sed tempus urna et pharetra. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Venenatis urna cursus eget nunc scelerisque. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Sed cras ornare arcu dui. Proin gravida hendrerit lectus a. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. In iaculis nunc sed augue lacus viverra vitae. Lobortis feugiat vivamus at augue. Aliquet enim tortor at auctor. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Eget mauris pharetra et ultrices neque ornare aenean euismod. Molestie nunc non blandit massa enim nec dui nunc. Justo donec enim diam vulputate ut. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Pulvinar etiam non quam lacus suspendisse. Gravida neque convallis a cras semper auctor. Non nisi est sit amet facilisis magna etiam. Fermentum dui faucibus in ornare quam viverra orci. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Vitae elementum curabitur vitae nunc sed. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. A diam maecenas sed enim. Semper quis lectus nulla at volutpat diam. Curabitur gravida arcu ac tortor dignissim. Dui sapien eget mi proin sed libero. Quis eleifend quam adipiscing vitae. Varius quam quisque id diam vel quam elementum pulvinar. Cras sed felis eget velit aliquet. At elementum eu facilisis sed odio morbi quis commodo. Nisl purus in mollis nunc sed id semper risus. Urna nunc id cursus metus aliquam. A erat nam at lectus urna duis convallis convallis. Magna etiam tempor orci eu lobortis elementum nibh.
            </p>
          </KModal>
          <KPrompt
            :modal-attributes="{ maxHeight: '200px' }"
            title="KPrompt"
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vestibulum sed arcu non odio euismod. Tristique senectus et netus et. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Justo nec ultrices dui sapien. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Purus sit amet luctus venenatis lectus magna fringilla urna. Elit sed vulputate mi sit amet mauris commodo quis. Lorem ipsum dolor sit amet. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Mollis aliquam ut porttitor leo a diam sollicitudin. Amet consectetur adipiscing elit pellentesque habitant morbi. Sapien eget mi proin sed libero enim sed faucibus turpis. Ultrices in iaculis nunc sed augue lacus viverra. Purus sit amet luctus venenatis lectus magna fringilla urna. Ut porttitor leo a diam. Auctor elit sed vulputate mi sit amet mauris commodo. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Facilisis sed odio morbi quis commodo odio aenean sed adipiscing. Diam maecenas ultricies mi eget mauris. Porta nibh venenatis cras sed. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Vitae auctor eu augue ut lectus arcu bibendum at varius. Fringilla phasellus faucibus scelerisque eleifend donec. Imperdiet massa tincidunt nunc pulvinar sapien. Sem fringilla ut morbi tincidunt augue. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Orci dapibus ultrices in iaculis nunc. Orci a scelerisque purus semper eget duis at tellus. Egestas tellus rutrum tellus pellentesque eu. Eget nunc scelerisque viverra mauris in aliquam. Aliquam vestibulum morbi blandit cursus risus at. Lorem ipsum dolor sit amet consectetur adipiscing. Lectus mauris ultrices eros in cursus turpis massa. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Enim sed faucibus turpis in eu mi bibendum. Ornare aenean euismod elementum nisi. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Sed turpis tincidunt id aliquet risus feugiat. Lectus arcu bibendum at varius. Vestibulum lectus mauris ultrices eros in cursus. Nulla aliquet porttitor lacus luctus. Ac turpis egestas sed tempus urna et pharetra. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Venenatis urna cursus eget nunc scelerisque. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Sed cras ornare arcu dui. Proin gravida hendrerit lectus a. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. In iaculis nunc sed augue lacus viverra vitae. Lobortis feugiat vivamus at augue. Aliquet enim tortor at auctor. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Eget mauris pharetra et ultrices neque ornare aenean euismod. Molestie nunc non blandit massa enim nec dui nunc. Justo donec enim diam vulputate ut. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Pulvinar etiam non quam lacus suspendisse. Gravida neque convallis a cras semper auctor. Non nisi est sit amet facilisis magna etiam. Fermentum dui faucibus in ornare quam viverra orci. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Vitae elementum curabitur vitae nunc sed. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. A diam maecenas sed enim. Semper quis lectus nulla at volutpat diam. Curabitur gravida arcu ac tortor dignissim. Dui sapien eget mi proin sed libero. Quis eleifend quam adipiscing vitae. Varius quam quisque id diam vel quam elementum pulvinar. Cras sed felis eget velit aliquet. At elementum eu facilisis sed odio morbi quis commodo. Nisl purus in mollis nunc sed id semper risus. Urna nunc id cursus metus aliquam. A erat nam at lectus urna duis convallis convallis. Magna etiam tempor orci eu lobortis elementum nibh.
            </p>
          </KPrompt>
        </KComponent>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="title">
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false }"
        >
          <div class="horizontal-container">
            <KButton
              @click="data.modalVisible = true"
            >
              KModal
            </KButton>
            <KButton
              @click="data.promptVisible = true"
            >
              KPrompt
            </KButton>
          </div>

          <KModal
            title="KModal"
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          >
            <template #title>
              Slotted KModel title
            </template>
          </KModal>
          <KPrompt
            title="KPrompt"
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          >
            <template #title>
              Slotted KPrompt title
            </template>
          </KPrompt>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="default">
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false }"
        >
          <div class="horizontal-container">
            <KButton
              @click="data.modalVisible = true"
            >
              KModal
            </KButton>
            <KButton
              @click="data.promptVisible = true"
            >
              KPrompt
            </KButton>
          </div>

          <KModal
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          >
            Slotted KModel content
          </KModal>
          <KPrompt
            :visible="data.promptVisible"
            @cancel="data.promptVisible = false"
            @proceed="data.promptVisible = false"
          >
            Slotted KPrompt content
          </KPrompt>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="Only available in KModal."
        title="footer"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false }"
        >
          <KButton
            @click="data.modalVisible = true"
          >
            KModal
          </KButton>

          <KModal
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          >
            <template #footer>
              Slotted KModal footer
            </template>
          </KModal>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="Only available in KModal."
        title="footer-actions"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false, promptVisible: false }"
        >
          <KButton
            @click="data.modalVisible = true"
          >
            KModal
          </KButton>

          <KModal
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          >
            <template #footer-actions>
              <KButton
                appearance="secondary"
              >
                Slotted KModal
              </KButton>
              <KButton
                appearance="secondary"
              >
                footer actions
              </KButton>
            </template>
          </KModal>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="Only available in KModal."
        title="content"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ modalVisible: false }"
        >
          <KButton
            @click="data.modalVisible = true"
          >
            KModal
          </KButton>

          <KModal
            close-on-backdrop-click
            :visible="data.modalVisible"
            @cancel="data.modalVisible = false"
            @proceed="data.modalVisible = false"
          >
            <template #content>
              Slotted KModal custom content
            </template>
          </KModal>
        </KComponent>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
</script>

<style lang="scss" scoped>
.kmodals-sandbox {
  .horizontal-container {
    display: flex;
    gap: $kui-space-50;
  }

  .vertical-container {
    display: flex;
    flex-direction: column;
    gap: $kui-space-50;
  }
}
</style>
