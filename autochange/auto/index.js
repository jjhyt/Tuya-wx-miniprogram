// autochange/auto/index.js
import { reqTicket, getClientId } from '../../utils/api/common-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticket:"",
    clientId:"",
    home_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { home_id } = options
    this.setData({ home_id: home_id })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    const [{ ticket }, clientId] = await Promise.all([reqTicket(), getClientId()])
    var { home_id } = this.data
    wx.navigateTo({
      url: `plugin://tuya-auto-plugin/autohome?ticket=${ticket}&clientId=${clientId}&home_id=${home_id}`,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})