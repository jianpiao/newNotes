<template>
  <div class="favorite">
      <div class="container">
      <div class="list-group">
        <p v-for="item in notes" class="list-group-item"  :class="{active:value == item}"  @click="updateValue(item)">
            <mu-icon value="clear" class="clearPic" @click="deleteNote(item)" v-show="checkbox"/>
            <img src="../assets/favorite.png"  v-show="!item.favorite"  @click="toggleFavorite(item)" class="favo-show" />
            <img src="../assets/favorite1.png" v-show="item.favorite"  @click="toggleFavorite(item)" class="favo-show" />
            <router-link to="/home/editor" tag="span">
                <span class="note_time">
                    {{item.time | date}}
                </span>
                <h4 class="list-group-item-heading">
                    {{item.value}}
                </h4>
            </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:mapState({
      notes: state => state.notes.filter(note => note.favorite),
      value: state => state.value,
      checkbox: state => state.checkbox
  }),
  methods:{
      updateValue (note) {
          this.$store.dispatch('updateValue',note)
      },

      deleteNote (val) {
        this.$store.dispatch('deleteNote',val)
      },

      toggleFavorite (val) {
          this.$store.dispatch('toggleFavorite',val)
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
      },
  }
}
</script>


<style scoped>
.favorite{
    position: absolute;
    top: 0;
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


.list-group-item-heading {
  font-weight: 300;
  font-size: 16px;
  max-height: 48px;
  overflow: hidden;
  color: rgba(0, 0, 0, .87);
  margin: 0;
}

.note_time{
  font-size: 12px;
  opacity: .5;
  color: #987111;
  text-decoration: none;
}

.clearPic{
    position: fixed;
    margin: 0 auto;
    right: 42%;
    z-index: 11;
    font-size: 50px;
    color: #009688;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .2);
}

.favo-show{
    float: right;
}
</style>

