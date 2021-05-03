// pages/home_center/statistics_panel/index.js
var app = getApp();
import { getStatiHours, getStatiDays, getStatiMonths, getStatiAll, getStatiType } from '../../../utils/api/statistics-api'
var wxCharts = require('../../../utils/wxcharts.js');
var lineChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    niancolumns:['2019', '2020', '2021'],
    nianbaodate: '自选年份',
    nianbaoshow: false,
    thisyearString: new Date().getFullYear(),
    yuebaodate: '自选月份',
    yuebaoshow: false,
    ribaodate: '自选日期',
    ribaoshow: false,
    ribaocurrentDate: new Date().getTime(),
    ribaominDate: new Date(2019, 10, 1).getTime(),
    ribaoformatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } 
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { device_id } = options
    this.setData({ device_id })
    var myData = new Date().getFullYear()
    var myDatashu = myData - 3
    var myDataarr = [] 
    for (var i=0; i <= 3; i++ ) {
      myDataarr.push(myDatashu + i)
    }
    this.setData({ 
      niancolumns:myDataarr,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async  function () {
    const { device_id } = this.data
    //const { thisDay,sum,years }  = await getStatiAll(device_id)
    const thisDaystartHour = this.formatTime(new Date().getTime(),'YMD') + '00'
    const thisDayendHour = this.formatTime(new Date().getTime(),'YMD') + '23'
    const thisDay  = await getStatiAll(device_id)
    var thisMonstart = this.formatTime(new Date().getTime(),'YM')
    const thisMon  = await getStatiMonths(device_id, thisMonstart, thisMonstart)
    const statiHours  = await getStatiHours(device_id, thisDaystartHour, thisDayendHour)
    //const statiAll = await getStatiType(device_id)
    console.log(thisDaystartHour)
    console.log(thisDayendHour)
    console.log(statiHours)
    this.setData({ 
      list_data:thisDay,
    })
    this.setData({ 
      baobiao_data:statiHours.hours,
    })
    var { months } = thisMon
    this.setData({ 
      year_data:months,
      thisdayString:this.formatTime(new Date().getTime(),'YMD'),
      thismonString:this.formatTime(new Date().getTime(),'YM'),
    })
    console.log(this)
   // console.log(months)
    var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (options) {
            console.error('getSystemInfoSync failed!');
        }
        
        var simulationData = this.createSimulationData(statiHours.hours);
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: true,
            series: [{
                name: '用电量',
                data: simulationData.data,
                format: function (val, name) {
                    return val + 'kwh';    //这里去掉了.toFixed(2)，取得的数据都是两位小数
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '用电量(kwh)',
                format: function (val) {
                    return val;    //这里去掉了.toFixed(2)，取得的数据都是两位小数
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'straight'
            }
        });
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
 
  //待开发功能
  turnNoticeOn: function () {
    wx.showToast({
      title: '功能开发中',
      icon: 'succes',
      duration: 1000,
      mask:true
  })
  },

  //日报操作开始
  onribaoDisplay() {
    this.setData({ ribaoshow: true });
  },
  onribaoInput(event) {
    this.setData({
      ribaocurrentDate: event.detail,
    });
  },
  onribaoClose() {
    this.setData({ ribaoshow: false });
  },
   onribaoConfirm:async function(event) {
    var { device_id } = this.data
    var dateTime = this.formatTime(event.detail,'YMD')
    var thisstartHour = dateTime + '00'
    var thisendHour = dateTime + '23'
    var statiHours  = await getStatiHours(device_id, thisstartHour, thisendHour)
    
    this.setData({
      ribaoshow: false,
      ribaodate: dateTime,
      //baobiao_data:statiHours.hours, //不需要传入前台了，图表自行更新
    });
    //console.log(thisstartHour)
    //console.log(thisendHour)
    console.log(this)
    this.updateData(statiHours.hours);
    
  },
  //点击今日报表 
  jinriClick:async function() {
    var { device_id } = this.data
    var dateTime = this.formatTime(new Date().getTime(),'YMD')
    var thisstartHour = dateTime + '00'
    var thisendHour = dateTime + '23'
    var statiHours  = await getStatiHours(device_id, thisstartHour, thisendHour)
    this.updateData(statiHours.hours);
    //this.setData({
      //baobiao_data:statiHours.hours,
    //});
    //console.log(thisstartHour)
    //console.log(thisendHour)
    console.log(this)
    this.setData({
      ribaodate: dateTime,
    });
  },
  //日报操作结束！
  //月报操作开始
  onyuebaoDisplay() {
    this.setData({ yuebaoshow: true });
  },
  onyuebaoInput(event) {
    this.setData({
      yuebaocurrentDate: event.detail,
    });
  },
  onyuebaoClose() {
    this.setData({ yuebaoshow: false });
  },
   onyuebaoConfirm:async function(event) {
    var { device_id } = this.data
    var dateTime = this.formatTime(event.detail,'YM')
    var thisstartDay = dateTime + '01'
    var thisendDay = dateTime + '31'   //返回31天数据是可行的，涂鸦会自动延到显示下个月
    var statiDays  = await getStatiDays(device_id, thisstartDay, thisendDay)
    
    this.setData({
      yuebaoshow: false,
      yuebaodate: dateTime,
    });
    console.log(this)
    this.updateData(statiDays.days);
    
  },
  //点击本月报表 
  benyueClick:async function() {
    var { device_id } = this.data
    var dateTime = this.formatTime(new Date().getTime(),'YM')
    var thisstartDay = dateTime + '01'
    var thisendDay = dateTime + '31'
    var statiDays  = await getStatiDays(device_id, thisstartDay, thisendDay)
    
    this.setData({
      yuebaodate: dateTime,
    });
    console.log(this)
    this.updateData(statiDays.days);
  },
  //月报操作结束！
//年报操作开始
onnianbaoDisplay() {
  this.setData({ nianbaoshow: true });
},
onnianbaoChange(event) {
  
},
onnianbaoClose() {
  this.setData({ nianbaoshow: false });
},
 onnianbaoConfirm:async function(event) {
  var { device_id } = this.data
  var dateTime = event.detail.value
  var thisstartMon = dateTime + '01'
  var thisendMon = dateTime + '12'
  console.log(thisendMon)
  var statiMons  = await getStatiMonths(device_id, thisstartMon, thisendMon)
  
  this.setData({
    nianbaoshow: false,
    nianbaodate: dateTime,
  });
  console.log(this)
  this.updateData(statiMons.months);
  
},
//点击年报表 
nianClick:async function() {
  var dateTime = new Date().getFullYear()
  var { device_id } = this.data
  var thisstartMon = dateTime + '01'
  var thisendMon = dateTime + '12'
  console.log(thisendMon)
  var statiMons  = await getStatiMonths(device_id, thisstartMon, thisendMon)
  
  this.setData({
    nianbaodate: dateTime,
  });
  console.log(this)
  this.updateData(statiMons.months);
},
//年报操作结束！

  //数据转化
formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
},
/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
formatTime(number, format) {
 
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
 
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(this.formatNumber(date.getMonth() + 1));
  returnArr.push(this.formatNumber(date.getDate()));
 
  //returnArr.push(this.formatNumber(date.getHours()));
  //returnArr.push(this.formatNumber(date.getMinutes()));
  //returnArr.push(this.formatNumber(date.getSeconds()));
 
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
},
//图表相关操作
touchHandler: function (e) {
  lineChart.scrollStart(e);
},
moveHandler: function (e) {
  lineChart.scroll(e);
},

//点击图表上的点显示数据
touchEndHandler: function (e) {
  lineChart.scrollEnd(e);
  lineChart.showToolTip(e, {
      format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data 
      }
  });        
},
//把传入的Json转成图表所用的数组
createSimulationData: function (e) {
  //将hours的Json数据转换为图表用的索引数组和数值数组
  var arr =[];
  var yourdata = e;
  var arri = Object.keys(yourdata); //这是索引数组2021042500-23
  for(var one in yourdata){
    var str = yourdata[one];
    //加到数组中去
    arr.push(str);  //这是对应的数值数组
  }
  //以下为将Json转换为字符串，再格式化转换为Json代码，暂时用不到*
  //var jsonStr = JSON.stringify(statiHours.hours);
  //jsonStr = jsonStr.replace(" ", "");
  //if (typeof jsonStr != 'object') {
    //jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
    //var jj = JSON.parse(jsonStr);
  //}
  console.log(arri)
  console.log(arr)
  return {
      categories: arri,
      data: arr
  }
},
//图表更新操作
updateData: function (e) {
  var simulationData = this.createSimulationData(e);
  var series = [{
    name: '用电量',
    data: simulationData.data,
    format: function (val, name) {
        return val + 'kwh';
    }
}];
lineChart.updateData({
    categories: simulationData.categories,
    series: series
});
},
})