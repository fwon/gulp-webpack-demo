**注意：**
**该demo15年构建，已经不维护了，当时还是采用1.0版本的webpack。现在webpack已经更新到2.0+，更多新功能和修改请参考[官网](https://webpack.js.org/)。**

-------------------------------------------------------------------------

项目相关文章说明请见 [gulp + webpack 构建多页面前端项目][1]

由于关注该主题的人比较多，所以还是整理了一下手上项目，给出了一个简单的demo, 希望能提供一些思路。
你可能还需要根据项目情况做调整。

为了支持类似fis的`__inline`和`__sprite`语法（base64和雪碧图），对依赖包`gulp-css-base64`和`gulp-css-spriter`都做了修改，所以暂时保留在node_modules中。你可以不必再下载这两个包。

安装依赖包：
`npm install`

开发：
`gulp dev`

发布：
`gulp`

Update:
2017.2.24 -- devtool: 'source-map' 改为 '#source-map'， 兼容新版Chrome规则。

[1]: https://github.com/fwon/blog/issues/17
