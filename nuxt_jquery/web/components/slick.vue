<template>
   <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="3">
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
        <v-spacer></v-spacer>
        <v-col cols="3" align="end">
          <v-btn small color="primary" @click="filter_reset">
            <v-icon small>mdi-filter-remove-outline</v-icon> 필터 초기화
          </v-btn>
          <v-btn small outlined @click="refresh">
            <v-icon small>mdi-refresh</v-icon>
          </v-btn>

        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <slick-filters @reload="refresh"/>
    </v-card-text>
    <v-card-text>
      <context-menu id="context-menu" ref="ctxMenu">
        <v-row>
          <v-col cols="12">
            <p class="font-weight-black>">검색조건</p>
          </v-col>
          <v-col cols="12">
            <v-text-field @click.stop></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-btn>test</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn>test</v-btn>
          </v-col>
        </v-row>
      </context-menu>
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
      selectRows: [],
      sort: `{"test_mk_dt": "desc"}`,
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
    this.searchSize = 200;

    this.setColumns();

    this.grid = new Slick.Grid("#slickgrid", this.rows, this.columns, this.options);
    this.grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
		this.grid.registerPlugin(this.checkboxSelector);

    this.getData();

    //checkbox
    this.grid.onSelectedRowsChanged.subscribe((e, args) => {
      this.selectRows = [];
      for (var i in args.rows) {
        this.selectRows.push(args.rows[i]);
      }
    });
    //contextMenu
    this.grid.onContextMenu.subscribe((e) => {
      e.preventDefault();
			const cell = this.grid.getCellFromEvent(e);
			const obj = this.grid.getColumns()[cell.cell];
			const data = this.grid.getDataItem(cell.row);
			const val = data[obj.id];
      console.log(cell, obj, data, val);
      this.$refs.ctxMenu.open(e, val);
    });
    //sort 기능
    this.grid.onSort.subscribe((e, args) => {
      if (args.sortAsc) {
        this.sort = `{"${args.sortCol.id}":"asc"}`;
      } else {
        this.sort = `{"${args.sortCol.id}":"desc"}`;
      }
      this.searchSize = 200;
      this.getData();
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
    // window.addEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      console.log('resize', $(window).height());
    },
    setColumns() {
      this.checkboxSelector = new Slick.CheckboxSelectColumn({
        cssClass: "slick-cell-checkboxsel"
      });
      this.columns.push(this.checkboxSelector.getColumnDefinition());
      this.columns.push(
        { name: "생성일", field: "test_mk_dt", id: "test_mk_dt", cssClass:'text-center', width:150, sortable: true }, 
        { name: "이름", field: "name", id: "name", cssClass:'text-center',sortable: true }, 
        { name: "나이", field: "age", id: "age", cssClass:'text-center',sortable: true }, 
        { name: "아이피", field: "test_ip", id: "test_ip", cssClass:'text-center',sortable: true }, 
        { name: "포트", field: "test_port", id: "test_port", cssClass:'text-center',sortable: true }, 
        { name: "사용여부", field: "is_use", id: "is_use", cssClass:'text-center',sortable: false, formatter: this.fmt_is_use }, 
      )
    },
    async getData() {
      try {
        const params = {
          size: this.searchSize,
          s_date: this.s_date,
          e_date: this.e_date,
          sort: this.sort,
          filters: this.$store.getters['GET_FILTERS']
        }
        const rs = await this.$store.dispatch('initList', params);
        this.rows = rs.data.data;
        this.totCount = rs.data.data.length;
        this.grid.setData(this.rows);
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
    // e_date_search(v) {
    //   this.e_date = v;
    //   this.menu2 = false;
    //   this.$refs.menu2.save(v);
    // },

    //필터 초기화
    filter_reset() {
      console.log('filter_reset');
    },

    //데이터 리로드
    refresh() {
      this.getData();
    },

    //slick.grid formatter
    fmt_is_use(row, cell, value, def, data) {
      if (data.is_use) {
        return '사용';
      } else {
        return '사용안함'
      }
    }
  }
}
</script>

<style>
.slick-cell {
  color: black;
}
</style>