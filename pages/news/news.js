// pages/news/news.js
var newsContent = require("../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ newsData: newsContent.newsList});
  },

  /**
   * 资讯列表点击事件回调函数
   */
  newsTap: function(event) {
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: "news-detail/news-detail?id=" + newsId
    });
  },
  
  onSwiperTap: function(event) {
    var newsId = event.target.dataset.newsid;
    wx.navigateTo({
      url: "news-detail/news-detail?id=" + newsId
    });
  }
})