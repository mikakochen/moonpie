/*
 * 使用monk访问mongodb
 * 以rest的方式向前台提供服务
 */

// 依赖monk模块
let monk = require('monk');
//连接并打开数据库
let db = monk('localhost:27017/mac');
//从数据库中获得heroes集合，类似表，并非所有数据， key
// var books = db.get('books');db.heroes.find();
let login = db.get('login');

/*
 * 三种请求方式下获取参数的基本方法如下：
 * POST方式下获取参数的方式为：request.body
 * (1)Get方式"/getCategoryById?categoryId=123456&parentid=6556757"下获取参数的方式为：request.query.categoryId
 * (2)Get方式"/getCategoryById/:categoryId"下获取参数的方式为：request.params['categoryId']
 * */

//用户登录，找到匹配的用户，返回该用户的数据给前端
exports.check = function(db) {
	console.log('enter check')
	return function(req, res){
		//条件'{}'查找该用户，返回json给客户端，then是当查找完成时回调的异步方法
		login.findOne({
			username: req.body.username,
			password: req.body.password
		},function(){
			console.log('查询用户成功');
		}).then((result) => {
			// 返回匹配的这个用户（暂定）
			res.json(result)
		}).then(() => db.close());   //关闭数据库
	}
};

