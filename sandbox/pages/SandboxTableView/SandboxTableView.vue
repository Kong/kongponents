<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTableView"
  >
    <div class="k-table-view-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="rowHover & maxHeight">
        <KComponent
          v-slot="{ data }"
          :data="{ tableKey: 0, tableRowHover: false, initialSorting: true }"
        >
          <div class="horizontal-container">
            <KInputSwitch
              v-model="data.tableRowHover"
              label="Has hover"
            />
            <KInputSwitch
              v-model="data.initialSorting"
              label="Initial sorting"
              @change="($event) => onSortableTableInitialSortingChange($event, data)"
            />
          </div>

          <div class="resizable-table">
            <KTableView
              :key="data.tableKey"
              :data="data.tableEmptyState ? [] : sortedData"
              :headers="headers(false, true)"
              max-height="300"
              :pagination-attributes="{ totalCount: sortedData.length }"
              :row-hover="data.tableRowHover"
              :table-preferences="data.initialSorting ? sortableTableDefaultSort : undefined"
              @sort="sortData"
            >
              <template #action-items>
                <SandboxTableViewActions />
              </template>
            </KTableView>
          </div>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="All rows in this table are clickable."
        title="loading & resizeColumns & Empty State Props & Error State Props"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ tableLoadingState: false, tableErrorState: false, tableEmptyState: false }"
        >
          <div class="horizontal-container">
            <KInputSwitch
              v-model="data.tableLoadingState"
              label="Loading state"
            />
            <KInputSwitch
              v-model="data.tableErrorState"
              label="Error state"
            />
            <KInputSwitch
              v-model="data.tableEmptyState"
              label="Empty state"
            />
          </div>

          <KTableView
            :data="data.tableEmptyState ? [] : tableData"
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
            :headers="headers(true)"
            :loading="data.tableLoadingState"
            :pagination-attributes="{ totalCount: tableData.length }"
            resize-columns
            @row:click="(_event: any, row: any) => onRowClick(row)"
          >
            <template #action-items>
              <SandboxTableViewActions />
            </template>
          </KTableView>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rowLink (router-link)">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
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
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rowLink (anchor)">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
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
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rowExpandable & rowExpanded & tooltipTarget">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
          :row-expandable="getRowExpandable"
          :row-expanded="getRowExpanded"
          tooltip-target="#teleport-target"
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
        </KTableView>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        title="column header & column tooltip & cell"
      >
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
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
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="toolbar">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
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
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="error-state">
        <KTableView
          :data="tableData"
          error
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
        >
          <template #error-state>
            <KEmptyState
              action-button-text="Slotted error state action"
              icon-variant="error"
              message="Slotted error state message"
              title="Slotted error state title"
            />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state">
        <KTableView
          :data="[]"
          :headers="headers()"
        >
          <template #empty-state>
            <KEmptyState
              action-button-text="Slotted empty state action"
              message="Slotted empty state message"
              title="Slotted empty state title"
            />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state-action-icon">
        <KTableView
          :data="[]"
          empty-state-action-message="Empty state action"
          :headers="headers()"
        >
          <template #empty-state-action-icon>
            <AddIcon />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="bulk-actions">
        <KTableView
          :data="paginatedData"
          :headers="headers(false, false, true)"
          :pagination-attributes="{ totalCount: basicPaginatedData.length, pageSizes: [5, 10] }"
          :row-key="({ id }: Record<string, any>) => String(id)"
          @page-change="onPageChange"
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
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="row-expanded">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
          :row-expandable="() => true"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded="{ nestedHeaders, columnWidths }">
            <KTableView
              :data="tableData"
              :headers="nestedHeaders"
              hide-headers
              nested
              :pagination-attributes="{ totalCount: tableData.length }"
              :table-preferences="{ columnWidths }"
            >
              <template #action-items>
                <SandboxTableViewActions />
              </template>
            </KTableView>
          </template>
        </KTableView>
      </SandboxSectionComponent>

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent title="Bulk Actions">
        <div class="resizable-table">
          <KTableView
            :data="paginatedData"
            :headers="headers(true, false, true)"
            :pagination-attributes="{ totalCount: basicPaginatedData.length, pageSizes: [5, 10] }"
            resize-columns
            :row-bulk-action-enabled="getRowBulkAction"
            :row-key="({ id }: Record<string, any>) => String(id)"
            @page-change="onPageChange"
            @page-size-change="onPageSizeChange"
            @row-select="onBulkActionsSelect"
          >
            <template #bulk-action-items>
              <SandboxTableViewActions :count="selectedData.length" />
            </template>
            <template #action-items>
              <SandboxTableViewActions />
            </template>
          </KTableView>
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="Bulk Actions & Expandable Rows">
        <div class="resizable-table">
          <KTableView
            :data="paginatedData"
            :headers="headers(true, false, true)"
            :pagination-attributes="{ totalCount: basicPaginatedData.length, pageSizes: [5, 10] }"
            resize-columns
            :row-bulk-action-enabled="getRowBulkAction"
            :row-expandable="() => true"
            :row-key="({ id }: Record<string, any>) => String(id)"
            @page-change="onPageChange"
            @page-size-change="onPageSizeChange"
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
          </KTableView>
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="Bulk Actions & Nested Table">
        <KTableView
          :data="paginatedData"
          :headers="headers(true, false, true)"
          :pagination-attributes="{ totalCount: basicPaginatedData.length, pageSizes: [5, 10] }"
          resize-columns
          :row-bulk-action-enabled="getRowBulkAction"
          :row-expandable="() => true"
          :row-key="({ id }: Record<string, any>) => String(id)"
          @page-change="onPageChange"
          @page-size-change="onPageSizeChange"
          @row-select="onBulkActionsSelect"
        >
          <template #bulk-action-items>
            <SandboxTableViewActions :count="selectedData.length" />
          </template>
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded="{ nestedHeaders, columnWidths }">
            <KTableView
              :data="tableData"
              :headers="nestedHeaders"
              hide-headers
              nested
              :pagination-attributes="{ totalCount: tableData.length }"
              :table-preferences="{ columnWidths }"
            >
              <template #action-items>
                <SandboxTableViewActions />
              </template>
            </KTableView>
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="In both parent and nested tables, the first two rows are links and the rest are clickable."
        title="Nested Table With Row Links & Row Cliks"
      >
        <div class="resizable-table">
          <KTableView
            :data="tableData"
            :headers="headers(true)"
            :pagination-attributes="{ totalCount: tableData.length }"
            resize-columns
            :row-expandable="() => true"
            :row-link="getRowOneTwoLink"
            @row:click="(_event: any, row: any) => onRowClick(row)"
          >
            <template #action-items>
              <SandboxTableViewActions />
            </template>
            <template #row-expanded="{ nestedHeaders, columnWidths }">
              <KTableView
                :data="tableData"
                :headers="nestedHeaders"
                hide-headers
                nested
                :pagination-attributes="{ totalCount: tableData.length }"
                :row-link="getRowOneTwoLink"
                :table-preferences="{ columnWidths }"
                @row:click="(_event: any, row: any) => onRowClick(row)"
              >
                <template #action-items>
                  <SandboxTableViewActions />
                </template>
              </KTableView>
            </template>
          </KTableView>
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="Nested Table With It's Own Header">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
          :row-expandable="() => true"
        >
          <template #action-items>
            <SandboxTableViewActions />
          </template>
          <template #row-expanded>
            <KTableView
              :data="tableData"
              :headers="headers()"
              nested
              :pagination-attributes="{ totalCount: tableData.length }"
            >
              <template #action-items>
                <SandboxTableViewActions />
              </template>
            </KTableView>
          </template>
        </KTableView>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, ref } from 'vue'
