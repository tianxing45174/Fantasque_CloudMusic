//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备state——用于存储数据
const state = {
}
//准备actions——用于响应组件中的动作
const actions = {
}
//准备mutations——用于操作数据（state）
const mutations = {
}
//准备getters——用于将state中的数据进行加工 //类计算属性
const getters = {
}

import musicPlayOptions from "./musicPlay"
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: { 
    musicPlay: musicPlayOptions
  }
})