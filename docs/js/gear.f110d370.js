(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["gear"],{"3c93":function(e,t,a){},"4d0a":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-row",{attrs:{dense:""}},[a("v-col",[a("gear-table-filter",{model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),a("v-divider",{staticClass:"mt-1"}),a("gear-table",{attrs:{gears:e.gears}})],1)],1),a("v-overlay",{attrs:{color:"secondary",opacity:"0.5",value:e.overlay}},[a("gear-form",{on:{close:function(t){e.overlay=!1},input:e.inputGear}})],1)],1)},s=[],i=(a("4de4"),a("b0c0"),a("d4ec")),n=a("bee2"),o=a("262e"),c=a("2caf"),l=a("9ab4"),u=a("60a3"),d=a("3617"),p=a("0d59"),v=function(e){Object(o["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(i["a"])(this,a),e=t.apply(this,arguments),e.name="gear-page",e.gears=[],e.overlay=!1,e.filter={types:[],sets:[],mode:0},e.headers=[{text:"Dessert (100g serving)",align:"start",sortable:!1,value:"name"},{text:"Calories",value:"calories"},{text:"Fat (g)",value:"fat"},{text:"Carbs (g)",value:"carbs"},{text:"Protein (g)",value:"protein"},{text:"Iron (%)",value:"iron"}],e.desserts=[{name:"Frozen Yogurt",calories:159,fat:6,carbs:24,protein:4,iron:"1%"},{name:"Ice cream sandwich",calories:237,fat:9,carbs:37,protein:4.3,iron:"1%"},{name:"Eclair",calories:262,fat:16,carbs:23,protein:6,iron:"7%"},{name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,iron:"8%"},{name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,iron:"16%"},{name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,iron:"0%"},{name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,iron:"2%"},{name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,iron:"45%"},{name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,iron:"22%"},{name:"KitKat",calories:518,fat:26,carbs:65,protein:7,iron:"6%"}],e}return Object(n["a"])(a,[{key:"created",value:function(){this.gears=[this.dummy("1"),this.dummy("2"),this.dummy("3")]}},{key:"dummy",value:function(e){return{id:e,type:p["a"].Type.Weapon,set:p["a"].Set.Speed,grade:p["a"].Grade.EPIC,level:85,enhance:15,hpp:1,hp:2e4,defp:3,def:2e3,atkp:5,atk:4e3,cri:100,cdmg:350,spd:9,eff:10,res:11}}},{key:"inputGear",value:function(e){this.gears.push(e)}}]),a}(u["e"]);v=l["a"]([Object(u["a"])({components:{GearDetail:d["a"],GearForm:d["b"],GearTable:d["c"],GearTableFilter:d["d"]}})],v);var f=v,m=f,b=a("2877"),y=a("6544"),h=a.n(y),g=a("62ad"),C=a("ce7e"),x=(a("a9e3"),a("5530")),k=(a("3c93"),a("a9ad")),O=a("7560"),_=a("f2e7"),w=a("58df"),j=Object(w["a"])(k["a"],O["a"],_["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim:function(){var e=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",e)},classes:function(){return Object(x["a"])({"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive},this.themeClasses)},computedOpacity:function(){return Number(this.isActive?this.opacity:0)},styles:function(){return{zIndex:this.zIndex}}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render:function(e){var t=[this.__scrim];return this.isActive&&t.push(this.genContent()),e("div",{staticClass:"v-overlay",class:this.classes,style:this.styles},t)}}),G=a("0fd9"),I=Object(b["a"])(m,r,s,!1,null,null,null);t["default"]=I.exports;h()(I,{VCol:g["a"],VDivider:C["a"],VOverlay:j,VRow:G["a"]})}}]);
//# sourceMappingURL=gear.f110d370.js.map