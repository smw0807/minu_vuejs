
<script>
export default {
  name: 'HelloWorld',
  render (h) { // JSX 렌더함수 (createElement 대신 문자 h를 사용)
    return (
      <div> 
        <div class="text-center" 
        on-click={this.pressed}
        domPropsInnerHTML={this.msg}></div>
      </div>
    )
  },
  data () {
    return {
      welcome: '안녕하세요?',
      msg: `<h${this.header}>안녕하세요 ${this.name}</h${this.header}>`
    }
  },
  methods: {
    pressed() {
      // alert('click');
      alert(this.msg);
    }
  },
  props: ['header', 'name']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
