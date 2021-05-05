// pages/home_center/scenes/editdevice.js
import { getHomeDeviceList } from '../../../utils/api/family-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionsList:"",
    thisActions:"",
    deviceList:"",
    home_id:"",
    idx:"",
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const actionsList = JSON.parse(options.actionsList)
    const home_id = options.home_id
    const idx = options.idx
    const type = options.type
    const thisActions = actionsList[idx]
    const deviceList = await getHomeDeviceList(home_id)
    deviceList.forEach(item => {
      item.icon = `https://images.tuyacn.com/${item.icon}`
    })
    this.setData({ 
      actionsList:actionsList,
      thisActions:thisActions,
      deviceList:deviceList,
      type:type,
      home_id:home_id,
      idx:idx
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
  //修改老设备
  atactionsClick: function (e) {
    var id = e.currentTarget.dataset.id
    var { thisActions } = this.data
    //console.log(deviceList)
    var thisActionsstr = JSON.stringify(thisActions)
    console.log(thisActionsstr)
    var device_id = id
    var device_name = thisActions.name
    var device_icon = thisActions.icon
    wx.navigateTo({
      url: `/pages/home_center/scenes/editmiss?device_name=${device_name}&device_icon=${device_icon}&device_id=${device_id}&thisActions=${thisActionsstr}`,
    })
  },
  //选择新设备
  actionsClick: function (e) {
    var idx = e.currentTarget.dataset.idx
    console.log(idx)
    var { deviceList } = this.data
    console.log(deviceList)
    //var thisActionsstr = JSON.stringify(thisActions)
    //console.log(thisActionsstr)
    var device_id = deviceList[idx].id
    var device_name = deviceList[idx].name
    var device_icon = deviceList[idx].icon
    var thisActionsstr = "none"
    wx.navigateTo({
      url: `/pages/home_center/scenes/editmiss?device_name=${device_name}&device_icon=${device_icon}&device_id=${device_id}&thisActions=${thisActionsstr}`,
    })
  },
  //保存设备动作数据到前一页
  deviceSaveClick:function () {
    var {actionsList, type, idx, thisActions} = this.data
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    if (type == "no") {
      actionsList[idx] = thisActions
    }else {
      actionsList.push(thisActions)
    }
    
    prevPage.setData ({
      actionsList:actionsList
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      
    })
    console.log(actionsList)
  }
})