import request from "superagent";
import jsonp from "superagent-jsonp";

const apiURL = "https://api.douban.com/v2";
const apikey = "&apikey=0df993c66c0c636e29ecbb5344252a4a";

function requestURL(event) {
    request
        .get(
            `${apiURL}/event/list?loc=108288&count=30${apikey}`
        )
        .use(jsonp({
            timeout: 10000
        }))
        .end((err, res) => {
            if (!err) {
               event = res.body.events
            }
        })
}

export default {
    requestURL
}