// miniprogram/pages/home_center/home_list/index.js.js
// import wxMqtt from '../../../utils/mqtt/wxMqtt';
// import { getMqttconfig } from '../../../utils/api/device-api';
// import request from '../../../utils/request';
import { getFamilyList, getHomeDeviceList, getRoomList, addRoom, changRoom, deleteRoom } from '../../../utils/api/family-api'
import { scenesInfos, scenesTrigger, autoListbyHome } from '../../../utils/api/scenes-api'

Page({

  /**
   * 页面的初始数据
   */
  data: { 
    option1: [
      { text: '全部家庭', value: 0 },
      { text: '我的家', value: 1 },
      { text: '我的小家', value: 2 },
    ],
    value1: 0,
    tabactive: 0,
    thisHomeidx:0,
    deviceList: [],
    familyList:[],
    roomList:[],
    scenesList:[],
    autoList:[],
    thisRoom:"",
    addroomshow: false,
    addroomname: "",
    fieldroomname: "请输入房间名称",
    roomEditSelectshow: false,
    roomEditSelectactions: [
      {
        name: '房间管理',
      },
      {
        name: '设备管理',
      },
    ],
    roomEditdialogShow: false,
    editroomname: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    
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
    // const { miniProgram } = wx.getAccountInfoSync();
    // wx.cloud.init({ env: `ty-${miniProgram.appId}` });

    // try {

    //   let {
    //     client_id,
    //     password,
    //     source_topic: { device: topic },
    //     url,
    //     username
    //   } = await getMqttconfig();

    //   wxMqtt.connectMqtt(url, { clientId: client_id, username, password, subscribeTopics: topic });
    // } catch (error) {
     
    //   console.log(error)
    // }
    const familyList = await getFamilyList()
    this.setData({ 
      familyList:familyList
     })
     //console.log(familyList)
    var familyLength = familyList.length
    var newArr = []
    //{ text: '全部家庭', value: 0 },
    for (var i = 0; i<familyLength; i++){
      var addArr= [{text:familyList[i].name,value:i}]
      newArr = newArr.concat(addArr)
      // console.log(familyList[i])
      // console.log(newArr)
    }
    this.setData({ 
      option1:newArr
     })
    // familyList.forEach(item => {
    //   console.log(item.name)
    // })
    //console.log(familyList.length)
    var { thisHomeidx } = this.data
    console.log(familyList)
    console.log(thisHomeidx)
    const deviceList = await getHomeDeviceList(familyList[thisHomeidx].home_id)
    const { rooms } = await getRoomList(familyList[thisHomeidx].home_id)
    const scenes = await scenesInfos(familyList[thisHomeidx].home_id)
    const autoList = await autoListbyHome(familyList[thisHomeidx].home_id)
    deviceList.forEach(item => {
      item.icon = `https://images.tuyacn.com/${item.icon}`
    })
    var scenesList = scenes.result.data
    this.setData({ 
      deviceList:deviceList,
      roomList:rooms,
      autoList:autoList
    })
    //以下程序为scenesList中加入对应的name和icon元素
    console.log(scenesList.length)
    //console.log(scenesList[1].actions)
    for (var i=0; i<scenesList.length; i++){
      for (var j=0; j<scenesList[i].actions.length; j++){
        let uuid = scenesList[i].actions[j].entity_id
        let name = ""
        let icon = ""
        for (var k=0;k<deviceList.length;k++){
          if (uuid == deviceList[k].uuid){
            name = deviceList[k].name
            icon = deviceList[k].icon
            
          }
        }
        // let json = {"name":name,"icon":icon}
        // console.log(json)
        scenesList[i].actions[j].name = name
        scenesList[i].actions[j].icon = icon
      }
    }
    console.log(scenesList)
    this.setData({ 
      scenesList:scenesList
    })
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
  },
  //顶部下拉菜单切换家庭操作
  onhomeChange: function(e){
    console.log(e.detail)
    var thisHomeidx = e.detail
    this.setData({ 
      thisHomeidx:thisHomeidx
     })
     this.onShow()
  },
  //Tab页切换
  ontabChange: function(e){
    console.log(e.detail)
    
  },
  //显示增加房间dialog
  jumpToroomAdd: function(){
    this.setData({ 
      addroomshow:true
     })
    
  },
  onaddroomCancel: function(){
    this.setData({ 
      addroomshow:false
     })
    
  },
  //增加房间操作
  onaddroomConfirm: function(){
    var { addroomname, thisHomeidx, familyList } = this.data
    addRoom(familyList[thisHomeidx].home_id, addroomname)
    this.setData({ addroomshow: false})
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  },
  onaddroomChange: function(event){
    // event.detail 为当前输入的值
    console.log(event.detail)
    this.setData({ addroomname: event.detail })
  },
  //房间快捷选择按钮
  roombutton: function(e){
    var room = e.currentTarget.dataset.room
    //console.log(room)
    this.setData({ 
      addroomname: room,
      fieldroomname: room
    })
  },
  //弹出房间编辑选项
  jumpToroomPanel: function(e){
    var idx = e.currentTarget.dataset.idx
    var { roomList } = this.data
    var thisRoom = roomList[idx]
    console.log(thisRoom)
    this.setData({ 
      thisRoom: thisRoom,
      roomEditSelectshow: true
    })
    console.log(this)
  },
  //
  onroomEditSelectcancel: function(){
    this.setData({ 
      roomEditSelectshow: false
    })
  },
  //选择面板点击选项后触发
  onroomEditSelect: function(e){
    var { thisHomeidx, familyList, thisRoom } = this.data
    var name = e.detail.name
    console.log(name)
    this.setData({ 
      roomEditSelectshow: false
    })
    var home_id = familyList[thisHomeidx].home_id
    var room_id = thisRoom.room_id
    var roomname = thisRoom.name
    switch (name) {
      case '房间管理': 
        this.setData({ 
          roomEditdialogShow: true
        })
        break;
      default: {
        console.log(home_id)
        console.log(room_id)
        wx.navigateTo({
          url: `/pages/home_center/home_list/room_device?home_id=${home_id}&room_id=${room_id}&roomname=${roomname}`,
        })
      }
    }
  },
  onroomEditdialogCancel: function(){
    this.setData({ roomEditdialogShow: false})
  },
  //执行修改房间名称操作
  onroomEditdialogConfirm: function(){
    var { thisRoom, editroomname, thisHomeidx, familyList } = this.data
    var home_id = familyList[thisHomeidx].home_id
    changRoom(home_id, thisRoom.room_id, editroomname)
    this.setData({ roomEditdialogShow: false})
    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  },
  oneditnameChange: function(event){
    // event.detail 为当前输入的值
    console.log(event.detail)
    this.setData({ editroomname: event.detail })
  },
  //删除房间操作
  dellRoom: function(e){
    var room_id = e.currentTarget.dataset.id
    var { thisHomeidx, familyList } = this.data
    var home_id = familyList[thisHomeidx].home_id
    deleteRoom(home_id, room_id)
    this.setData({ roomEditdialogShow: false})
    wx.showToast({
      title: '已删除',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  },

  //点击执行场景
  scenesClick: function(e){
    var data = e.currentTarget.dataset.scenes
    var { thisHomeidx, familyList } = this.data
    var home_id = familyList[thisHomeidx].home_id
    scenesTrigger(home_id, data.scene_id)
    wx.showToast({
      title: '场景执行成功',
      icon: 'success',
      duration: 2000
    })
    //console.log(data)
  },
  //跳转编辑场景页面
  jumpToscenesPanel: function(e){
    var data = e.currentTarget.dataset.scenes
    var { thisHomeidx, familyList } = this.data
    var home_id = familyList[thisHomeidx].home_id
    var datastr = JSON.stringify(data)
    var type = "edit"
    console.log(datastr)
    wx.navigateTo({
      url: `/pages/home_center/scenes/index?home_id=${home_id}&type=${type}&scenes=${datastr}`,
    })
  },
  //跳转新增场景
  jumpToscenesAdd: function(){
    //var data = e.currentTarget.dataset.scenes
    var { thisHomeidx, familyList } = this.data
    var home_id = familyList[thisHomeidx].home_id
    //var datastr = JSON.stringify(data)
    var datastr = "no"
    var type = "add"
    console.log(datastr)
    wx.navigateTo({
      url: `/pages/home_center/scenes/index?home_id=${home_id}&type=${type}&scenes=${datastr}`,
    })
  },
  //跳转自动化插件页
  jumpToautoAdd: function(){
    var { thisHomeidx, familyList } = this.data
    var home_id = familyList[thisHomeidx].home_id
    wx.navigateTo({
      url: `/connectpack/web_view/index`,
    })
  },
  jumpToautoPanel: function(){
    var { thisHomeidx, familyList } = this.data
    var home_id = familyList[thisHomeidx].home_id
    wx.navigateTo({
      url: `/autochange/auto/index?home_id=${home_id}`,
    })
  },
})