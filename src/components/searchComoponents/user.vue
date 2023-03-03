<template>
  <a-list item-layout="horizontal" :data-source="data" style="width: 500px;margin: 0 30px;">
    <div style="margin: -20px;" slot="header">
    </div>
    <a-list-item slot="renderItem" slot-scope="item, index">

      <a-list-item-meta :description="item.description">
        <a slot="title">{{ item.title }}</a>
        <a-avatar slot="avatar" :src="item.avatar" :size="50" />
      </a-list-item-meta>
   
      <el-button @click="jumpToPerson(item.title)" type="success" size="small" plain>主页</el-button>
    </a-list-item>
  </a-list>
</template>
<script>
import router from '@/router';
import axios from 'axios';
const data = [
];

export default {
  data() {
    return {
      user_name: this.$route.params.id,
      data
    };
  },
  methods: {
    
    jumpToPerson(n) {
      router.push({ name: 'person', params: { user_name: n } })
    },
    findUserByName() {
      let url = 'http://localhost:8082/findUserByName';
      axios.post(url, { user_name: this.user_name }).then(res => {
        console.log(res.data)
        data.splice(0, data.length)
        for (let i = 0; i < res.data.length; i++) {
          data.push({
            title: res.data[i].user_name,
            avatar: require('/src/images/' + res.data[i].photo_file),
            description: res.data[i].about
          });
        }
      })
    }
  },
  created: function () {
    let url = 'http://localhost:8082/findUserByName';
    axios.post(url, { user_name: this.user_name }).then(res => {
      console.log(res.data)
      data.splice(0, data.length)
      for (let i = 0; i < res.data.length; i++) {
        data.push({
          title: res.data[i].user_name,
          avatar: require('/src/images/' + res.data[i].photo_file),
          description: res.data[i].about
        });
      }
    })
  }
};
</script>
<style>

</style>