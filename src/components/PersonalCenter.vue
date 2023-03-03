<template>
  <el-container style="width: 1000px;margin: 30px auto ;">
    <el-header style="height: 120px;">
      <el-avatar shape="square" :size="100" :src="photo_file" style="margin: 10px;"></el-avatar>
      <div style="height: 110px;width: 700px;margin: -120px 130px">
        <h1 style="font-size: 25px;font-weight:700;margin: 0 20px">{{ username }}</h1>
        <p style="margin: -25px 200px;">个人简介：{{ masseg }}</p>
        <el-tag @click="Articles" type="success" style="font-size: 12px;margin: 60px 15px" class="el-icon-s-grid">账号:{{
    user_id
}}</el-tag>
        <el-tag type="warning" style="font-size: 12px;margin: 60px 15px" class="el-icon-user">粉丝数：{{ fans_number
}}</el-tag>
        <el-tag style="font-size: 12px;margin: 60px 15px" class="el-icon-phone-outline">电话：{{ phone_number }}</el-tag>
        <el-tag type="danger" style="font-size: 12px;margin: 60px 15px" class="el-icon-document-copy">作品数：{{
    article_number
}}</el-tag>
        <div style="margin: -130px 660px;">
          <el-button type="primary" v-if=isManager icon="el-icon-box" @click="jumpToCheck">审核箱</el-button>
        </div>

      </div>
    </el-header>
    <el-main style="height: 540px;">

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
                <span>
                  <a-button @click="ToCaogao(item.article_id)" type="link">
                    下线
                  </a-button>
                </span>

              </template>
              <el-image slot="extra" :src="item.avatar" style="width: 240px;height: 150px;" />

              <a-list-item-meta :description="item.description + '    ' + item.topic">

                <a slot="title" @click="jumpToArticle(item.title)" :href="item.href">{{ item.title }}</a>
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </a-list>
        </el-tab-pane>
        <el-tab-pane label="我的喜欢" name="second">
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
              <el-image slot="extra" :src="item.avatar" style="width: 240px;height: 150px;" />
              <a-list-item-meta :description="item.description + '    ' + item.topic">
                <a slot="title" @click="jumpToArticle(item.title)" :href="item.href">{{ item.title }}</a>
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </a-list>
        </el-tab-pane>
        <el-tab-pane label="我的分享" name="third">
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
              <el-image slot="extra" :src="item.avatar" style="width: 240px;height: 150px;" />
              <a-list-item-meta :description="item.description + '    ' + item.topic">
                <a slot="title" @click="jumpToArticle(item.title)" :href="item.href">{{ item.title }}</a>
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </a-list>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="fourth">
          <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">

            <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
              <template slot="actions">
                <span>
                  <a-icon :type="item.type" style="margin-right: 8px" />
                  未发布
                </span>
                <span>
                  <a-icon :type="item.type2" style="margin-right: 8px" />
                  未发布
                </span>
                <span>
                  <a-icon :type="item.type3" style="margin-right: 8px" />
                  未发布
                </span>
                <span>
                  <a-popconfirm title="确定要删除这个草稿吗?" ok-text="Yes" cancel-text="No" @confirm="confirm(item.article_id)"
                    @cancel="cancel">
                    <a href="#">删除</a>
                  </a-popconfirm>
                </span>

              </template>
              <el-image slot="extra" :src="item.avatar" style="width: 240px;height: 150px;" />
              <a-list-item-meta :description="item.description + '    ' + item.topic">
                <a slot="title" @click="jumpToArticle(item.title)" :href="item.href">{{ item.title }}</a>
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </a-list>
        </el-tab-pane>
        <el-tab-pane label="待审核文章" name="fifth">
          <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">

            <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">

              <el-image slot="extra" :src="item.avatar" style="width: 240px;height: 150px;" />
              <a-list-item-meta :description="item.description + '    ' + item.topic">
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
import Event from '@/common/bus.js'
import axios from "axios";

