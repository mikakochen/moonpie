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
let asideMenu = db.get('aside');

/*
 * 三种请求方式下获取参数的基本方法如下：
 * POST方式下获取参数的方式为：request.body
 * (1)Get方式"/getCategoryById?categoryId=123456&parentid=6556757"下获取参数的方式为：request.query.categoryId
 * (2)Get方式"/getCategoryById/:categoryId"下获取参数的方式为：request.params['categoryId']
 * */

//列出所有的heroes列表
exports.list = function(db) {
	return function(req, res){
		//无条件'{}'查找所有的图书，返回json给客户端，then是当查找完成时回调的异步方法
		asideMenu.find({},function(){
			console.log('查询所有侧边菜单成功');
		}).then((result) => res.json(result)).then(() => db.close());   //关闭数据库
	}
};

//获取一个hero
exports.getOne = function(db) {
	return function(req, res){
		let id = req.params.id;
		//通过Id查找，返回找到的hero
		asideMenu.findOne({'id': id}, function(err, doc){
			console.log('查询一个英雄成功');
		}).then((result) => res.json(result)).then(() => db.close());
	}
};

//新增一个hero
exports.add = function(db) {
	return function(req, res){
		//找到最大id 
		asideMenu.findOne({}, {sort: {id: -1}}).then((obj) => {
			let hero = req.body;
			hero.id = (parseInt(obj.id)+1)+"";
			//在数据库里插入新对象，并返回添加成功的对象
			asideMenu.insert(hero,function(){
				console.log('新增英雄成功');
			}).then((result) => res.json(result)).then(() => db.close());   
			//数据插入到数据库里成功了，但是报错POST http://localhost:3000/add net::ERR_EMPTY_RESPONSE
			//不知道改了什么，第二天正常了
		})
	}
};

//删除hero
exports.delete = function(db){
	return function(req, res){
		//取出参数
		let id = req.params.id;
		//查找并删除成对象，然后返回删除对象
		asideMenu.remove({'id': id},function(){
			console.log('删除成功');
		}).then((result) => res.json(result)).then(() => db.close());
	}
};

//更新hero
exports.update = function(db){
	return function(req, res){
		//获得提交给服务器的json对象，再执行更新,update方法里第1个参数是要更新的图书查找条件即id，第2个参数hero是要更新的对象
		let hero = req.body;
		asideMenu.update({'id': hero.id}, hero).then((result) => res.json(result)).then(() => db.close());
	}
}


