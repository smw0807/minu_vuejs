# 사이드바 메뉴 기반 프로젝트
NuxtJS 기반 프로젝트로 Vue관련 공부 중 궁금한거나 해보고 싶은 것을들 테스트하는 용도의 프로젝트입니다.
# 적용해본 NPM 들
1. @nuxtjs/axios
2. @nuxtjs/dotenv
3. dotenv
4. @nuxtjs/porxy
5. elasticsearch
6. express
7. vue-ctk-date-time-picker
8. vue-json-csv
9. json2csv
## NuxtJS + Vuex + Express + ElasticSearch + VuetifyJS
VueJS 기반의 웹애플리케이션 프레임워크인 NuxtJS와 디자인 프레임워크인 Vuetify를 이용하여 프로젝트를 만들었습니다.

데이터를 다루는건 vuex와 express를 이용하여 ElasticSearch 데이터를 다룹니다.

프론트단 디자인은 디자인 프레임쿼크인 vuetify로 제작하였고,<br>
vuex를 이용해 axios로 NuxtJS 내부에 있는 express에 요청을 보내는 방식을 이용합니다.
백단은 프로젝트 내부에 구성된 express가 vuex에서 axios 요청을 받은걸 토대로 ElasticSearch의 데이터를 처리 합니다.

