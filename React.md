<a name="WyFsd"></a>
## crete-react-app基于运用
<a name="HO22C"></a>
### 安装脚手架
:::tips
npm i create-react-app -g // 下载脚手架
检查安装情况：
create-react-app --version 
:::
<a name="tz0Gg"></a>
### 基于脚手架创建React工程化的项目
**创建项目：**
:::tips
create-react-app 项目名
:::
**默认安装的依赖：**

- react：React框架的核心
- react-dom：React视图渲染的核心（webapp，网页）
   - react-nativeg：构建和渲染app的
- react-scripts：脚手架为了让项目目录看起来干净一些，把webpack打包的规则及相关的插件等都隐藏在了node_modules目录下，react-scripts就是脚手架中自己对打包命令的一种封装，基于它打包，会调用node_modules中的webpack等进行处理。
<a name="x5HLl"></a>
## JSX构建视图的基础知识
> JSX：javascript and xml 把JS和JTML标签混合在一起

1. 在HTML中嵌入JS表达式需要使用 **{} **的语法
- 何为JS表达式：就是执行有结果。
2. 在ReactDom.createRoot()的时候，不能直接把HTML/BODY作为根容器，需要指定一个额外的盒子。

每一个构建的视图，只能有一个根节点。即：
```vue
<template>
  <div></div> // 需要一个根标签 当然也可以使用<></>
</template>
```

3. **{}**语法中嵌入不同的值，所呈现出来的特点：
   1. number/string：值是啥，就渲染出来啥。
   2. boolean/null/undefined/Symbol/BigInt：渲染出来的内容是空。
   3. 除数组对象外，其余对象一般都是不支持{}中进行渲染，但是也有特殊情况。
      1. JSX虚拟DOM对象。
      2. 给元素设置style行内样式，需求必须写成一个对象格式。
   4. 数组对象：把数据的每一项分别拿出来渲染（并不是变为字符串渲染，中间没有逗号）。
   5. 函数对象，不支持在{}中渲染，但是可以作为函数组件库。
4. 给元素设置样式：
   1. 行内样式：需要基于对象的格式处理，直接写样式字符串会报错。
```jsx
<h2 style={{
  color: 'red'
}}></h2>
```

   2. 设置样式类名：需要把class替换为className
<a name="wrv87"></a>
### JSX底层处理机制
**第一步：把我们编写JSX语法，编译为虚拟DOM对象（virtualDOM）：**
虚拟DOM对象：虚拟的javaScript对象树。关键字：**虚拟、对象、树。**

1. 基于babel-preset-react-app 把JSX编译为Reaact.createElement(...)这种格式。只要是元素节点，必然会基于createElement进行处理：React.createElement(ele,props,...children).
   1. ele：元素标签名（或组件）；
   2. props：元素的属性集合（对象），如果没有设置任何的属性，则此值是null;
   3. children：第三个及以后的参数，都是当前元素的子节点。
2. 在把createElement方法执行，创建出virtualDOM虚拟DOM对象（也有称为：JSX元素、JSX对象、ReactChild对象...）
```jsx
virtualDOM = {
  $$typeof: Symbol(react.element),
  ref: null,
  key: null,
  type: 标签名或组件名
  // 存储了元素的相关属性 && 子节点信息
  props: {
    元素相关属性，
    children: 子节点信息，没有子节点则没有这个属性，属性值可能是一个值，也可能是一个数组
  }
}
```
**第二步：把创建的virtualDOM渲染为真实DOM**
真实DOM：浏览器页面中，最后渲染出来，让用户看见的DOM元素。
说明：第一次渲染页面是直接从虚拟DOM到真实DOM；但是后期视图更新的时候，需要经过一个DOM-DIFF的对比，计算出补丁包PATCH（视图差异的部分），把PATCH补丁包进行渲染。
<a name="tTP26"></a>
### 函数组件
创建：在src目录中，创建一个xxx.jsx的文件，就是创建一个组件，我们在此文件中，创建一个函数，让函数返回JSX视图。
调用：基于ES6Module规范，导入创建的组件，然后像写标签一样调用这个组件即可。
<Component> 单闭合调用
<Component></Component>双闭合调用
命名：组件的命名，我们一般采用大驼峰方式来命名。
调用组件的时候，我们可以给调用的组件设置（传递）各种各样组件。注意，如果传递的不是字符串，需要使用 **{} **来进行嵌套。
**渲染机制**
函数组件的渲染机制与jsx渲染机制一样，第一步同样是使用**babel-preset-react-app**把调用的组件转换为createElement格式。
第二步把createElement方法执行，创建一个虚拟DOM对象。
第三步基于root.render把虚拟DOM变为真实DOM

