<template>
  <div class="home">
      <div class="header">
        <mu-appbar :title="titleSelect">
            <mu-icon-button icon="menu" slot="left"  @click="paperShow =! paperShow"/>
            <mu-icon-button v-show="checkbox" icon="done" slot="right" @click="deleteDone" />
            <mu-icon-button icon="create" slot="right" @click="addOne" />
        </mu-appbar>
      </div>
      <div class="content">
        <transition to="mask">
            <div class="paper-mask" v-show="paperShow"  @click="paperShow = false"></div>
        </transition>
        <transition name="paper">
            <mu-paper v-show="paperShow">
                <mu-menu>
                    <mu-menu-item title="全部便签" leftIcon="library_books" @click="paperSelect('全部便签')"/>
                    <mu-menu-item title="收藏" leftIcon="grade" @click="paperSelect('收藏')"/>
                    <mu-menu-item title="回收站" leftIcon="delete_sweep" @click="paperSelect('回收站')"/>
                    <mu-menu-item title="全部删除" leftIcon="delete_forever" @click="paperSelect('全部删除')"/>
                    <mu-menu-item title="编辑" leftIcon="format_list_numbered" @click="paperSelect('编辑')"/>
                </mu-menu>
            </mu-paper>
        </transition>
        <Favorite v-show="favorShow"></Favorite>
        <Trash v-show="trash"></Trash>

        <!-- <TypeButton @click="success" type="success">success</TypeButton> -->

        <div class="container" v-show="allNote">
        <div class="list-group">
            <p v-for="item in notes" class="list-group-item"  ref="noteDiv" :class="{active:value == item}"  @click="updateValue(item)">
                <mu-icon value="clear" class="clearPic" @click="deleteNote(item)"  v-show="checkbox"/>
                <img src="../assets/favorite.png"  v-show="!item.favorite"  @click="toggleFavorite(item)" class="favo-show" />
                <img src="../assets/favorite1.png" v-show="item.favorite"  @click="toggleFavorite(item)" class="favo-show" />
                <router-link to="/home/editor" tag="span">
                <span class="note_time">
                    {{item.time | date}}
                    &nbsp;&nbsp;
                    {{item.value.length}}/字
                </span>
                <h4 class="list-group-item-heading">
                    {{item.value}}
                </h4>
                </router-link>
            </p>
        </div>
        </div>
        <mu-dialog :open="dialog" title="全部删除" @close="close">
            确定要删除全部便签？
            <mu-flat-button slot="actions" @click="close" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="deleteAll" label="确定"/>
        </mu-dialog>
      </div>
  </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex'
import Trash from './DeleteNote.vue'
import Favorite from './Favorite.vue'
// import fipple from './Fipple.vue'
// import TypeButton from './TypeButton.vue'
// import BaseButton from './BaseButton.vue'
export default {
  data(){
    return {
        paperShow: false,
        dialog: false
    }
  },
  components:{
      Trash,
      Favorite,
    //   fipple
    //  TypeButton,
    //  BaseButton
  },

  computed:{
    ...mapState({
        notes: state => state.notes,
        value: state => state.value,
        back: state => state.back,      
        delNote: state => state.delNote,
        titleSelect: state => state.titleSelect, 
        trash: state => state.trash,
        allNote: state => state.allNote,
        favorShow: state => state.favorShow,
        checkbox: state => state.checkbox
    })
  },
  methods:{
      addOne () {
          this.$router.push('/home/editor')
          //通过dispatch分发到actions中进行处理
          this.$store.dispatch('addNote')
      },

      updateValue (note) {
          this.$store.dispatch('updateValue',note)
      },

     toggleFavorite (val) {
          this.$store.dispatch('toggleFavorite',val)
      },

     paperSelect (val) {
         if (val == '全部便签') {
             this.$store.dispatch('titleSelect','全部便签')
         } else if (val == '收藏') {
             this.$store.dispatch('titleSelect','收藏')
         } else if (val == '回收站') {
             this.$store.dispatch('titleSelect','回收站')
         } else if (val == '全部删除') {
             this.dialog = true
         } else if (val === '编辑') {
             this.$store.dispatch('checkboxToggle')
         }
         this.paperShow = false
     },

     close () {
         this.dialog = false
     },

     deleteAll () {
         this.dialog = false
         this.$store.dispatch('deleteAll')
     },

     deleteNote (val) {
        this.$store.dispatch('deleteNote',val)
      },

     deleteDone () {
        this.$store.dispatch('checkboxToggle')
      },


     success(){
        console.log('success')
      }
  },

  filters:{
      date(time){
          let oldDate = new Date(time)
          let newDate = new Date()
          var dayNum = "";
          var getTime = (newDate.getTime() - oldDate.getTime())/1000;

          if(getTime < 60*2){
              dayNum = "刚刚";
          }else if(getTime >= 60*2 && getTime < 60*60){
              dayNum = parseInt(getTime / 60) + "分钟前";
          }else if(getTime >= 3600 && getTime < 3600*24){
              dayNum = parseInt(getTime / 3600) + "小时前";
          }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
              dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
          }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
              dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
          }else if(time >= 3600 * 24 * 30 * 12){
              dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
          }

          function checkTime(time){
             if(time < 10){
                time = "0" + time
             }
             return time
          }

          let year   = oldDate.getFullYear();
          let month  = oldDate.getMonth()+1;
          let day    = oldDate.getDate();
          let hour   = oldDate.getHours(); 
          let minute = oldDate.getMinutes(); 
          let second = oldDate.getSeconds(); 
          return dayNum+" "+year+"-"+month+"-"+day+" "+checkTime(hour)+":"+checkTime(minute)+":"+checkTime(second);
      }
  }
}
</script>


<style scoped>
.home{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background-color: #009688;
    z-index: 2;
}

.content{
    position: absolute;
    top: 56px;
    left: 0;
    width: 100%;
    height: auto;
}

.list-group{
  margin: 0;
}

.container {
  height: auto;  
  overflow: auto;
  width: 100%;
  padding: 0;
}

.container .list-group-item {
  border: 0;
  border-radius: 0;
  margin: 5px 0;
  border-bottom: 1px solid #eee;
}

.list-group-item{
  padding: 10px 15px;
}

.mu-checkbox{
    position: absolute;
    right: 12px;
}

.demo-float-button{
    position: relative;
    width: 20px;
    height: 20px;
    float: right;
    margin:4px 5px 0 0;
}

.list-group-item-heading {
  font-weight: 300;
  font-size: 16px;
  max-height: 48px;
  overflow: hidden;
  margin: 0;
}

.note_time{
  font-size: 12px;
  opacity: .5;
  color: #987111;
  text-decoration: none;
}

.favo-show{
    float: right;
}

.paper-mask{
    position: fixed;
    top: 56px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, .1);
}

.mu-appbar{
    padding: 0 0;
}

.mu-icon-button{
    width: 56px;
}

.mu-paper-round{
    width: 168px !important;
    position: fixed;
    top: 56px;
    z-index: 100;
}

.paper-enter-active{
  transition: all .3s ease;
}

.paper-leave-active{
  transition: all 0 ease;
}

.paper-enter, .paper-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}


.mask-enter-active,.mask-leave-active{
  transition: all .4s;
  opacity: 1;
}

.mask-enter, .mask-leave-to {
  opacity: 0;
}


.clearPic{
    position: absolute;
    margin: 0 auto;
    right: 42%;
    font-size: 50px;
    color: #009688;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .2);
}

</style>

