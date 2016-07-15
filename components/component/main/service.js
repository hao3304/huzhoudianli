/**
 * Created by jack on 16/6/14.
 */


/**
 * Created by jack on 16/6/14.
 */
var prefix = "http://localhost:8080";
//var prefix = "http://192.168.100.104:8002";

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.split("?")[1].match(reg);
    if (r!=null) return (r[2]); return null;
}

function co(callback){
    return function (rep) {
        if(rep.Code == 0){
            return callback.call(this,rep.Response);
        }else{
            alert(rep.Message);
        }
    }
}

/**
 * 获取小区名称列表
 * @param p
 * @param c
 */
function community(p,c){
    $.post(prefix +"/xqxxcj/elec/community/query.json",p,co(c),"json");
}
/**
 * 根据小区、幢号查幢号下的门牌号和电力户号
 * @param p {building:幢数,comid:小区id}
 * @param c
 */
function elec(p,c){
    $.post(prefix +"/xqxxcj/userinfo/elec/query.json",p,co(c),"json");
}

/**
 * 电力用户信息更新
 * @param p {elecid:string,comid:string,building:string,house:string,mobile:string}
 * @param c
 */
function update(p,c){
    $.post(prefix +"/xqxxcj/userinfo/elec/update.json",p,co(c),"json");
}

module.exports = {
    GetQueryString:GetQueryString,
    community:community,
    elec:elec,
    update:update
};