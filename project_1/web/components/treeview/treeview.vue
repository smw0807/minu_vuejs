<template>
  <v-card>
    <v-card-text>
      <v-btn @click="test">Test</v-btn>
    </v-card-text>
    <v-card-text>
      <v-treeview
        v-model="selected"
        :open="initiallyOpen"
        :items="items"
        activatable
        item-key="name"
        @update:active="select"
      >
        <!-- open-on-click 이옵션은 treeview에서 화살표말고 디렉터리 눌러도 열리게함 -->
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ files[item.file] }}
          </v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      initiallyOpen: ['public'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-language-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      selected: [],
      items: [
        {
          name: '.git',
        },
        {
          name: 'node_modules',
        },
        {
          name: 'public',
          children: [
            {
              name: 'static',
              children: [{
                name: 'logo.png',
                file: 'png',
              }],
            },
            {
              name: 'favicon.ico',
              file: 'png',
            },
            {
              name: 'index.html',
              file: 'html',
            },
          ],
        },
        {
          name: '.gitignore',
          file: 'txt',
        },
        {
          name: 'babel.config.js',
          file: 'js',
        },
        {
          name: 'package.json',
          file: 'json',
        },
        {
          name: 'README.md',
          file: 'md',
        },
        {
          name: 'vue.config.js',
          file: 'js',
        },
        {
          name: 'yarn.lock',
          file: 'txt',
        },
      ],
    }),
    async created() {
      const params = {
        code: 'main'
      }
      await this.$store.dispatch('code/treeList', params);
    },
    computed:{
      tree_list() {
        return this.$store.getters['code/GET_TREE_LIST'];
      }
    },
    methods: {
      select(v) {
        console.log('select : ', this.selected);
      },
      async test() {
        const params = {
          code: 'main'
        }
        await this.$store.dispatch('code/treeList', params);
      }
    }
  }
</script>

<style>

</style>