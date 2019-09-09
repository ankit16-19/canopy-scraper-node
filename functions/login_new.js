const request= require('request')


const login_new =function(uid, pwd,cb) {
	//request options
	let option = {
		url: "https://hib.iiit-bh.ac.in/m-ums-2.0/start/login/auth.php?client=iiit",
		form: {
			uid: uid,
			pwd: pwd,
			txtinput: 3,
			sub: "Login"			
		},
		headers: {
			"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:54.0) Gecko/20100101 Firefox/54.0",
			Connection: "keep-alive"
		}
	}

	request.post(option, (err, res, html) => {
		if (!err) {
			// console.log(res.headers)
			let cookie = res.headers["set-cookie"][0].slice(0, 36)

			// let option3 = {
            //     url: "https://hib.iiit-bh.ac.in/m-ums-2.0/start/here/?w=866&h=663",
            //     headers: {
            //         "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:54.0) Gecko/20100101 Firefox/54.0",
            //         Connection: "keep-alive",
            //         Cookie: cookie,
            //         Referer: "https://hib.iiit-bh.ac.in/m-ums-2.0/start/here/setWindowSize.php"
                    
            //     }
            // }
            // request.get(option3, (err3, res3, html3) => {
            //     if(err3){
            //         console.log(err3)
            //     }

            //     console.log(res3.headers)
			// 	console.log(html3)
	
			// })
			cb(cookie)
		
		} else {
			console.log(err)
		}
	})

}
module.exports = login_new
