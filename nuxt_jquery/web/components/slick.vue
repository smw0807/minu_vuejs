<template>
   <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="12" lg="2">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="s_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="s_date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                id="test"
              ></v-text-field>
            </template>
            <v-date-picker v-model="s_date" no-title scrollable :max="e_date">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="s_date_search(s_date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        
        <!-- <v-col cols="12" lg="2">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="e_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="e_date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="e_date" no-title scrollable :min="s_date" :max="date">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="e_date_search(e_date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col> -->
        
      </v-row>
    </v-card-title>
    <v-card-text>
      <div id="slickgrid" style="height: 650px"></div>
    </v-card-text>
    
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      totCount: 0,
      searchSize: 0,
      grid: null,
      rows: [],
      columns: [],
      includes:[], // 검색 필터 담을 곳
      excludes:[], // 제외 필터 담을 곳
      sort: {
        key: 'date_time',
        val: 'desc'
      },
      checkboxSelector: null,
      options: {
        editable: true,
        enableCellNavigation: true,
        asyncEditorLoading: false,
        enableAsyncPostRender: true,
        autoEdit: false,
        threat_pressing: true,
        enableTextSelectionOnCells: true,
        enableColumnReorder: false
      },

      date: new Date().toISOString().substr(0, 10),
      s_date: new Date().toISOString().substr(0, 10),
      e_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false
    }
  },
  mounted() {
    this.totCount = 0;
    this.searchSize = 5;

    this.setColumns();

    this.grid = new Slick.Grid("#slickgrid", this.rows, this.columns, this.options);
    this.grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
		this.grid.registerPlugin(this.checkboxSelector);

    this.getData();

    //checkbox 기능 
    this.grid.onSelectedRowsChanged.subscribe((e, args) => {
      this.checkRows = [];
      for (var i in args.rows) {
        this.checkRows.push(args.rows[i]);
      }
      console.log('checkRows : ' , this.checkRows);
    });
    //sort 기능
    this.grid.onSort.subscribe((e, args) => {
      const key = args.sortCol.id;
      // const type = args.sortAsc === true ? 'asc' : 'desc';
      
      let dataList;
      if (args.sortAsc) {
        dataList = args.grid.getData().sort(function(a, b){
          return a[key] - b[key];
        })
      } else {
        dataList = args.grid.getData().sort(function(a, b){
          return b[key] - a[key];
        })
      }
      this.grid.setData(dataList);
      this.grid.render();
    });
    //scroll 기능
    this.grid.onScroll.subscribe((e, o) => {
      if (o.scrollTop >= $("#slickgrid .grid-canvas").height() - $("#slickgrid .slick-viewport").height()) {
        if (this.totCount !== 0) {
          if (this.totCount >= this.searchSize) {
            this.searchSize += 100;
            this.getData()
          }
        }
      }
    });
  },
  methods: {
    setColumns() {
      this.checkboxSelector = new Slick.CheckboxSelectColumn({
        cssClass: "slick-cell-checkboxsel"
      });
      this.columns.push(this.checkboxSelector.getColumnDefinition());
      this.columns.push(
        { name: "생성일", field: "test_mk_dt", id: "test_mk_dt", cssClass:'text-center', sortable: true }, 
        { name: "이름", field: "name", id: "name", cssClass:'text-center',sortable: true }, 
        { name: "나이", field: "age", id: "age", cssClass:'text-center',sortable: true }, 
        { name: "아이피", field: "test_ip", id: "test_ip", cssClass:'text-center',sortable: true }, 
        { name: "포트", field: "test_port", id: "test_port", cssClass:'text-center',sortable: true }, 
        { name: "사용여부", field: "is_use", id: "is_use", cssClass:'text-center',sortable: false }, 
      )
    },
    async getData() {
      try {
        const params = {
          size: this.searchSize,
          s_date: this.s_date,
          e_date: this.e_date,
          sort: this.sort
        }
        const rs = await this.$store.dispatch('initList', params);
        console.log(rs);
        this.totCount = rs.data.length;
        console.log('getDate : ', this.totCount, this.searchSize);
        this.grid.setData(rs.data);
        this.grid.render();
      } catch (err) {
        console.error('monitoring getData err : ', err);
      }
    },
    s_date_search(v) {
      this.s_date = v;
      this.menu1 = false;
      this.$refs.menu1.save(v);
    },
    e_date_search(v) {
      this.e_date = v;
      this.menu2 = false;
      this.$refs.menu2.save(v);
    },

    //slick.grid formatter
    fmt_drule(row, cell, value, def, data) {
      if (data.type === 'yara') {
        return data.rule_names;
      }
      return value;
    }
  }
}
</script>

<style>

</style>