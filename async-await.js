	var one = ()=>{
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve("one")
			}, 1000)
		}) 
	}
	var two = ()=>{
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				reject("error")
			}, 2000)
		})
	}
	var two = ()=>{
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve("two")
			}, 2000)
		})
	}
	var start = async ()=>{
		try{
			var str1 = await one()
			console.log(str1)
			var str2 = await two()
			console.log(str2)
			for (var i = 0; i < 10; i++) {
				var value = await new Promise((resolve, reject)=>{
					setTimeout(()=>{
						resolve(i)
					}, 1000)
				})	
				console.log(value)
			}
		}catch(e){
			console.log("error")
		}
	}
	start()
