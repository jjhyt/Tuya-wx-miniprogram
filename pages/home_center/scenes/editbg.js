// pages/home_center/scenes/editbg.js
import { scenesPictures } from '../../../utils/api/scenes-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thisimage:"",
    thisScenes:"",
    PicturesList:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var thisScenesstr = options.thisScenes
    var thisScenes = JSON.parse(thisScenesstr)
    var thisimage = thisScenes.background
    var resultList = await scenesPictures()
    var PicturesList = resultList.result.data
    console.log(PicturesList)
    if (PicturesList.length > 0) {
      
    }else{
      PicturesList = [
        "https://images.tuyacn.com/smart/rule/cover/starry.png",
        "https://images.tuyacn.com/smart/rule/cover/air.png",
        "https://images.tuyacn.com/smart/rule/cover/sport.png",
        "https://images.tuyacn.com/smart/rule/cover/bedroom.png",
        "https://images.tuyacn.com/smart/rule/cover/work.png"
      ]
    }
    this.setData({ 
      thisScenes:thisScenes,
      thisimage:thisimage,
      PicturesList:PicturesList
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
  //选择背景图片事件
  bgchange: function (e) {
    console.log(e.detail)
    this.setData({ 
      thisimage:e.detail
     })
  },
  //保存背景图片返回上一页
  bgSaveClick: function () {
    var { thisimage, thisScenes } = this.data
    thisScenes.background = thisimage
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.setData ({
      thisScenes:thisScenes
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      
    })

  },
})