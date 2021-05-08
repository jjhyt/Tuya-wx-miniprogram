// pages/home_center/common_panel/edittimer.js
import { timerAdd, timerEdit, timerDelete } from '../../../utils/api/timer-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id:"",
    device_name:"",
    icon:"",
    type:"",
    thisgroupsidx:0,
    thisgroups:"",
    thistimersidx: 0,
    thistimers: "",
    thisdate: "",
    thistime: "",
    // thisalias_name: "",
    Sunchecked:"1",
    Monchecked:"1",
    Tuechecked:"1",
    Wedchecked:"1",
    Thuchecked:"1",
    Frichecked:"1",
    Satchecked:"1",
    functionsList: "",
    thisfunctionsidx:0,
    thisfunctions:"",
    timeshow:false,
    currenttimeDate: "",
    minDate: "",
    maxDate:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { device_id, type, device_name, icon, thisgroupsidx, thisgroupsstr, thistimersidx, thistimersstr } = options
    var thisgroups = JSON.parse(thisgroupsstr)
    if (type == "edit") {
      var thistimers = JSON.parse(thistimersstr)
    }else{
      var thistimers = {
        "date": "19810324",
        "functions": [],
        "loops": "0000000",
        "time": "08:00"
      }
    }
    var functionsList = thistimers.functions
    var thisdate = thistimers.date
    var thistime = thistimers.time
    // var thisalias_name = thistimers.alias_name
    var loops = thistimers.loops
    var Sunchecked = loops.substring(0,1)
    var Monchecked = loops.substring(1,2)
    var Tuechecked = loops.substring(2,3)
    //var Wedchecked = "1"
    var Wedchecked = loops.substring(3,4)
    var Thuchecked = loops.substring(4,5)
    var Frichecked = loops.substring(5,6)
    var Satchecked = loops.substring(6,7)
    this.setData({ 
      device_id:device_id,
      type:type,
      device_name:device_name,
      icon:icon,
      thisgroupsidx:thisgroupsidx,
      thisgroups:thisgroups,
      thistimersidx:thistimersidx,
      thistimers:thistimers,
      functionsList:functionsList,
      thisdate:thisdate,
      thistime:thistime,
      // thisalias_name:thisalias_name,
      Sunchecked:Sunchecked,
      Monchecked:Monchecked,
      Tuechecked:Tuechecked,
      Wedchecked:Wedchecked,
      Thuchecked:Thuchecked,
      Frichecked:Frichecked,
      Satchecked:Satchecked
    })
    console.log(this)
  },
  //时间日期格式化函数
  add0(m) {
    return m<10?'0'+m:m 
  },
  formatdate(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    // var h = time.getHours();
    // var mm = time.getMinutes();
    // var s = time.getSeconds();
    return y+this.add0(m)+this.add0(d);
  },
  formattime(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    // var y = time.getFullYear();
    // var m = time.getMonth()+1;
    // var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    // var s = time.getSeconds();
    return this.add0(h)+':'+this.add0(mm);
  },
  //周日-周六点击事件
  onSunChange(event) {
    var cc = event.detail
    console.log(cc)
    var checked = ""
    if (cc) {
      checked = "1"
    }else{
      checked = "0"
    }
    this.setData({
      Sunchecked: checked
    });
  },
  onMonChange(event) {
    var cc = event.detail
    console.log(cc)
    var checked = ""
    if (cc) {
      checked = "1"
    }else{
      checked = "0"
    }
    this.setData({
      Monchecked: checked
    });
  },
  onTueChange(event) {
    var cc = event.detail
    console.log(cc)
    var checked = ""
    if (cc) {
      checked = "1"
    }else{
      checked = "0"
    }
    this.setData({
      Tuechecked: checked
    });
  },
  onWedChange(event) {
    var cc = event.detail
    console.log(cc)
    var checked = ""
    if (cc) {
      checked = "1"
    }else{
      checked = "0"
    }
    this.setData({
      Wedchecked: checked
    });
  },
  onThuChange(event) {
    var cc = event.detail
    console.log(cc)
    var checked = ""
    if (cc) {
      checked = "1"
    }else{
      checked = "0"
    }
    this.setData({
      Thuchecked: checked
    });
  },
  onFriChange(event) {
    var cc = event.detail
    console.log(cc)
    var checked = ""
    if (cc) {
      checked = "1"
    }else{
      checked = "0"
    }
    this.setData({
      Frichecked: checked
    });
  },
  onSatChange(event) {
    var cc = event.detail
    console.log(cc)
    var checked = ""
    if (cc) {
      checked = "1"
    }else{
      checked = "0"
    }
    this.setData({
      Satchecked: checked
    });
  },
  //设置时间框
  timerselectClick(){
    var currenttimeDate = new Date().getTime()
    var minDate = new Date().getTime()
    var maxYear = new Date().getFullYear() + 1
    var maxDate = new Date(maxYear, 12, 31).getTime()
    this.setData({
      currenttimeDate:currenttimeDate,
      minDate:minDate,
      maxDate:maxDate,
      timeshow: true
    });
  },
  ontimeshowClose(){

    this.setData({
      timeshow: false
    });
  },
  ontimeshowInput(event) {

    this.setData({
      currenttimeDate: event.detail
    });
  },
  ontimeshowConfirm(event) {
    var datetime = event.detail
    var thisdate = this.formatdate(datetime)
    var thistime = this.formattime(datetime)
    console.log(thisdate)
    console.log(thistime)
    this.setData({
      currenttimeDate: event.detail,
      thisdate:thisdate,
      thistime:thistime,
      timeshow: false
    });
  },
  //点击编辑动作
  atactionsClick: function(e){
    var idx = e.currentTarget.dataset.idx
    var { device_id, device_name, icon, functionsList } = this.data
    var thisfunctions = functionsList[idx]
    var functionsListstr = JSON.stringify(functionsList)
    var thisfunctionsstr = JSON.stringify(thisfunctions)
    var type = "edit"
    console.log(functionsListstr)
    this.setData({
      thisfunctionsidx: idx,
      thisfunctions:thisfunctions
    });
    wx.navigateTo({
      url: `/pages/home_center/common_panel/edittimmiss?device_name=${device_name}&icon=${icon}&device_id=${device_id}&type=${type}&functionsListstr=${functionsListstr}&thisfunctionsidx=${idx}&thisfunctionsstr=${thisfunctionsstr}`,
    })
  },
  //添加动作
  actionsAddClick: function(){
    var { device_id, device_name, icon, functionsList } = this.data
    var functionsListstr = JSON.stringify(functionsList)
    var type = "add"
    console.log(functionsListstr)
    wx.navigateTo({
      url: `/pages/home_center/common_panel/edittimmiss?device_name=${device_name}&icon=${icon}&device_id=${device_id}&type=${type}&functionsListstr=${functionsListstr}`,
    })
  },
  //保存按钮
  timerAddClick: async function() {
    var { type, device_id, thisgroupsidx, thisgroups, thistimersidx, thistimers, functionsList, thisdate, thistime, Sunchecked, Monchecked, Tuechecked, Wedchecked, Thuchecked, Frichecked, Satchecked } = this.data
    var loops = Sunchecked + Monchecked + Tuechecked + Wedchecked + Thuchecked + Frichecked + Satchecked 
    
    var category = "test"
    if (loops == "0000000"){
      var instruct = [{
        "time":thistime,
        "date":thisdate,
       // "alias_name": "测试", 
        "functions":functionsList
      }]
      console.log(thisdate)
    }else{
      var instruct = [{
        "time":thistime,
        // "alias_name": "测试",
        "functions":functionsList
      }]
    }
    console.log(loops)
    // console.log(group_id)
    console.log(instruct)
    thistimers.date = thisdate
    thistimers.time = thistime
    thistimers.loops = loops
    thistimers.functions = functionsList
    if (type == "edit") {
      var group_id = thisgroups[thisgroupsidx].id
      var res = await timerEdit(device_id, group_id, loops, category, instruct)
      thisgroups[thisgroupsidx].timers[thistimersidx] = thistimers
      
    }else{
      var res = await timerAdd(device_id, loops, category, instruct)
      var thatgroups = {
         "id": res.group_id,
         "timers": thistimers
      }
      thisgroups = thisgroups.concat(thatgroups)
    }
      console.log(res)
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      // prevPage.setData ({
      //   timerListresultgroups:thisgroups
      // })
      prevPage.reFlash()
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
      })
  },
  //删除按钮
  timerDelClick: async function() {
    var {thisgroups, thisgroupsidx, device_id} = this.data
    var group_id = thisgroups[thisgroupsidx].id
    var category = "test"
    var res = await timerDelete(device_id, category, group_id)
    console.log(res)
    var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      // prevPage.setData ({
      //   timerListresultgroups:thisgroups
      // })
      prevPage.reFlash()
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
    })
  }
})