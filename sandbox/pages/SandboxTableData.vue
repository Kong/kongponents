<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTableData"
  >
    <SandboxSectionComponent title="rowHover & maxHeight & clientSort & sortHandlerFunction & sortable">
      <KComponent
        v-slot="{ data }"
        :data="{ tableKey: 0, tableRowHover: false, tableSortable: true, initialSorting: true }"
      >
        <div class="horizontal-container">
          <KInputSwitch
            v-model="data.tableRowHover"
            label="Has hover"
            @change="data.tableKey++"
          />
          <KInputSwitch
            v-model="data.tableSortable"
            label="Sortable"
            @change="data.tableKey++"
          />
          <KInputSwitch
            v-model="data.initialSorting"
            label="Initial sorting"
            @change="data.tableKey++"
          />
        </div>

        <KTableData
          :key="data.tableKey"
          :fetcher="fetcher"
          :headers="headers(false, true)"
          :initial-fetcher-params="data.initialSorting ? { sortColumnKey: 'username', sortColumnOrder: 'asc' } : undefined"
          max-height="300"
          :row-hover="data.tableRowHover"
          :sortable="data.tableSortable"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
        </KTableData>
      </KComponent>
    </SandboxSectionComponent>
    <div
      v-if="false"
      class="k-table-data-sandbox"
    >
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="rowHover & maxHeight & clientSort & sortHandlerFunction & sortable">
        <KComponent
          v-slot="{ data }"
          :data="{ tableKey: 0, tableRowHover: false, tableSortable: true, initialSorting: true }"
        >
          <div class="horizontal-container">
            <KInputSwitch
              v-model="data.tableRowHover"
              label="Has hover"
              @change="data.tableKey++"
            />
            <KInputSwitch
              v-model="data.tableSortable"
              label="Sortable"
              @change="data.tableKey++"
            />
            <KInputSwitch
              v-model="data.initialSorting"
              label="Initial sorting"
              @change="data.tableKey++"
            />
          </div>

          <KTableData
            :key="data.tableKey"
            client-sort
            :fetcher="fetcher"
            :headers="headers(false, true)"
            :initial-fetcher-params="data.initialSorting ? { sortColumnKey: 'username', sortColumnOrder: 'asc' } : undefined"
            max-height="300"
            :row-hover="data.tableRowHover"
            :sort-handler-function="sortHandlerFunction"
            :sortable="data.tableSortable"
          >
            <template #action-items>
              <SandboxTableViewActions />
            </template>
          </KTableData>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="All rows in this table are clickable."
        title="loading & resizeColumns & Empty State Props & Error State Props"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ tableKey: 0, tableLoadingState: false, tableErrorState: false }"
        >
          <div class="horizontal-container">
            <KInputSwitch
              v-model="data.tableLoadingState"
              label="Loading state"
              @change="data.tableKey++"
            />
            <KInputSwitch
              v-model="data.tableErrorState"
              label="Error state"
              @change="data.tableKey++"
            />
            <KInputSwitch
              v-model="data.tableEmptyState"
              label="Empty state"
              @change="data.tableKey++"
            />
          </div>

          <KTableData
            :key="data.tableKey"
            empty-state-action-message="Add new item"
            empty-state-action-route="/"
            empty-state-button-appearance="secondary"
            empty-state-icon-variant="kong"
            empty-state-message="Empty state message"
            empty-state-title="Empty state title"
            :error="data.tableErrorState"
            error-state-action-message="Error state action"
            error-state-action-route="/"
            error-state-message="Error state message"
            error-state-title="Error state title"
            :fetcher="data.tableEmptyState ? emptyFetcher : fetcher"
            :headers="headers(true)"
            :loading="data.tableLoadingState"
            resize-columns
            @row:click="(_event: any, row: any) => onRowClick(row)"
          >
            <template #action-items>
              <SandboxTableViewActions />
            </template>
          </KTableData>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rowLink (router-link)">
        <KTableData
          :fetcher="fetcher"
          :headers="headers()"
          :row-link="getRowLinksRouter"
          @row-actions-toggle="onRowActionsToggle"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #username="{ rowValue }">
            <KExternalLink
              class="username-link"
              href="https://kongponents.konghq.com/components/alert.html"
            >
              @{{ rowValue }}
            </KExternalLink>
          </template>
          <template #email="{ rowValue }">
            <KCopy :text="rowValue" />
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rowLink (anchor)">
        <KTableData
          :fetcher="fetcher"
          :headers="headers()"
          :row-link="getRowLinksAnchor"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #username="{ rowValue }">
            <KExternalLink
              class="username-link"
              href="https://kongponents.konghq.com/components/alert.html"
            >
              @{{ rowValue }}
            </KExternalLink>
          </template>
          <template #email="{ rowValue }">
            <KCopy :text="rowValue" />
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rowExpandable & rowExpanded">
        <KTableData
          :fetcher="fetcher"
          :headers="headers()"
          :row-expandable="getRowExpandable"
          :row-expanded="getRowExpanded"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Vitae rutrum interdum dis elementum; consequat maximus potenti felis. Faucibus eget vel, efficitur vitae ullamcorper velit. Aliquam aliquam fusce sollicitudin dolor lorem aenean. Rutrum ligula diam mollis felis egestas arcu. Odio urna leo pharetra luctus urna adipiscing suscipit nisl. Eleifend natoque lacus scelerisque suspendisse libero pulvinar ut lectus. Ac parturient fringilla lacinia fusce natoque semper.
            Turpis pellentesque eu ad risus proin hendrerit litora. Sollicitudin facilisi per diam netus; at commodo ornare. Justo efficitur hendrerit augue blandit himenaeos suspendisse; mattis habitasse. Aliquet iaculis nibh ante et rutrum sollicitudin tincidunt enim. Suspendisse orci ac proin metus consectetur vel primis. Dictumst imperdiet nulla habitant donec gravida vel nulla in. Eleifend augue ligula convallis eros odio. Erat integer nibh mattis varius senectus.
            Sodales nisl sem aliquet neque scelerisque. Dapibus mauris leo commodo; nulla adipiscing purus ultricies porttitor laoreet. Dignissim sociosqu cras sollicitudin iaculis magna ex. Elit lacus tincidunt dapibus adipiscing tortor eros dui felis. Orci hendrerit senectus himenaeos ligula cursus in. Turpis dignissim duis nunc neque ornare congue primis aenean natoque. Himenaeos mollis dui dolor laoreet mauris aliquam hendrerit scelerisque.
            Sagittis lectus fringilla iaculis semper egestas mattis venenatis. Mollis parturient primis; pharetra leo neque faucibus nibh. Porttitor scelerisque magnis pellentesque nec vel etiam fames quisque. Senectus dictumst nisl enim sagittis primis magnis habitasse finibus torquent. Efficitur turpis hendrerit posuere dictum fusce nostra taciti donec. Parturient ut blandit ligula euismod taciti velit. Mollis urna nunc tellus; cras consequat volutpat turpis. Maximus egestas platea mauris mollis mollis conubia. Euismod scelerisque quam mauris parturient eleifend nostra. Mollis tempor hendrerit hendrerit praesent aliquet himenaeos dignissim.
            Dignissim penatibus velit sapien vehicula sodales suspendisse iaculis massa. Cubilia aenean morbi scelerisque eu imperdiet odio primis. Mollis netus natoque, euismod felis tempor nibh. In nostra nulla eros ac orci suspendisse luctus porta. Parturient cras turpis faucibus ut sed nunc lacus. At et fermentum sapien tristique ac primis. Interdum vivamus orci velit sed arcu in. Eros aptent primis suscipit parturient curae enim.
            Rutrum aliquam phasellus duis pellentesque torquent fermentum. Feugiat odio consequat cursus blandit tristique erat amet. Ornare scelerisque id erat lectus at erat. Dui nostra interdum tortor, turpis arcu dis. Netus fermentum lobortis primis fermentum velit ultrices nam condimentum? Dictum montes maximus senectus; quis varius scelerisque non ridiculus. Curae malesuada porttitor finibus venenatis mi faucibus. Velit blandit dis mauris laoreet ornare molestie.
            Ante torquent faucibus nascetur ultricies eros varius odio. Cubilia sodales maximus tellus leo cubilia lorem facilisis. Blandit egestas suspendisse torquent dolor; torquent commodo id nullam. Etiam facilisi faucibus litora quisque aptent vestibulum dapibus. Maecenas risus fermentum facilisis suspendisse imperdiet nascetur porta. Vehicula malesuada sollicitudin viverra in ac habitasse ligula. Adipiscing porta neque nullam pharetra est luctus pharetra. Consequat sapien parturient nisl augue ultricies placerat maximus convallis. Consectetur metus lacinia; euismod mollis class tortor.
          </template>
        </KTableData>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        title="column header & column tooltip & cell"
      >
        <KTableData
          :fetcher="fetcher"
          :headers="headers()"
        >
          <template #column-username>
            Username

            <KBadge>Beta</KBadge>
          </template>
          <template #tooltip-email>
            Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
          </template>
          <template #email="{ rowValue }">
            <KCopy :text="rowValue" />
          </template>
          <template #action-items>
            <SandboxTableViewActions />
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="toolbar">
        <KTableData
          :fetcher="fetcher"
          :headers="headers()"
        >
          <template #toolbar>
            <KInput />
            <KButton size="large">
              <AddIcon /> Add user
            </KButton>
          </template>
          <template #action-items>
            <SandboxTableViewActions />
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="error-state">
        <KTableData
          error
          :fetcher="fetcher"
          :headers="headers()"
        >
          <template #error-state>
            <KEmptyState
              action-button-text="Slotted error state action"
              icon-variant="error"
              message="Slotted error state message"
              title="Slotted error state title"
            />
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state">
        <KTableData
          :fetcher="emptyFetcher"
          :headers="headers()"
        >
          <template #empty-state>
            <KEmptyState
              action-button-text="Slotted empty state action"
              message="Slotted empty state message"
              title="Slotted empty state title"
            />
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state-action-icon">
        <KTableData
          empty-state-action-message="Empty state action"
          :fetcher="emptyFetcher"
          :headers="headers()"
        >
          <template #empty-state-action-icon>
            <AddIcon />
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="bulk-actions">
        <KTableData
          :fetcher="fetcher"
          :headers="headers(false, false, true)"
          :row-key="({ id }: Record<string, any>) => String(id)"
        >
          <template #bulk-actions="{ selectedRows }">
            <KButton
              appearance="danger"
              :disabled="!selectedRows.length"
            >
              Delete {{ selectedRows.length ? `${selectedRows.length} items` : '' }}
            </KButton>
          </template>
          <template #action-items>
            <SandboxTableViewActions />
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="row-expanded">
        <KTableData
          :fetcher="fetcher"
          :headers="headers()"
          :row-expandable="() => true"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded="{ nestedHeaders, columnWidths }">
            <KTableData
              :fetcher="fetcher"
              :headers="nestedHeaders"
              hide-headers
              nested
              :table-preferences="{ columnWidths }"
            >
              <template #action-items>
                <SandboxTableViewActions />
              </template>
            </KTableData>
          </template>
        </KTableData>
      </SandboxSectionComponent>

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent title="Bulk Actions">
        <div class="resizable-table">
          <KTableData
            :fetcher="fetcher"
            :headers="headers(true, false, true)"
            resize-columns
            :row-bulk-action-enabled="getRowBulkAction"
            :row-key="({ id }: Record<string, any>) => String(id)"
            @row-select="onBulkActionsSelect"
          >
            <template #bulk-action-items>
              <SandboxTableViewActions :count="selectedData.length" />
            </template>
            <template #action-items>
              <SandboxTableViewActions />
            </template>
          </KTableData>
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="Bulk Actions & Expandable Rows">
        <KTableData
          :fetcher="fetcher"
          :headers="headers(true, false, true)"
          resize-columns
          :row-bulk-action-enabled="getRowBulkAction"
          :row-expandable="() => true"
          :row-key="({ id }: Record<string, any>) => String(id)"
          @row-select="onBulkActionsSelect"
        >
          <template #bulk-action-items>
            <SandboxTableViewActions :count="selectedData.length" />
          </template>
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Vitae rutrum interdum dis elementum; consequat maximus potenti felis. Faucibus eget vel, efficitur vitae ullamcorper velit. Aliquam aliquam fusce sollicitudin dolor lorem aenean. Rutrum ligula diam mollis felis egestas arcu. Odio urna leo pharetra luctus urna adipiscing suscipit nisl. Eleifend natoque lacus scelerisque suspendisse libero pulvinar ut lectus. Ac parturient fringilla lacinia fusce natoque semper.
            Turpis pellentesque eu ad risus proin hendrerit litora. Sollicitudin facilisi per diam netus; at commodo ornare. Justo efficitur hendrerit augue blandit himenaeos suspendisse; mattis habitasse. Aliquet iaculis nibh ante et rutrum sollicitudin tincidunt enim. Suspendisse orci ac proin metus consectetur vel primis. Dictumst imperdiet nulla habitant donec gravida vel nulla in. Eleifend augue ligula convallis eros odio. Erat integer nibh mattis varius senectus.
            Sodales nisl sem aliquet neque scelerisque. Dapibus mauris leo commodo; nulla adipiscing purus ultricies porttitor laoreet. Dignissim sociosqu cras sollicitudin iaculis magna ex. Elit lacus tincidunt dapibus adipiscing tortor eros dui felis. Orci hendrerit senectus himenaeos ligula cursus in. Turpis dignissim duis nunc neque ornare congue primis aenean natoque. Himenaeos mollis dui dolor laoreet mauris aliquam hendrerit scelerisque.
            Sagittis lectus fringilla iaculis semper egestas mattis venenatis. Mollis parturient primis; pharetra leo neque faucibus nibh. Porttitor scelerisque magnis pellentesque nec vel etiam fames quisque. Senectus dictumst nisl enim sagittis primis magnis habitasse finibus torquent. Efficitur turpis hendrerit posuere dictum fusce nostra taciti donec. Parturient ut blandit ligula euismod taciti velit. Mollis urna nunc tellus; cras consequat volutpat turpis. Maximus egestas platea mauris mollis mollis conubia. Euismod scelerisque quam mauris parturient eleifend nostra. Mollis tempor hendrerit hendrerit praesent aliquet himenaeos dignissim.
            Dignissim penatibus velit sapien vehicula sodales suspendisse iaculis massa. Cubilia aenean morbi scelerisque eu imperdiet odio primis. Mollis netus natoque, euismod felis tempor nibh. In nostra nulla eros ac orci suspendisse luctus porta. Parturient cras turpis faucibus ut sed nunc lacus. At et fermentum sapien tristique ac primis. Interdum vivamus orci velit sed arcu in. Eros aptent primis suscipit parturient curae enim.
            Rutrum aliquam phasellus duis pellentesque torquent fermentum. Feugiat odio consequat cursus blandit tristique erat amet. Ornare scelerisque id erat lectus at erat. Dui nostra interdum tortor, turpis arcu dis. Netus fermentum lobortis primis fermentum velit ultrices nam condimentum? Dictum montes maximus senectus; quis varius scelerisque non ridiculus. Curae malesuada porttitor finibus venenatis mi faucibus. Velit blandit dis mauris laoreet ornare molestie.
            Ante torquent faucibus nascetur ultricies eros varius odio. Cubilia sodales maximus tellus leo cubilia lorem facilisis. Blandit egestas suspendisse torquent dolor; torquent commodo id nullam. Etiam facilisi faucibus litora quisque aptent vestibulum dapibus. Maecenas risus fermentum facilisis suspendisse imperdiet nascetur porta. Vehicula malesuada sollicitudin viverra in ac habitasse ligula. Adipiscing porta neque nullam pharetra est luctus pharetra. Consequat sapien parturient nisl augue ultricies placerat maximus convallis. Consectetur metus lacinia; euismod mollis class tortor.
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="Bulk Actions & Nested Table">
        <KTableData
          :fetcher="fetcher"
          :headers="headers(true, false, true)"
          resize-columns
          :row-bulk-action-enabled="getRowBulkAction"
          :row-expandable="() => true"
          :row-key="({ id }: Record<string, any>) => String(id)"
          @row-select="onBulkActionsSelect"
        >
          <template #bulk-action-items>
            <SandboxTableViewActions :count="selectedData.length" />
          </template>
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded="{ nestedHeaders, columnWidths }">
            <KTableData
              :fetcher="fetcher"
              :headers="nestedHeaders"
              hide-headers
              nested
              :table-preferences="{ columnWidths }"
            >
              <template #action-items>
                <SandboxTableViewActions />
              </template>
            </KTableData>
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="In both parent and nested tables, the first two rows are links and the rest are clickable."
        title="Nested Table With Row Links & Row Cliks"
      >
        <KTableData
          :fetcher="fetcher"
          :headers="headers(true)"
          resize-columns
          :row-expandable="() => true"
          :row-link="getRowOneTwoLink"
          @row:click="(_event: any, row: any) => onRowClick(row)"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded="{ nestedHeaders, columnWidths }">
            <KTableData
              :fetcher="fetcher"
              :headers="nestedHeaders"
              hide-headers
              nested
              :row-link="getRowOneTwoLink"
              :table-preferences="{ columnWidths }"
              @row:click="(_event: any, row: any) => onRowClick(row)"
            >
              <template #action-items>
                <SandboxTableViewActions />
              </template>
            </KTableData>
          </template>
        </KTableData>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="Nested Table With It's Own Header">
        <KTableData
          :fetcher="fetcher"
          :headers="headers()"
          :row-expandable="() => true"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded>
            <KTableData
              :fetcher="fetcher"
              :headers="headers()"
              nested
            >
              <template #action-items>
                <SandboxTableViewActions />
              </template>
            </KTableData>
          </template>
        </KTableData>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import type { TableDataHeader, TableViewData, RowLink, RowBulkAction, RowActionsTogglePayload } from '@/types'
