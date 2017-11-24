<template>
  <div id="toolbar" :style="{backgroundColor:backgroundColor}">
    <router-link to="/notelist/editor" style="color:#767676;">
        <i @click="addOne" class="glyphicon glyphicon-plus"></i>
    </router-link>
        <i @click="toggleFavorite" class="glyphicon glyphicon-heart" :class="{favor:value.favorite}"></i>
    <router-link to="/notelist" :style="{display:DeleteNote}" style="color:#767676;">
        <i @click="deleteNote" class="glyphicon glyphicon-trash" ></i>
    </router-link>
        <i @click="deleteAll" class="glyphicon glyphicon-trash" :style="{display:DeleteAll}"></i>
        <i @click="changeBg ; show = !show" class="glyphicon glyphicon-th changeBg"></i>
    <router-link to="/notelist/deletenote" style="color:#767676;">
        <i  class="glyphicon glyphicon-time"></i>
    </router-link>
    <!-- <router-link to="/notelist" :style="{display:backHome}"> -->
        <i @click="backhome"  :style="{display:backHome}" class="glyphicon_color glyphicon glyphicon-home"></i>
    <!-- </router-link> -->
        <i @click="increase" class="glyphicon glyphicon-triangle-top"    :style="{display:fontsize}"></i>
        <i @click="reduced"  class="glyphicon glyphicon-triangle-bottom" :style="{display:fontsize}"></i>

    <transition name="hide">
      <div class="bgDiv"  v-if="show" @click="show = false">
        <div class="bgColor">
          <p>背景颜色切换</p>
           <div class="bg_li" @click="color_1" ><div class="color_1"></div><span>#f6f5ec</span></div>
           <div class="bg_li" @click="color_2" ><div class="color_2"></div><span>#feeeed</span></div>
           <div class="bg_li" @click="color_3" ><div class="color_3"></div><span>#cde6c7</span></div>
           <div class="bg_li" @click="color_4" ><div class="color_4"></div><span>#E0EEE0</span></div>
           <div class="bg_li" @click="color_5" ><div class="color_5"></div><span>#30414a</span></div>
           <div class="bg_li" @click="color_6" ><div class="color_6"></div><span>#4F4F4F</span></div>
        </div>
      </div> 
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      show: false,
      backHome: "none",
      DeleteNote: 'none',
      DeleteAll: 'block',
      fontsize: 'none',
    }
  },
  computed:{
    activeNote(){
      return this.$store.getters.activeNote
    },
    value(){
      return this.$store.getters.value
    },
    backgroundColor(){
      return this.$store.getters.backgroundColor
    }
  },
  methods: {
    addOne() {
      //通过dispatch分发到actions中进行处理
      this.$store.dispatch('addNote')
    },
    toggleFavorite() {
      this.$store.dispatch('toggleFavorite')
    },
    deleteNote() {
      this.$store.dispatch('deleteNote')
    },
    deleteAll() {
      this.$store.dispatch('deleteAll')
    },
    changeBg() {
      this.$store.dispatch('changeBg')
    },
    color_1() {
      this.$store.dispatch('backgroundColor1')
    },
    color_2() {
      this.$store.dispatch('backgroundColor2')
    },
    color_3() {
      this.$store.dispatch('backgroundColor3')
    },
    color_4() {
      this.$store.dispatch('backgroundColor4')
    },
    color_5() {
      this.$store.dispatch('backgroundColor5')
    },
    color_6(){
      this.$store.dispatch('backgroundColor6')
    },
    increase(){
          this.$store.dispatch('increase')
    },
    reduced(){ 
         this.$store.dispatch('reduced')
    },
    backhome(){
      this.$router.go(-1)
    }
  },
  watch:{
    $route(to){
        if(to.path == '/notelist/editor'){
            this.backHome = "block"
            this.DeleteNote = "block"
            this.DeleteAll = "none"
            this.fontsize = 'block'
        }else if(to.path == '/notelist/deletenote'){
            this.backHome = "block"
        }else if(to.path == '/notelist'){
            this.backHome = "none"
            this.DeleteNote = "none"
            this.DeleteAll = "block"
            this.fontsize = 'none'
        }
    }
  },
  mounted() {
      let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      console.log(w)
      if(w > 600){
          this.backHome = "none"
          this.fontsize = 'block'
    }
  }
}
</script>
<style>
#toolbar {
  float: left;
  max-width: 40px;
  height: 100%;
  background-color: #30414a;
  padding: 35px 25px 25px 10px;
  color: #767676;
}

#toolbar i {
  font-size: 20px;
  margin-bottom: 35px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.5s ease;
}

#toolbar a:active .#toolbar a :hover{
  text-decoration: none;
  color: #767676;
}

.favor {
  color: #faa755;
}

.bgDiv ,.bgColor{
  height: 100%;
  position: absolute;
  z-index: 99;
  top: 0;
  text-align: center;
  color: #fff;
}

.bgDiv{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0);
  box-shadow: rgba(0,0,0,0);
}

.bgColor{
  width: 40%;
  min-width: 200px;
  max-width: 250px;
  background-color: rgba(0,0,0,.5);
  left: 30px;
}

.bgColor p{
  margin-top: 70%;
  font-size: 16px;
  font-weight: 100;
}

.bg_li{
  border:1px solid #aaa;
  width: 100px;
  margin: 5px 50px;
  padding: 5px 5px;
}

.color_1, .color_6,
.color_2, .color_3,
.color_4, .color_5{
   width: 20px;
   height: 20px;
   margin: 5px 5px 0 0;
   display: inline-table;
}

.color_1{
  background-color: #f6f5ec;
}

.color_2{
  background-color: #fedcbd;
}

.color_3{
  background-color: #cde6c7;
}

.color_4{
  background-color: #E0EEE0;
}

.color_5{
 background-color: #30414a;
}

.color_6{
  background-color: #4F4F4F;
}

.glyphicon_color{
  color: #767676;
  font-size: 20px;
}

.history{
  width: 300px;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 40px;
  text-align: center;
  z-index: 100;
  color: #fff;
}

.hide-enter-active , .hide-leave-active{
  transition: all .4s ease;
}

.hide-enter, .hide-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>