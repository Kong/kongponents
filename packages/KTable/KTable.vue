<template>
  <table
    :class="{'has-hover': hasHover, 'is-small': isSmall}"
    class="k-table">
    <thead>
      <tr>
        <template>
          <th
            v-for="(column, index) in options.headers"
            :key="index">
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
        :key="rowIndex">
        <template>
          <td
            v-for="(value, index) in options.headers"
            :key="index">
            <slot
              :name="value.key"
              :row="row"
              :rowKey="rowIndex"
              :rowValue="row[value.key]">
              {{ row[value.key] }}
            </slot>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
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
