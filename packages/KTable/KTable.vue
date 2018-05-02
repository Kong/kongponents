<template>
  <table class="table" :class="{hover: hasHover, striped: isStriped}">
    <thead>
      <tr>
        <template>
          <th :key="headerIndex" v-for="(column, headerIndex) in options.headers">
            <slot :name="`column-${column.key}`" :column="column" v-if="!column.hideLabel">
              {{ column.label ? column.label : column.key }}
            </slot>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr :key="rowIndex" v-for="(row, rowIndex) in options.data">
        <template>
          <td :key="headerIndex" v-for="(value, headerIndex) in options.headers">
            <slot 
              :name="value.key"
              :row="row"
              :rowKey="rowIndex"
              :rowValue="row[value.key]">
              {{row[value.key]}}
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
    options: {
      /**
       * Object containing data which creates rows and columns.
       * @param {Object} options - Options to initialize the component with
       * @param {Array} options.headers - Array of Objects defining Table Headers
       * @param {Array} options.data - Array of Objects defining column data
       */
      type: Object,
      required: true
    },
    isStriped: {
      /*
       * Adds zebra striping to the table rows
       */
      type: Boolean,
      default: false
    },
    hasHover: {
      /* 
       * Enables hover highlighting to table rows
       */
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 1px solid #dee2e6;
  text-align: left;
}

.table tbody + tbody {
  border-top: 1px solid #dee2e6;
}

.table .table {
  background-color: #fff;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
}

.table-borderless th,
.table-borderless td,
.table-borderless thead th,
.table-borderless tbody + tbody {
  border: 0;
}

.table.striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table.hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.075);
}
</style>
