<template>
  <el-container style="width: 1000px;margin: 30px auto ;">
 <el-header style="height: 120px;">
  <el-avatar shape="square" :size="100" :src="photo_file" style="margin: 10px;"></el-avatar>
  <div style="height: 110px;width: 700px;margin: -120px 130px">
     <h1 style="font-size: 25px;font-weight:700;margin: 0 20px">{{ username }}</h1>
     <p style="margin: -25px 200px;">个人简介：{{  masseg}}</p>
     <el-tag type="success" style="font-size: 12px;margin: 60px 15px" class="el-icon-s-grid">账号:{{ user_id }}</el-tag>
     <el-tag type="warning" style="font-size: 12px;margin: 60px 15px" class="el-icon-user">粉丝数：{{ fans_number }}</el-tag>
     <el-tag  style="font-size: 12px;margin: 60px 15px" class="el-icon-phone-outline">电话：{{ phone_number }}</el-tag>
     <el-tag type="danger" style="font-size: 12px;margin: 60px 15px" class="el-icon-document-copy">作品数：{{ article_number }}</el-tag>
  </div>
 </el-header>
 <el-main style="height: 560px;">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane @tab-click="Articles" label="作品" name="first">
          <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">

            <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
              <template slot="actions">
                <span>
                  <a-icon :type="item.type" style="margin-right: 8px" />
                  {{ item.text }}
                </span>
                <span>
                  <a-icon :type="item.type2" style="margin-right: 8px" />
                  {{ item.text2 }}
                </span>
                <span>
                  <a-icon :type="item.type3" style="margin-right: 8px" />
                  {{ item.text3 }}
                </span>
              </template>
              <el-image slot="extra"  :src= "item.avatar" style="width: 240px;height: 150px;" />
             
              <a-list-item-meta :description="item.description + '    ' + item.topic">
                <a slot="title" @click="jumpToArticle(item.title)" :href="item.href">{{ item.title }}</a>
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </a-list>
        </el-tab-pane>
   <el-tab-pane label="他的喜欢" name="second">
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">

<a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
  <template slot="actions">
    <span>
      <a-icon :type="item.type" style="margin-right: 8px" />
      {{ item.text }}
    </span>
    <span>
      <a-icon :type="item.type2" style="margin-right: 8px" />
      {{ item.text2 }}
    </span>
    <span>
      <a-icon :type="item.type3" style="margin-right: 8px" />
      {{ item.text3 }}
    </span>
  </template>
  <el-image slot="extra"  :src= "item.avatar" style="width: 240px;height: 150px;" />
  <a-list-item-meta :description="item.description + '    ' + item.topic">
    <a slot="title" @click="jumpToArticle(item.title)" :href="item.href">{{ item.title }}</a>
  </a-list-item-meta>
  {{ item.content }}
</a-list-item>
</a-list>
  </el-tab-pane>
   <el-tab-pane label="他的分享" name="third">
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">

<a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
  <template  slot="actions">
    <span>
      <a-icon :type="item.type" style="margin-right: 8px" />
      {{ item.text }}
    </span>
    <span>
      <a-icon :type="item.type2" style="margin-right: 8px" />
      {{ item.text2 }}
    </span>
    <span>
      <a-icon :type="item.type3" style="margin-right: 8px" />
      {{ item.text3 }}
    </span>
  </template>
  <el-image slot="extra"  :src= "item.avatar" style="width: 240px;height: 150px;" />
  <a-list-item-meta :description="item.description+'    '+item.topic">
    <a slot="title" @click="jumpToArticle(item.title)" :href="item.href">{{ item.title }}</a>
  </a-list-item-meta>
  {{ item.content }}
</a-list-item>
</a-list>
   </el-tab-pane>
 </el-tabs>
 </el-main>
