var postsData = require("../../../data/posts-data.js");
// pages/posts/post-detail/post-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var postId = e.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData:postData
    });
  }
});