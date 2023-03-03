<template>
  <a-list item-layout="vertical" size="large" :data-source="listData" :column="8"> <!--:pagination="pagination"-->
    <!--div slot="footer"><b>ant design vue</b> footer part</div-->
    <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
      <!--template v-for="{ type, text } in actions" slot="actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template-->
      <!-- <img
          slot="extra"
          width="272"
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        /> -->
      <!--<a-list-item-meta :description="item.description">-->
      <a-list-item-meta>
        <a slot="title" :href="item.href">{{ item.title }}</a>
        <a-avatar slot="avatar" :src="require(`/src/images/${item.avatar}`)" />
      </a-list-item-meta>
      {{ item.content }}
    </a-list-item>
  </a-list>
</template>
</template>
<script>
import axios from "axios";
var listData = [];
var t114514 = 'avatar1.jpg';
var src = require(`/src/images/${t114514}`);
export default {

  data() {
    return {
      src,
      t114514,
      user_id: this.$route.params.id,
      listData,
      methods:
      {

      },
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 10,
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
    };
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log(this.$route.params.id)
    let url = 'http://localhost:8082/findDiscuss'
    axios.post(url, { user_id: this.user_id, type: "通知" }).then(res => {
      listData = []
      for (let i = 0; i < res.data.length; i++) {
        
        listData.push({
          title: `管理员 ${res.data[i].sender_id}在${res.data[i].date}通知了你`,
          avatar: 'logo.png',
          description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
          content: res.data[i].content,
          type: '1'
        });


        //var img = require( `/src/images/${listData[i].avatar}`);
      }
    })

  }
};
</script>