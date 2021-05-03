// pages/home_center/family/index.js
import { getClientId } from '../../../utils/api/common-api'
import { getFamilyList, changFamily, addFamily, deleteFamily, getHomeTicket, homeConfirm, checkHomeTicket } from '../../../utils/api/family-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adddialogShow: false,
    dialogShow: false,
    addShareShow: false,
    addnamevalue: "",
    addSharevalue: "",
    namevalue: "",
    familyEditSelectshow: false,
    familyEditSelectactions: [
      {
        name: '家庭管理',
      },
      {
        name: '成员管理',
      },
      {
        name: '家庭分享',
      },
    ],
    thisHome:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const familyList = await getFamilyList()
    this.setData({ 
      familyList:familyList
     })
    console.log(this)
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
    this.onShow()
  },

  onfamilyEditSelectcancel: function(){
    this.setData({ familyEditSelectshow: false})
  },
  //弹出家庭管理或分享选择框
  showHomeInfoselect: function(e){
    var idx = e.currentTarget.dataset.idx
    var {familyList} = this.data
    var thisHome = familyList[idx]
    this.setData({ 
      thisHome:thisHome,
      familyEditSelectshow: true
     })
     //console.log(thisHome)
  },
  //确定选择后操作（弹出家庭信息框或分享框）
  onfamilyEditSelect: function(e){
    var name = e.detail.name
    var {thisHome} = this.data
    console.log(name)
    this.setData({ 
      familyEditSelectshow: false
    })
    switch (name) {
      case '家庭管理': 
        this.showHomeInfo()
        break;
        case '成员管理': 
        wx.navigateTo({
          url: `/pages/home_center/family_member/index?home_id=${thisHome.home_id}`,
        })
        break;
      default: {
        this.showHomeShare()
      }
    }
  },

  //弹出家庭信息框
  showHomeInfo: function(){
    var {thisHome} = this.data
    this.setData({ 
      namevalue: thisHome.name,
      dialogShow: true
     })
     //console.log(thisHome)
  },
  //弹出分享家庭
  showHomeShare: async function(){
    var {thisHome} = this.data
    // const clientId = await getClientId()
    // console.log(clientId)
    let uid = wx.getStorageSync('uid');
    var result = await getHomeTicket( thisHome.home_id, uid )
    console.log(uid)
    console.log(result)
    wx.setClipboardData({
      data: '分享ID：' + result.sharing_id +'，分享票据：' + result.sharing_ticket,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  ondialogCancel: function(){
    this.setData({ dialogShow: false})
  },
  //执行修改家庭名称操作
  ondialogConfirm: function(){
    var { thisHome, namevalue } = this.data
    changFamily(thisHome.home_id, namevalue)
    this.setData({ dialogShow: false})
    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  },
  onfieldChange: function(event){
    // event.detail 为当前输入的值
    console.log(event.detail)
    this.setData({ namevalue: event.detail })
  },
  //删除家庭操作
  dellHome: function(e){
    var homeid = e.currentTarget.dataset.id
    deleteFamily(homeid)
    this.setData({ dialogShow: false})
    wx.showToast({
      title: '已删除',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  },
  //增加家庭操作
  onadddialogConfirm: function(){
    var { addnamevalue } = this.data
    addFamily(addnamevalue)
    this.setData({ adddialogShow: false})
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  },
  onaddfieldChange: function(event){
    // event.detail 为当前输入的值
    console.log(event.detail)
    this.setData({ addnamevalue: event.detail })
  },
  onadddialogCancel: function(){
    this.setData({ adddialogShow: false})
  },
  addHome: function(){
    this.setData({ adddialogShow: true})
  },
  //加入家庭操作
  onaddShareConfirm: function(){
    var { addSharevalue } = this.data
    checkHomeTicket(addSharevalue)
    this.setData({ addShareShow: false})
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  },
  onaddSharefieldChange: function(event){
    // event.detail 为当前输入的值
    console.log(event.detail)
    this.setData({ addSharevalue: event.detail })
  },
  onaddShareCancel: function(){
    this.setData({ addShareShow: false})
  },
  addHomeShare: function(){
    this.setData({ addShareShow: true})
  }
})