- type值不在是一个字符串，而是一个函数，此时：
   - 把函数执行。
   - 把虚拟DOM中的props，作为参数传递给函数值。
   - 接受函数执行的返回结果，也就是当前组件的虚拟DOM对象。
   - 最后基于render把组件函数返回的虚拟DOM变为真实DOM，插入到#root容器中。
<a name="IHdAy"></a>
### 属性props的处理

- 调用组件，传递进来的属性是”只读的“【是因为props对象被冻结了】
- 作用：父组件调用子组件的时候，可以基于属性，把不同的信息传递给子组件，子组件接受相应的属性值，呈现出不同的效果，让组件的复用性更强。
- 虽然对于传递进来的属性，我们不能直接修改，但是可以做一套规则校验。
   - 设置默认值：
```jsx
函数组件.defaultProps = {
  x: 0,
  ...
}
```

- 设置其他规则，比如数据格式，是否必传...（需要下载依赖：prop-types）
```jsx
import PropType from 'prop-types'
函数组件.propTypes = {
  title: PropTypes.string.isRequired
}
```
**其他知识点：关于对象的规则设置**

1. 冻结
   1. 冻结对象：Object.freeze(obj)
   2. 检测是否被冻结：Object.isFrozen(obj) => 返回值boolean
   3. 被冻结的对象：不能修改成员值，不能新增成员，不能删除现有成员，不能给成员做劫持（Object.defineProperty）
2. 密封
   1. 密封对象：Object.seal(obj)
   2. 检测是否被密封：Object.isSealed(obj)
   3. 被密封对象：可以修改成员的值，但也不能删，不能新增，不能劫持
3. 扩展
   1. 把对象设置为不可扩展：Object.preventExtensions(obj)
   2. 检测是否扩展：Object.isExtensible(obj)
   3. 被设置不可扩展的对象，除了不能新增成员，其余的操作都可以处理。

被冻结的对象，即是不可扩展的，也是密封的，同理，被密封的对象，也是不可扩展的。
<a name="V6cF4"></a>
### 静态组件和动态组件
函数是”静态组件“：第一次渲染组件，把函数执行：

- 产生一个私有的上下文。
- 把解析出来的props（含children）传递进来（但是被冻结了）。
- 对函数返回的JSX元素进行渲染。

动态组件：类组件或者在函数组件中使用Hooks函数。
函数组件：
```jsx
import React from "react";

// 封装组件
const Dialog = function (props) {
    // props属性可以获取父组件传递过来的数据
    let {title, content, children} = props;
    // 插槽传递过来的数据
    children = React.Children.toArray(children);
    return <div>
        <div>
            <h1>{title}</h1>
            <span>×</span>
        </div>
        <div>{content}</div>
        {children.length > 0 ? <div>
            {children}
        </div> : null}
    </div>
};


export default Dialog;

```
创建类组件
创建一个构造函数（类），要求必须继承React.Component/PureComponent这个类

- 我们习惯于使用ES6中的class创建类（方便）
- 必须给当前类设置一个render方法（放在其原型上），在render方法中，返回需要渲染的视图。
<a name="FbhsC"></a>
### 关于类组件
从调用类组件（new Vote()），开始类组件内部发生的事情：

1. 初始化属性 && 规则校验

方案一：
```jsx
constructor(props){
	super(props);  // 会把传递进来的属性挂载到this实例上
  console.log(this.props) // 获取到传递的属性
}
```
方案二：即使我们自己不再constructor中处理（或者constructor都没有写），在constructor处理完毕后，React内部也会把传递的props挂载到实例上，所以在它的函数中，只要保证this是实例，就可以基于this.props获取传递的属性。
同样this.props获取到的属性对象也是被冻结的（只读的）。
```jsx
    /*属性规则校验*/
    static defaultProps = {
        num: 0
    }
    
    /*属性类型校验*/
    static propTypes = {
        titile: PropTypes.string.isrequired
    }
```

