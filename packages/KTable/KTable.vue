<template>
  <table class="table" :class="{ hover: hasHover }">
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

<style scoped lang="scss">
@import "../../styleguide/globals.scss";
@import "../../styleguide/base.scss";

table {
  border-collapse: collapse;
}

.table {
  width: 100%;
  background-color: transparent;
  font-size: 15px;
  font-weight: normal;
  color: $black-200;
}

.table thead {
  border-top: 1px solid hsla(0, 0%, 0%, .08);
  border-bottom: 2px solid hsla(0, 0%, 0%, .1);
}
.table th {
  font-size: 13px;
  font-weight: 500;
  color: $black-300;
  text-align: left;
}

.table th,
.table td {
  padding: .5rem 1rem;
}

.table td {
  border-top: 1px solid hsla(0, 0%, 0%, .15);
  &:last-child {
    text-align: right;
  }
}

.table tbody tr:hover {
  background-color: hsla(205, 100%, 95%, .5);
}

.table td a {
  display: inline-block;
  padding: 8px 12px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  color: $blue-400;
  cursor: pointer;
  transition: all .075s ease-in-out;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: darken($blue-400, 20%);
  }
}

.table-bordered {
  border: 1px solid hsla(0, 0%, 0%, .15);
}
</style>
