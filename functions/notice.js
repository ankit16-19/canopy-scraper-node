const request = require("request")
const cheerio = require("cheerio")
const login_new = require("./login_new")
const Notice_data = require('../models/notice')
const Lock = require('../models/global_lock')

// require("../db/mongoose")



const data_writer = async ( data )=>{	
	let promiseArray = []
	for (let index = 0; index < data.length; index++) {
		promiseArray.push(Notice_data.updateOne({'id':data[index].id},{$set:{'attention':data[index].attention,'date':data[index].date,'id_link':data[index].id_link,'posted_by':data[index].posted_by,'title':data[index].title}},{upsert: true}))	
	}
	const now = new Date()
	await Lock.updateOne({name : "scraper_lock"},{global_lock : false, last_updated: now})
	return Promise.all(promiseArray)
}


const notice = async function(uid, pwd) {

	return new Promise((resolve , reject) => {

	
		login_new(uid, pwd, (cookie) => {
			console.log(cookie)
			let option = {
				url: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docList.php",
				headers: {
					Cookie: cookie,
					Referer: "https://hib.iiit-bh.ac.in/m-ums-2.0/start/here/?w=866&h=694"
				}
			}

			request.get(option, (err, res, html) => {
				if(err){
					return reject(err)
				}
				// console.log(html);
				let data = { Notices: [] }
				const $ = cheerio.load(html)
				// console.log(res)
				$("tr")
					.next()
					.each((i, x) => {
						const date = $(x)
							.find("td")
							.eq(0)
							.text()
							.replace(/\s\s+/g, "")
						const title = $(x)
							.find("td")
							.eq(1)
							.text()
							.replace(/\s\s+/g, "")
						const posted_by = $(x)
							.find("td")
							.eq(2)
							.text()
							.replace(/\s\s+/g, "")
						const attention = $(x)
							.find("td")
							.eq(3)
							.text()
							.replace(/\s\s+/g, "")
						const id_link = $(x)
							.find("a")
							.attr("href")
						const id = $(x)
							.find("a")
							.attr("href")
							.slice(17)
						data.Notices.push({
							date: date,
							title: title,
							id: id,
							id_link: id_link,
							posted_by: posted_by,
							attention: attention
						})
					})
					resolve(data.Notices)
				
			})
		})
	})
}

module.exports = { scraper: notice, data_writer: data_writer }