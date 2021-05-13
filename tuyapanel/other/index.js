// tuyapanel/other/index.js
import { reqTicket, getClientId } from '../../utils/api/common-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticket:"",
    clientId:"",
    device_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { device_id } = options
    this.setData({ device_id: device_id })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    const [{ ticket }, clientId] = await Promise.all([reqTicket(), getClientId()])
    var { device_id } = this.data
    wx.navigateTo({
      url: `plugin://tuya-panel-plugin/panel?ticket=${ticket}&clientId=${clientId}&device_id=${device_id}`,
    });
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