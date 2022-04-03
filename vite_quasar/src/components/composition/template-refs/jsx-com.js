export default {
  setup() {
    const root = ref(null)

    return () =>
      h('div', {
        ref: root
      })

    // with JSX // 이건 안되는데 공식홈페이지에 있는건 뭘까???
    // return () => <div ref={root} />
  }
}