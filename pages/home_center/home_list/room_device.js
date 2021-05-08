// pages/home_center/home_list/room_device.js
import { getHomeDeviceList, roomAddDevices, roomEditDevices, roomDeleteDevices, roomDevices } from '../../../utils/api/family-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomname:"",
    home_id:"",
    room_id:"",
    deviceList:"",
    thisroomdeviceList:"",
    otherdeviceList:"",
    device_ids:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(options)
    var {home_id, room_id, roomname } = options
    var deviceList = await getHomeDeviceList(home_id)
    var thisroomdeviceList = await roomDevices(home_id, room_id)
    var device_ids = []
    for ( var i = 0; i < thisroomdeviceList.length; i++ ) {
        device_ids.push(thisroomdeviceList[i].id)
    }
    console.log(device_ids)
    var otherdeviceList = []
    for ( var j = 0; j < deviceList.length; j++ ) {
      var att = device_ids.indexOf(deviceList[j].id)
      if(att > -1) {
        console.log("kong")
      }else{
        otherdeviceList.push(deviceList[j])
        console.log(otherdeviceList)
      }

  }
    this.setData({ 
      home_id:home_id,
      room_id:room_id,
      roomname:roomname,
      deviceList:deviceList,
      thisroomdeviceList:thisroomdeviceList,
      otherdeviceList:otherdeviceList,
      device_ids:device_ids
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
  //增加房间设备操作未保存
  roomdeviceAddClick: function (e) {
    var { otherdeviceList, device_ids, thisroomdeviceList } = this.data
    //console.log(e)
    var idx = e.currentTarget.dataset.idx
    device_ids.push(otherdeviceList[idx].id)
    thisroomdeviceList.push(otherdeviceList[idx])
    otherdeviceList.splice(idx,1)
    console.log(device_ids)
    this.setData({ 
      thisroomdeviceList:thisroomdeviceList,
      otherdeviceList:otherdeviceList,
      device_ids:device_ids
     })
  },
  //删除房间设备操作保存
  roomdeviceDelClick: async function (e) {
    var { home_id, room_id, otherdeviceList, device_ids, thisroomdeviceList } = this.data
    //console.log(e)
    var idx = e.currentTarget.dataset.idx
    var thisid = thisroomdeviceList[idx].id
    var thisididx = device_ids.indexOf(thisid)
    device_ids.splice(thisididx,1)
    otherdeviceList.push(thisroomdeviceList[idx])
    thisroomdeviceList.splice(idx,1)
    console.log(device_ids)
    this.setData({ 
      thisroomdeviceList:thisroomdeviceList,
      otherdeviceList:otherdeviceList,
      device_ids:device_ids
     })
     console.log(this)
     var thisids = []
     thisids.push(thisid)
     var { success } = await roomDeleteDevices(home_id, room_id, thisids)
     if (success){
      wx.showToast({
        title: '移出成功',
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '移出失败',
        icon: 'error',
        duration: 2000
      })
    }
  },
  //保存房间设备
  roomdeviceSaveClick: async function () {
    var {home_id, room_id, device_ids} = this.data
    var { success } = await roomEditDevices(home_id, room_id, device_ids)
    if (success){
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '保存失败',
        icon: 'error',
        duration: 2000
      })
    }

  }
})