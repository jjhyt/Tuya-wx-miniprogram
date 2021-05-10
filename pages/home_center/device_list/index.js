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
    deviceList: [],
    lanSwitchList: [],
    lanTempList: [],
    realTime: null,
    lanurl: ""
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
    var that = this
    var lanip = wx.getStorageSync('lanIP')
    var lanport = wx.getStorageSync('lanPort')
    if (lanip.length < 8 ){
      lanip = "192.168.1.1"
    }
    var lanurl = "http://" + lanip + ":" + lanport +"/json.htm"
    console.log(lanurl , lanip.length)
    this.setData({ lanurl })
    wx.request({
      url: lanurl,
      data: {
        type: 'devices',
        used: 'true',
        filter: 'light',
        favorite: '1'
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        var lanSwitchList = res.data.result
        console.log(lanSwitchList)
        that.setData({ lanSwitchList })
      }
    })
    wx.request({
      url: lanurl,
      data: {
        type: 'devices',
        used: 'true',
        filter: 'weather',
        favorite: '1'
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        var lanTempList = res.data.result
        console.log(lanTempList)
        that.setData({ lanTempList })
      }
    })
    /**
     * 每隔一段时间请求服务器刷新数据(客户状态)
     * 当页面显示时开启定时器(开启实时刷新)
     * 每隔1分钟请求刷新一次
     * @注意：用户切换后页面会重新计时
     */
    that.data.realTime = setInterval(function()
    {
      wx.request({
        url: lanurl,
        data: {
          type: 'devices',
          used: 'true',
          filter: 'light',
          favorite: '1'
        },
        header: {
          'content-type': 'application/json'
        },
        success (res) {
          var lanSwitchList = res.data.result
          console.log(lanSwitchList)
          that.setData({ lanSwitchList })
        }
      })
      wx.request({
        url: lanurl,
        data: {
          type: 'devices',
          used: 'true',
          filter: 'weather',
          favorite: '1'
        },
        header: {
          'content-type': 'application/json'
        },
        success (res) {
          var lanTempList = res.data.result
          console.log(lanTempList)
          that.setData({ lanTempList })
        }
      })

    }, 60000)//间隔时间
    // 更新数据
    this.setData({
      realTime:that.data.realTime   //实时数据对象(用于关闭实时刷新方法)
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
/**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function()
  {

    /**
     * 当页面隐藏时关闭定时器(关闭实时刷新)
     * 切换到其他页面了
     */
     clearInterval(this.data.realTime)
  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
  wx.request({
    url: lanurl,
    data: {
      type: 'devices',
      used: 'true',
      filter: 'light',
      favorite: '1'
    },
    header: {
      'content-type': 'application/json'
    },
    success (res) {
      var lanSwitchList = res.data.result
      console.log(lanSwitchList)
      that.setData({ lanSwitchList })
    }
  })
  wx.request({
    url: lanurl,
    data: {
      type: 'devices',
      used: 'true',
      filter: 'weather',
      favorite: '1'
    },
    header: {
      'content-type': 'application/json'
    },
    success (res) {
      var lanTempList = res.data.result
      console.log(lanTempList)
      that.setData({ lanTempList })
    }
  })
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
  },
  //局域网开关操作
  lanSwitchChange({currentTarget}) {
    var { dataset: { id, idx } } = currentTarget
    var { lanurl, lanSwitchList } = this.data
    console.log(id, idx)
    var thatsta = lanSwitchList[id].Status
    if (thatsta == 'On') {
      var thissta = "Off"
    }else{
      var thissta = "On"
    }
    lanSwitchList[id].Status = thissta
    this.setData({ lanSwitchList })
    wx.request({
      url: lanurl,
      data: {
        type: 'command',
        param: 'switchlight',
        idx: idx,
        switchcmd: thissta
      },
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data.status)
      }
    })
  }
})