import SandboxTitleComponent from '../../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../../components/SandboxSectionComponent.vue'
import type { TableViewHeader, TableViewData, TableSortPayload, RowLink, PageChangeData, PageSizeChangeData, RowBulkAction, RowActionsTogglePayload, TablePreferences } from '@/types'
import SandboxTableViewActions from './SandboxTableViewActions.vue'
import { AddIcon } from '@kong/icons'

const headers = (hidable: boolean = false, sortable: boolean = false, bulkActions: boolean = false): TableViewHeader[] => {
  return [
    { key: 'actions', label: 'Row actions' },
    { key: 'name', label: 'Full Name' },
    { key: 'username', label: 'Username', tooltip: sortable ? undefined : 'Column with a tooltip.', sortable },
    { key: 'email', label: 'Email', hidable },
    ...(bulkActions ? [{ key: 'bulkActions', label: 'Bulk actions' }] : []),
  ]
}

const tableData: TableViewData = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
]

const sortedData = ref<TableViewData>(tableData)

const onRowClick = (row: any) => {
  alert(`Row clicked:' ${JSON.stringify(row)}`)
}

const sortableTableDefaultSort: TablePreferences = { sortColumnKey: 'username', sortColumnOrder: 'asc' }
const onSortableTableInitialSortingChange = (value: boolean, wrapperData: any) => {
  if (value) {
    sortData({ prevKey: '', ...sortableTableDefaultSort } as TableSortPayload)
  } else {
    sortedData.value = tableData
  }
  wrapperData.tableKey++
}

const sortData = (sortData: TableSortPayload): void => {
  const data = [...tableData]
  const { sortColumnKey, sortColumnOrder } = sortData

  data.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (sortColumnKey === 'username') {
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

    return 0
  })

  sortedData.value = data
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

const extraRecords: TableViewData = [
  {
    id: 11,
    name: 'Chris Lo',
    username: 'Krislow',
    email: 'dj@kris.low',
  },
  {
    id: 12,
    name: 'Vitaliy Yarmak',
    username: 'Tamarack',
    email: 'Right@sail.xyz',
  },
]
const basicPaginatedData: TableViewData = [...tableData, ...extraRecords]
const paginatedPageSize = ref<number>(5)
const paginatedData = ref<TableViewData>(basicPaginatedData.slice(0, paginatedPageSize.value))
const onPageChange = ({ page }: PageChangeData) => {
  if (page === 1) {
    paginatedData.value = basicPaginatedData.slice(0, paginatedPageSize.value)
  } else {
    paginatedData.value = basicPaginatedData.slice((paginatedPageSize.value * (page - 1)), (paginatedPageSize.value * (page - 1)) + paginatedPageSize.value)
  }
}
const onPageSizeChange = ({ pageSize }: PageSizeChangeData) => {
  paginatedPageSize.value = pageSize
}

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

onBeforeMount(() => {
  // This is just to ensure that the sortable table is sorted by default
  sortData({ prevKey: '', ...sortableTableDefaultSort } as TableSortPayload)
})
</script>

<style lang="scss" scoped>
.k-table-view-sandbox {
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
    overflow-x: auto;
    resize: both;
  }
}
</style>