2. 初始化状态

状态：后期修改状态，可以触发视图的更新
需要手动初始化，如果我们没有去做相关的处理，则默认会往实例上挂载一个state，初始值是null => this.state = null
```jsx
state = {
  // 状态值
}
```
	修改状态：控制视图更新
```jsx
this.state.xxxx = xxx // 这种方式仅仅只是修改状态值，但是无法让视图更新
```
	实现视图更新，我们需要基于React.Component.prototype提供的方法操作：
```jsx
this.setState = {
  // 修改的值
  titile: 123
}
```
	或者使用方法 this.forceUpdate 强制更新。

3. 触发componentWillMount 周期函数钩子（钩子函数），组件第一次渲染之前。

钩子函数：在程序运行到某个阶段，我们可以基于提供一个处理函数，让开发者在这个阶段做一些自定义的事情。
此周期函数：目前是不安全的（虽然可以用，但是未来可能要被移除，所以不建议使用），而且控制台会出现黄色警告（为了不抛出警告，我们可以在此钩子函数之前使用UNSAFE_componentWillMount）。
如果开启了React的严格模式（React.StrictMode），则我们使用UNSAFE_componentWillMount这样的周期函数，控制台会直接抛出红色警告错误。
React.StrictMode VS "use strict"
 "use strict"：JS的严格模式
React.StrictMode ：React的严格模式，它会检查React中一些不规范的语法或者是一些不建议使用的API等。

4. 触发render周期函数：渲染
5. 触发componentDidMount周期函数：第一次渲染完毕。

已经把虚拟DMO变成了真实DOM（所以我们可以获取真实DOM了）
<a name="hQsJ7"></a>
### 类组件更新
组件更新的逻辑（第一种：当修改 了相关状态，组件会更新）

1. 触发shouldComponentUpdate周期函数，是否允许更新
```jsx
shouldComponentUpdate(nextProps, nextState){
  // nextState：存储要修改的新状态
  // this.state：存储的还是修改前的状态（此时状态还未修改）

  // 此周期函数返回一个boolean值 
  // true 表示允许更新，会执行下一个操作
  // false 不允许更新
}
```

2. 触发componetWillUpdate 周期函数：更新之前
   1. 此周期函数也是不安全的
   2. 在这个阶段，状态还没有被修改
3. 修改状态值为为最新的值
4. 触发render周期函数：组件更新
   1. 按照最新的状态或者属性，把返回的JSX编译为虚拟DOM
   2. 和上一次渲染出来的虚拟DOM进行对比（DOM-DIFF算法）
   3. 把差异的部分进行渲染（渲染为真实DOM）
5. 触发componetDidUpdate周期函数：组件更新完毕

特殊说明：如果我们是基于this.forceUpdate强制更新视图，会跳过shuoldComponetUpdate周期函数的校验，直接从WillUpdate开始更新（也就是视图一定会更新）

组件更新的逻辑（第二种：父组件更新，触发的子组件更新）

1. 触发componetWillReceiveProps周期函数：接受最新属性之前
   1. 周期函数时不安全的
```jsx
UNSAFE_componetWillReceiveProps(nextProps){
  // this.props：存储之前的属性
  // nextProps：传递进来的最新属性值
}

```

2. 触发shouldComponentUpdate周期函数...
<a name="NFCBG"></a>
### PureComponent和Component区别
PureComponent会给类组件默认加一个shouldComponentUpdate周期函数
在此周期函数中，他对新老的属性或者是状态，会做一个浅比较。如果经过浅比较，发现属性和状态并没有改变，则返回false（也就是不更新组件），有变化才会去更新。
<a name="hMGTW"></a>
### ref相关操作
> 受控组件：基于修改数据/状态，让视图更新，达到需要的效果。
> 非受控组件：基于ref获取DOM元素，我们操作DOM元素，来实现需求和效果。

基于ref获取DOM元素的语法：

1. 给需要获取的元素设置ref="xxx"，后期基于this.refs.xxx去获取相应的DOM元素（不推荐使用）
```jsx
<h1 ref="title">组件ref属性的使用</h1>
// 获取
this.refs.title
```

