import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "G-Doc",
  description: "G-Doc",
  themeConfig: {
    siteTitle: 'G-Doc',
    logo: 'leaves-two.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Vue', link: '/' },
      { text: 'React', link: '/React' },
      { text: '前端', items: [
        { text: 'Mobx', link: '/' },
        { text: 'Next.js', link: '/frontend/Next.js' },
        { text: 'Pinia', link: '/' },
      ] },
      { text: '后端', items:[
        { text: 'Linux', link: '/backend/Linux.md' },
        { text: 'Docker', link: '/backend/Docker.md' },
        { text: 'Git', link: '/' },
        // { // 添加分割线
        //   items:[
        //     { text: 'JUC并发编程', link: '/' },
        //     { text: '设计模式', link: '/' },
        //   ]
        // },
        { text: 'JUC并发编程', link: '/' },
        { text: '设计模式', link: '/' },
        { text: 'Netty', link: '/' },
        { text: 'ElasticSearch', link: '/' },
      ] },
    ],

    sidebar: [
      {
        text: 'Vue', link: '/',
      },
      {
        text: 'React', link: '/React'
      },
      {
        text: '前端', 
        items: [
         {
          text: 'Mobx', link: '/'
         },
         {
          text: 'Next.js', link: '/'
         },
         {
          text: 'Pinia', link: '/'
         },
        ]
      },
      {
        text: '后端', 
        items: [
         {
          text: 'Linux', link: '/'
         },
         {
          text: 'Docker', link: '/'
         },
         {
          text: 'Git', link: '/'
         },
         {
          text: 'JUC并发编程', link: '/'
         },
         {
          text: '设计模式', link: '/'
         },
         {
          text: 'Netty', link: '/'
         },
         {
          text: 'ElasticSearch', link: '/'
         },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Zixueban' }
      // 添加图标可以使用icon 使用svg图标
    ],
    footer: {
      copyright:  'Copyright @ 2024 GJ'
    }
  }
})
