var postsData = require("../../../data/posts-data.js");
// pages/posts/post-detail/post-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMusicStatus : false
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
//执行showToast方法，并将postCollected，postsCollected作为参数传入到函数当中
    this.showToast(postCollected,postsCollected);
  },

  showToast: function(postCollected,postsCollected){
    //因作用于产生变化，将this赋给一个变量
    var that = this;
    //执行showToast API,
    wx.showToast({
      title:postCollected?'关注成功':'取消关注',
      mask:true,
      success:function(res){
        //console.log(res);
        //更新缓存（更新后台数据）
        wx.setStorageSync('posts_Collected',postsCollected);
        //更新绑定的前台数据，这便是数据单向绑定的不便之处
        that.setData({
          collected: postCollected
        });
      }
    })
  },  // end of showToast 方法

  showModal: function(a,b){
    var that = this;
    wx.showModal({
      title:"文章收藏",
      content: a?"收藏该文章":"取消收藏",
      showCancel:true,
      cancelText:"取消",
      cancelColor:"#333",
      confirmText:"确认",
      confirmColor:"#405f80",
      success:function(res){
        if(res.confirm){
          //更新缓存（更新后台数据）
          wx.setStorageSync('posts_Collected',b);
          //更新绑定的前台数据，这便是数据单向绑定的不便之处
          that.setData({
            collected: a
          });
        }
      }
    })
  },

  shareTap: function(e){
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到微博',
      '分享到QQ'
    ];
    wx.showActionSheet({
      itemList:itemList,
      itemColor:"#405f80",
      success:function(res){
        //res.cancel  点击取消按钮
        //res.tapIndex  数组元素的序号，从0开始
        wx.showModal({
          title:"用户"+itemList[res.tapIndex],
          content:"用户是否取消？"+res.cancel+"现在小程序没有分享功能，待更新"
        })
      }
    })
  },

  onMusicTap: function(e){
    var isMusicStatus = this.data.isMusicStatus;
    var postData = this.data.postData;
    if(isMusicStatus){
      wx.pauseBackgroundAudio();
      //this.data.isMusicStatus = false;
      this.setData({
        isMusicStatus: false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl:postData.music.url,
        title:postData.music.title,
        coverImgUrl:postData.music.coverImg
      });
      //this.data.isMusicStatus = true;
      this.setData({
        isMusicStatus: true
      })
    }
  }
});








































