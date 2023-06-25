//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备state——用于存储数据
const state = {
  music:{
    //当前播放音乐
    thisPlay: {
      //在列表中的位置
      index: 0,
      //音乐
      music: {}
    },
    //播放列表
    playList: [],
    //播放模式 1 列表 2随机 3单曲
    model: 1,
    //播放状态
    playStatus: false,
    //播放时间
    playTime: 0
  }
}

//准备actions——用于响应组件中的动作
const actions = {
}
//准备mutations——用于操作数据（state）
const mutations = {
  ADDPLAYLIST(state,music){
    var i = state.music.playList.indexOf()
    if (i != -1) {
      state.music.playList.splice(i,1)
    }
    state.music.thisPlay = {
      //在列表中的位置
      index: 0,
      //音乐
      music
    },
    state.music.playStatus = true
    state.music.playList.unshift(music)
    console.log("music",state.music.thisPlay.music);
  }
}


export default new Vuex.Store({
  state,
  // getters,
  actions,
  mutations,
  // modules
})
