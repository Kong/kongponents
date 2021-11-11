<template>
  <KSkeleton
    v-if="!testMode && (isTableLoading || isLoading) && !hasError"
    :delay-milliseconds="0"
    type="table"
  />
  <KEmptyState
    v-else-if="hasError"
    :cta-is-hidden="!errorStateActionMessage || !errorStateActionRoute"
    :icon="errorStateIcon || ''"
    :is-error="true"
    :icon-color="errorStateIconColor"
    :icon-size="errorStateIconSize"
  >
    <template v-slot:title>{{ errorStateTitle }}</template>
    <template v-slot:message>{{ errorStateMessage }}</template>
    <template v-slot:cta>
      <KButton
        v-if="errorStateActionMessage && errorStateActionRoute"
        :to="errorStateActionRoute"
        appearance="primary"
      >
        {{ errorStateActionMessage }}
      </KButton>
    </template>
  </KEmptyState>
  <KEmptyState
    v-else-if="!hasError && (!testMode && !isTableLoading && !isLoading) && (data && !data.length)"
    :cta-is-hidden="!emptyStateActionMessage || !emptyStateActionRoute"
    :icon="emptyStateIcon || ''"
    :icon-color="emptyStateIconColor"
    :icon-size="emptyStateIconSize"
  >
    <template v-slot:title>{{ emptyStateTitle }}</template>
    <template v-slot:message>{{ emptyStateMessage }}</template>
    <template v-slot:cta>
      <KButton
        v-if="emptyStateActionMessage && emptyStateActionRoute"
        :to="emptyStateActionRoute"
        appearance="primary"
      >
        {{ emptyStateActionMessage }}
      </KButton>
    </template>
  </KEmptyState>
  <section
    v-else
    class="k-table-wrapper"
    @scroll.passive="scrollHandler"
  >
    <table
      :class="{'has-hover': hasHover, 'is-clickable': isClickable, 'side-border': hasSideBorder}"
      class="k-table">
      <thead :class="{ 'is-scrolled': isScrolled }">
        <tr :class="{ 'is-scrolled': isScrolled }">
          <template>
            <th
              v-for="(column, index) in tableHeaders"
              :key="index"
              :class="{
                'sortable': !column.hideLabel && column.sortable,
                'active-sort': !column.hideLabel && column.sortable && column.key === sortColumnKey,
                [sortColumnOrder]: column.key === sortColumnKey && !column.hideLabel,
                'is-scrolled': isScrolled
              }"
              @click="column.sortable && sortClickHandler(column.key)"
            >
              <span class="d-flex align-items-center">
                <slot
                  :name="`column-${column.key}`"
                  :column="column">
                  <span
                    :class="{'sr-only': column.hideLabel}"
                  >
                    {{ column.label ? column.label : column.key }}
                  </span>
                </slot>
                <KIcon
                  v-if="!column.hideLabel && column.sortable"
                  class="caret ml-2"
                  color="var(--KTableColor, var(--black-70, color(black-70)))"
                  width="12"
                  height="12"
                  icon="chevronDown"
                />
              </span>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          v-bind="rowAttrs(row)"
          v-on="trlisteners(row, 'row')"
        >
          <a
            v-if="isClickable"
            href="#"
            class="k-table-row-click"
            @click.prevent="handleRowClick(row)">
            <template>
              <td
                v-for="(value, index) in tableHeaders"
                :key="index"
                v-bind="cellAttrs({ headerKey: value.key, row, rowIndex, colIndex: index })"
                v-on="tdlisteners(row[value.key], 'cell')"
              >
                <slot
                  :name="value.key"
                  :row="row"
                  :rowKey="rowIndex"
                  :rowValue="row[value.key]">{{ row[value.key] }}</slot>
              </td>
            </template>
          </a>
          <template v-else>
            <td
              v-for="(value, index) in tableHeaders"
              :key="index"
              v-bind="cellAttrs({ headerKey: value.key, row, rowIndex, colIndex: index })"
              v-on="tdlisteners(row[value.key], 'cell')"
            >
              <slot
                :name="value.key"
                :row="row"
                :rowKey="rowIndex"
                :rowValue="row[value.key]">{{ row[value.key] }}</slot>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <KPagination
      v-if="fetcher"
      :total-count="total"
      :current-page="page"
      :neighbors="paginationNeighbors"
      :page-sizes="paginationPageSizes"
      class="pa-1"
      @pageChanged="pageChangeHandler"
      @pageSizeChanged="pageSizeChangeHandler"
    />
  </section>
</template>

