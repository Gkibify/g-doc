next.js是基于文件路由的方式，他是一个全栈框架。
<a name="iBVYn"></a>
## 创建项目
> npx create-next-app 项目名

<a name="EESeU"></a>
## 路由
当执行npm run dev时，首先找到的是app目录下的_app.js,然后再去找index.js对应的路由。
<a name="i5Gkf"></a>
### 基于pages的路由
![image.png](https://cdn.nlark.com/yuque/0/2023/png/38829930/1702682516815-79d46e22-1d8c-4408-9d22-c6dc7dab4cdf.png#averageHue=%23303236&clientId=u2f6f2208-cd46-4&from=paste&height=149&id=u1448c438&originHeight=223&originWidth=558&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=15025&status=done&style=none&taskId=u838a331a-196b-488a-9ef5-ca5eb353781&title=&width=372)<br />说明：/about -> about.js /profile->profile.js
<a name="wRBfq"></a>
### 嵌套路由
![image.png](https://cdn.nlark.com/yuque/0/2023/png/38829930/1702682930730-f1c1eaae-b0e2-4d83-9379-051df53ca8df.png#averageHue=%23303236&clientId=u2f6f2208-cd46-4&from=paste&height=140&id=u043a25f1&originHeight=210&originWidth=526&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=13536&status=done&style=none&taskId=u9566ea59-72d2-411b-b5c4-f21f44c3f26&title=&width=350.6666666666667)<br />说明：访问的路径： /blog -> index.js   /blog/first -> first.js
<a name="ZTHFz"></a>
### 动态路由
![image.png](https://cdn.nlark.com/yuque/0/2023/png/38829930/1702683539252-842fdbb4-51f5-42b4-86c3-d45cd89646e4.png#averageHue=%23303236&clientId=u2f6f2208-cd46-4&from=paste&height=190&id=ub1f35524&originHeight=285&originWidth=398&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=17800&status=done&style=none&taskId=uc10cd0c6-33c1-416c-b67f-1fbced021e2&title=&width=265.3333333333333)<br />访问路径说明：/book/1 -> /book/[bookId].js<br />获取路径上的参数：

```jsx
const router = useRouter();
const bookId = router.query.bookId;
```
<a name="rOs9s"></a>
### 守卫（Catch-all）路由
![image.png](https://cdn.nlark.com/yuque/0/2023/png/38829930/1702685292231-dda8c507-8829-47af-a5ae-4c3b174de232.png#averageHue=%232d3647&clientId=u2f6f2208-cd46-4&from=paste&height=70&id=uea9ae832&originHeight=105&originWidth=533&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=7252&status=done&style=none&taskId=u3810810a-264d-4858-9870-34f7ba7d8cf&title=&width=355.3333333333333)<br />说明：[...params]表示的是可以接受多个参数，即/doc/1/2/3 -> [...params].js路由；但是如果你访问/doc就会找不到，可以使用[[...params]]，这个与[...parmas]的区别就在于可以访问不带参数的路径。
<a name="BwnfY"></a>
### 可编程路由
```jsx
const router = useRouter();
router.push("跳转路径");

// 如果你按返回不想返回上一步，可以使用replace来替换push
```
<a name="d8snH"></a>
### 自定义404页面
在pages目录下创建404.js文件，就可以了，注意必须项目名必须是404
<a name="W8D8T"></a>
## 预渲染和获取数据
<a name="GhMtX"></a>
### 预渲染
所谓的需渲染就是提前获取到页面，不用等js加载完毕之后才渲染页面，对于传统的React项目来说，需要等到js加载完毕之后才能渲染页面。预渲染又被分为静态生成和服务器端渲染。
<a name="wwGrk"></a>
### 静态生成
默认情况下Next.js缺省启用静态生成，当我们构建应用时，他会静态生成每一个页面。
<a name="KNI9g"></a>
### 静态页面获取数据
使用getStaticProps
```jsx
export default function Users({users}){

    return <>
        <h1>用户列表</h1>
        {console.log(users)}
    </>
}

export async function getStaticProps(){

    const response = await fetch('http://jsonplaceholder.typicode.com/users')
    const data = response.json();

    return {
        props: {
            users: data
        }
    }
}
```
getStaticProps要点：

1. getStaticProps只在服务器端运行。永远不会再客户端运行，getStaticProps中的代码不会被包含在发送到客户端的JS bundle中。
2. 可以在getStaticProps直接编写服务器端代码，可通过fs模块访问文件系统，或者查询数据库，可以包含API key等机密信息，不会被发送到客户端浏览器。
3. 只适用于页面Page,不能用于普通展示组件，只适用于预渲染，不能用于客户端数据获取。
4. getStaticProps必须返回一个对象，该对象必须包含一个props建，并且它的值也是对象。
5. getStaticProps是在build构建时运行，在开发模式下，每个请求都会触发getStaticProps的执行。
<a name="CVy1L"></a>
### getStaticPaths
当我们预渲染的页面需要获取路径传过来的值时，就需要使用getStaticPaths来指明参数。举个例子，你需要通过文章id来获取文章的详细信息。
```jsx
import Link from "next/link";

export default function PostList({postList}){

    return <>
        <div>
            {postList.map(item => {
                return <Link key={item.postId} href={`/post/${item.postId}`}>
                    <h1>{item.content}</h1>
                </Link>
            })}
        </div>
    </>
}

export async function getStaticProps(){

    // 应该是异步请求
    const postList = [
        {postId: 1,content: '1111111111111111'},
        {postId: 2,content: '1111111'},
    ]

    return {

        props: {
            postList
        }
    }
}
```
```jsx
import {useRouter} from 'next/router'
export default function PostDetail({post}){

    const router = useRouter();

    // 后备页面
    if(useRouter.isFallback){
      	return <h1>加载中</h1>
    }

    return <>
        <div>{post},{post.content}</div>
    </>
}

export async function getStaticPaths(){

    return {
      // 注意这里一般采取动态生成
        paths: [
            {
                params: {postId: '1'}
            },
            {
                params: {postId: '2'}
            }
        ],
        fallback: false
    }
}
export async function getStaticProps(context){

    // content里面的params包含传递过来的Id
    const {params} = context
    console.log(params)

    const postList = [
        {postId: 1,content: '1111111111111111'},
        {postId: 2,content: '1111111'},
    ]

    const post = postList.filter((item) => item.postId === params.postId)
    console.log(post)

    // 如果获取的数据不存在，可以返回给一个404页面
    if(!post){
      return {
        notFound: true
      }
    }

    return {
        props: {
            post
        }
    }

}


```
关于getStaticPaths中的fallback中的值设定：<br />false: 从getStaticPaths返回的路径，会在构建时通过getStaticProps函数渲染为html,任何不是从这个getStaticPaths返回的路径都会导致返回404页面。<br />true:从getStaticPaths返回的路径，会在构建时通过getStaticProps函数渲染为html；构建时未生成的页面在运行时并不会产生404页面，相反，‘Next.js'会在第一次请求该路径的时候，返回页面的后备'fallback'版本。在后台，Next.js回静态生成和请求路径相对应的HTML和JSON,包括运行getStaticProps;完成后，浏览器会接受到和路径对应的JSON，他将被用于渲染带有props属性的页面，从用户的角度来看，页面会从后备版本切换到完整版本；同时，Next.js会跟踪已渲染的新页面列表，对同意路径的后续请求将直接返回生成的页面，就像其他在构建时渲染页面一样。<br />'blocking'：blocking和这个true相似，只是'blockinh'页面不会有后备页。
<a name="JLaWt"></a>
### ISR增量静态重新生成
全称Incremental Static Regeneration ，用什么用呢，就是你数据发生了变化，但是页面渲染依然是老数据。只需要更新那些需要更改的页面，而不必重建整个应用程序。在props同级添加**revalidate: 每隔时间的更新数（例如：20）**
<a name="xOa3D"></a>
### 服务器端渲染（SSR）
SSR并不是在构建时预渲染页面的，而是在请求时渲染页面。对于每一个请求，HTML都会被即使生成。
```jsx
export async function getServerSideProps(){
    // 异步请求获取数据
    const response = await fetch("");
    const data = response.json();
    
    return {
        props: {
            article: data
        }
    }
    
}
```
<a name="mlOxU"></a>
## API路由
Next.js是一个全栈框架；<br />你可以使用React编写前端代码，也可以编写可由前端调用的后端代码；<br />API路由让你可以Next.js应用目录一部分的形式来创建Restful的端点；<br />在'pages'目录中，你需要创建一个成为'api'的目录；<br />在'api'的目录中，你可以定义应用所需要的所有的APIs;<br />其中，你可以添加业务代码，但不需要添加额外的自定义的服务器端代码，也不需要配置任何API路由；<br />Next.js为您提供编写全栈React + Node应用所需要的一切。
<a name="kEa7V"></a>
### 简单使用
```javascript
export default function handler(req,res){
    res.status(200).json({name: 'Home Api route'})
}
```
通过：[http://localhost:3000/api](http://localhost:3000/api)直接访问
<a name="aAwhk"></a>
### API处理GET POST请求
示例代码：

```javascript
import {useState} from "react";

export default function CommentsPage(){

    const [comments, setComments] = useState([])
    const [comment,setComment] = useState("")

    const fetchComments = async () => {
        const res = await fetch("/api/comments");
        const data = await res.json();

        setComments(data)
    }

    const submitComment = async () => {
        const res = await fetch("/api/comments",{
            method: 'POST',
            body: JSON.stringify({comment}),
            headers: {"Content-Type":"application/json"}
        });

        const data = await res.json();
        console.log(data);
    }

    return <>
        <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={submitComment}>发表评论</button>
        <button onClick={fetchComments}>加载评论</button>
        <hr/>
        {comments.map(item => {
            return <div key={item.id}>{item.text}</div>
        })}
    </>
}
```
接口：

```javascript
import {comments} from "../../../data/comments";

export default function handler(req, res){
    if(req.method === 'GET'){
        res.status(200).json(comments)
    }else if(req.method === 'POST'){
       const comment =  req.body.comment;
       console.log(comment)
       const newComment = {
           id: Date.now(),
           text: comment
       }

       comments.push(newComment);
       res.status(201).json(newComment)
    }
}
```
<a name="nShJs"></a>
### API处理DELETE请求
```javascript
const deleteComment = async (commentId) => {
        const res = await fetch(`/api/comments/${commentId}`,{
            method: 'DELETE'
        });

        const data = await res.json();

        console.log(data)
        await fetchComments()

    }

```
```javascript
import {comments} from "../../../data/comments";

export default function handler(req, res){
    // 获取到路由上的参数
    const {commentId} = req.query;

    if(req.method === 'GET'){
        const comment = comments.find((comment) => {
            return comment.id === parseInt(commentId)
        })
        res.status(200).json(comment);
    }else if(req.method === 'DELETE'){
        const deleteComment = comments.find((comment) => {
            return comment.id === parseInt(commentId)
        })

        const index = comments.findIndex(
            (comment) => comment.id === parseInt(commentId)
        )
        comments.splice(index,1);
        res.status(200).json(deleteComment);
    }
}
```
<a name="duB2i"></a>
## 其他
<a name="Jwz2X"></a>
### 应用布局
第一步： 创建组件
```javascript
export default function Header(){

    return <>
        <h1>头部</h1>
    </>
}
```
```javascript
export default function Footer(){

    return <>
        <h1>底部</h1>
    </>
}
```
第二步：在_app.js中引入
```javascript
import '../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return <>
    <Header/>
    <Component {...pageProps} />
    <Footer/>
  </>
}

export default MyApp

```
定义单个页面：
```javascript
export default function About(){

    return <>
        <div>About组件</div>
    </>
}

About.getLayout = function PageLayout(page){

    return <>
        {page}
    </>
}
```
```javascript
import '../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  if(Component.getLayout){
    return Component.getLayout(<Component {...pageProps} />)
  }

  return <>
    <Header/>
    <Component {...pageProps} />
    <Footer/>
  </>
}

export default MyApp

```
<a name="cYwRQ"></a>
### 路径别名设置
创建一个jsconfig.json 如果是Ts 就是tsconfig.json
```json
{
	"compilerOptions": {
    "baseUrl": "."   // 访问路径直接为components/...components为根目录
    "paths": {
      "@/layout/*" : ["components/layout/*"] 这句话就是将@/layout 映射到components下的layout 
    }
  }
  
}
```
