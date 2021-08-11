const com1 = {
  template: '<div> test com1 </div>'
}
const com2 = {
  template: '<div> test com2 </div>'
}
const com3 = {
  template: '<div> test com3 </div>'
}
const com4 = {
  template: '<v-btn @click="test">test btn</v-btn>',
  methods: {
    test(){
      console.log('test btn click!!!');
    }
  },
}

export default {
  com1, com2, com3, com4
}