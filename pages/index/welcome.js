Page({
  onTap: function (event) {
    // wx.navigateTo({
    //     url:"../posts/post"
    // });
    console.log("tap");
    wx.switchTab({
      url: '../news/news'
    });
  }
})