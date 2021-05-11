# 사이드바 메뉴 기반 프로젝트
# 사용하는 것들
## NuxtJS + Vuex + Express + ElasticSearch + VuetifyJS
VueJS 기반의 웹애플리케이션 프레임워크인 NuxtJS와 디자인 프레임워크인 Vuetify를 이용하여 프로젝트를 만들었습니다.

데이터를 다루는건 vuex와 express를 이용하여 ElasticSearch 데이터를 다룹니다.

프론트단은 vuetify로 제작하였고 vuex를 이용해 axios로 express에 요청을 보내고,
백단은 프로젝트 내부에 구성된 express가 vuex에서 axios 요청을 받은걸 토대로 ElasticSearch의 데이터를 처리 합니다.