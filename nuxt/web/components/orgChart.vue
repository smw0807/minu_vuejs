<template>
  <v-card
    class="mx-auto"
    max-width="250"
    max-height="450"
    min-height="450"
    >
    <v-sheet>
      <v-text-field
        v-model="search"
        label="Search"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        dense
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
    </v-sheet>
    <v-card-text>
      <v-treeview
        :items="items"
        :open.sync="open"
        :search="search"
        :filter="filter"
        activatable
        dense
        align="start"
        >
        <template v-slot:prepend="{ item }">
          <v-icon
            small
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name:'orgChart',
  data() {
    return {
      search: null,
      caseSensitive: false,
      //임시 데이터 제대로 된 데이터는 store에서 가져오게 변경하기
      items: [
        {
          id: 1,
          name: 'NCT',
          children: [
            {
              id: 2,
              name: 'PD',
              children: [
                {
                  id: 201,
                  name: 'aa',
                },
                {
                  id: 202,
                  name: 'bb',
                },
                {
                  id: 203,
                  name: 'cc',
                }
              ],
            },
            {
              id: 3,
              name: 'SSD',
              children: [
                {
                  id: 301,
                  name: 'aa',
                },
                {
                  id: 302,
                  name: 'bb',
                },
              ],
            },
            {
              id: 4,
              name: 'NSD',
              children: [
                {
                  id: 401,
                  name: 'aa',
                },
                {
                  id: 402,
                  name: 'bb',
                },
                {
                  id: 403,
                  name: 'cc',
                },
              ],
            },
          ],
        },
      ],
      open: [1, 2],
      search: null,
      caseSensitive: false,
    }
  },
  created() {
  },
  computed: {
    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },
  methods: {
    
  },
}
</script>

<style scope>
html {
  overflow: hidden !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>