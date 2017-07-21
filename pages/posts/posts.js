var postsData = require("../../data/posts-data.js");
// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onPostTap : function(e){
    var postId = e.currentTarget.dataset.postid;

    wx.navigateTo({
      url:"post-detail/post-detail?id=" + postId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //利用setData进行数据绑定
    this.setData({
      posts_key:postsData.postList
    });
    //直接对data进行数据绑定
    //this.data.postList = postsData.postList;
  }
});