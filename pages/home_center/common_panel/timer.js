// pages/home_center/common_panel/timer.js
import { timerAdd, timerEdit, timerStatus, timerList, timerDelete } from '../../../utils/api/timer-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id:"",
    //timerListresult:"",
    timerListresultgroups:"",
    thisgroupsidx:0,
    thisgroups:"",
    activegroupsName:"",
    thistimersidx: 0,
    thistimers: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { device_id } = options
    var result = await timerList(device_id)
    var timerListresult = result[0]
    var timerListresultgroups = timerListresult.groups
    var thisgroupsidx = 0
    var thisgroups = timerListresultgroups[thisgroupsidx]
    this.setData({ 
      device_id:device_id,
      //timerListresult:timerListresult,
      timerListresultgroups:timerListresultgroups,
      thisgroupsidx:thisgroupsidx,
      thisgroups:thisgroups,
      activegroupsName:thisgroupsidx
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

  },
  //swipe点击事件
  ontimerClick(event) {
    const position = event.detail
    console.log(position)
    var idx = event.currentTarget.dataset.idx
    console.log(idx)
    var { thisgroups, thisgroupsidx, device_id } = this.data
    var thistimers = thisgroups.timers[idx]
    var thisgroupsstr = JSON.stringify(thisgroups)
    var thistimersstr = JSON.stringify(thistimers)
    this.setData({
      thistimers: thistimers,
      thistimersidx: idx
    });
    var type = "edit"
    switch (position) {
      case 'left':
        console.log('禁用')
        break;
      case 'cell':
        
        wx.navigateTo({
          url: `/pages/home_center/common_panel/edittimer?type=${type}&device_id=${device_id}&thisgroupsidx=${thisgroupsidx}&thisgroupsstr=${thisgroupsstr}&thistimersidx=${idx}&thistimersstr=${thistimersstr}`,
        })
        break;
      case 'right':
        wx.navigateTo({
          url: `/pages/home_center/common_panel/edittimer?type=${type}&device_id=${device_id}&thisgroupsidx=${thisgroupsidx}&thisgroupsstr=${thisgroupsstr}&thistimersidx=${idx}&thistimersstr=${thistimersstr}`,
        })
        break;
    }
  },
  //添加定时按钮
  timerAddClick() {
    var type = "add"
    wx.navigateTo({
      url: `/pages/home_center/common_panel/edittimer?type=${type}`,
    })
  },
  ongroupsChange(event) {
    thisgroupsidx = event.detail
    var { timerListresultgroups } = this.data
    var thisgroupsidxint = parseInt(thisgroupsidx)
    var thisgroups = timerListresultgroups[thisgroupsidxint]
    this.setData({
      activegroupsName: thisgroupsidx,
      thisgroupsidx: thisgroupsidxint,
      thisgroups: thisgroups
    });
  },
})