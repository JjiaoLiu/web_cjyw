<p align="center"><img width="328px" src="https://nuxtjs.org/logos/nuxt.svg"></p>


# Nuxt.js with Express

> [ExpressJS](http://expressjs.com/) + [Nuxt.js](https://nuxtjs.org) = :zap:

Live Demo: [https://codesandbox.io/s/github/nuxt-community/express-template](https://codesandbox.io/s/github/nuxt-community/express-template)

## Installation

This is a template project, click on the green button "Use this template" at the top of this page and get started with GitHub :sparkles:

One you cloned your repository, install the dependencies with:

```bash
yarn install # or npm install
```

## ExpressJS Changes

- There is a  `api` directory with the root of your `api` server.
- The `routes` directory is called `api/routes`.

## Commands

| Command | Description |
|---------|-------------|
| npm run dev | Start ExpressJS server in development with Nuxt.js in dev mode (hot reloading). Listen on [http://localhost:3000](http://localhost:3000). |
| npm run build | Build the nuxt.js web application for production. |
| npm start | Start ExpressJS server in production. |

## Examples

- [Handling Protected SSR Routes](https://github.com/nuxt/express/blob/master/protected-ssr-api.md)

## Documentation

- [ExpressJS](http://expressjs.com/en/guide/routing.html)
- [Nuxt.js](https://nuxtjs.org/guide/)
- [Vue.js](http://vuejs.org/guide/)

## Licenses

- [ExpressJS license](https://github.com/expressjs/express/blob/master/LICENSE)
- [NuxtJS license](https://github.com/nuxt/nuxt.js/blob/master/LICENSE.md)
- [VueJS license](https://github.com/vuejs/vue/blob/master/LICENSE)

## mongodb Mac OSX 平台安装

- [Mac OSX 平台安装 MongoDB | 菜鸟教程](https://www.runoob.com/mongodb/mongodb-osx-install.html)

## 查看mongodb是否启动

- ``ps aux | grep -v grep | grep mongod``

## 启动mongobd 

- ``cd usr/local/mongodb/bin``
- ``mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork``

## jsonwebtoken 设置权限中间件

- ``https://www.npmjs.com/package/jsonwebtoken``

## multer 上传图片中间件

- ``https://www.npmjs.com/package/multer``

## formidable 解析excel中间件

- ``https://www.npmjs.com/package/formidable``

## xlsx 导出数据为xlsx

-``https://www.npmjs.com/package/xlsx``
