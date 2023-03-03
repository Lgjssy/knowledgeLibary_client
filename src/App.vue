<template>
  <el-container style="background-color: #f9f9f9;height:736px;margin:0px">

    <el-header style="background-color: #ffffff;padding:0px;margin:0px;height:8%">
      <el-row class="row-bg">
        <el-col :span="4"
          style="height:100px,top:0px "><!--标题font-size:40px;color: #2e9ffb;padding:10px;margin: -5px;-->
          <img src="./images/Honeyview_logo2-removebg-preview.png" alt="logo" style="height:80px " />
        </el-col>
        <el-col :span="9"><!--三项菜单-->
          <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router background-color="white"
            text-color="black">
            <el-menu-item style="font-size: 15px;" class="el-icon-discount" index="/home">
              首页
            </el-menu-item>
            <el-menu-item style="font-size: 15px;" class="el-icon-s-unfold"  @click="jumpToMyFollow">
              我的关注
            </el-menu-item>
            <el-menu-item style="font-size: 15px;" class="el-icon-message-solid" @click="jumpToMessage">
              消息
            </el-menu-item>
            <el-menu-item style="font-size: 15px;" class="el-icon-user-solid" @click="jumpToPerson">
              个人中心
            </el-menu-item>

          </el-menu>
        </el-col>
        <el-col :span="5"><!--搜索框-->
          <el-input placeholder="搜索" v-model="input_search" style="margin:5px" size="large">
          </el-input>
          <!--prefix-icon="el-icon-search"-->
        </el-col>
        <el-col :span="1"><!--占位的-->
          <div style="color:white"></div>
        </el-col>
        <el-col :span="1">
          <el-button circle icon="el-icon-search" style="margin: 6px 6px;" size="medium"
            @click="jumpToSearch(input_search)"></el-button>
        </el-col>

        <el-col :span="2"><!--头像-->
          <el-dropdown @command="avatarMenu">
            <span class="el-dropdown-link">
              <el-avatar :size="38" :src="avatar" />
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logOut" class="el-icon-remove-outline">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


        </el-col>
        <!--el-col :span="2" >
          <el-button type="primary" plain  @click="jumpToLogin()" size="mini" style="margin: 10px -5px;">退出</el-button>
        </el-col-->
        <el-col :span="3"><!--写文章按钮-->
          <el-button type="primary" icon="el-icon-edit" @click="jumpToWriter()"
            style="margin: 5px -5px;">写文章</el-button>

        </el-col>
      </el-row>
    </el-header>
    <router-view></router-view>
  </el-container>

</template>

<style>

</style>
<script>
import avatars from "./assets/avatars.png";//引入本地的一个头像测试用例
import router from "./router/index.js"
import Event from '@/common/bus.js'
import axios from "axios";
var user = '';
var isV;
Event.$on('Component2', function (item) {

  user = item.username
  isV = item.isVisual
  console.log(item)
})
export default ({

  data() {
    return {
      input_search: '',
      data: {
        
        user_id: user,
        user_name: '',
        passwordL: '',
        position: '',
        phone_number: ''
      },
      avatar: avatars,//导入用户中心的头像
      input_search: ''//搜索框里的字符串
    }
  },
  methods: {
    jumpToWriter: function ()//“写文章”按钮的函数
    {
      router.push({ name: 'writer' , params: {id:user}});
      //alert("114514")

    },
    avatarMenu(command)//头像点击的函数
    {
      if (command == "personalCenter")
        router.push({ path: '/personalCenter' });
      else if (command == "logOut")
        router.push({ path: '/' });
      //alert("114514")
    },
    test()//测试事件是否能正常触发的函数
    {
      alert("114514")
    },
    jumpToSearch(row) {
      router.push({ name: 'search' ,params:{article_name:row}});

    },
    jumpToMyFollow() {
      router.push({ name: 'myFollow' ,params:{user_id:user}});

    },
    jumpToLogin() {
      router.push({ path: '/' });
    },
    jumpToPerson: function ()//“写文章”按钮的函数
    {
      console.log(user)
      let url2 = 'http://localhost:8082/Details';
      axios.post(url2, { user_Id: user }).then(res => {
        router.push({ name: 'PersonalCenter', params: { id: res.data.user_id, username: res.data.user_name, phone_number: res.data.phone_number, about: res.data.about, photo_file:res.data.photo_file,Fans_number: res.data.followerNumber, articleNumber: res.data.articleNumber, isVisual: isV } });
      })

      //alert("114514")

    },jumpToMessage(){
      router.push({ name: 'myMessage',params:{id:user} });
    }
  }
})
</script>