<script>
import KEmptyState from '@kongponents/kemptystate/KEmptyState.vue'
import KSkeleton from '@kongponents/kskeleton/KSkeleton.vue'
import KPagination from '@kongponents/kpagination/KPagination.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'
import { clientSideSorter, useDebounce, useRequest } from '../../utils/utils'

import Vue from 'vue'
import VueCompositionAPI, { computed, defineComponent, onMounted, ref, watch } from '@vue/composition-api'

import KButton from '@kongponents/kbutton/KButton.vue'

Vue.use(VueCompositionAPI)

/**
 * @deprecated
 * @param {String} key - the current key to sort by
 * @param {String} previousKey - the previous key used to sort by
 * @param {String} sortOrder - either ascending or descending
 * @param {Array} items - the list of items to sort
 * @return {Object} an object containing the previousKey and sortOrder
 */
export const defaultSorter = (key, previousKey, sortOrder, items) => {
  return clientSideSorter(key, previousKey, sortOrder, items)
}

export default defineComponent({
  name: 'KTable',
  components: {
    KEmptyState,
    KSkeleton,
    KPagination,
    KIcon,
    KButton
  },
  props: {
    /**
     * @deprecated in favor of the "fetcher" prop
     * Object containing data which creates rows and columns.
     * @param {Object} options - Options to initialize the component with
     * @param {Array} options.headers - Array of Objects defining Table Headers
     * @param {Array} options.data - Array of Objects defining column data
     */
    options: {
      type: Object,
      required: false
    },
    /**
     * Enables hover highlighting to table rows
     */
    hasHover: {
      type: Boolean,
      default: true
    },
    /**
     * Adds hover and non selectable styling
     */
    isClickable: {
      type: Boolean,
      default: false
    },
    /**
     * @deprecated
     * the sort order for the table.
     */
    sortOrder: {
      type: String,
      default: '',
      validator: function (value) {
        return ['ascending', 'descending', ''].indexOf(value) > -1
      }
    },
    /**
     * @deprecated
     * the key of the column that's currently being sorted
     */
    sortKey: {
      type: String,
      default: ''
    },
    /**
     * A function that conditionally specifies row attributes on each row
     */
    rowAttrs: {
      type: Function,
      default: () => ({})
    },
    /**
     * A prop that enables a side border with a themable color to it.
     */
    hasSideBorder: {
      type: Boolean,
      default: false
    },
    /**
     * A function that conditionally specifies cell attributes
     */
    cellAttrs: {
      type: Function,
      default: () => ({})
    },
    /**
     * A prop that enables a loading skeleton
     */
    isLoading: {
      type: Boolean,
      default: false
    },
    /**
     * A prop to pass in a custom empty state title
     */
    emptyStateTitle: {
      type: String,
      default: 'No Data'
    },
    /**
     * A prop to pass in a custom empty state message
     */
    emptyStateMessage: {
      type: String,
      default: 'There is no data to display.'
    },
    /**
     * A prop to pass in a custom empty state action route
     */
    emptyStateActionRoute: {
      type: Object | String,
      default: ''
    },
    /**
     * A prop to pass in a custom empty state action message
     */
    emptyStateActionMessage: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a custom empty state icon
     */
    emptyStateIcon: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a color for the empty state icon
     */
    emptyStateIconColor: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a size for the empty state icon
     */
    emptyStateIconSize: {
      type: String,
      default: '50'
    },
    /**
     * A prop that enables the error state
     */
    hasError: {
      type: Boolean,
      default: false
    },
    /**
     * A prop to pass in a custom error state title
     */
    errorStateTitle: {
      type: String,
      default: 'An error occurred'
    },
    /**
     * A prop to pass in a custom error state message
     */
    errorStateMessage: {
      type: String,
      default: 'Data cannot be displayed due to an error.'
    },
    /**
     * A prop to pass in a custom error state action route
     */
    errorStateActionRoute: {
      type: Object | String,
      default: ''
    },
    /**
     * A prop to pass in a custom error state action message
     */
    errorStateActionMessage: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a custom error state icon
     */
    errorStateIcon: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a color for the error state icon
     */
    errorStateIconColor: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a size for the error state icon
     */
    errorStateIconSize: {
      type: String,
      default: '50'
    },
    /**
     * A prop to pass in a fetcher function to enable server-side search, sort
     * and pagination
     */
    fetcher: {
      type: Function,
      default: undefined
    },
    /**
     * A prop to pass in a search string for server-side search
     */
    searchInput: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a an array of headers for the table
     */
    headers: {
      type: Array,
      default: () => []
    },
    /**
     * A prop to pass in a an object of intial params for the initial fetcher function call
     */
    initialFetcherParams: {
      type: Object,
      default: null
    },
    /**
     * A prop to pass in a the number of pagination neighbors used by the pagination component
     */
    paginationNeighbors: {
      type: Number,
      default: 1
    },
    /**
     * A prop to pass in an array of page sizes used by the pagination component
     */
    paginationPageSizes: {
      type: Array,
      default: () => ([15, 25, 50, 75, 100])
    },
    /**
     * A prop to pass the total number of items in the set for the pagination text
     */
    paginationTotalItems: {
      type: Number,
      default: null
    },
    /**
     * Use to avoid loading state in tests
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const defaultFetcherProps = {
      pageSize: 15,
      page: 1,
      query: '',
      sortColumnKey: '',
      sortColumnOrder: ''
    }

    const data = ref([])
    const tableHeaders = ref([])
    const total = ref(0)
    const isScrolled = ref(false)
    const isTableLoading = ref(true)
    const page = ref(1)
    const pageSize = ref(15)
    const filterQuery = ref('')
    const sortColumnKey = ref('')
    const sortColumnOrder = ref('desc')

    /**
     * Grabs listeners from this.$listeners matching a prefix to attach the
     * event that is dynamic. e.g. `v-on:cell:click`, `@row:focus` etc.
     * @param {String} prefix - event listener prefix e.g. `row:`, `cell:`
     * @param {any} $listeners - this.$listeners on the vue instance to pluck from
     * @returns {Function} - returns a function that can pass an entity to the
                             listener callback function.
    */
    function pluckListeners (prefix, $listeners) {
      return (entity, type) =>
        Object.keys($listeners).reduce((acc, curr) => {
          if (curr.indexOf(prefix) === 0) {
            const parts = curr.split(prefix)

            acc[parts[1]] = (e) => $listeners[curr](e, entity, type)
          }

          return acc
        }, {})
    }

    const tdlisteners = computed(() => { // TODO: can we replace with something else??
      return pluckListeners('cell:', ctx.listeners)
    })

    const trlisteners = computed(() => {
      return (entity, type) => {
        const pluckedListeners = pluckListeners('row:', ctx.listeners)(entity, type)

        return {
          ...pluckedListeners,
          click (e) {
            if (e.target.tagName === 'TD' && pluckedListeners['click']) {
              pluckedListeners['click'](e, entity, type)
            }
          }
        }
      }
    })

    const fetchData = async () => {
      isTableLoading.value = true
      const searchInput = props.searchInput
      const res = await props.fetcher({
        pageSize: pageSize.value,
        page: page.value,
        query: searchInput || filterQuery.value,
        sortColumnKey: sortColumnKey.value,
        sortColumnOrder: sortColumnOrder.value
      })

      data.value = res.data
      total.value = props.paginationTotalItems || res.total || res.data.length
      isTableLoading.value = false

      return res
    }

    const initData = async () => {
      // set up fetcher props
      const fetcherParams = {
        ...defaultFetcherProps,
        ...props.initialFetcherParams
      }

      page.value = fetcherParams.page
      pageSize.value = fetcherParams.pageSize
      filterQuery.value = fetcherParams.query
      sortColumnKey.value = fetcherParams.sortColumnKey
      sortColumnOrder.value = fetcherParams.sortColumnOrder

      // get data
      if (props.fetcher) {
        await fetchData()
      } else if (props.options && props.options.data && props.options.data.length) {
        data.value = props.options.data
        total.value = props.options.data.length
      }

      // get table headers
      if (props.headers && props.headers.length) {
        tableHeaders.value = props.headers
      } else if (props.options && props.options.headers && props.options.headers.length) {
        tableHeaders.value = props.options.headers
      }

      if (props.isLoading === false) {
        isTableLoading.value = false
      }
    }

    const { query, search } = useDebounce('', 350)
    const { revalidate } = useRequest(
      () => props.fetcher && `k-table_${Math.floor(Math.random() * 1000)}`,
      () => fetchData(),
      { revalidateOnFocus: false }
    )

    const sortClickHandler = (key) => {
      page.value = 1

      if (sortColumnKey.value) {
        if (key === sortColumnKey.value) {
          if (sortColumnOrder.value === 'asc') {
            sortColumnOrder.value = 'desc'
          } else {
            sortColumnOrder.value = 'asc'
          }
        } else {
          sortColumnKey.value = key
          sortColumnOrder.value = 'desc'
        }
      } else {
        sortColumnKey.value = key
      }

      // Use deprecated sort function to sort data passed in via
      // the deprecated options.data prop
      if (props.options && props.options.data) {
        defaultSorter(key, sortColumnKey.value, sortColumnOrder.value, data.value)
      }

      revalidate()
    }

    const pageChangeHandler = ({ page: newPage }) => {
      page.value = newPage
    }

    const pageSizeChangeHandler = ({ pageSize: newPageSize }) => {
      pageSize.value = newPageSize
    }

    const scrollHandler = (event) => {
      if (event && event.target && event.target.scrollTop) {
        if (event.target.scrollTop > 1) {
          isScrolled.value = true
        } else if (event.target.scrollTop) {
          isScrolled.value = !isScrolled.value
        }
      }
    }

    const handleRowClick = (item) => {
      ctx.emit('row-clicked', item)
    }

    watch(() => props.searchInput, (newValue) => {
      search(newValue)
    }, { immediate: true })

    watch(() => [query.value, page.value, pageSize.value], () => {
      revalidate()
    }, { immediate: true })

    onMounted(() => {
      initData()
    })

    return {
      data,
      isScrolled,
      isTableLoading,
      page,
      pageChangeHandler,
      pageSizeChangeHandler,
      pageSize,
      scrollHandler,
      sortClickHandler,
      sortColumnKey,
      sortColumnOrder,
      handleRowClick,
      tableHeaders,
      tdlisteners,
      total,
      trlisteners
    }
  }
})
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';

