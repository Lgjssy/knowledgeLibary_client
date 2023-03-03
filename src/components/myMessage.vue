<template> 
<el-container background-color="#000000" style="height:80%;z-index: 20;" >
  <div class='messageMainWindow'></div>
  <el-aside style="opacity:0.7;height:100%">
    <el-col style="background-color:#f9f9f9;height:50px;width:80%;margin:10% 0% 0% 20%;padding-top:0px;">
      <div style="font-weight:bold;font-size:15px;position:relative;top:15px;left:20px" class="el-icon-s-promotion">  我的消息</div>
    </el-col> 
    <el-col :span="24">     
      <el-menu
        background-color="#f9f9f9"
        style="margin:0% 0% 0% 20%;width:80%"
        default-active="newComment">
        <el-menu-item index="newComment" @click="newComment">
          <template slot="title">
            <i class="el-icon-chat-dot-round"></i>
            <span>评论</span>
          </template>
          
        </el-menu-item>
        <el-menu-item index="privateMessage" @click="privateMessage">
          <i class="el-icon-message"></i>
          <span slot="title">通知</span>
        </el-menu-item>
        <el-menu-item index="newFollow" @click="newFollow" >
          <i class="el-icon-user"></i>
          <span slot="title">关注</span>
        </el-menu-item>
        <el-menu-item index="newLike" @click="newLike">
          <i class="el-icon-thumb"></i>
          <span slot="title">赞</span>
        </el-menu-item>
      </el-menu>
      <div style="background-color:#f9f9f9;height: 330px;width:80%;margin:0% 0% 0% 20%;padding-top:0px"></div>
    </el-col>
  </el-aside>
  <el-main style="height:100%;margin-right:10%">
    <el-header style="opacity:0.8;background-color:#f9f9f9;height:40px;z-index:0;margin:2% 0% 2% 0%">
      <div style="font-size:15px;position:relative;top:10px;left:0px;font-weight:bold">  
        {{title}}
      </div>
    </el-header>
    <el-main style="background:#ffffff;opacity:0.8;height:88%">
      <router-view>
      </router-view>
    </el-main>
  </el-main>
</el-container>
 
</template>
<script>
import router from "@/router/index.js"
import axios from "axios";
export default {
  components:{},
  methods:
  {
    newComment()
    {
      router.push({path: `/myMessage/newComment/`+this.user_id});
      this.title = "新评论";
    },
    privateMessage()
    {
      router.push({path:`/myMessage/privateMessage/`+this.user_id});
      this.title = "新消息";
    },
    newFollow()
    {
      router.push({path:`/myMessage/newFollow/`+this.user_id});
      this.title = "新粉丝";
    },
    newLike()
    {
      router.push({path:`/myMessage/newLike/`+this.user_id});
      this.title = "收到的赞";
    }

  },
      
  router,
  data() {
    return {
      user_id:this.$route.params.id,
      title: "新评论"
    };
  },
  created: function () {
// `this` 指向 vm 实例
console.log(this.$route.params.id)}
  
};
</script>
<style>
  .messageMainWindow{
    z-index: -114;
    position:fixed;
    width: 100%;
    height:100%;
    background: url('../images/The_Argenteuil_Bridge.jpg') no-repeat fixed center;
    background-size: cover;
  }

</style>