// miniprogram/pages/home_center/device_manage/index.js.js
import { modifyDeviceName, removeDevice } from '../../../utils/api/device-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    namevalue: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { device_icon, device_name, device_id } = options
    this.setData({ 
      device_icon: `https://images.tuyacn.com/${device_icon}`, 
      device_name, 
      device_id,
      namevalue: device_name
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  showDeviceInfo: function() {
    this.setData({ dialogShow: true })
  },
  ondialogCancel: function(){
    this.setData({ dialogShow: false})
  },
  ondialogConfirm: function(){
    this.setData({ dialogShow: false})
    var {device_id,namevalue} = this.data
    console.log(device_id)
    console.log(namevalue)
    modifyDeviceName(device_id, namevalue)
  },
  onfieldChange: function(event){
    // event.detail 为当前输入的值
    //console.log(event.detail)
    this.setData({ namevalue: event.detail })
  },
  dellDevice: function(){
    var { device_id } = this.data
    removeDevice(device_id)
    wx.navigateBack({
      delta: 1
    })
  }
})