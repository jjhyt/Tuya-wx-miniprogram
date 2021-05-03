Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'cluster',
				text: '设备',
				url: '/pages/home_center/device_list/index'
			},
			{
				icon: 'wap-home',
				text: '家庭',
				url: '/pages/home_center/home_list/index'
			},
			{
				icon: 'manager',
				text: '关于',
				url: '/pages/home_center/about/index'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
