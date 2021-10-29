<template>
  <KSkeleton
    v-if="isLoading"
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
    v-else-if="!hasError && (!options || !options.data || !options.data.length) && (!data || !data.length)"
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
  <section v-else>
    <table
      :class="{'has-hover': hasHover, 'is-small': isSmall, 'is-clickable': isClickable, 'side-border': hasSideBorder}"
      class="k-table">
      <thead>
        <tr>
          <template>
            <th
              v-for="(column, index) in tableHeaders"
              :key="index"
              :class="{'sortable': !column.hideLabel && column.sortable, [sortOrder]: column.key === sortKey && !column.hideLabel}"
              @click="column.sortable && sortClickHandler(column.key)"
            >
              <slot
                :name="`column-${column.key}`"
                :column="column">
                <span
                  :class="{'sr-only': column.hideLabel}"
                >
                  {{ column.label ? column.label : column.key }}
                </span>
              </slot>
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
        </tr>
      </tbody>
    </table>
    <!-- Temp pagination until pagination component is complete -->
    <div class="pagination d-flex align-items-center justify-content-between">
      <div class="details type-md">
        Page {{ page }} of {{ totalPages }}
      </div>
      <div class="buttons">
        <KButton
          :disabled="page === 1"
          @click="paginationClickHandler('prev')"
        >
          Prev
        </KButton>
        <KButton
          :disabled="page === 10 || page === totalPages"
          class="ml-4"
          @click="paginationClickHandler('next')"
        >
          Next
        </KButton>
      </div>
    </div>
  </section>
</template>

<script>
import KEmptyState from '@kongponents/kemptystate/KEmptyState.vue'
import KSkeleton from '@kongponents/kskeleton/KSkeleton.vue'
import { useRequest, useDebounce } from '../../utils/utils'

import Vue from 'vue'
import VueCompositionAPI, { computed, defineComponent, onMounted, ref, watch } from '@vue/composition-api'

Vue.use(VueCompositionAPI)

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

export default defineComponent({
  name: 'KTable',
  components: {
    KEmptyState,
    KSkeleton
  },
  props: {
    /**
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
     * Lowers overall table padding
     */
    isSmall: {
      type: Boolean,
      default: false
    },
    /**
     * Adds hover and non selectable styling
     */
    isClickable: {
      type: Boolean,
      default: false
    },
    /**
     * the sort order for the table.
     */
    // sortOrder: {
    //   type: String,
    //   default: 'ascending',
    //   validator: function (value) {
    //     return ['ascending', 'descending'].indexOf(value) > -1
    //   }
    // },
    /**
     * the key of the column that's currently being sorted
     */
    // sortKey: {
    //   type: String,
    //   default: ''
    // },
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
      default: true
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
     * A prop to pass in a page size number for server-side pagination
     */
    pageSize: {
      type: Number,
      default: 10
    },
    /**
     * A prop to pass in a an array of headers for the table
     */
    headers: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const data = ref([])
    const tableHeaders = ref([])
    const sortKey = ref('')
    const sortOrder = ref('desc')
    const page = ref(1)
    const total = ref(10)

    const tdlisteners = computed(() => {
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
      const { data: fetcherData, total: totalCount } = await props.fetcher(
        props.pageSize,
        page.value,
        query.value || props.searchInput,
        sortKey.value,
        sortOrder.value
      )

      data.value = fetcherData
      total.value = totalCount
    }

    const initData = async () => {
      if (props.fetcher) {
        fetchData()
      } else if (props.options && props.options.data && props.options.data.length) {
        data.value = props.options.data
      }

      if (props.headers && props.headers.length) {
        tableHeaders.value = props.headers
      } else if (props.options && props.options.headers && props.options.headers.length) {
        tableHeaders.value = props.options.headers
      }
    }

    const { query, search } = useDebounce('', 350)
    const { revalidate } = useRequest(
      () => props.fetcher && `k-table_${Math.floor(Math.random() * 1000)}`,
      () => fetchData(),
      { revalidateOnFocus: false }
    )

    const sortClickHandler = (key) => {
      sortKey.value = key
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'

      revalidate()
    }

    const paginationClickHandler = (direction) => {
      if (direction === 'next' && page.value < 10) {
        page.value++
      } else if (direction === 'prev' && page.value > 1) {
        page.value--
      }
    }

    // TEMP
    const totalPages = computed(() => Math.ceil(total.value / props.pageSize))

    watch(() => props.searchInput, (val) => {
      search(val)
    }, { immediate: true })

    watch(() => [page.value, query.value], () => {
      revalidate()
    }, { immediate: true })

    onMounted(() => {
      initData()
    })

    return {
      data,
      page,
      paginationClickHandler,
      sortClickHandler,
      sortKey,
      sortOrder,
      tableHeaders,
      tdlisteners,
      total,
      totalPages,
      trlisteners
    }
  }
})
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';
.k-table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: var(--spacing-md, spacing(md));
    vertical-align: middle;
  }
  thead {
    border-top: 1px solid var(--KTableBorder, var(--grey-200, color(grey-200)));
    border-bottom: 2px solid var(--KTableBorder, var(--grey-200, color(grey-200)));
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

      &.sortable {
        cursor: pointer;

        &.ascending {
          &:before {
            content: '\2191';
            margin-left: -12px;
          }
        }

        &.descending {
          &:before {
            content: '\2193';
            margin-left: -12px;
          }
        }
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid var(--KTableBorder, var(--grey92, color(grey-200)));
    }
    td {
      color: var(--KTableColor, var(--black-70, color(black-70)));
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
  &.is-small {
    th {
      padding: var(--spacing-xs, spacing(xs)) var(--spacing-sm, spacing(sm));
    }
    td {
      padding: var(--spacing-sm, spacing(sm));
    }
  }
  &.has-hover tbody tr:hover {
    background-color: var(--KTableHover, var(--steel-100, color(steel-100)));
  }
  &.is-clickable {
    cursor: pointer;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }
  &.side-border {
    border-collapse: separate;
    border-spacing: 0 4px;

    tbody tr {
      border: none;
      box-shadow: -2px 0 0 var(--KTableBorder, var(--steel-200, color(steel-200)));
    }

    &.has-hover {
      tbody tr:hover {
        box-shadow: -2px 0 0 var(--KTableBorder, var(--steel-300, color(steel-300)));
      }
    }
  }
}
</style>
