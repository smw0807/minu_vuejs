<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <v-btn @click="visibleDemo1 = !visibleDemo1">vue-modal-window test 1</v-btn>
          <v-btn @click="visibleDemo2 = !visibleDemo2">vue-modal-window test 2</v-btn>
          <v-btn @click="visibleDemo3 = !visibleDemo3">vue-modal-window test 3</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
           <vue-modal-window id=hogehoge :visible.sync="visibleDemo1" title="resizable and draggable">This is content</vue-modal-window>
        </v-col>
        <v-col cols="12">
          <vue-modal-window
              :visible.sync="visibleDemo2"
              title="fixed"
              class="dialog-modal"
              :draggable="false"
              :resizable="false"
            >
              <div class="dialog-content">
                <div class="dialog-info">Fixed window</div>
                <div class="dialog-detail">
                  <p>You can not drag and resize this window.</p>
                  <p>You can only close this window.</p>
                </div>
                <div class="yes-no">
                  <div class="modal-button yes-button" @click="visibleDemo2 = !visibleDemo2">yes</div>
                  <div class="modal-button no-button" @click="visibleDemo2 = !visibleDemo2">no </div>
                </div>
              </div>
            </vue-modal-window>
        </v-col>
        <v-col cols="12">
          <vue-modal-window
            id=iframe-modal
            :visible.sync="visibleDemo3" title="iframe"
            contentUrl="/pages/popup/popup1"
            :enableAnotherWindow="true"></vue-modal-window>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      visibleDemo1: false,
      visibleDemo2: false,
      visibleDemo3: false,
    }
  }
}
/** vue-modal-window props 정보
 id: {
    type: String,
    default: function() {
      return uuid();
    }
  },
  contentUrl: {
    type: String
  },
  visible: {
    type: Boolean,
    default: true
  },
  enableAnotherWindow: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "vue-modal-window"
  },
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 200
  },
  top: {
    type: Number,
    default: 20
  },
  left: {
    type: Number,
    default: 20
  },
  minWidth: {
    type: Number,
    default: 60
  },
  minHeight: {
    type: Number,
    default: 20
  },
  resizable: {
    type: Boolean,
    default: true
  },
  draggable: {
    type: Boolean,
    default: true
  },
  recordRect: {
    type: Boolean,
    default: true
  },
  recordVisibility: {
    type: Boolean,
    default: true
  }
 * 
 */
</script>

<style scoped lang="scss">
a {
  color: #656565;
  font-size: 14px;
  margin: 6px;
}
.buttons {
  margin-top: 40px;
  border-top: solid #e2e2e2 1px;
  padding-top: 10px;
  .button {
    float: left;
    margin: 4px;
    height: 30px;
    width: 160px;
    border-radius: 4px;
    border: solid 1px #7d7d7d;
    text-align: center;
    font-size: 13px;
    line-height: 30px;
    box-shadow: #d6d6d6e0 1px 1px 2px;
    cursor: pointer;
    &:hover {
      background-color: #e8e8e8;
    }
    &:active {
      background-color: #b3b3b3;
    }
    &.active {
      background-color: #b7b7b7;
      box-shadow: inset #000000 0px 1px 2px;
    }
  }
}
.dialog-modal {
  .dialog-content {
    padding: 6px;
    background-color: #e2e2e2;
    width: 100%;
    height: calc(100% - 12px);
    .dialog-info {
      font-size: 15px;
      margin: 3px 0px 7px;
    }
    .dialog-detail {
      font-size: 12px;
      p {
        margin: 0;
      }
    }
    .yes-no {
      margin-left: 60px;
      margin-top: 50px;
      .no-button {
        margin-left: 10px;
      }
    }
  }
}
.modal-button {
  height: 24px;
  width: 80px;
  border-radius: 4px;
  border: solid 1px #7d7d7d;
  text-align: center;
  font-size: 13px;
  line-height: 24px;
  box-shadow: #d6d6d6e0 1px 1px 2px;
  background: linear-gradient(#f1f1f1, #929292);
  float: left;
}
</style>