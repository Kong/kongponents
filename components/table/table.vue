<template>
  <table class="table" :class="{hover: hasHover, striped: isStriped}">

    <thead>
      <tr>
        <template v-for="(column, index) in options.headers">
          <th>
            <slot :name="`column-${column.key}`" :column="column" v-if="!column.hideLabel">
              {{ column.label ? column.label : column.key }}
            </slot>
          </th>
        </template>
      </tr>
    </thead>
    
    <tbody>
      <tr v-for="row in options.data">
        <template v-for="(value, key) in options.headers">
          <td>
            <slot 
              :name="value.key"
              :row="row"
              :rowKey="value.key"
              :rowValue="row[value.key]"
              :item="{row, key: value.key, value: row[value.key] }">{{row[value.key]}}</slot>
          </td>
        </template>
      </tr>
    </tbody>

  </table>
</template>

<script>
  export default {
    name: 'g-table',
    props: {
      /**
        * Options is the data passed to the table to create rows and columns.
        * An Array named headers defines the Label, key and if the header is shown or not.
        * And an Array named data which defines the column data. 
       */
      options: Object,
      /**
        * Adds zebra striping to the table rows
       */
      isStriped: Boolean,
      /**
        * Enables hover highlighting to table rows
        */
      hasHover: Boolean
    }
  }
</script>

<style scope>
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
    border-bottom: 2px solid #dee2e6;
    text-align: left;
  }

  .table tbody + tbody {
    border-top: 2px solid #dee2e6;
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
