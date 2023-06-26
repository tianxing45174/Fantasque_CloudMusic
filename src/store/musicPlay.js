//音乐播放相关store
export default {
	namespaced: true,
	//准备state——用于存储数据
	state: {
		music: {
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
			//播放器状态
			playBoxStatus: false,
			//播放状态
			playStatus: false,
			//播放时间
			playTime: 0,
			//当前音量
			soundValue: 0,
			//当前播放dom元素
			// AppAudio:{}
		},
		_refs: {}
	},
	//准备actions——用于响应组件中的动作
	actions: {

	},
	//准备mutations——用于操作数据（state）
	mutations: {
		ADDPLAYLIST(state, music) {
			var i = state.music.playList.findIndex(({ id }) => {
				return id == music.id
			})
			if (i != -1) {
				state.music.playList.splice(i, 1)
			}
			state.music.thisPlay = {
				//在列表中的位置
				index: 0,
				//音乐
				music
			},
			state.music.playBoxStatus = true
			state.music.playList.unshift(music)
			console.log("statemusic", state);
			// console.log("thismusic",music);
		}
	},
	//准备getters——用于将state中的数据进行加工 //类计算属性
	// getters: {
	// 	nowTime(state) {

	// 	}
	// }
}