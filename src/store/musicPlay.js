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
			//当前音量
			soundValue: 0,
			//当前播放时间 分:秒
			playTime: 0,
			//当前播放时间 秒
			playTimeBySecond: 0,
			//当前播放音乐总时间 分:秒
			playTotalTime: "",
			//当前播放音乐总时间 秒
			playTotalTimeBySecond: "",
			//随机播放记录
			RandomPlayValue: {
				index: 0,
				value: []
			},
			//歌曲详情显示 false为不显示 true为显示
			FullScreenShow: false
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
			console.log("statemusic", state.music.thisPlay.music);
		},
		//播放上一首
		PLAYPRE(state) {
			var toPlayValue = 1
			var _thisPlay = state.music.thisPlay;
			var _PlayList = state.music.playList;
			//随机播放
			if (state.music.model == 2) {
				do {
					if (_thisPlay.index == 0) {
						// console.log("_thisPlay.index == 0");
						break;
					}
					var toPlayValue = Math.floor(Math.random() * (_thisPlay.index));
				} while (toPlayValue == 0 && _thisPlay.index !=0 )
				if (state.music.RandomPlayValue.index > 0) {
					toPlayValue = state.music.RandomPlayValue.value[state.music.RandomPlayValue.index - 1]
					state.music.RandomPlayValue.index--
				} else {
					state.music.RandomPlayValue = {
						index: 0,
						value: []
					}
					// toPlayValue = 1
				}
			}
			if (_thisPlay.index == 0) {
				//如果是列表第一首
				state.music.thisPlay = {
					index: _PlayList.length - 1,
					music: _PlayList[_PlayList.length - 1],
				};
			} else {
				state.music.thisPlay = {
					index: _thisPlay.index - toPlayValue,
					music: _PlayList[_thisPlay.index - toPlayValue],
				};
			}
			// console.log("state.music.RandomPlayValue.index >= 0",state.music.RandomPlayValue.index >= 0);
			// console.log("state.music.RandomPlayValue.index",state.music.RandomPlayValue.value);
			// console.log("toPlayValue",toPlayValue);
			// console.log("state.music.thisPlay",state.music.thisPlay.index);
			state.music.playStatus = false;
			state._refs.AppAudio.load()
		},
		//播放下一首
		PLAYNEXT(state) {
			var toPlayValue = 1
			var _thisPlay = state.music.thisPlay;
			var _PlayList = state.music.playList;

			//随机播放
			if (state.music.model == 2) {
				if (_thisPlay.index != _PlayList.length - 1) {
					do {
						if (_PlayList.length - _thisPlay.index == 0) {
							// console.log("_PlayList.length - _thisPlay.index");
							break;
						}
						toPlayValue = Math.floor(Math.random() * (_PlayList.length - _thisPlay.index));
					} while (toPlayValue == 0)
				}
				// 循环历史下标不为0 和 下标和历史记录下标不同 时为TRUE
				if (state.music.RandomPlayValue.index != 0 && state.music.RandomPlayValue.index != state.music.RandomPlayValue.value.length) {
					toPlayValue = state.music.RandomPlayValue.value[state.music.RandomPlayValue.index - 1]
				} else {
					state.music.RandomPlayValue.value.push(toPlayValue)
				}
				state.music.RandomPlayValue.index++
			} else {
				state.music.RandomPlayValue = {
					index: 0,
					value: []
				}
			}
			
			if (_thisPlay.index == _PlayList.length - 1) {
				//如果是列表最后一首
				state.music.thisPlay = {
					index: 0,
					music: _PlayList[0],
				};
			} else {
				state.music.thisPlay = {
					index: _thisPlay.index + toPlayValue,
					music: _PlayList[_thisPlay.index + toPlayValue],
				};
			}
			// console.log(state.music.thisPlay);
			// console.log("state.music.RandomPlayValue.index",state.music.RandomPlayValue.value);
			// console.log("toPlayValue",toPlayValue);
			// console.log("state.music.thisPlay",state.music.thisPlay.index);
			state.music.playStatus = false;
			state._refs.AppAudio.load();
		},
		//删除歌单
		DELETEPLAYMUSIC(state, index) {
			// console.log(index);
			// console.log(state.music.playList);
			if (index == "ALL" || state.music.playList.length == 1) {
				state.music.playBoxStatus = false
				state.music.FullScreenShow = false
				state.music.playList = []
				state.music.thisPlay = {
					//在列表中的位置
					index: 0,
					//音乐
					music: {}
				}
				state.music.RandomPlayValue = {
					index: 0,
					value: []
				}
			}
			if (index == state.music.thisPlay.index) {
				this.commit("musicPlay/PLAYNEXT")
				state.music.thisPlay.index = index
			}
			state.music.playList.splice(index, 1)
		},
		//切换播放
		CHANGEPLAYMUSIC(state, index) {
			state.music.thisPlay = {
				index,
				music: state.music.playList[index]
			}
		}
	},
	//准备getters——用于将state中的数据进行加工 //类计算属性
	// getters: {
	// 	nowTime(state) {
	// 		var MaxTime = state.music.playTotalTime
	// 		console.log("getters", MaxTime);
	// 		return MaxTime
	// 	}
	// }
}