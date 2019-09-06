
const group = require('./data.json')
const {
    hotGroup,
    lifeGroup,
    findGroup
} = group
module.exports = {
        devServer: {
            before: function (app, server) {
                app.get('/group/hotGroup', function (req, res) {
                    res.json(hotGroup);
                });
                app.get('/group/lifeGroup', function (req, res) {
                    res.json(lifeGroup);
                });
                app.get('/group/findGroup', function (req, res) {
                    res.json(findGroup);
                });
            },

            proxy:{
                '/mv':{
                    target: 'https://www.zhihu.com/api/v4/topics',
                    changeOrigin:true,
                    pathRewrite:{
                        '^/mv': ''
                    }
                },
                '/ting': {
                    target: 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/ting': ''
                    }
                },
                '/api':{
                    target: 'http://39.97.33.178',
                    changeOrigin:true,
                },
                '/song':{
                    target: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30',
                    changeOrigin: true,
                },
                '/v2':{
                    target: 'http://api.douban.com/v2',
                    changeOrigin: true,
                },
                '/msg':{
                    target: 'https://news-at.zhihu.com/api/4/news',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/msg': ''
                    }
                }
            }
        }
    }