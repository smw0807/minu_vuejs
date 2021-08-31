export const resize = {
  data() {
    return {
      init_resize_height: window.innerHeight,
      timer : null
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  computed: {
    resize_height() {
      return this.init_resize_height;
    }
  },
  methods: {
    onResize() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.init_resize_height = window.innerHeight;
      }, 300)
    }
  }
}