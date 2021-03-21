<template>
  <v-card>
    <v-responsive :aspect-ratio="16/9">
      <v-avatar
        color="primary"
        rounded
        size="56"
      >Min</v-avatar>

      <v-card-text>
        v-responsive...
        This card will always be 16:9 (unless you put more stuff in it)
      </v-card-text>

      <v-badge
        bordered
        color="error"
        icon="mdi-lock"
        overlap
      >
        <v-btn
          class="white--text"
          color="error"
          depressed
        >
          Lock Account
        </v-btn>
      </v-badge>

      <v-banner
        single-line
        sticky
      ></v-banner>
      ㄴㅇㅊㄴㅇ
    </v-responsive>
  </v-card>
</template>
<script>
/**
 * v-avatar : 프로필 사진 같은거 표시용으로 쓰는 것 같음
 */
export default {

}
</script>

<style>

</style>