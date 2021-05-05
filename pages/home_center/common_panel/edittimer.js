// pages/home_center/common_panel/edittimer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id:"",
    thisgroupsidx:0,
    thisgroups:"",
    thistimersidx: 0,
    thistimers: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { device_id, thisgroupsidx, thisgroupsstr, thistimersidx, thistimersstr } = options
    var thisgroups = JSON.parse(thisgroupsstr)
    var thistimers = JSON.parse(thistimersstr)
    this.setData({ 
      device_id:device_id,
      thisgroupsidx:thisgroupsidx,
      thisgroups:thisgroups,
      thistimersidx:thistimersidx,
      thistimers:thistimers
    })
    console.log(this)
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