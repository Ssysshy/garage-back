# express-api-server
server for pageUI

一.功能
	
	实现对新闻管理系统的后台数据处理支持
	
二.项目结构：

1.路径  bin/www

2.唯一的入口 app.js。

3.项目的模块

	*user  用户管理模块
	1.user.model.js  模型层
	2.user.controller  控制层
	3./routes/user.js  路由
	
	*cete  分类管理模块
	1.cate.model.js  模型层
	2.cate.controller  控制层
	3./routes/cate.js  路由	
	
	*news  新闻管理模块
	1.news.model.js  模型层
	2.news.controller  控制层
	3./routes/news.js  路由
	
	*comment 评论模块
	1.comment.model.js  模型层
	2.comment.controller  控制层
	3./routes/comment.js  路由
	
三.提供的接口
	
	1.单个查找
	2.多个查找
	3.单个删除
	4.多个删除
	5.按条件查找

四.项目构思

	

	
        