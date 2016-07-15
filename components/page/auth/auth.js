/**
 * Created by jack on 16/7/1.
 */


var Vue = require("component_modules/vue.js");
var Service = require("main/service");

module.exports = Vue.extend({
    template:__inline("auth.html"),
    data: function () {
        return {
            comid:"",
            house:"",
            houseid:"",
            elec:"",
            mobile:Service.GetQueryString("usr"),
            building:null,
            list:[],
            elecs:[],
            loading:true,
            load_text:""
        }
    },
    methods:{
        render: function () {
            this.loading = true;
            var self = this;
            this.load_text = "获取小区信息中...";
            Service.community(JSON.stringify({}), function (rep) {
                self.loading = false;
                self.list = rep;
            })
        },
        getElec: function () {
            if(this.comid&&this.building){
                var self = this;
                Service.elec(JSON.stringify({comid:this.comid,building:this.building}), function (rep) {
                    self.elecs = rep;
                })
            }
        },
        onSelectHouse: function (id) {
            var self =this;
            self.elecs.forEach(function (e) {
                if(e._id == id){
                    self.elec = e.elecid;
                    self.house = e.house;
                    debugger
                }
            })
        },
        onSubmit: function () {
            this.loading = true;
            this.load_text = "更新中...";
            Service.update(JSON.stringify({
                elecid:this.elec,
                comid:this.comid,
                building:this.building,
                house:this.house,
                mobile:this.mobile
            }), function (rep) {
                debugger

            })
        }
    },
    watch:{
        building: function () {
            this.house = "";
            this.elec = "";

            this.getElec();
        },
        comid: function () {
            this.getElec();
        },
        houseid: function (h) {

            if(h){
                this.onSelectHouse(h);
            }
        }
    },
    ready: function () {
        this.render();
    }
});