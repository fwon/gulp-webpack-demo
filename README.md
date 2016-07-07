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

[1]: https://segmentfault.com/a/1190000003969465
