import Vue from 'vue'
import Router from 'vue-router'
import notebook from "@/components/searchComoponents/notebook"
import Note from "@/components/searchComoponents/note"
import user from "@/components/searchComoponents/user"
import userPage from "@/components/myFollowComopnents/userPage"
import writer from '../components/writer.vue'
import newLike from '../components/myMessage/newLike.vue'
import privateMessage from '../components/myMessage/privateMessage.vue'
import newFollow from '../components/myMessage/newFollow.vue'
import newComment from '../components/myMessage/newComment.vue'
import caogao from '../components/caogao.vue'
import myMessage from '../components/myMessage.vue'
import addUser from "@/components/myFollowComopnents/addUser"
Vue.use(Router)

export default new Router({

    routes: [{
            path: '/app',
            name: 'App',
            component: () =>
                import ('../App.vue')
        },
        { //登录
            path: '/',
            name: 'Login',
            component: () =>
                import ('../components/Login.vue')
        },
        { //注册
            path: '/register',
            name: 'Register',
            component: () =>
                import ('../components/Register.vue')
        },
        { //草稿
            path: '/caogao/:id',
            name: 'caogao',
            component: () =>
                import ('../components/caogao.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },

        },
        { //主页
            path: '/home',
            name: 'Home',
            component: () =>
                import ('../components/mainPage.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }

        },
        { //用户页
            path: '/person',
            name: 'person',
            component: () =>
                import ('../components/person.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }

        },
        { //我的关注
            path: '/myFollow',
            name: 'myFollow',
            component: () =>
                import ('../components/myFollow.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            children: [{
                    path: "userPage/:id",
                    name: "userPage",
                    component: userPage
                },
                {
                    path: "addUser/:id",
                    name: "addUser",
                    component: addUser,
                }
            ]
        },
        { //文章
            path: '/article/:id',
            name: 'article',
            component: () =>
                import ('../components/article.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },

        },
        { //我的消息
            path: '/myMessage',
            name: 'myMessage',
            component: myMessage,
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },


            children: [{
                    path: 'newLike/:id',

                    component: newLike
                },
                {
                    path: 'privateMessage/:id',
                    component: privateMessage,
                },
                {
                    path: 'newFollow/:id',
                    component: newFollow,
                },
                {
                    path: 'newComment/:id',
                    name: 'newComment',
                    component: newComment,

                },

            ],
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        { //个人中心
            path: '/PersonalCenter',
            name: 'PersonalCenter',
            component: () =>
                import ('../components/PersonalCenter.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        { //搜索
            path: '/search',
            name: 'search',
            component: () =>
                import ('../components/search.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            children: [{
                    path: "notebook/:id",
                    name: "notebook",
                    component: notebook
                },
                {
                    path: "note/:id",
                    name: "note",
                    component: Note
                },
                {
                    path: "user/:id",
                    name: "user",
                    component: user
                }
            ]
        },
        { //文本编辑器
            path: '/writer',
            name: 'writer',
            component: () =>
                import ('../components/writer.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },

        { //审核箱
            path: '/check',
            name: 'check',
            component: () =>
                import ('../components/check.vue'),
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },

    ],
    mode: "history"
})