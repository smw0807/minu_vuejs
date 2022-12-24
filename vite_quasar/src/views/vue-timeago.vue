<script setup>
import { ko } from 'date-fns/locale';
const aDay1 = new Date(2022, 7, 12, 11, 44, 12);

const aDay2 = '2022-12-24 21:40:00';
const aDay3 = '2022-12-21 13:13:13';
const aDay4 = '2022-12-17 11:11:11';
const aDay5 = '2022-12-09 10:10:10';

const aDay6 = '2022-11-11 11:11:11';

const options1 = {
  includeSeconds: true,
  addSuffix: true,
  useStrict: true,
};
</script>
<template>
  <div class="q-pa-md">
    <div class="q-col-gutter-md row items-start">
      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/tech">
          <div class="absolute-bottom text-subtitle1">
            <timeago :datetime="aDay1" />
          </div>
        </q-img>
      </div>

      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/arch">
          <div class="absolute-bottom text-subtitle2">
            <timeago :datetime="aDay2" />
          </div>
        </q-img>
      </div>

      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/animals">
          <div class="absolute-bottom text-subtitle2">
            <timeago
              :datetime="aDay2"
              :locale="ko"
              :converter-options="options1"
              auto-update
            />
          </div>
        </q-img>
      </div>

      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/nature">
          <div class="absolute-bottom text-subtitle2">
            <timeago
              :datetime="aDay2"
              :locale="ko"
              :converter-options="options1"
            />
          </div>
        </q-img>
      </div>

      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/nature">
          <div class="absolute-bottom text-subtitle2">
            <timeago :datetime="aDay3" :locale="ko" />
          </div>
        </q-img>
      </div>

      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/nature">
          <div class="absolute-bottom text-subtitle2">
            <timeago :datetime="aDay4" :locale="ko" />
          </div>
        </q-img>
      </div>

      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/nature">
          <div class="absolute-bottom text-subtitle2">
            <timeago :datetime="aDay5" :locale="ko" />
          </div>
        </q-img>
      </div>

      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/nature">
          <div class="absolute-bottom text-subtitle2">
            <timeago :datetime="aDay6" :locale="ko" />
          </div>
        </q-img>
      </div>

      <div class="col-6">
        <q-img src="https://placeimg.com/700/300/nature">
          <div class="absolute-bottom text-subtitle2">
            <timeago
              :datetime="aDay6"
              :locale="ko"
              :converter-options="options1"
            />
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>