/** 작업자 : 송민우 */
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
      <div id="threat_list" style="height: 650px"></div>
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
    this.searchSize = 500;
    this.setColumns();
    this.grid = new Slick.Grid("#threat_list", this.rows, this.columns, this.options);
    this.grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
		this.grid.registerPlugin(this.checkboxSelector);
    this.getData();

    //sort 기능
    this.grid.onSort.subscribe(function (e, args) {
      console.log('onSort.....');
      console.log(args);
      console.log(this.sort);
      this.sort = {
        key: args.sortCol.id,
        val: args.sortAsc === true ? 'asc' : 'desc'
      }
      console.log(this.sort);
		});
    //scroll 기능
    this.grid.onScroll.subscribe(function (e, o) {
      if (o.scrollTop >= $("#threat_list .grid-canvas").height() - $("#threat_list .slick-viewport").height()) {
        console.log(' ???? ');
        console.log(this.totCount);
        console.log(this.searchSize);
        if (this.totCount !== 0) {
          if (this.totCount >= this.searchSize) {
            this.searchSize += 100;
            this.getData()
          }
        }
			// 	if (rt_cnt.tot_size != 0) {
			// 		if (rt_cnt.tot_size > (rt_cnt.rt_size)) {
			// 			var check_time = new Date();
			// 			if (check_time - list_time > pageConf.scroll * 60000) {
			// 			} else {
			// 				rt_cnt.rt_size += pageConf.rtSize;
			// 				$scope.load_data();
			// 			}
			// 		}
			// 	}
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
        { name: "장비유형", field: "type", id: "type", cssClass:'text-center', sortable: true }, 
        { name: "수집일시", field: "date_time", id: "date_time", cssClass:'text-center', width:200, sortable: true }, 
        { name: "탐지규칙명", field: "rule_name", id: "rule_name", cssClass:'text-center', width:250, sortable: true, formatter: this.fmt_drule}, 
        { name: "공격IP", field: "attack_ip", id: "attack_ip", cssClass:'text-center', width:110, sortable: true }, 
        { name: "공격Port", field: "attack_port", id: "attack_port", cssClass:'text-center', sortable: true }, 
        { name: "피해IP", field: "victim_ip", id: "victim_ip", cssClass:'text-center', width:110, sortable: true }, 
        { name: "피해Port", field: "victim_port", id: "victim_port", cssClass:'text-center', sortable: true }, 
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
        const rs = await this.$store.dispatch('threat/monitoring/initList', params);
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