<template>
  <v-app dark>
    <v-card tile>
      <v-toolbar dense dark>
        <v-app-bar-title class="mr-8">
              AF Manager
        </v-app-bar-title>
        <v-toolbar-items>

          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                위협
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in threat" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                트래픽
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in traffic" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                통계
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in statistics" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>
          
          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                보안정책
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in securityPolicy" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                장비설정
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in equipmentSetting" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                설정
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in setting" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn to="/log">감사이력</v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn to="/signup">상황판</v-btn>
        </v-toolbar-items>
        <v-menu open-on-hover transition="slide-x-transition" bottom right offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="300" tile>
            <v-list dense>
              <v-subheader>THEMES</v-subheader>
              <v-list-item-group v-model="theme" color="primary">
                <v-list-item v-for="(item, i) in themes" :key="i" router :to="item.link">
                  <v-list-item-action>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar>
    </v-card>

    <transition name="component-fade" mode="out-in">
      <v-main>
        <nuxt/>
      </v-main>
    </transition>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      activate: true,
        theme: 1,
        themes: [
          { text: "Dark", icon: "mdi-clock" }, 
          { text: "Light", icon: "mdi-account" }
        ],
        mini: true,

        //위협경보 메뉴
        threat: [
          { title: "모니터링", link: "/threat/monitoring" },
          { title: "분석/완료", link: "/threat/threat" },
          { title: "위협경보 현황", link: "/threat/threat" },
          { title: "추적도구", link: "/threat/threat" },
          { title: "검색", link: "/threat/threat" }
        ],

        //트래픽 메뉴
        traffic : [
          { title: "전체트래픽", link: "/traffic/all" },
          { title: "객체(그룹)트래픽", link: "/traffic/all" },
          { title: "검색", link: "/traffic/all" },
          { title: "패킷덤프", link: "/traffic/all" },
        ],

        //통계 메뉴
        statistics: [
          { title: "위협탐지 통계", link: "/statistics/all" },
          { title: "트래픽 통계", link: "/statistics/all" },
          { title: "보고서", link: "/statistics/all" },
        ],

        //보안정책 메뉴
        securityPolicy: [
          { title: "Snort 탐지규칙 설정", link: "/policy/snort" },
          { title: "Yara 탐지규칙 설정", link: "/policy/yara" },
          { title: "탐지규칙 현황", link: "/policy/yara" },
          { title: "탐지규칙 연계 이력", link: "/policy/yara" },
          { title: "블랙리스트 관리", link: "/policy/yara" },
          { title: "검증기관 관리", link: "/policy/yara" },
          { title: "snort 탐지규칙 일괄검증", link: "/policy/yara" },
          { title: "탐지규칙 업데이트", link: "/policy/yara" },
        ],

        //장비설정 메뉴
        equipmentSetting: [
          { title: "수집장비관리", link: "/equipment/yara" },
          { title: "수집장비 가용성점검", link: "/equipment/yara" },
          { title: "장비별 탐지규칙 적용", link: "/equipment/yara" },
          { title: "원본데이터 수집 현황", link: "/equipment/yara" },
          { title: "연동 장비관리", link: "/equipment/yara" },
          { title: "연동 장비 모니터링", link: "/equipment/yara" },
        ],

        //설정 메뉴
        setting: [
          { title: "사용자 관리", link: "/seting/user" },
          { title: "사용자 권한 설정", link: "/seting/user" },
          { title: "기관 관리", link: "/seting/user" },
          { title: "공통코드 관리", link: "/seting/user" },
          { title: "검색 범위 설정", link: "/seting/user" },
          { title: "주기 관리", link: "/seting/user" },
          { title: "임계치 관리", link: "/seting/user" },
          { title: "백업 및 복구", link: "/seting/user" },
        ]
    }
  },
  created() {
    this.$vuetify.theme.dark = false;
  },
}
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}

/* ======== 스크롤바 CSS =========== */
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>