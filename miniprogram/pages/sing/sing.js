const db=wx.cloud.database();
const _=db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isSign: false,
    hasActivity: false,
    nowActivity: {},
    afterActivityName: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var signThis=this;
    var date=new Date();
    console.log(date);
    db.collection("activity").where(_.and([
      {
        beginTime: _.lt(date)
      },
      {
        endTime: _.gt(date)
      }
    ])
    ).get({
      success: res=>{
        console.log(res.data[0]);
        signThis.setData({
          nowActivity: res.data[0],
          hasActivity: true
        });
      }
    })
    db.collection("activity").where({
      beginTime: _.gt(date)
    }).get({
      success: res=>{
        if(res.data.length>0){
          var tempActivityName={};
          for(var i=0;i<res.data.length;i++){
            tempActivityName[i]=res.data[i].name;
          }
          signThis.setData({
            afterActivityName: tempActivityName
          });
        }
      }
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
  sign:function(){
    var signThis=this;
    console.log(signThis.data.nowActivity._id);
    if(signThis.data.hasActivity){
      wx.cloud.callFunction({
        name: 'sign',
        data: {
          activityId: signThis.data.nowActivity._id,
        }
      }).then(res=>{
        console.log(res.result)
      }).catch(console.error)
    };
  }
})