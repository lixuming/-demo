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
      postId : postId,
      postData:postData
    });

    //初始化图标显示的部分
    var postsCollected = wx.getStorageSync('posts_Collected');
    //如果缓存中存在postsCollected，便可对数据铏读取
    if(postsCollected){
      //读取缓存数据
      var postCollected = postsCollected[postId];
      //对前台的绑定数据进行更新
      this.setData({
        collected:postCollected
      })
    }else{
      //否则，便说明postsCollected在缓存中不存在，那么，就需要先声明一个postsCollected对象出来，以便对以后数据进行存放
      var postsCollected = {};
      //将当前页面的图标状态默认为false
      postsCollected[postId] = false;
      //将数据再存入缓存中
      wx.setStorageSync('posts_Collected',postsCollected);
    }
  },  //end of onLoad

  collectTap: function(e){
    var postId = this.data.postId;
    //查看当前缓存中图标的状态，然后进行切换，再次更新之后传入前端
    var postsCollected = wx.getStorageSync('posts_Collected');
    var postCollected = postsCollected[postId];
    //取反的作用是切换当前图标的状态
    postCollected = !postCollected;
    //将更新的数据传入到缓存对象当中
    postsCollected[postId] = postCollected;
    //更新缓存（更新后台数据）
    wx.setStorageSync('posts_Collected',postsCollected);
    //更新绑定的前台数据，这便是数据单向绑定的不便之处
    this.setData({
      collected: postCollected
    })
  }
});