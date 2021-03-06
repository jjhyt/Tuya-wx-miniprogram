// miniprogram/connectpack/function_center/device_connet/index.js
import { reqTicket, getClientId } from '../../../utils/api/common-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apUrl: '/connectpack/web_view/index?urlType=apUrl',
    list: [
      {
        name: 'Wi-Fi AP 配网',
        baseUrl: 'plugin://tuya-ap-plugin/step1'
      },
      {
        name: '蓝牙配网',
        baseUrl: 'plugin://tuya-ap-plugin/ble'
      },
      {
        name: '自动发现',
        baseUrl: 'plugin://tuya-ap-plugin/auto'
      },
      {
        name: '扫码配网',
        baseUrl: 'plugin://tuya-ap-plugin/virtual'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  gotoPluginpage: async function ({ currentTarget }) {
    const { dataset: { baseurl } } = currentTarget
    const [{ ticket }, clientId] = await Promise.all([reqTicket(), getClientId()])

    wx.navigateTo({
      url: `${baseurl}?ticket=${ticket}&clientId=${clientId}`,
    })
  },

  gotoWebview: function({currentTarget}) {
    const { dataset: { baseurl } } = currentTarget
    wx.navigateTo({
      url: baseurl,
    })
  },
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
    wx.navigateBack();
  }
})