import SandboxTableViewActions from './SandboxTableView/SandboxTableViewActions.vue'
import { AddIcon } from '@kong/icons'

const headers = (hidable: boolean = false, sortable: boolean = false, bulkActions: boolean = false): TableDataHeader[] => {
  return [
    { key: 'actions', label: 'Row actions' },
    { key: 'name', label: 'Full Name' },
    {
      key: 'username',
      label: 'Username',
      tooltip: sortable ? undefined : 'Column with a tooltip.',
      sortable,
      // ...(sortable && { useSortHandlerFunction: true }),
    },
    { key: 'email', label: 'Email', hidable },
    ...(bulkActions ? [{ key: 'bulkActions', label: 'Bulk actions' }] : []),
  ]
}

const fetcher = async (fetcherParams: any): Promise<any> => {
  console.log(fetcherParams)
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const responseData = await response.json()

  return {
    data: responseData,
    total: responseData.length,
  }
}

const emptyFetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    data: [],
    total: 0,
  }
}

const sortHandlerFunction = ({ key, sortColumnOrder, data }: any) => {
  return data.sort((a: any, b: any) => {
    if (key === 'username') {
      if (sortColumnOrder === 'asc') {
        if (a.username > b.username) {
          return 1
        } else if (a.username < b.username) {
          return -1
        }

        return 0
      } else {
        if (a.username > b.username) {
          return -1
        } else if (a.username < b.username) {
          return 1
        }

        return 0
      }
    }

    return data
  })
}

