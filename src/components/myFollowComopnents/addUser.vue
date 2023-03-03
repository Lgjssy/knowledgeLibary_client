<template>

  <a-card class="userCard" :bordered="false" style="width: 700px">
    <div slot="title"><a-icon type="like" />热门作者</div>
    <a-list item-layout="horizontal" :data-source="data">
      <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">

        <a-list-item-meta :description="item.description">
       <a slot="title" :href="item.href">{{ item.title }}</a>
       <a-avatar slot="avatar" :src="require(`/src/images/${ item.avatar}`)" />
     </a-list-item-meta>

      <!--<a-list-item-meta >
        <a slot="title" :href="item.href">{{ item.title }}</a>
        <a-avatar slot="avatar" :src= "require(`/src/images/${ item.avatar}`)"/>
       
      </a-list-item-meta>-->
      {{ item.about }}
      <a-list-item>
        <a-button slot="extra" type="primary" @click="addFollow(item.id)" round>添加关注</a-button>
              
          </a-list-item>
    </a-list-item>
    
    </a-list>

  </a-card>

</template>
  
<script>
import axios from 'axios';
const data = [];

export default {
  data() {
    return {
      user_id:this.$route.params.id,
      data,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      },
     

    }
  },
  methods:{
    addFollow(row){
      let url='http://localhost:8082/addFollow'
      this.$success({
        title: '提示信息',
        // JSX support
        content: (
          <div>
            <p>关注用户{row}成功</p>
            <p>如要取关请在左侧列表进行操作...</p>
          </div>
        ),
      });
      axios.post(url,{user_id:row,follower_id:this.user_id})
      router.push({ path: '/myFollow/addUser/'+this.user_id});
      
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    let url='http://localhost:8082/addMyUser'
    axios.post(url,{}).then(res=>{
      console.log(res.data)
      data.splice(0, data.length)
      for(let i=0;i<res.data.length;i++){
        data.push({
          id:res.data[i].user_id,
          title:res.data[i].user_name,
          description:res.data[i].about,
          avatar:res.data[i].photo_file,


        })
      }
    })
  }
}


</script>
  
<style>
.userCard {
  background-color: white;
  color: cornflowerblue;
  font-size: large;

  width: 100%;
}

.a-icon {
  text-align: center;
}
</style>