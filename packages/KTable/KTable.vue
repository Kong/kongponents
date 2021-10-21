<template>
  <table
    :class="{'has-hover': hasHover, 'is-small': isSmall, 'is-clickable': isClickable, 'side-border': hasSideBorder}"
    class="k-table">
    <thead>
      <tr>
        <template v-for="(column, index) in options.headers">
          <th
            v-if="!column.hideLabel"
            :key="index"
            :class="!column.hideLabel && `${column.sortable ? 'sortable' : ''}${column.key === sortKey ? ' ' + sortOrder : ''}`"
            @click="column.sortable && $emit('sort', column.key, sortOrder)"
          >
            <slot
              v-if="!column.hideLabel"
              :name="`column-${column.key}`"
              :column="column">
              {{ column.label ? column.label : column.key }}
            </slot>
          </th>
          <td
            v-else
            :key="index"
          />
        </template>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in options.data"
        :key="rowIndex"
        v-bind="rowAttrs(row)"
        v-on="trlisteners(row, 'row')">
        <template>
          <td
            v-for="(value, index) in options.headers"
            :key="index"
            v-bind="cellAttrs({ headerKey: value.key, row, rowIndex, colIndex: index })"
            v-on="tdlisteners(row[value.key], 'cell')">
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
</template>

<script>
/**
 * @param {String} key - the current key to sort by
 * @param {String} previousKey - the previous key used to sort by
 * @param {String} sortOrder - either ascending or descending
 * @param {Array} items - the list of items to sort
 * @return {Object} an object containing the previousKey and sortOrder
 */
export const defaultSorter = (key, previousKey, sortOrder, items) => {
  let comparator = null
  const numberComparator = (a, b) => a && b && a - b
  const stringComparator = (a, b) => a.localeCompare(b)

  if (key !== previousKey) {
    comparator = (a, b) => {
      const transformer = (val) => {
        if (val === undefined || val === null) {
          return ''
        }

        if (typeof val === 'number') {
          return val
        }

        if (Array.isArray(val) && val.length && typeof val[0] === 'number') {
          return val[0]
        }

        return String(val)
      }

      const newValA = transformer(a[key])
      const newValB = transformer(b[key])

      switch (typeof newValA) {
        case 'number':
          return numberComparator(newValA, newValB)
        default:
          return stringComparator(newValA, newValB)
      }
    }

    items.sort(comparator)
    previousKey = key
    sortOrder = 'ascending'
  } else {
    items.reverse()
    if (sortOrder === 'descending') {
      sortOrder = 'ascending'
    } else {
      sortOrder = 'descending'
    }
  }

  return { previousKey, sortOrder }
}

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

export default {
  name: 'KTable',
  props: {
    /**
     * Object containing data which creates rows and columns.
     * @param {Object} options - Options to initialize the component with
     * @param {Array} options.headers - Array of Objects defining Table Headers
     * @param {Array} options.data - Array of Objects defining column data
     */
    options: {
      type: Object,
      required: true
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
    sortOrder: {
      type: String,
      default: 'ascending',
      validator: function (value) {
        return ['ascending', 'descending'].indexOf(value) > -1
      }
    },
    /**
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
      default: true
    },
    /**
     * A function that conditionally specifies cell attributes
     */
    cellAttrs: {
      type: Function,
      default: () => ({})
    }
  },

  computed: {
    tdlisteners () {
      return pluckListeners('cell:', this.$listeners)
    },

    trlisteners () {
      return (entity, type) => {
        const pluckedListeners = pluckListeners('row:', this.$listeners)(entity, type)

        return {
          ...pluckedListeners,
          click (e) {
            if (e.target.tagName === 'TD' && pluckedListeners['click']) {
              pluckedListeners['click'](e, entity, type)
            }
          }
        }
      }
    }
  }
}
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
