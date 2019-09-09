const request = require('request')
const cheerio = require('cheerio')
const login_new = require('./login_new')
const ND  =require('../models/notice_data')
// require('../db/mongoose')

function data_writer({notice_data,attachment,n_id}) {
    const now = new Date()
    return ND.updateOne({id:n_id},{link:attachment,notice_data:notice_data,lock:false, last_updated: now})
    
}

const notice_data_extractor = function (uid,pwd,n_id) {

    return new Promise((resolve, reject) => {
        login_new(uid,pwd, (cookie)=>{
            let option ={
                url: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docDet.php?docid="+n_id,
                headers: {
                    Cookie: cookie,
                    Referer: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docList.php"
                }
            }
        
    
        request.get(option, (err,res,html)=>{
            if (err){
                return reject(err);
            }
            const $ = cheerio.load(html)
    
            const notice_html = $('table').html()
        
            let attachment = $("a").attr('href')
            if(attachment == 'docList.php'){
                a_html = ""
            }
            else{
                a_html = 'https://hib.iiit-bh.ac.in/m-ums-2.0'+attachment//.slice(5)
            }

                resolve({notice_data: notice_html,attachment: a_html,n_id})
            })
        })
    
    })

}



module.exports = {scraper: notice_data_extractor,data_writer}