</el-container>
</template>
<script>
import router from '@/router';
import axios from 'axios';
const listData = [];

 export default {
  data(){
     return{
        listData,
     pagination: {
       onChange: page => {
         console.log(page);
       },
       pageSize: 3,
     },
     actions: [
       { type: 'star-o', text: '156' },
       { type: 'like-o', text: '156' },
       { type: 'message', text: '2' },
     ],
        username: this.$route.params.id,
        user_id:'5456465',
        fans_number:'99',
        phone_number:'12315456',
        article_number:'12',
        masseg:'dasdasdasdasdsadasd',
        photo_file:''
     }
  },
   methods: {
    jumpToArticle(ins) {
            router.push({ path: '/article/'+ins});
        },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'first') {

        this.first();
      } else if (tab.name == 'second') {

        this.second();
      } else if (tab.name == 'third') {
        this.third();
      }
    },
    first() {
      let url2 = 'http://localhost:8082/userArticle';
      let url = 'http://localhost:8082/aboutArticle';
      listData.splice(0, listData.length)

      axios.post(url2, { user_id: this.user_id }).then(res => {
        console.log(res.data)

        for (let i = 0; i < res.data.length; i++) {
          axios.post(url, { article_id: res.data[i].article_id }).then(res1 => {
            console.log()
            listData.push({
              avatar:require('/src/images/'+res.data[i].article_cover),
              type: 'star-o', text: res1.data.shares,
              type2: 'like-o', text2: res1.data.likes,
              type3: 'message', text3: res1.data.comment,
              title: res.data[i].article_title,
             
              description: res.data[i].date,
              content: res.data[i].article_introduction,
              topic: res.data[i].topic
            });
              console.log(listData)
          })


        }
      })

    },
    /**
    * 触发‘配置管理’事件
    */
    second() {
      let url2 = 'http://localhost:8082/userLikeArticle';
      let url = 'http://localhost:8082/aboutArticle';
      listData.splice(0, listData.length)

      axios.post(url2, { user_id: this.user_id }).then(res => {
        console.log(res.data)

        for (let i = 0; i < res.data.length; i++) {
          axios.post(url, { article_id: res.data[i].article_id }).then(res1 => {
            console.log()
            listData.push({
              avatar:require('/src/images/'+res.data[i].article_cover),
              type: 'star-o', text: res1.data.shares,
              type2: 'like-o', text2: res1.data.likes,
              type3: 'message', text3: res1.data.comment,
              title: res.data[i].article_title,
             
              description: res.data[i].date,
              content: res.data[i].article_introduction,
              topic: res.data[i].topic
            });

          })


        }
      })

    },
    third() {
      let url2 = 'http://localhost:8082/userShareArticle';
      let url = 'http://localhost:8082/aboutArticle';
      listData.splice(0, listData.length)

      axios.post(url2, { user_id: this.user_id }).then(res => {
        console.log(res.data)

        for (let i = 0; i < res.data.length; i++) {
          axios.post(url, { article_id: res.data[i].article_id }).then(res1 => {
            console.log()
            listData.push({
              avatar:require('/src/images/'+res.data[i].article_cover),
              type: 'star-o', text: res1.data.shares,
              type2: 'like-o', text2: res1.data.likes,
              type3: 'message', text3: res1.data.comment,
              title: res.data[i].article_title,
            
              description: res.data[i].date,
              content: res.data[i].article_introduction,
              topic: res.data[i].topic
            });

          })


        }
      })
    },
   },
   created:function(){
    let url='http://localhost:8082/findID'
    let url2='http://localhost:8082/Details'
    axios.post(url,{user_name:this.username}).then(res=>{
      console.log(res.data)
      axios.post(url2,{user_Id:res.data.id}).then(res1=>{
        this.user_id=res1.data.user_id
        this.fans_number=res1.data.followerNumber
        this.phone_number=res1.data.phone_number
        this.article_number=res1.data.articleNumber
        this.masseg=res1.data.about,
        this.photo_file=require('/src/images/'+res1.data.photo_file)})
      
    })
   }
}
</script>