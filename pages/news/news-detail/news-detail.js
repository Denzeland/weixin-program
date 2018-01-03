var newsContent = require("../../../data/posts-data.js");

Page({

  data: {
    isPlaying: false,
    // curId: "",
    // newsData: "",
    // collected: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsId = options.id;
    // 将newsId保存在data中，方便后面方法调用
    this.data.curId = newsId;
    var newsData = newsContent.newsList[newsId];
    // 将newsData保存在data中，方便后面方法调用
    this.setData({
      newsData: newsData
    });
    // 当页面加载的时候就取出storage里的数据
    var newsCollected = wx.getStorageSync("news_collected");
    // 判断数据是否为空，如果有数据，就把newsCollected对象的newsId属性值设置为data对象的collected的值
    if (newsCollected) {
      var collected = newsCollected[newsId];
      this.setData({
        collected: collected
      });
    }
    // 如果数据为空（不存在），则创建数据，并且默认未收藏，并设置在storage里
    else {
      var news_collected = {};
      news_collected[newsId] = false;
      wx.setStorageSync("news_collected", news_collected);
    }
  },
  // 收藏图标触摸点击事件监听函数
  onCollected: function(event) {
    var newsCollected = wx.getStorageSync("news_collected");
    var collected = newsCollected[this.data.curId];
    collected = !collected;
    newsCollected[this.data.curId] = collected;
    wx.setStorageSync("news_collected", newsCollected);
    this.setData({
      collected: collected
    });
    // 收藏的交互反馈
    wx.showToast({
      title: collected?'收藏成功': '取消成功',
      duration: 1000
    })
  },
  // 分享图标触摸点击事件监听函数，交互反馈
  onShare: function(event) {
    var shareList = [
      "分享给朋友圈",
      "分享给微信好友",
      "分享给QQ好友",
      "去微博分享"
    ];
    wx.showActionSheet({
      itemList: shareList,
      success: function(res) {
        wx.showModal({
          title: "确定" + shareList[res.tapIndex],
          confirmColor: "#405f80"
        });
      }
    });
  },

  playMusic: function(event) {
    var curId = this.data.curId;
    var isPlaying = this.data.isPlaying;
    if (isPlaying) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlaying: false
      });
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: newsContent.newsList[curId].music.url,
        title: newsContent.newsList[curId].music.title,
        coverImgUrl: newsContent.newsList[curId].music.coverImgUrl
      });
      this.setData({
        isPlaying: true
      });
    }
  }
})