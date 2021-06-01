/** 작업자 : 송민우 */
<template>
   <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <div id="threat_list" style="height: 650px; width: 100%;"></div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  mounted() {
    slick_start();
  },
  methods: {
    test(v) {
      console.log('test : ' , v);
    }
  }
}
let slickgrid = null;
const options = {
  editable: true,
  enableCellNavigation: true,
  asyncEditorLoading: false,
  enableAsyncPostRender: true,
  autoEdit: false,
  enableColumnReorder: false
}
function fmtName (row, cell, value, def, data) {
  // console.log(row);
  // console.log(cell);
  // console.log(value);
  // console.log(def);
  // console.log(data);
  let html = '';
  // html += `<a href="javascript:;" @click="test('${value}')">${value}</a>`;
  html += `<a href="javascript:;" onClick="test('${value}')">${value}</a>`;
  // return value;
  return html;
}
function slick_start() {
  let rows = [
    {
      name: "은복",
      contents: "안녕하세요."
    },
    {
      name: "호동",
      contents: "반갑습니다."
    }
  ];
  let columns = [
    {
      name: "이름",
      field: "name",
      id: "name",
      sortable: true,
      formatter: fmtName
    },
    {
      name: "내용",
      field: "contents",
      id: "contents",
      sortable: true
    }
  ];

  // console.log('o : ', options);
  slickgrid = new Slick.Grid("#threat_list", rows, columns, options);

  slickgrid.onClick.subscribe(function(e, args) {
    var dataItem = args.item;
    console.log('onClick : ', dataItem);
  });
}
</script>

<style>
/* .them--dark.slick-cell {
  color: blue;
} */
.slick-cell {
  color: black;
}
</style>