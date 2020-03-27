<template>
  <table
    :class="{'has-hover': hasHover, 'is-small': isSmall}"
    class="k-table">
    <thead>
      <tr>
        <template>
          <th
            v-for="(column, index) in options.headers"
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
        </template>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in options.data"
        :key="rowIndex"
        v-on="trlisteners(row, 'row')">
        <template>
          <td
            v-for="(value, index) in options.headers"
            :key="index"
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

  const type = typeof items[0][key]

  if (key !== previousKey) {
    if (type === 'string') {
      comparator = (a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1

        return 0
      }
    } else {
      comparator = (a, b) => a[key] - b[key]
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
      default: false
    },
    /**
     * Lowers overall table padding
     */
    isSmall: {
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
    }
  },

  computed: {
    tdlisteners (row) {
      return pluckListeners('cell:', this.$listeners)
    },

    trlisteners (entity) {
      return pluckListeners('row:', this.$listeners)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';

table.k-table {
  border-collapse: collapse;
}

.k-table {
  width: 100%;
  max-width: 100%;

  th,
  td {
    padding: var(--spacing-md, spacing(md));
    vertical-align: middle;
  }
  thead {
    border-top: 1px solid var(--KTableBorder, var(--grey92, color(grey-92)));
    border-bottom: 2px solid var(--KTableBorder, var(--grey92, color(grey-92)));
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

      .kong-icon {
        vertical-align: text-bottom;

        &.ascending {
          transform: rotate(90deg);
        }

        &.descending {
          transform: rotate(-90deg);
        }
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid var(--KTableBorder, var(--grey92, color(grey-92)));
    }
    td {
      color: var(--KTableColor, var(--tblack-70, color(tblack-70)));
      a {
        color: var(--blue-link, color(blue-link));
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
    background-color: var(--KTableHover, var(--blue-lightest, color(blue-lightest)));
  }
}

</style>
