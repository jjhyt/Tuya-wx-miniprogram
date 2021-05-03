// pages/home_center/about/index.js
import { reqTicket, getClientId } from '../../../utils/api/common-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
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

  },
  //点击消息中心
  msgClick: async function(){
    const [{ ticket }, clientId] = await Promise.all([reqTicket(), getClientId()])
    wx.navigateTo({
      url: `plugin://tuya-message-center/index?ticket=${ticket}&clientId=${clientId}`,
    })
    console.log(ticket)
    console.log(clientId)
  },
  //点击家庭管理
  homeClick: function(){
    
    wx.navigateTo({
      url: `/pages/home_center/family/index`,
    })
  }
  

})