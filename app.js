const express = require("express")
require('dotenv').config()
const feeRouter = require('./consumers/fee')
const noticeRouter = require('./consumers/notice')
const notice_dataRouter = require('./consumers/notice_data')
require("./db/mongoose");


const app = express()
app.use(express.json())


app.listen(3001, () => {
	console.log("on 3001")
})