const onRowClick = (row: any) => {
  alert(`Row clicked:' ${JSON.stringify(row)}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRowLinksRouter = (row: Record<string, any>): RowLink => ({
  // using static route for demonstration purposes
  // but you can generate dynamic routes based on the row data
  to: { name: 'home' }, // pass a string to render the link as an anchor element instead of a router-link
  target: '_blank',
})

const onRowActionsToggle = ({ row, open }: RowActionsTogglePayload) => {
  console.log(`Row actions for row ${row.id} are ${open ? 'open' : 'closed'}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRowLinksAnchor = (row: Record<string, any>): RowLink => ({
  to: 'https://kongponents.konghq.com/',
  target: '_blank',
})

const selectedData = ref<TableViewData>([])
const onBulkActionsSelect = (data: TableViewData) => {
  console.log('Selected data:', data)
  selectedData.value = data
}

const getRowBulkAction = (data: Record<string, any>): RowBulkAction => {
  if (data.id === 2) {
    return false
  }

  if (data.id === 3) {
    return { enabled: false }
  }

  if (data.id === 4) {
    return {
      enabled: false,
      disabledTooltip: 'This row is disabled.',
    }
  }

  return true
}

const getRowExpandable = (row: Record<string, any>): boolean => row.id % 2 === 0

const getRowExpanded = (row: Record<string, any>): boolean => row.id % 4 === 0

const getRowOneTwoLink = (row: Record<string, any>): RowLink => {
  if (row.id === 1) {
    return getRowLinksRouter(row)
  }

  if (row.id === 2) {
    return getRowLinksAnchor(row)
  }

  return {}
}
</script>

<style lang="scss" scoped>
.k-table-data-sandbox {
  .horizontal-container {
    display: flex;
    flex-wrap: wrap;
    gap: $kui-space-50;
  }

  .username-link {
    text-transform: lowercase;
  }

  .resizable-table {
    max-width: 100%;
    min-width: 515px;
    overflow-x: auto;
    resize: horizontal;
  }
}
</style>
