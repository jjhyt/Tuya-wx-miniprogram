// miniprogram/pages/home_center/device_list/index.js.js
import wxMqtt from '../../../utils/mqtt/wxMqtt';
import { getMqttconfig } from '../../../utils/api/device-api';
import request from '../../../utils/request';
import { getDeviceList } from '../../../utils/api/device-api'

Page({

  /**
   * 页面的初始数据
   */
  data: { 
    deviceList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { miniProgram } = wx.getAccountInfoSync();
    wx.cloud.init({ env: `ty-${miniProgram.appId}` });

    try {
      
      // wx.setStorageSync('vir_device', device_id);
      let {
        client_id,
        password,
        source_topic: { device: topic },
        url,
        username
      } = await getMqttconfig();

      wxMqtt.connectMqtt(url, { clientId: client_id, username, password, subscribeTopics: topic });
    } catch (error) {
      // wx.showModal({
      //   title: '检测到未部署SDK',
      //   content: '后续功能操作都需要SDK能力, 请去涂鸦开发平台程序一键部署SDK'
      // })
      console.log(error)
    }
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
    this.getTabBar().init();
    const deviceList = await getDeviceList()
    deviceList.forEach(item => {
      item.icon = `https://images.tuyacn.com/${item.icon}`
    })
   
    this.setData({ deviceList })
    console.log(this)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  jumpToPanel({currentTarget}) {
    const { dataset: { device } } = currentTarget
    const { id, category, name } = device
    switch (category) {
      case 'cz': 
        wx.navigateTo({
          url: `/pages/home_center/common_panel/index?device_id=${id}&device_name=${name}`,
        })
        break;
      default: {
        wx.navigateTo({
          url: `/pages/home_center/other_panel/index?device_id=${id}&device_name=${name}`,
        })
      }
    }
  },
  //跳转到添加设备页
  jumpToAdd: function(){
    wx.navigateTo({
      url: `/pages/function_center/device_connect/index`,
    })
  },
  jumpToOther({currentTarget}) {
    const { dataset: { device } } = currentTarget
    const { id, category, name } = device
    switch (category) {
      case '': break;
      default: {
        wx.navigateTo({
          url: `/pages/home_center/test_component/index?device_id=${id}&device_name=${name}`,
        })
      }
    }
  }
})