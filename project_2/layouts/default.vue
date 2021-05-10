<template>
  <v-app dark>
    <vue-navigation-bar :options="navbarOptions" />

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
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        collapseButtonOpenColor: "#661c23",
        collapseButtonCloseColor: "#661c23",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        tooltipPlacement: "bottom",
        menuOptionsLeft: [
          {
            type: "link",
            text: "AF Manager",
            path: { name: "pricing"},
            iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>',
          },
          {
            type: "link",
            text: "위협경보",
            arrowColor: "#659CC8",
            subMenuOptions: [
              {
                isLinkAction: true,
                type: "link",
                text: "모니터링",
                // subText: "Stupid corporate wet blankets. Like booze ever killed anyone.",
                path: {path : "/" }
              },
              {
                type: "hr",
              },
            ]
          },
          {
            type: "link",
            text: "Contact",
            subMenuOptions: [
              {
                type: "link",
                text: "Customer Service",
                path: { name: "customer-service" },
              },
              {
                type: "link",
                text: "Accounting",
                path: { name: "accounting" },
              },
              {
                type: "hr",
              },
              {
                type: "link",
                text: "Reception",
                path: { name: "reception"},
                iconLeft: '<svg id="i-telephone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M3 12 C3 5 10 5 16 5 22 5 29 5 29 12 29 20 22 11 22 11 L10 11 C10 11 3 20 3 12 Z M11 14 C11 14 6 19 6 28 L26 28 C26 19 21 14 21 14 L11 14 Z" /> <circle cx="16" cy="21" r="4" /> </svg>',
              },
            ]
          }
        ],
        menuOptionsRight: [
          {
            type: "button",
            text: "Signup",
            path: { name: "signup" },
            class: "button-red"
          },
          {
            type: "button",
            text: "Login",
            path: { name: "login" },
            iconRight: '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>'
          }
        ]
      },
      
        //위협경보 메뉴
        threat: [
          { title: "모니터링", link: "/threat/threat" },
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

.vnb .button-red {
  background: #ff3b30;
}
 
.vnb .button-red:hover {
  background: #fc0d00;
}
</style>