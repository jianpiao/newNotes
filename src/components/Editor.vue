<template>
  <div id="note-editor">
    <div class="header">
        <mu-appbar>
          <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
          <mu-icon-button icon="delete" slot="right" @click="openBottomSheet"/>
          <mu-icon-button icon="toc" slot="right" @click="changeFont =! changeFont"/>
      </mu-appbar>
    </div>

  <div class="content">
    <div class="mu-paper-mask" v-show="changeFont"  @click="changeFont = false"></div>
    <transition name="paper">
      <mu-paper class="paper" v-show="changeFont">
          <mu-menu>
            <mu-menu-item title="加大字体" leftIcon="format_size" @click="increase"/>
            <mu-menu-item title="减小字体" leftIcon="title" @click="reduced"/>
          </mu-menu>
      </mu-paper>
    </transition>

    <div class="edit-info">
        <span>{{editTime | date}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{value.length}}/字节</span>
        <mu-icon-button v-show="!this.$store.state.value.favorite" icon="favorite" slot="right" @click="changeFavorite" class="favorite"/> 
        <mu-icon-button v-show="this.$store.state.value.favorite" icon="favorite" slot="right" @click="changeFavorite" class="favorite-show"/>
    </div>

    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list @itemClick="closeBottomSheet">
        <mu-sub-header>确定要删除此条便签？</mu-sub-header>
        <mu-list-item title="确认删除" @click="deleteNote(value)"/>
      </mu-list>
    </mu-bottom-sheet>

     <textarea  autofocus="autofocus" :value="value"  :style="{fontSize:fontSize}" @input="editValue"  class="form-control" placeholder="内容" ></textarea>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
var num = 14;
export default {
  data(){
    return {
        bottomSheet: false,
        changeFont: false,
    }
  },

  computed:mapState({
    value: state => state.value.value,
    fontSize: state => state.fontSize,
    editTime: state => state.editTime
  }),
  methods:{
      editNote (e) {
          this.$store.dispatch('editNote',e.target.value)
      },

      editValue (e) {
          this.$store.dispatch('editValue',e.target.value)
      },

      back () {
        this.$router.go(-1)
      },

      deleteNote () {
        this.$router.push('/home')
        this.$store.dispatch('deleteNote')
      },

      changeFavorite () {
        this.$store.dispatch('changeFavorite')
      },

      closeBottomSheet () {
        this.bottomSheet = false
      },

      openBottomSheet () {
        this.bottomSheet = true
      },

      toggle () {
        this.open = !this.open
      },

      handleClose () {
        this.open = false
      },

      increase(){
          this.$store.dispatch('increase')
      },

      reduced(){
         this.$store.dispatch('reduced')
      },

      hideToast () {
          this.toast = false
          if (this.toastTimer) clearTimeout(this.toastTimer)
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

          let hour   = oldDate.getHours(); 
          let minute = oldDate.getMinutes(); 
          let second = oldDate.getSeconds(); 
          return dayNum+" "+checkTime(hour)+":"+checkTime(minute)+":"+checkTime(second);
      },
  }
}
</script>


<style lang="css">  
#note-editor {
  height: 100%;
  width: 100%;
  float: left;
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
  height:calc(100% - 56px);
}

.title{
  width: 100%;
  border:0;
  height: 50px;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  padding: 0;
  border-bottom: 1px solid #eee;
}

.form-control{
  width: 100%;
  height: calc(100% - 94px);
  margin-top: 21px;
  padding: 6px 8px;
  resize: none;
  border: none; 
  width: 100%;
  border: 0;
  border-radius: 0;
}

.edit-info{
  position: fixed;
  top: 56px;
  width: 100%;
  height: 20px;
  color: #987111;
  display: table;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.117647), 0 1px 2px rgba(0,0,0,.117647);
}

.edit-info span{
  margin-left: 8px;
  opacity: .7;
}

.edit-info > .favorite,
.favorite,
.favorite > div .mu-ripple-wrapper{
  width: 18px;
  height: 18px;
  float:right;
  margin-right: 10px;
  padding: 0;
  color: #dde;
}

.favorite > div .mu-icon{
  font-size: 18px;
}

.favorite-show > div .mu-icon {
  color: #faa755;
}

.favorite-show{
  position: absolute !important;
  top: 2px;
  right: 8px;
  width: 18px;
  height: 18px;
}

.favorite-show > div .mu-icon{
  position: absolute;
  top: 0;
  right: 2px;
  font-size: 18px;
}

.mu-toast{
  width: 90px;
  left: 39%;
}

.mu-popover{
  top: 56px;
  right: 0;
}

.mu-paper-mask{
  position: fixed;
  width: 100%;
  height: calc(100% - 56px);
  top: 56px;
  z-index: 11;
}

.paper{
  position: absolute;
  right: 0;
  width: 161px;
  z-index: 100;
}

.paper-enter-active,
.paper-leave-active{
  transition: all .3s ease;
}

.paper-enter, .paper-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}

.mu-item-wrapper{
  background-color: #b92c28;
}

.mu-item-title{
  color: #fff;
}
</style>    