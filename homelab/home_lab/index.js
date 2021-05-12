// home_lab/home_lab/index.js
import { changFamily, infoFamily, deleteFamily } from '../../utils/api/family-api';

const chooseLocation = requirePlugin('chooseLocation');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    home_id:"",
    thisHome:"",
    namevalue:"",
    geo_namevalue:"",
    latvalue:"",
    lonvalue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { home_id } = options
    var thisHome = await infoFamily(home_id)
    console.log(home_id)
    console.log(thisHome)
    var namevalue = thisHome.name
    var geo_namevalue = thisHome.geo_name
    var latvalue = thisHome.lat
    var lonvalue = thisHome.lon
    this.setData({ 
      home_id: home_id,
      thisHome: thisHome,
      namevalue: namevalue,
      geo_namevalue:geo_namevalue,
      latvalue:latvalue,
      lonvalue:lonvalue
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
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log(location)
    var geo_namevalue = location.name
    var latvalue = location.latitude
    var lonvalue = location.longitude
    this.setData({ 
      geo_namevalue:geo_namevalue,
      latvalue:latvalue,
      lonvalue:lonvalue
    })
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
  //调用定位插件
  familylocaClick: function () {
    const key = 'WACBZ-7ZDW6-N2KS5-EHXWV-PNKUJ-FIFHR'; //使用在腾讯位置服务申请的key
    const referer = '我的优秀小小智能家'; //调用插件的app的名称
    // const location = JSON.stringify({
    //   latitude: 39.89631551,
    //   longitude: 116.323459711
    // });
    const category = '生活服务,家庭定位';
    // const tab_id = 'w9QqDGgdnJaYYMsQej4SJBeQSFk5ZKqJ'
    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&category=${category}`
    });
  },
  //
  familyEditClick: async function () {
    var {home_id, namevalue, geo_namevalue, latvalue, lonvalue } = this.data
    var { success } = await changFamily(home_id, namevalue, geo_namevalue, latvalue, lonvalue)
    console.log(success)
    if (success){
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
        
      })
    }else{
      wx.showToast({
        title: '修改出错',
        icon: 'error',
        duration: 2000
      })
    }
  },
  //
  familyDelClick: async function () {
    var { home_id } = this.data
    var {success} = await deleteFamily(home_id)
    console.log(success)
    if (success){
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
        
      })
    }else{
      wx.showToast({
        title: '修改出错',
        icon: 'error',
        duration: 2000
      })
    }
  },
})