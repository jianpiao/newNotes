<template>
  <div id="app">
    <transition name="fade" v-show="show">
       <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import Notelist from './components/NoteList.vue'
import Editor from './components/Editor.vue'
export default {
  components:{
    Toolbar,
    Notelist,
    Editor
  },
  data(){
    return{
       show: false
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
  outline: none;
}
html, #app {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  position: relative;
}

.fade-enter-active{
  transition: all .4s;
}

.fade-leave-active{
  transition: all 0;
}

.fade-enter, .fade-leave-to {
  transform: translateY(-200px);
  filter: blur(10px);
}
</style>
