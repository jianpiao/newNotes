//  引入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const LocalEvent = function (item) {    // 定义一个本地存储的构造函数
  this.get = function () {              // 拿数据
    return JSON.parse(localStorage.getItem(item))
  }
  this.set = function (obj) {           // 存数据
    localStorage.setItem(item, JSON.stringify(obj))
  }
  this.remove = function () {           // 删数据
    localStorage.removeItem(item)
  }
}
const local = new LocalEvent('Notes') // 创建一个本地存储的实例

//  数组排序
function compare (time) {
  return function (a, b) {
    var value1 = a[time]
    var value2 = b[time]
    return value2 - value1
  }
}

const state = local.get() || {
  notes: [],
  deleteNotes: [],
  // activeNote: '',
  value: '',
  id: 0,
  favorite: false,
  time: '',
  editTime: '',
  delete_time: '',
  fontSize: '',
  num: 14,
  backgroundColor: '',
  back: '',
  tag: '',
  delete_tag: '',
  delNote: '',
  titleSelect: '全部便签',
  trash: false,
  allNote: true,
  favorShow: false,
  checkbox: false
}

const mutations = {
  //  添加笔记
  ADD_NOTE (state) {
    state.editTime = Date()
    var time = new Date().getTime()
    const newNote = {
      /*
          text:默认文字内容
          favorite:收藏
      */
      value: '',
      text: '',
      favorite: false,
      time: Date(),
      tag: time,
      delete_time: '',
      delete_tag: ''
    }
    state.id++
    state.notes.push(newNote)
    // state.activeNote = newNote
    state.value = newNote
    state.notes.sort(compare('tag'))
  },

  EDIT_VALUE  (state, value) {
    state.value.value = value
    for (let i in state.notes) {
      if (state.notes[i] === state.value) {
        let newTag = new Date().getTime()
        state.notes[i].time = Date()
        state.notes[i].tag = newTag
        state.notes.sort(compare('tag'))
      }
    }
  },

  SET_VALUE (state, value) {
    state.value = value
    state.editTime = value.time
  },

  // 切换笔记的收藏与取消收藏
  TOGGLE_FAVORITE (state, val) {
    val.favorite = !val.favorite
    local.set(state)
  },

  CHANGE_FAVORITE (state) {
    state.value.favorite = !state.value.favorite
    local.set(state)
  },

  //  删除笔记
  DELETE_NOTE (state, val) {
    if (state.titleSelect === '全部便签') {
      for (let i in state.notes) {
        if (state.notes[i] === val) {
          state.deleteNotes.push(state.notes[i])
          state.deleteNotes.sort(compare('tag'))
          state.notes.splice(state.notes[i], 1)
        }
      }
    } else if (state.titleSelect === '收藏') {
      for (let i in state.notes.favorite) {
        if (state.notes[i] === state.value) {
          state.deleteNotes.push(state.notes[i])
          state.deleteNotes.sort(compare('tag'))
          state.notes.splice(i, 1)
        }
      }
    } else if (state.titleSelect === '回收站') {
      for (let i in state.deleteNotes) {
        state.deleteNotes.splice(i, 1)
        local.set(state)
      }
    }
    local.set(state)
  },

  //  全部删除
  DELETE_ALL (state) {
    if (state.titleSelect === '全部便签') {
      for (let i of state.notes) {
        state.deleteNotes.push(i)
        state.deleteNotes.sort(compare('tag'))
        state.notes.splice(i, state.notes.length)
      }
    } else if (state.titleSelect === '收藏') {
      for (let i of state.notes.favorite) {
        state.deleteNotes.push(i)
        state.deleteNotes.sort(compare('tag'))
        state.notes.splice(i, state.notes.length)
      }
    } else if (state.titleSelect === '回收站') {
      for (let i of state.deleteNotes) {
        state.deleteNotes.splice(i, state.deleteNotes.length)
      }
    }
    local.set(state)
  },

    //  字体大小
  INCREASE (state) {
    state.num++
    let size = state.num + 'px'
    state.fontSize = size
    local.set(state)
  },

  REDUCED (state) {
    if (state.num > 12) {
      state.num--
      let size = state.num + 'px'
      state.fontSize = size
      local.set(state)
    }
  },

  TITLE_SELECT  (state, val) {
    if (val === '全部便签') {
      state.trash = false
      state.allNote = true
      state.favorShow = false
    } else if (val === '收藏') {
      state.trash = false
      state.allNote = false
      state.favorShow = true
    } else if (val === '回收站') {
      state.trash = true
      state.allNote = false
      state.favorShow = false
    }
    state.titleSelect = val
    local.set(state)
  },

  CHECKBOX_TOGGLE (state) {
    if (state.titleSelect === '全部便签') {
      state.checkbox = !state.checkbox
    } else if (state.titleSelect === '收藏') {
      state.checkbox = !state.checkbox
    } else if (state.titleSelect === '回收站') {
      state.checkbox = !state.checkbox
    }
    local.set(state)
  }

}

const actions = {
  addNote ({ commit }) {
    commit('ADD_NOTE')
  },

  editValue ({ commit }, value) {
    commit('EDIT_VALUE', value)
    local.set(state)
  },

  updateValue ({ commit }, value) {
    commit('SET_VALUE', value)
  },

  toggleFavorite ({ commit }, val) {
    commit('TOGGLE_FAVORITE', val)
  },

  changeFavorite ({ commit }) {
    commit('CHANGE_FAVORITE')
  },

  deleteNote ({ commit }, val) {
    commit('DELETE_NOTE', val)
  },

  deleteAll ({ commit }) {
    commit('DELETE_ALL')
  },

  saveNoet ({ commit }) {
    commit('ADDEVENT')
  },

  increase ({ commit }) {
    commit('INCREASE')
  },

  reduced ({ commit }) {
    commit('REDUCED')
  },

  titleSelect ({ commit }, val) {
    commit('TITLE_SELECT', val)
  },

  checkboxToggle ({ commit }) {
    commit('CHECKBOX_TOGGLE')
  }

}

const getters = {
  /*
      Vuex 允许我们在 store 中定义『getters』
      （可以认为是 store 的计算属性）。
      就像计算属性一样，getters的返回值会根据它的依赖被缓存起来，
      且只有当它的依赖值发生了改变才会被重新计算。
      所以这里的计算放到了需要计算值的组件的cumputer里面
      例如:fontSize每次触发会在mutation中计算,
           而getters就把最后算好的值放到了组件中显示

      Getters 接受 state 作为其第一个参数
      （这是es6语法 ↓）
      state => state.notes为箭头函数等价于：
      function (state){
          return state.notes 
      }
  */
    // notes:           state => state.notes,
  //   value:           state => state.value,
  //   activeNote:      state => state.activeNote,
  //   deleteNotes:     state => state.deleteNotes,
  //   fontSize:        state => state.fontSize,
  //   time:            state => state.time,
  //   editTime:        state => state.editTime,
  //   backgroundColor: state => state.backgroundColor,
  //   back:            state => state.back,
  //   delNote:         state => state.delNote,
  //   titleSelect:     state => state.titleSelect,
  //   trash:           state => state.trash,
  //   allNote:         state => state.allNote,
  //   favorShow:       state => state.favorShow
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
