// pages/home_center/common_panel/timer.js
import { timerStatus, timerList, timerDelete } from '../../../utils/api/timer-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id:"",
    device_name:"",
    icon:"",
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
    const { device_id, device_name, icon } = options
    var result = await timerList(device_id)
    var timerListresult = result[0]
    var timerListresultgroups = timerListresult.groups
    var thisgroupsidx = 0
    var thisgroups = timerListresultgroups[thisgroupsidx]
    this.setData({ 
      device_id:device_id,
      device_name:device_name,
      icon:icon,
      //timerListresult:timerListresult,
      timerListresultgroups:timerListresultgroups,
      thisgroupsidx:thisgroupsidx,
      thisgroups:thisgroups,
      activegroupsName:thisgroupsidx
    })
    console.log(this)
  },
  //刷新事件
  reFlash: async function () {
    const { device_id } = this.data
    var result = await timerList(device_id)
    var timerListresult = result[0]
    var timerListresultgroups = timerListresult.groups
    var thisgroupsidx = 0
    var thisgroups = timerListresultgroups[thisgroupsidx]
    this.setData({ 
      timerListresultgroups:timerListresultgroups,
      thisgroupsidx:thisgroupsidx,
      thisgroups:thisgroups,
    })
    console.log(this)
  },
  //swipe点击事件
  ontimerClick: async function(event) {
    const position = event.detail
    console.log(position)
    var idx = event.currentTarget.dataset.idx
    var group_idx = event.currentTarget.dataset.id
    console.log(group_idx)
    var { timerListresultgroups, device_id, device_name, icon } = this.data
    var group_id = timerListresultgroups[group_idx].id
    var thistimers = timerListresultgroups[group_idx].timers[idx]
    var thisgroupsstr = JSON.stringify(timerListresultgroups)
    var thistimersstr = JSON.stringify(thistimers)
    this.setData({
      thistimers: thistimers,
      thistimersidx: idx,
      thisgroupsidx: group_idx
    });
    var type = "edit"
    var category = "test"
    switch (position) {
      case 'left':
        var oldstatus = thistimers.status
        var newstatus = ""
        if (oldstatus == "1") {
          newstatus = "0"
        }else{
          newstatus = "1"
        }
        var res = await timerStatus(device_id, category, group_id, newstatus)
        console.log(res)
        this.reFlash()
        break;
      case 'cell':
        
        wx.navigateTo({
          url: `/pages/home_center/common_panel/edittimer?type=${type}&device_id=${device_id}&device_name=${device_name}&icon=${icon}&thisgroupsidx=${group_idx}&thisgroupsstr=${thisgroupsstr}&thistimersidx=${idx}&thistimersstr=${thistimersstr}`,
        })
        break;
      case 'right':
        console.log(group_id)
        console.log(event.currentTarget.dataset)
        var res = await timerDelete(device_id, category, group_id)
        console.log(res)
        this.reFlash()
        break;
    }
  },
  //添加定时按钮
  timerAddClick() {
    var { timerListresultgroups, device_id, device_name, icon } = this.data
    var thisgroupsstr = JSON.stringify(timerListresultgroups)
    var type = "add"
    wx.navigateTo({
      url: `/pages/home_center/common_panel/edittimer?type=${type}&device_id=${device_id}&device_name=${device_name}&icon=${icon}&thisgroupsstr=${thisgroupsstr}`,
    })
  },
  //废弃
  ongroupsChange(event) {
    var thisgroupsidx = event.detail
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