// miniprogram/pages/home_center/home_list/index.js.js
// import wxMqtt from '../../../utils/mqtt/wxMqtt';
// import { getMqttconfig } from '../../../utils/api/device-api';
// import request from '../../../utils/request';
import { getFamilyList, getHomeDeviceList, getRoomList, addRoom, changRoom, deleteRoom } from '../../../utils/api/family-api'
import { scenesInfos } from '../../../utils/api/scenes-api'

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
    const scenesList = await scenesInfos(familyList[thisHomeidx].home_id)
    deviceList.forEach(item => {
      item.icon = `https://images.tuyacn.com/${item.icon}`
    })
    
    this.setData({ 
      deviceList:deviceList,
      roomList:rooms,
      scenesList:scenesList.result.data
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
    var name = e.detail.name
    console.log(name)
    this.setData({ 
      roomEditSelectshow: false
    })
    switch (name) {
      case '房间管理': 
        this.setData({ 
          roomEditdialogShow: true
        })
        break;
      default: {
        wx.navigateTo({
          url: `/pages/web_view/index`,
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
})