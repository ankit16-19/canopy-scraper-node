const request = require("request")
// const rp = require('request-promise').defaults({simple:false})
const login_old =function(uid, pwd,cb) {
	//request options
	let option = {
		url: "https://hib.iiit-bh.ac.in/Hibiscus/Login/auth.php?client=iiit",
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
			// console.log(res)

			let cookie = res.headers["set-cookie"][0].slice(0, 36)
			// console.log(cookie)

			cb(cookie)
		} else {
			console.log(err)
		}
	})



}


module.exports = login_old
