const mongoose = require("mongoose")

const noticeDataSchema = new mongoose.Schema({
	lock: {
		type: Boolean,
		default: false
	},
	notice_data: {
		type: String,
		default: ""
	},
	last_updated: {
		type: Date
	},
	id: {
		type: String,
		default: ""
	},
	link: {
		type: String,
		default: ""
	}
})

noticeDataSchema.pre("save", async function(next) {
	const curr = this;
	const now = new Date();
	curr.last_updated = now;
	next();
  });

const NoticeData = mongoose.model("notice_data", noticeDataSchema, "notice_data")

module.exports = NoticeData