2. 把ref属性值设置为一个函数
```jsx
<h2 ref={x => this.title2 = x}>组件ref属性的另一种使用</h2>
// 获取
this.title2
```
其中x是函数的形参：存储的就是当前DOM元素，然后我们获取的DOM元素x直接挂载到某个属性上。

3. 基于React.createRef()方法创建一个ref对象
```jsx
box = React.createRef();

<div ref={this.box}>我是一个盒子</div>

// 获取
this.box.current
```
给元素标签设置ref，目的是获取对应的DOM元素
给类组件设置ref，目的是获取当前调用组件创建的实例（后续可以根据实例获取子组件中的相关信息）
给函数组件设置ref，会出现报错，但是可以使用React.forwardRef，实现ref的转变，目的是获取函数子组件内部的某个元素。、
<a name="EV4dK"></a>
## 基于Vite创建React项目
<a name="jQchU"></a>
### 使用Vite创建项目
查看官网创建：[https://cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/)
<a name="XB7Tr"></a>
### 配置 @ 路径提示
安装node的类型声明：
```bash
npm i -D @types/node
```
配置vite.config.ts文件
```typescript
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {join} from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': join(__dirname, "./src/")
        }
    }

})

```
配置tsconfig.json文件
```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
}
```
<a name="UdX2A"></a>
## useState使用
<a name="usB00"></a>
### 基本使用
useState基本赋初值：
```tsx
export const Demo: React.FC = () => {

    const [count,setCount] = useState(0)

    const add = () => {
        setCount(count + 1);
    }

    return <>
        <h1>useState的基本使用</h1>
        <h2>count的值：{count}</h2>
        <button onClick={add}>点我加1</button>
    </>
}
```
对于useState的赋值可以使用函数
```tsx
 const add = () => {
        setCount(() => {
            return count + 1
        });

        console.log(count);
    }
```
<a name="xHOfs"></a>
### 相关注意点
> 注意：useState是一个异步函数如果想要获取count值，可以使用useEffect:

```tsx
 useEffect(() => {
        console.log("useEffect",count);
    },[count])
```

> 如果连续两次修改state的值，会造成state更新不及时问题：

```tsx
 const add = () => {
        setCount(count + 1);
        setCount(count + 1);
    }
```
> 解决：使用函数返回值给state设置值

```tsx
 const add = () => {
        // setCount(count + 1);
        // setCount(count + 1);

        setCount((pre) => pre + 1 );
        setCount((pre) => pre + 1 );
    }
```
> 更新对象的值：useState中初始值为对象，他是根据对象的引用来判断对象的值是否改变
> 所以在设置时，要重新改变对象的引用，才能更新

```tsx
 const [user, setUser] = useState({
        name: 'lisi',
        age: 20
    })

    const changeUser = () => {
        user.name = "zhangsan";
        user.age = 22;

        setUser({...user});
    }

    return <>
        <h1>state修改对象的值</h1>
        <div>姓名：{user.name}</div>
        <div>年龄：{user.age}</div>
        <button onClick={changeUser}>点击修改</button>
    </>
```
<a name="Ltr8i"></a>
## useRef使用
<a name="mBD3c"></a>
### 基本使用
获取dom元素
```tsx
import React, {useRef} from "react";

export const Demo: React.FC = () => {

    const ipRef = useRef<HTMLInputElement>(null);

    const getDom = () => {
        console.log(ipRef.current);
    }

    return <>
        <input ref={ipRef} type="text" />
        <h1>useRef的使用</h1>
        <button onClick={getDom}>获取dom元素</button>
    </>
}
```
<a name="t5uVg"></a>
### 其他使用

1. 存储一些共享数据
```tsx
export const Demo2:React.FC = () => {

    const [count,setCount] = useState(0);
    // 这个只会初始化一次
    const preCount = useRef(0);


    const changeCount = () => {
        setCount(count + 1)
        preCount.current = count;
    }

    return <>
        <h1>新值：{count},旧值：{preCount.current}</h1>
        <button onClick={changeCount}>修改</button>
    </>
}

```

2. 相关注意点：
> - 组件render时useRef不会被重复初始化
> - ref.current的变化不会造成组件的重新渲染
> - ref.current不能作为其他函数的依赖项

解释第三点：就是如果你用useEffect监听的是ref.current的值，是不会执行useEffect里面的函数的。
useEffect的渲染流程：当页面重新渲染时，会触发useEffect，如果有依赖项，会判断是不是依赖性被修改而造成的渲染，如果是，会执行useEffect里面的函数，否则不会执行，因为useRef它的值的修改是不会重新渲染页面的，所以自然不能执行useEffect里面的函数。

3. 无法直接使用ref引用函数式组件

解决办法：使用 React.forwardRef来获取，但一般要与useImperativeHandle使用。
```tsx
const Child = React.forwardRef((_, ref) => {

    // 暴露需要在ref.current获得的属性
    useImperativeHandle(ref, () => {
        return {
            name: "lisi",
            age: 20
        }
    })

    return <>
        <h1>子组件</h1>
    </>
})

export const Father: React.FC = () => {

    const childRef = useRef<{ name: string, age: number }>();

    const getChild = () => {
        console.log(childRef.current);
    }

    return <>
        <h1>父组件</h1>
        <button onClick={getChild}>获取子组件实例</button>
        <br/>
        <Child ref={childRef}/>
    </>
}
```

4.  useImperativeHandle的第三个参数

我们直到通过useImperativeHandle可以控制需要暴露的数据，但是所暴露的数据是多少就是多少，不会因为你改变了那个值而改变，但是useImperativeHandle的第三个参数可以选择依赖项，如果所依赖的那个变量发生了改变，就会重新暴露数据。
```tsx
// 暴露需要在ref.current获得的属性
    useImperativeHandle(ref, () => {
        return {
            name: "lisi",
            count,
            reset: () => {
                return setCount(1)
            }
        }
    },[count])
```
<a name="YjY8g"></a>
## useEffect使用
> 在严格模式下useEffect会执行两次

他是在dom元素渲染完成之后才会执行
<a name="ItOQb"></a>
### 基本使用
```tsx
useEffect(() => {
  
},[])
```
useEffect这个钩子函数是有两个参数，执行时机，如果没有依赖项，那么只要每次dom元素渲染完毕之后，都会执行。如果依赖项是一个空数组，只会在首次渲染时执行一次，如果有依赖的值，那么那个值发生改变时会执行一次。
```tsx
import React, {useEffect, useState} from "react";

export const Demo:React.FC = () => {
    const [count,setCount] = useState(0);
    const [flag,setFlag] = useState(true);

    const changeCount = () => {
        setCount(count + 1);
        setFlag(!flag);
    }

    useEffect(() => {
        console.log("useEffect执行了");
        return () => {}
    },[count])

    return <>
        <h1>useEffect使用：count：{count}</h1>
        <h1>布尔值：{flag.toString()}</h1>
        <button onClick={changeCount}>点击修改count值</button>
    </>
}

```
还有就是：这个useEffect可以在第一个参数中有一个返回值，如果在使用useEffect钩子函数的那个组件被销毁了就会执行。
useEffect小案例，获取鼠标位置:
```tsx
const MouseInfo:React.FC = () => {
    const [position,setPosition] = useState({x:0,y:0});

    useEffect(() => {
        console.log("执行了");

        let timeId: null | NodeJS.Timeout = null;
        const handleMouseMove = (e: MouseEvent) => {
            if(timeId !== null) return;
            console.log(e.clientX,e.clientY)

            timeId = setTimeout(() => {
                setPosition({x:e.clientX,y:e.clientY})
                timeId = null;
            },200)

        }
        window.addEventListener("mousemove", handleMouseMove);

        // 组件销毁时触发这个函数
        return () => {
            window.removeEventListener("mousemove",handleMouseMove);
        }
    },[])

    return <>
        <h1>鼠标的位置：{JSON.stringify(position)}</h1>
    </>
}

export const TestMouseInfo:React.FC = () => {

    const [flag, setFlag] = useState(true);

    return <>
        {flag && <MouseInfo />}
        <button onClick={() => {setFlag(!flag)}}>取消鼠标移动</button>
    </>
}

```
useLayoutEffect与useEffect的区别：
在于执行时机的不同，useLayoutEffect会在组件渲染之前执行。
<a name="JKRbp"></a>
## useReducer使用
useReducer 实际上是 useState 的升级版，都是用来存储和更新 state，只是应用的场景不一样。
一般情况下，我们使用 useState 就足够项目需要了，不多当遇到以下场景时，使用useReducer 会更好些 。

- **状态逻辑复杂**：当状态的更新逻辑比较复杂时，使用 useReducer 可以将这个逻辑封装在 **reducer** 函数中，使代码更加清晰易懂。
- **多组件共享状态**：当多组件需要共享一个状态时，可以将这个状态放在父组件，然后通过 useReducer 将状态和更新函数传递给子组件，从而实现状态共享。
- **需要处理连续的多个状态更新**：当需要连续处理多个状态更新时，使用 useReducer 可以帮助我们更好地管理状态的变化和更新。
<a name="qvlYZ"></a>
### 基本使用
```tsx
const [state,dispatch] = useReducer(函数（调用dipatch触发的函数），初始值，函数（对初始值的加工）)
const [state,dispatch] = useReducer(reducer,initState,getInitData)
```
执行流程：首先获取初始值，如果有第三个参数，那么会将初始值交给第三个参数也就是函数，进行加工处理，然后再返回给state,当用户执行了dispatch时，会调用第一个函数，来更新状态
```tsx
reducer(preState,action) action是一个对象，{type:要执行的操作,payload:要改变的数据}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/38829930/1699931906749-631aeeb9-03ba-40ff-9bd0-7449538c5037.png#averageHue=%23292f38&clientId=u696f668c-062e-4&from=paste&height=40&id=ubc8a4e72&originHeight=50&originWidth=502&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=3603&status=done&style=none&taskId=u38c67918-3d82-44c1-a3e0-ea75abb553d&title=&width=401.6)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/38829930/1699931935949-c5c49c54-cc2c-4014-a0f3-bba16856feba.png#averageHue=%23292e37&clientId=u696f668c-062e-4&from=paste&height=224&id=ua6370e2c&originHeight=280&originWidth=394&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=13586&status=done&style=none&taskId=u1af518f7-5869-42ea-8d6c-972527444d6&title=&width=315.2)
<a name="Hx5aO"></a>
## Redux
Redux 是一种 JavaScript 库，用于管理应用的全局状态。它的目的是帮助开发者管理和同步应用中的数据状态，以实现组件间的数据共享和通信。
<a name="BrKLN"></a>
### 基本使用

1. 下载redux
```shell
npm i redux
```

2. 基本使用

创建一个reducer
```typescript
type actionParams = {
    type: string,
    data: number,
}

// 定义reducer 记住还需要存在状态
export const countReducer = (preState = 0, action: actionParams) => {
    const {type, data} = action;
    switch (type) {
        case "add":
            console.log("加法")
            // 记住是返回状态，即如果状态是一个对象，也要把对象进行解构，在加上修改的属性
            return preState + data
        case "sub":
            return preState - data
        default:
            return preState

    }

}
```
创建一个store.ts
```typescript
import {createStore} from "redux";
import {countReducer} from "@/store/countReducer";

// 创建store 引入reducer
export const store = createStore(countReducer) // 第二个参数可以传入一个状态
```
使用store
```tsx
import React, {useState} from "react";
import {store} from "@/store/store";


export const Demo: React.FC = () => {


    // 这里即使你修改了store中state的值，页面也不会重新渲染，要通过监听
    store.subscribe(() => {
        alert(store.getState())
    })

    const add = (num: number) => {
        store.dispatch({type: 'add', data: num});
    }
    const sub = (num: number) => {
        store.dispatch({type: 'sub', data: num});
    }

    return <>
        <h1>redux的使用</h1>
        <h2>显示的数据： {store.getState()}</h2>
        <button onClick={() => add(1)}>加法</button>
        <button onClick={() => sub(1)}>减法</button>
    </>
}
```
值得注意的是：如果你只是通过store的dispatch去调用修改状态，页面获得的state是不会发生改变的，可以在全局入口文件调用subscribe
```typescript
store.subscribe(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
        <App/>,
)
})
```
<a name="acOaF"></a>
### Redux Toolkit(RTK)
官网：[https://www.reduxjs.cn/redux-toolkit/overview/](https://www.reduxjs.cn/redux-toolkit/overview/)
简介：
[Redux Toolkit](https://redux-toolkit.js.org/) 是 Redux 官方强烈推荐，开箱即用的一个高效的 Redux 开发工具集。它旨在成为标准的 Redux 逻辑开发模式，我们强烈建议你使用它。
它包括几个实用程序功能，这些功能可以简化最常见场景下的 Redux 开发，包括配置 store、定义 reducer，不可变的更新逻辑、甚至可以立即创建整个状态的 “切片 slice”，而无需手动编写任何 action creator 或者 action type。它还自带了一些最常用的 Redux 插件，例如用于异步逻辑 Redux Thunk，用于编写选择器 selector 的函数 Reselect ，你都可以立刻使用。
使用：
安装：npm install @reduxjs/toolkit react-redux
其他直接看官网。
<a name="2e52ed87"></a>
## ReactRouter6教程
> npm i react-router-dom

<a name="dd9d2d69"></a>
### 一级路由
路由链接
```jsx
/**路由链接
	使用Link或者是NaviLink 
	区别在于NavLink你在点击的时候会给你的那个链接添加一个active类名
**/
<NavLink to="/about"></NavLink>
/** 自定义NaviLink高亮类名**/
<NavLink className=(({isActive}) => {
        return isActive ? '高亮的类名' : '不添加'
    })></NavLink>
