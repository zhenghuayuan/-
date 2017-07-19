var formidable = require("formidable");
var path = require("path")
var fs = require("fs")
//测试 
module.exports =  function(req, res, next){
	var form = formidable.IncomingForm({
		encoding : 'utf-8',//上传编码
		uploadDir : path.resolve(__dirname, "../../base/pic/"),//上传目录，指的是服务器的路径，如果不存在将会报错。
		keepExtensions : true,//保留后缀
		maxFieldsSize : 2 * 1024 * 1024//byte//最大可上传大小
	})
	var allFile = []
	form.on('progress', function(value, total) {
		// console.log('上传进度: ' + parseInt((value/total)*100) + "%" ); 
	})
	.on('file', function (filed, file) {
		allFile.push([filed, file]) //收集传过来的所有文件
	})
	.on('end', function() { 
		res.end('上传成功！'); 
	})
	.on('error', function(err) {
		console.error('上传失败：', err.message); 
		next(err); 
	})
	.parse(req, function(err, fields, files){
		if(err){
			console.log(err);
    	}
		allFile.forEach(function(item, index){
			var fieldName = item[0];
			var types = item[1].name.split('.');
			fs.renameSync(item[1].path,form.uploadDir + "/" + types[0]+"."+String(types[types.length-1]))
		});   	
    })
}

