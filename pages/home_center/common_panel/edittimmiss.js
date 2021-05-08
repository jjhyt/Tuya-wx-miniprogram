// pages/home_center/common_panel/edittimmiss.js
import { deviceSpec } from '../../../utils/api/scenes-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id: "",
    device_name: "",
    icon: "",
    type: "",
    thisfunctions:"",
    thisfunctionsidx: "",
    thisfunctionsList: "",
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
    thisfunctions: {
      code: "", 
      value: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var {device_name, icon, device_id, type, functionsListstr, thisfunctionsidx, thisfunctionsstr } = options
    var missACvalue = ""
    var thisfunctionsList = JSON.parse(functionsListstr)
    if (type == "edit") {
      var thisfunctions = JSON.parse(thisfunctionsstr)
      missACvalue = thisfunctionsstr
    }else {
      var thisfunctions = {
        code: "", 
        value: false
      }
      missACvalue = "none"
    }
    
    var thisdeviceSpecr = await deviceSpec(device_id)
    var thisdeviceSpec = thisdeviceSpecr.result.data
    var functionsList = thisdeviceSpec.functions
    this.setData({ 
      device_id:device_id,
      device_name:device_name,
      icon:icon,
      type:type,
      thisdeviceSpec: thisdeviceSpec,
      functionsList:functionsList,
      missACvalue:missACvalue,
      thisfunctions:thisfunctions,
      thisfunctionsidx: thisfunctionsidx,
      thisfunctionsList: thisfunctionsList
     })
     console.log(this)
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
        var missJsonstr = '{"code":"'+functionsList[idx].code+'","value":'+swvalue+'}'
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
    var missJsonstr = '{"code":"'+functionsList[idx].code+'","value":'+slidervalue+'}'
    //var missJson = JSON.parse(missJsonstr)
    this.setData({ 
          missACvalue:missJsonstr,
          intshow: false
    });
    //console.log(missJson)
    
  },
  functionsSaveClick() {
    var { type, missACvalue, thisfunctionsList, thisfunctionsidx } = this.data
    console.log(missACvalue)
    // thisActions.entity_id = device_id
    // thisActions.name = device_name
    // thisActions.icon = device_icon
    // thisActions.executor_property = JSON.parse(missACvalue)
    var jsonstr = JSON.parse(missACvalue)
    if (type == "edit") {
      thisfunctionsList[thisfunctionsidx] = jsonstr
    }else{
      thisfunctionsList = thisfunctionsList.concat(jsonstr) 
    }
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.setData ({
      functionsList:thisfunctionsList
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      
    })
  },
  //删除动作
  functionsDelClick(){
    var { type, thisfunctionsList, thisfunctionsidx } = this.data
    if (type == "edit") {
      thisfunctionsList.splice(thisfunctionsidx,1)
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      prevPage.setData ({
        functionsList:thisfunctionsList
      })
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
      
      })
    }
  }
})