<script>
  import Button from './BaseButton.vue'
  export default{
    name: "type-button",
    props: {
      type: {
        validator: function (typeStr) {
          if (typeof typeStr === 'string') {
            switch (typeStr) {
              case 'success':
                return true;
              default:
                return false;
            }
          } else return false;
        }
      }
    },
    render(createElement){
      return createElement(Button,
        {
          class: [this.type],
          on:{
              click:this.click
          }
        },
        this.$slots.default
      )
    },
    methods: {
        click(){
            this.$emit('click')
        }
    },
    components: {}
  };
</script>
<style scoped >
</style>