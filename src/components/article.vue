<template >
   <el-container style="height: 1500px;width: 1000px;margin: auto; ">
    
  <el-header style="height: 70px;">
    
  <div style="height: 80px;width: 1000px;margin: 0 -20px; ">
    <h1 style="margin: 20px 400px;font-size: 20px;">{{ ArticleTile }} </h1>
    <p style="margin: -20px 600px;height: 30px;width: 80px;">{{Writer}}</p>
    <p style="margin: -30px 800px;height: 30px;width: 80px;">{{ date }}</p>
    
</div >


</el-header>
  <el-main style="height: 800px;"><!--文章主体内容-->
    <v-card-text v-html="content"></v-card-text>
</el-main>
  <el-footer style="height: 60px;">
    <div style="height: 50px;width: 300px;margin: 10px 750px;">
   
    <el-button slot="reference" type="success" icon="el-icon-share" @click="share">{{ text }}</el-button>
  <el-button type="danger" icon="el-icon-lollipop" @click="like">{{ text2 }}</el-button>
  
    </div>
    </el-footer>
  <el-footer style="height: 570px;">
    <template>
  <a-list
    class="comment-list"
    :header="`${data.length} replies`"
    item-layout="horizontal"
    :data-source="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-comment :author="item.author" :avatar="item.avatar">
        <template slot="actions">
          <span v-for="action in item.actions">{{ action }}</span>
        </template>
        <p slot="content">
          {{ item.content }}
        </p>
        <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ item.datetime.fromNow() }}</span>
        </a-tooltip>
      </a-comment>
    </a-list-item>
  </a-list>
  <a-comment>
      
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="value" @change="handleChange" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" @click="handleSubmit"  type="primary">
            提交评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
</template>

    </el-footer>
    
</el-container>
  </template>
  <script>
  
  import axios from 'axios';
import moment from 'moment';
  export default {
    name: 'DocxPreview',
    data() {
      return {
        submitting: false,
      value: '',
        test1231:'',
        ArticleTile: this.$route.params.id ,
        date:'',
        Writer:'',
        //文章内容：content
        content:'',
        text:'',
        text2:'',
        text3:'',
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
          content:''
        },
        data: [ ],
      moment,
      };
    },
    methods: {
      
      handleClose(done) {
            done();
      },
      share() {
        let article_id1=this.ArticleTile
        this.$confirm({
        title: '确认是否要分享这一篇文章',
        content: h => <div style="color:red;">分享之后，文章链接会出现在个人动态里</div>,
        onOk() {
          let url2 = 'http://localhost:8082/addShare';
          axios.post(url2,{article_name:article_id1,user_id:'2020214531'})
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
      },
      like(){
        let url2 = 'http://localhost:8082/addLike';
        axios.post(url2,{article_name:this.ArticleTile,user_id:'2020214531'}).then(res=>{
          if(res.data==1){
            this.$message.success('点赞成功！');
          }
          
        })
        
      },
      submit(){
        
      },
      handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        this.data = [
          {
            author: '2020214531',
            avatar: require('/src/images/user1.png'),
            content: this.value,
            datetime: moment().subtract(1, 'days'),
          },
          ...this.data,
        ];
        this.value = '';
      }, 1000);
      let url2 = 'http://localhost:8082/addDiscuss';
      axios.post(url2,{article_id:this.ArticleTile,content:this.value,user_id:'2020214531',})
      this.$message.success('发表评论成功！');
    },
    handleChange(e) {
      this.value = e.target.value;
    },
    },
    created:function(){
      let url2 = 'http://localhost:8082/aboutArticle';
        let url = 'http://localhost:8082/searchArticleByName3';
        let url3 = 'http://localhost:8082/searchDiscuss';
        let url4 = 'http://localhost:8082/showContent';
        axios.post(url,{ArticleTile:this.ArticleTile}).then(res=>{
          console.log(res.data)
          this.date=res.data.date
          this.Writer=res.data.writer_id
          axios.post(url2,{article_id:res.data.article_id}).then(res1=>{
             this.text= res1.data.shares,
              this.text2= res1.data.likes,
               this.text3= res1.data.comment
          })
        })
        axios.post(url3,{article_name:this.ArticleTile}).then(res3=>{
          console.log(res3.data)
          this.data.splice(0,this.data.length)
          for(let i=0;i<res3.data.length;i++){
            this.data.push( {
          actions: ['Reply to'],
          author: res3.data[i].user_id,
          avatar: require('/src/images/'+res3.data[i].userPhoto),
          content:res3.data[i].content,
           
          datetime: moment().subtract(1, 'days'),
        },)
          }
          
        })
        axios.post(url4,{article_name:this.ArticleTile}).then(res4=>{
        console.log(res4.data.content)
         this.content=res4.data.content
          
        })
    }
  };
</script>