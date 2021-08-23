export default {
  items: [
    { title: 'index', icon: 'mdi-view-dashboard', to: '/' },
    { title: 'test', icon: 'mdi-api', to: '/api/apiTest' },
    { divider: true },
    { title: 'DataTables', icon: 'mdi-table-multiple', to: '/vtable/datatables', use: ['vuetify']},
    // { title: 'DT checkbox', icon: 'mdi-check-bold', to: '/vtable/datatable2', use: ['vuetify']},
    // { title: 'Dataiterator', icon: 'mdi-table-multiple', to: '/vtable/dataiterator', use: ['vuetify']},
    { title: 'treeview', icon: 'mdi-file-tree-outline', to: '/vuetify/treeview', use: ['vuetify']},
    { divider: true },
    // { title: 'v-card grid', icon: 'mdi-view-grid', to: '/grid/vcard', use: ['vuetify']},
    // { title: 'v-layout grid', icon: 'mdi-view-grid-outline', to: '/grid/vlayout', use: ['vuetify']},
    { title: 'v-if & v-show', icon: 'mdi-eye', to: '/vue/ifshow', use: ['vuetify']},
    { divider: true },
    { title: 'v-picker', icon: 'mdi-calendar', to: '/vpicker/datepicker', use: ['vuetify']},
    { divider: true },
    { title: 'custom confirm', icon: 'mdi-comment-question-outline', to: '/custom/confirm', use: ['vuetify', 'custom']},
    { title: 'custom alert', icon: 'mdi-alert', to: '/custom/alert', use: ['vuetify', 'custom']},
    { divider: true },
    { title: 'NuxtJS', icon: 'mdi-nuxt', to: '/nuxt/nuxt1', use: ['test']},
    { divider: true },
    {
      title: 'Test',
      icon: 'mdi-test-tube',
      items: [
        { title: 'Test', to: '/test/props_test', use: ['test'] },
        { title: 'window popup', to: '/test/window_popup' },
        // { title: 'sub3', to: '/menu2/menu2_3', use: ['test'] },
        // { title: 'sub4', to: '/menu2/menu2_4' },
        // { title: 'sub5', to: '/menu2/menu2_5' }
      ],
      use: ['test'] ,
    },
    // {
    //   title: 'menu1',
    //   icon: 'mdi-view-dashboard',
    //   to:'/dashboard'
    // },
    
    // {
    //   title: 'menu3',
    //   icon: 'mdi-traffic-light',
    //   items: [
    //     { title: 'sub1', to: '/traffic/allTraffic', icon: 'mdi-traffic-light' },
    //     { title: 'sub2', to: '/traffic/all', icon: 'mdi-account-multiple' },
    //     { title: 'sub3', to: '/traffic/all', icon:'mdi-magnify' },
    //     { title: 'sub4', to: '/traffic/serverPkt', icon:'mdi-text-box-search', use: ['test'] }
    //   ],
    //   use: ['test'] ,
    // },
  ]
}