// pages/home_center/scenes/editmiss.js
import { deviceSpec } from '../../../utils/api/scenes-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id: "",
    thisdeviceSpec: "",
    functionsList: "",
    missACvalue:"",
    acshow: false,
    intshow: false,
    missactions: [
      {
        name: '选项一',
      },
      {
        name: '选项二',
      },
    ],
    acshowtittle:"标题",
    idx:"",
    sliderMin: 0,
    sliderMax: 500,
    sliderStep: 1,
    slidervalue:0,
    thisActions: {
      "entity_id": "",
      "executor_property": "",
      "icon": "",
      "name": ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const device_id = options.device_id
    const device_name = options.device_name
    const device_icon = options.device_icon
    var missACvalue = ""
    var thisActionsstr = options.thisActions
    if (thisActionsstr.length > 5) {
      var thisActions = JSON.parse(thisActionsstr)
      missACvalue = JSON.stringify(thisActions.executor_property)
    }else {
      var thisActions = {
        "entity_id": "",
        "executor_property": "",
        "icon": "",
        "name": ""
      }
      missACvalue = "none"
    }
    
    var thisdeviceSpecr = await deviceSpec(device_id)
    var thisdeviceSpec = thisdeviceSpecr.result.data
    var functionsList = thisdeviceSpec.functions
    this.setData({ 
      device_id:device_id,
      device_name:device_name,
      device_icon:device_icon,
      thisdeviceSpec: thisdeviceSpec,
      functionsList:functionsList,
      missACvalue:missACvalue,
      thisActions:thisActions
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

  //点击选择动作
  functionsClick: function (e) {
    var idx = e.currentTarget.dataset.idx
    var {functionsList} = this.data
    var typestr = functionsList[idx].type
    switch (typestr) {
      case 'Boolean': 
        var missactions = [
          {
            name: '打开',
          },
          {
            name: '关闭',
          },
        ]
        this.setData({ 
          acshowtittle: "选择开关" ,
          missactions:missactions,
          acshow: true
        });
        break;
      case 'Integer': 
      var { min, max, step } = JSON.parse(functionsList[idx].values)
      this.setData({ 
        acshowtittle: "选择数值" ,
        sliderMin:min,
        sliderMax:max,
        sliderStep:step,
        intshow: true
      });
      //console.log(functionsList[idx].values)
      console.log(this)
        break;  
      default: {
        
      }
    }
    this.setData({ 
      idx:idx
    });
    console.log(typestr)
    console.log(this)
  },
  onacshowClose() {
    this.setData({ acshow: false });
  },
  onintshowClose() {
    this.setData({ intshow: false });
  },

  onacshowSelect(event) {
    console.log(event.detail);
    var name = event.detail.name
    var {idx, functionsList} = this.data
    var typestr = functionsList[idx].type
    var swvalue = false
    switch (typestr) {
      case 'Boolean': 
        if (name == "打开"){
          swvalue = true
          
        } else {
          swvalue = false
        }
        var missJsonstr = '{"'+functionsList[idx].code+'":'+swvalue+'}'
        //var missJson = JSON.parse(missJsonstr)
        this.setData({ 
          missACvalue:missJsonstr
        });
        //console.log(missJson)
        break;
      case 'Integer': 
        
        break;  
      default: {
        
      }
    }
  },

  onsliderChange(event) {
    this.setData({ slidervalue: event.detail.value })
    
  },
  sliderSaveClick() {
    var {slidervalue, idx, functionsList} = this.data
    var missJsonstr = '{"'+functionsList[idx].code+'":'+slidervalue+'}'
    //var missJson = JSON.parse(missJsonstr)
    this.setData({ 
          missACvalue:missJsonstr,
          intshow: false
    });
    //console.log(missJson)
    
  },
  functionsSaveClick() {
    var {device_id, device_name, device_icon, missACvalue, thisActions } = this.data
    console.log(missACvalue)
    
    thisActions.entity_id = device_id
    thisActions.name = device_name
    thisActions.icon = device_icon
    thisActions.executor_property = JSON.parse(missACvalue)
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.setData ({
      thisActions:thisActions
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      
    })
  },
})