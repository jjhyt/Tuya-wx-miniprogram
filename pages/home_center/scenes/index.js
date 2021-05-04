// pages/home_center/scenes/index.js
import { scenesAdd, scenesEdit, scenesDelete } from '../../../utils/api/scenes-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scenesnamevalue: "",
    thisScenes: "",
    actionsList: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const thisScenes = JSON.parse(options.scenes)
    const home_id = options.home_id
    this.setData({ 
      thisScenes:thisScenes,
      scenesnamevalue: thisScenes.name,
      home_id:home_id
     })
     
     var actionsList = thisScenes.actions
     this.setData({ 
      actionsList:actionsList
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onscenesnameChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({ 
      scenesnamevalue:event.detail
     })
  },
  //保存按钮
  scenesSaveClick: function(){
    var {home_id, thisScenes, scenesnamevalue, actionsList} = this.data
    // var actionsJson = []
    // for (var i=0;i<actionsList.length;i++){
    //   let Json = {
    //     "entity_id":actionsList[i].entity_id,
    //     "executor_property":actionsList[i].executor_property
    //   }
    //   actionsJson.push(Json)
    // }
    // console.log(actionsJson)
    // console.log(scenesnamevalue)
    // console.log(home_id)
    // console.log(thisScenes)
    scenesEdit(home_id, thisScenes.scene_id, scenesnamevalue, thisScenes.background, actionsList)
    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 2000
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      
    })
  },
  //删除按钮
  scenesDeleteClick: function(){
    var {home_id, thisScenes} = this.data
    scenesDelete(home_id, thisScenes.scene_id)
    wx.showToast({
      title: '已删除',
      icon: 'success',
      duration: 2000
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      
    })
  },
  //跳转编辑任务页面
  actionsClick: function(e){
    var idx = e.currentTarget.dataset.idx
    var {home_id, actionsList} = this.data
    var actionsListstr = JSON.stringify(actionsList)
    console.log(actionsListstr)
    wx.navigateTo({
      url: `/pages/home_center/scenes/editdevice?home_id=${home_id}&idx=${idx}&actionsList=${actionsListstr}`,
    })
  },
})