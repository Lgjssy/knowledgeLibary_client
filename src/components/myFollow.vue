<template>
  <el-container style="background-color: #e5f2ff;width:100%;height:10%;margin:0px auto">
    <el-aside id="side" width="320px" style="padding:10px;margin-left:200px;height:100%;background-color: white;
     color: #D3DCE6;">

      <h2 style="margin-left:20px;color:black">关注列表</h2>

      <!--添加关注-->
      <el-button style="width:100%;margin-top: 10px;" @click="jumpToAddUser" type="primary" round
        icon="el-icon-circle-plus-outline">添加关注</el-button>

      <el-row class="left_list">
        <!-- 左侧列表 -->
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">

            <a-list-item-meta :description="item.description">
              <a slot="title" @click="jumpToUserPage(item.title)" :href="item.href">{{ item.title }}</a>
              <a-avatar slot="avatar" :src="require(`/src/images/${item.avatar}`)" />
            </a-list-item-meta>

            <!--<a-list-item-meta >
        <a slot="title" :href="item.href">{{ item.title }}</a>
        <a-avatar slot="avatar" :src= "require(`/src/images/${ item.avatar}`)"/>
       
      </a-list-item-meta>-->

            <a-list-item>
              <a-button @click="cancle(item.user_id)" danger style="color:orange" value="small"
                :size="small">取消关注</a-button>
            </a-list-item>
          </a-list-item>

        </a-list>
      </el-row>
    </el-aside>
    <el-main style="height:100%;margin-left:3px;margin-right:200px; background-color: white;
     color: #D3DCE6;">
      <router-view style="width:100%">
      </router-view>
    </el-main>
  </el-container>


</template>



<script>
import router from '@/router';
import axios from 'axios';
const data = [];
export default {

  data() {
    return {
      user_id: this.$route.params.user_id,
      articlePath: 'asdasd',
      data,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      },

    };
  },
  created: function () {
    let url = 'http://localhost:8082/addMyRelationship'
    this.user_id = this.$route.params.user_id,
      console.log(this.$route.params.user_id)
    axios.post(url, { user_id: this.user_id }).then(res => {
      console.log(res.data)
      data.splice(0, data.length)
      for (let i = 0; i < res.data.length; i++) {
        data.push({
          title: res.data[i].user_name,
          description: res.data[i].about,
          avatar: res.data[i].photo_file,
          user_id: res.data[i].user_id

        })
      }

    })

    router.push({ path: '/myFollow/addUser/' + this.user_id });
  },
  methods:
  {

    jumpToUserPage(ins) {
      router.push({ path: '/myFollow/userPage/' + ins });
    },
    jumpToAddUser() {
      router.push({ path: '/myFollow/addUser/' + this.user_id });
    },
    cancle(n) {
      this.$warning({
        title: '取关提示',
        content: '你已经取消了对该用户的关注',
      });
      let url = 'http://localhost:8082/cancel'
      axios.post(url, { user_id: n, follower_id: this.user_id })

    }


  }
};



</script>




<style>


.add_button {
  background-color: white;
  color: cornflowerblue;
  font-size: x-small;
  text-align: center;
  position: absolute;
  right: 0;
  width: 35%;
}

.left_list {
  margin-top: 10px;
}
</style>