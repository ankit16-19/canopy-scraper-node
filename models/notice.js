const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema({
	attention: {
		default: "",
		type: String
	},
	date: {
		default: "",
		type: String
	},
	id: {
		default: "",
		unique: true,
		type: String
	},
	id_link: {
		default: "",
		type: String
	},
	posted_by: {
		default: "",
		type: String
	},
	title: {
		default: "",
		type: String
	}
})

noticeSchema.pre("save", async function(next) {
	const curr = this;
	const now = new Date();
	curr.last_updated = now;
	next();
  });

const Notice = mongoose.model("Notice_data", noticeSchema, "notices")

module.exports = Notice
