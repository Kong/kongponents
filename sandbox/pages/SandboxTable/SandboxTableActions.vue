<template>
  <KDropdown>
    <template #default>
      <KButton
        appearance="tertiary"
        size="small"
      >
        <template #icon>
          <MoreIcon />
        </template>
      </KButton>
    </template>
    <template #items>
      <KDropdownItem>
        Edit
      </KDropdownItem>
      <KDropdownItem
        danger
        has-divider
      >
        Delete
      </KDropdownItem>
    </template>
  </KDropdown>
</template>

<script setup lang="ts">
import { MoreIcon } from '@kong/icons'
</script>
