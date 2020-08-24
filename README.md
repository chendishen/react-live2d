<h1 align="center">react-live2d</h1>

![npm](https://img.shields.io/npm/dt/react-live2d)
![NPM](https://img.shields.io/npm/l/react-live2d)
![npm](https://img.shields.io/npm/v/react-live2d)


服务器配置较差，网站首次打开，看板娘需要加载大量模型和动作，请耐心等候
[示例地址](test2.supmiao.com)


## 目录说明

```
·
├─ Core                         # Cubism Core 核心库

└─ Samples                      

   └─ TypeScript

      └─ Demo                   # 项目目录

         └─ Resources           # live2D的模型及动作导出的文件

         └─ Framework           # 包含渲染和动画功能等的源代码

         └─ src                 # 核心代码
```

## 📦 Install

为了不增加npm包的负担，基础包还是直接使用script引入，在你个人的react项目的->public->index.html先插入
```
<script src = "http://publicjs.supmiao.com/live2dcubismcore.min.js"></script>
```

```bash
npm install react-live2d
```


## 🔨 Usage

```jsx
import ReactLive2d from 'react-live2d';

const App = () => (
  <>
    <ReactLive2d
        width={300}
        height={500}
    />
  </>
);
```

比如你想要给页面加入模型Hiyori，那就在你的react项目中的public目录下，将Hiyori放入Resources资源文件夹,如

```
·
└─ public                     

   └─ Resources

       └─ Hiyori
```

api 文档 （待完善，如有需要功能欢迎提[issue](https://github.com/chendishen/Live2DBase/issues)）

| 成员 | 说明 | 类型 | 默认值 |
| ----- | ----- | ----- | ----- |
| width | 盒子宽度 | Number | 300 |
| height | 盒子高度 | Number | 400 |
| top | position：relative的top值 | String | '' |
| right | position：relative的right值 | String | '0' |
| bottom | position：relative的bottom值 | String | '0' |
| left | position：relative的left值 | String | '' |
| ModelList | 模型列表，暂时只展示数组的第一个模型 | Array<String> | ['Hiyori'] |