const listData = [];


export default {
  data() {
    return {
      avatar1: `avatar1.jpg`,
      num1: '',
      num2: '',
      num3: '',
      activeName: 'first',
      isManager: this.$route.params.isVisual,
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
      article_id: '',
      photo_file: require('/src/images/' + this.$route.params.photo_file),
      username: this.$route.params.username,
      user_id: this.$route.params.id,
      fans_number: this.$route.params.Fans_number,
      phone_number: this.$route.params.phone_number,
      article_number: this.$route.params.articleNumber,
      masseg: this.$route.params.about
    }
  },

  methods: {
    ToCaogao(n) {
      this.$warning({
        title: '提醒',
        content: '确定要将这一篇文章下线吗？',
      });
      let url = 'http://localhost:8082/change_state';
      axios.post(url, { article_id: n }).then(res => {
        this.$message.success('下线成功，可以到草稿箱去修改！');
      })
    },
    confirm(e) {
      console.log(e);
      let url = 'http://localhost:8082/delete_article';
      axios.post(url,{article_id:e})
      this.$message.success('ni狠心の删除了你的草稿');
    },
    cancel(e) {
      console.log(e);
      this.$message.error('取消了删除');
    },
    deleteArticle(n) {

    },
    jumpToCheck() {
      Event.$on("PersonCenter", (data) => {
        console.log(data)
        this.isManager = data
      })
      router.push({ name: 'check', params: { user_id: this.user_id } });
    },
    Articles() {
      console.log("dasdsa")

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
      else if (tab.name == 'fourth') {
        this.fourth();
      }
      else if (tab.name == 'fifth') {
        this.fifth();
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
              avatar: require('/src/images/' + res.data[i].article_cover),
              type: 'star-o', text: res1.data.shares,
              type2: 'like-o', text2: res1.data.likes,
              type3: 'message', text3: res1.data.comment,
              title: res.data[i].article_title,
              article_id: res.data[i].article_id,
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
              avatar: require('/src/images/' + res.data[i].article_cover),
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
              avatar: require('/src/images/' + res.data[i].article_cover),
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
    fourth() {
      let url2 = 'http://localhost:8082/userRoughArticle';
      let url = 'http://localhost:8082/aboutArticle';
      listData.splice(0, listData.length)

      axios.post(url2, { user_id: this.user_id }).then(res => {
        console.log(res.data)

        for (let i = 0; i < res.data.length; i++) {
          axios.post(url, { article_id: res.data[i].article_id }).then(res1 => {
            console.log()
            listData.push({
              avatar: require('/src/images/' + res.data[i].article_cover),
              title: res.data[i].article_title,
              article_id: res.data[i].article_id,
              description: res.data[i].date,
              content: res.data[i].article_introduction,
              topic: res.data[i].topic
            });

          })


        }
      })
    },
    fifth() {
      let url2 = 'http://localhost:8082/userAuditArticle';
      let url = 'http://localhost:8082/aboutArticle';
      listData.splice(0, listData.length)
      console.log("asfasfasfasfas")
      axios.post(url2, { user_id: this.user_id }).then(res => {
        console.log()

        for (let i = 0; i < res.data.length; i++) {
          axios.post(url, { article_id: res.data[i].article_id }).then(res1 => {
            console.log()
            listData.push({
              avatar: require('/src/images/' + res.data[i].article_cover),
              title: res.data[i].article_title,

              description: res.data[i].date,
              content: res.data[i].article_introduction,
              topic: res.data[i].topic
            });

          })


        }
      })
    },
    jumpToArticle(ins) {
      let url4 = 'http://localhost:8082/findArticleType';
      axios.post(url4, { article_name: ins }).then(res5 => {
        if (res5.data.state == '草稿') {
          router.push({ path: '/caogao/' + ins });
        }
        else {
          router.push({ path: '/article/' + ins });
        }
      })

    },
  }
}

</script>