```

注册路由（在显示该组件内容的地方添加路由）

```jsx
/**注册路由
	<About/>表示为显示的组件
**/
<Routes>
	<Route path="/about" element={<About/>}></Route>
    // 重定向 要导入Navigate
    <Route path="/" element={<Navigate to="/about"/>}></Route>
</Routes>
```

重定向

```jsx
 <Route path="/" element={<Navigate to="/about"/>}></Route>

/**
	replace属性表示的是跳转的方式  不写默认是push跳转
	如果写成repalce=true表示的repalce跳转模式
**/
<Navigate to="/about"/>
```

<a name="de1e4a98"></a>
### 路由表
新建一个routes文件夹，里面添加一个index.js
```javascript
export default [
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/',
        element:<Navigate to='/about'/>
    }
]
```

在需要渲染该组件内容的地方引入：

```jsx
import routes form './routes'

// 根据路由表生成对应的路由规则
const element = useRoutes(routes)

// 把element放到要显示的地方即可
//注册路由部分
{element}
```

<a name="dc5WG"></a>
### 嵌套路由

路由表

```javascript
export default [
    {
        path: '/home',
        element: <Home/>
        children: [
        	{
        		// 嵌套路由
        		path: 'news', 表示的是/home/news
        		element: <News/>
    		}
        ]
    }
]
```

上述表示的就是在home组件里面实现嵌套

指定嵌套路由呈现的位置：

```jsx
import {Outlet} from 'react-router-dom'
//指定嵌套路由呈现的位置
<Outlet/>
```

<a name="6d5cc0b4"></a>
### 路由的params参数

首先通过路径将参数传递过去

```jsx
<Link to=`detail/参数一/参数二`></Link>
```

路由表路径也要修改为参数的占位

```javascript
{
    path:'/detail/:参数一/:参数二'
    element: 
}
```

在相应的地方通过useParams获取参数

```javascript
const {参数一，参数二} = useParams()
```

<a name="a5c0872e"></a>
### 路由的search参数

> 人家官网叫search参数，但实际上就是类似于query参数


首先通过路径将参数传递过去

```jsx
<Link to='detail?key=value&key=value'></Link>
```

不需要修改路由表直接可以获取参数

```javascript
// 通过useSearchParams获取 解构出来的数据和useState类似
// setSearch方法可以设置参数
cosnt [search,setSearch] = useSearchParams()
cosnt value = search.get(value) // 只有通过get方法并传入要获取的值的key才能获取值
```

<a name="b2993db3"></a>
### 路由的state参数

首先也是路径但传入的方式与前两者不同

```jsx
<Link to='detail' 
      state={{
        需要传入的参数，形式key：value
    }}
    ></Link>
```

获取参数

```javascript
const {state} = useLocation()
```

<a name="aa62375e"></a>
### 编程式路由导航

使用

```javascript
import {useNavigate} from 'react-router-dom'

const navigte = useNavigate()

navigate('跳转的路径',{
    //配置对象 只能是replace和state参数
    replace: false,
    state: {
        id：1
        title: 2
    }
})
```
