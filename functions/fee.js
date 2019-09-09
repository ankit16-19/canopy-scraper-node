const request = require("request")
const cheerio = require("cheerio")
const login_old = require("./login_old")
const Fee = require("../models/fee")
// require("../db/mongoose")


const data_writer = async (d, uid) => {
	const now = new Date()
	return Fee.updateOne({ studentID: uid }, { lock: false, data: d,last_updated : now })
}

const fee_extractor = async function(uid, pwd, callback) {

	login_old(uid, pwd, (cookie) => {
		// console.log(cookie);
		console.log("in login_old")

		let option = {
			url: "https://hib.iiit-bh.ac.in/Hibiscus/Fees/stuFee.php?stuid=" + uid,
			headers: {
				Cookie: cookie,
				Referer: "https://hib.iiit-bh.ac.in/Hibiscus/Cms/cmsMenu.php?coid=B216-2~CS102"
			}
		}
		request.post(option, (err, res, html) => {
			var data = {
				Notices: []
			}
			var $ = cheerio.load(html)
			data.Notices.push({
				html: $.html()
			})
			callback(data.Notices[0].html, uid)
		})
	})
}



module.exports = {scraper: fee_extractor, data_writer }