.k-table-wrapper {
  width: 100%;
  // max-height: 400px;
  overflow: auto;
}

.k-table {
  width: 100%;
  max-width: 100%;
  margin-top: 0;

  th,
  td {
    padding: var(--spacing-sm, spacing(sm)) var(--spacing-md, spacing(md));
    vertical-align: middle;
    white-space: nowrap;
  }
  thead {
    height: 60px;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    border-bottom: 1px solid var(--KTableBorder, var(--grey-200, color(grey-200)));

    &.is-scrolled {
      border-bottom: none;
    }

    tr {
      position: relative;

      &:after {
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        content: '';
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        box-shadow: none;
        left: 0;
      }

      &.is-scrolled {
        border-bottom: none;

        &:after {
          box-shadow:
            0px 0.2px 0.6px rgba(0, 0, 0, 0.031),
            0px 0.6px 1.8px rgba(0, 0, 0, 0.045),
            0px 1.5px 4.2px rgba(0, 0, 0, 0.059),
            0px 5px 14px rgba(0, 0, 0, 0.09)
          ;
          opacity: 1;
          transition: opacity 0.2s ease-in-out;
        }
      }
    }

    th {
      padding: var(--spacing-sm, spacing(sm)) var(--spacing-md, spacing(md));
      text-align: left;
      font-size: var(--KTableHeaderSize, var(--type-sm, type(sm)));
      font-weight: 500;

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .caret {
        transform: rotate(0deg);
        transition: 250ms ease;
      }

      &.sortable {
        cursor: pointer;

        &.asc .caret {
          transform: rotate(-180deg);
          transition: 250ms ease;
        }

        &.desc .caret {
          transition: 250ms ease;
        }
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid var(--KTableBorder, var(--grey-200, color(grey-200)));
      height: 44px;
    }
    td {
      color: var(--KTableColor, var(--black-70, color(black-70)));
      white-space: nowrap;

      a {
        color: var(--blue-500, color(blue-500));
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
      button,
      .k-button {
        margin-top: calc(-1 * var(--KButtonPaddingY, var(--spacing-xs)));
        margin-bottom: calc(-1 * var(--KButtonPaddingY, var(--spacing-xs)));
      }
    }
  }

  // Variants
  &.has-hover {
     tbody tr:hover {
        background-color: var(--KTableHover, var(--blue-100, color(blue-100)));
      }
  }

  &.is-clickable {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .k-table-row-click {
      font-weight: inherit;
      color: var(--KTableColor, var(--black-70, color(black-70)));;
      text-decoration: inherit;
      display: contents;
      vertical-align: inherit;
    }
  }
  &.side-border {
    border-collapse: separate;
    border-spacing: 0 2px;

    tbody tr {
      border-bottom: none;
    }

    tbody tr td:first-child {
      border-left: 3px solid var(--KTableBorder, var(--steel-200, color(steel-200)));
    }

    &.has-hover {
      tbody tr:hover td:first-child {
        border-left: 3px solid var(--KTableBorder, var(--steel-300, color(steel-300)));
      }
    }
  }
}
</style>
