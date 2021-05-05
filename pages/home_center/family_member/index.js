// pages/home_center/family_member/index.js
import { getMemberList, addMember, deleteMember } from '../../../utils/api/family-api'
import { scenesAdd } from '../../../utils/api/scenes-api'
import { timerAdd } from '../../../utils/api/timer-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adddialogShow: false,
    addnamevalue: "",
    addaccountvalue: "",
    addadminchecked: false,
    dialogShow: false,
    namevalue: "",
    adminchecked: false,
    memberList: "",
    home_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { home_id } = options
    var memberList = await getMemberList(home_id)
    this.setData({ 
      home_id: home_id,
      memberList: memberList
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

  //显示添加成员框
  addMember: function(){
    this.setData({ 
      adddialogShow: true,
      addadminchecked: false
    })
  },
  
  //增加家庭成员操作
  onadddialogConfirm: function(){
    var { home_id, addnamevalue, addaccountvalue, addadminchecked } = this.data
    addMember(home_id, addaccountvalue, addadminchecked, addnamevalue)
    this.setData({ adddialogShow: false})
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    })
    this.onLoad({home_id})
  },
  onaddfieldChange: function(event){
    // event.detail 为当前输入的值
    console.log(event.detail)
    this.setData({ addnamevalue: event.detail })
  },
  onaddaccountChange: function(event){
    // event.detail 为当前输入的值
    console.log(event.detail)
    this.setData({ addaccountvalue: event.detail })
  },
  onaddadminChange: function(event) {
    this.setData({
      addadminchecked: event.detail,
    })
    console.log(event.detail)
  },
  onadddialogCancel: function(){
    this.setData({ adddialogShow: false})
  },
  //弹出家庭成员信息框
  showMemberInfo: function(e){
    var thisMemberid = e.currentTarget.dataset.idx
    var {memberList} = this.data
    var thisMember = memberList[thisMemberid]
    this.setData({ 
      thisMember: thisMember,
      namevalue: memberList[thisMemberid].name,
      adminchecked: memberList[thisMemberid].admin,
      dialogShow: true
     })
     //console.log(thisMember)
  },
//删除家庭成员操作
dellMember: function(e){
  var uid = e.currentTarget.dataset.id
  var {home_id} = this.data
  deleteMember(home_id, uid )
  this.setData({ dialogShow: false})
  wx.showToast({
    title: '已删除',
    icon: 'success',
    duration: 2000
  })
  this.onLoad({home_id})
},
  //添加一个测试场景
  testClick: function(){
    // var {home_id} = this.data
    // var name = '测试场景1'
    // var background = 'https://images.tuyacn.com/smart/rule/cover/sport.png'
    // var actions = [{
    //     "entity_id":"327508562cf43233d356",
    //     "executor_property":{
    //         "switch":true
    //     }
    //   }]
    // scenesAdd(home_id,name,background,actions)
    var device_id = "327508562cf43233d356"
    var loops = "0000000"
    var category = "test"
    var instruct = [{
          "functions":[
              {
                  "code":"switch",
                  "value":true
              }
          ],
          "date":"20210506",
          "time":"21:21"
      }]
    timerAdd( device_id, loops, category, instruct )
  }
})