(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["gear"],{"4d0a":function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("v-row",{attrs:{dense:""}},[i("v-col",[i("gear-table-filter",{model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),i("v-divider",{staticClass:"mt-1"}),i("gear-table",{attrs:{gears:e.filteredGears},on:{"edit-gear":e.editGear}})],1)],1),i("v-btn",{attrs:{bottom:"",fab:"",fixed:"",right:""},on:{click:e.createGear}},[i("v-icon",[e._v("mdi-plus")])],1),i("v-bottom-sheet",{attrs:{scrollable:""},model:{value:e.visible.overlay,callback:function(t){e.$set(e.visible,"overlay",t)},expression:"visible.overlay"}},[e.visible.overlay?i("gear-form-card",{attrs:{gear:e.gearToBeEdited},on:{close:function(t){e.visible.overlay=!1},input:e.inputGear}}):e._e()],1),i("v-snackbar",{attrs:{color:"success",rounded:"pill",timeout:"1500",top:""},model:{value:e.visible.completeMsg,callback:function(t){e.$set(e.visible,"completeMsg",t)},expression:"visible.completeMsg"}},[i("div",{staticClass:"text-center"},[e._v("A gear is updated")])])],1)},a=[],o=(i("4de4"),i("c975"),i("d81d"),i("5530")),s=i("d4ec"),n=i("bee2"),l=i("262e"),c=i("2caf"),u=i("9ab4"),d=i("60a3"),p=i("2f62"),h=i("3617"),f=i("0d59"),b=function(e){Object(l["a"])(i,e);var t=Object(c["a"])(i);function i(){var e;return Object(s["a"])(this,i),e=t.apply(this,arguments),e.gearToBeEdited=void 0,e.visible={overlay:!1,completeMsg:!1},e.filter={type:void 0,sets:[],level:0,mode:0,main:!1,enhanceMode:f["b"].EnhanceModeFilter.ALL},e}return Object(n["a"])(i,[{key:"inputGear",value:function(e){this.updateGear(e),this.visible.completeMsg=!0,this.visible.overlay=!1}},{key:"editGear",value:function(e){this.gearToBeEdited=this.getGearMap.get(e),this.visible.overlay=!0}},{key:"createGear",value:function(){this.gearToBeEdited=void 0,this.visible.overlay=!0}},{key:"filteredGears",get:function(){var e=this,t=this.gears.filter((function(t){var i=void 0==e.filter.type||e.filter.type==t.type,r=0==e.filter.sets.length||e.filter.sets.indexOf(t.set)>=0,a=!e.filter.level||e.filter.level==t.level,o=!e.filter.enhanceMode||e.filter.enhanceMode==f["b"].EnhanceModeFilter.LESS_THAN_15&&t.enhance<15||e.filter.enhanceMode==f["b"].EnhanceModeFilter.ONLY_15&&15==t.enhance;return i&&r&&a&&o}));return this.filter.main||(t=t.map((function(e){var t=f["b"].Gear.clone(e);return d["e"].set(t,t.main.value,void 0),t}))),t}}]),i}(d["e"]);b=Object(u["a"])([Object(d["a"])({name:"gear-page",components:{GearFormCard:h["b"],GearTable:h["d"],GearTableFilter:h["e"]},computed:Object(o["a"])(Object(o["a"])({},Object(p["d"])(["gears"])),Object(p["c"])(["getGearMap"])),methods:Object(p["b"])(["updateGear"])})],b);var m=b,v=m,g=i("2877"),k=i("6544"),C=i.n(k),y=(i("a9e3"),i("d0cd"),i("169a")),S=y["a"].extend({name:"v-bottom-sheet",props:{inset:Boolean,maxWidth:{type:[String,Number],default:"auto"},transition:{type:String,default:"bottom-sheet-transition"}},computed:{classes:function(){return Object(o["a"])(Object(o["a"])({},y["a"].options.computed.classes.call(this)),{},{"v-bottom-sheet":!0,"v-bottom-sheet--inset":this.inset})}}}),O=i("8336"),x=i("62ad"),_=i("ce7e"),F=i("132d"),M=i("0fd9"),w=i("2db4"),E=Object(g["a"])(v,r,a,!1,null,null,null);t["default"]=E.exports;C()(E,{VBottomSheet:S,VBtn:O["a"],VCol:x["a"],VDivider:_["a"],VIcon:F["a"],VRow:M["a"],VSnackbar:w["a"]})},"4ead":function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("v-card",{staticClass:"section"},[i("v-card-text",[i("strong",[e._v("Debug Panel")]),i("br"),e._l(e.gearStore.distribution,(function(t,r){return i("span",{key:r},[e._v(e._s(r)+" ("+e._s(t)+"), ")])})),i("br"),e._v(" Number of combinations: "+e._s(e._f("formatNumber")(e.gearStore.numOfCombinations))+" (Hard limit: "+e._s(e._f("formatNumber")(e.hardLimit))+")"),i("br"),e._v(" Estimated processing time: "+e._s(e._f("formatNumber")(Math.round(e.gearStore.numOfCombinations/1e7*8/60)))+" minutes ")],2)],1),i("v-card",{staticClass:"mt-2"},[i("v-card-text",[i("optimization-profiler",{model:{value:e.profile,callback:function(t){e.profile=t},expression:"profile"}})],1),i("v-divider"),i("v-card-actions",[i("v-btn",{staticClass:"font-weight-bold",attrs:{color:"primary",text:""},on:{click:e.optimize}},[e._v("Optimize")]),i("v-btn",{attrs:{text:""},on:{click:e.reset}},[e._v("Reset")]),i("v-divider",{staticClass:"mx-2",attrs:{vertical:""}}),i("v-btn",{staticClass:"font-weight-bold",attrs:{color:"success",text:""},on:{click:e.saveProfile}},[e._v("Save")]),i("v-btn",{attrs:{text:""},on:{click:e.loadProfile}},[e._v("Load")]),i("v-divider",{staticClass:"mx-2",attrs:{vertical:""}})],1)],1),i("v-card",{staticClass:"mt-2"},[i("v-card-text",[i("v-row",[i("v-col",{attrs:{cols:"6",lg:"2",sm:"2"}},[i("gear-detail-card",{attrs:{gear:e.selectedCombination.weapon}})],1),i("v-col",{attrs:{cols:"6",lg:"2",sm:"2"}},[i("gear-detail-card",{attrs:{gear:e.selectedCombination.helmet}})],1),i("v-col",{attrs:{cols:"6",lg:"2",sm:"2"}},[i("gear-detail-card",{attrs:{gear:e.selectedCombination.armor}})],1),i("v-col",{attrs:{cols:"6",lg:"2",sm:"2"}},[i("gear-detail-card",{attrs:{gear:e.selectedCombination.necklace}})],1),i("v-col",{attrs:{cols:"6",lg:"2",sm:"2"}},[i("gear-detail-card",{attrs:{gear:e.selectedCombination.ring}})],1),i("v-col",{attrs:{cols:"6",lg:"2",sm:"2"}},[i("gear-detail-card",{attrs:{gear:e.selectedCombination.boot}})],1)],1)],1),i("v-divider"),i("v-card-actions",[i("v-btn",{staticClass:"font-weight-bold",attrs:{color:"primary",text:""},on:{click:e.equipAll}},[e._v("Equip All")]),i("v-btn",{attrs:{text:""},on:{click:e.unequipAll}},[e._v("Unequip All")])],1)],1),i("v-card",{staticClass:"mt-2"},[e.progress>0?i("v-progress-linear",{attrs:{height:"20",striped:""}},[i("strong",[e._v(e._s(e.progress)+"%")])]):e._e(),i("v-card-text",[i("v-row",[i("v-col",[i("v-data-table",{attrs:{dense:"","footer-props":{showFirstLastPage:!0},headers:e.headers,"item-key":"combination.id",items:e.result,"items-per-page":10,"multi-sort":!1,"single-select":""},on:{"click:row":e.clickRow},scopedSlots:e._u([{key:"item.combination.sets",fn:function(t){var r=t.item;return[i("div",{staticClass:"d-flex"},e._l(r.combination.sets,(function(e,t){return i("gear-set-icon",{key:t,attrs:{set:e,small:""}})})),1)]}}])})],1),i("v-col",{attrs:{cols:"auto"}})],1)],1)],1),i("v-snackbar",{attrs:{color:"success",rounded:"pill",timeout:"1500",top:""},model:{value:e.popupMsg,callback:function(t){e.popupMsg=t},expression:"popupMsg"}},[i("div",{staticClass:"text-center"},[e._v(e._s(e.profile.hero.name)+" profile saved")])])],1)},a=[],o=i("f8d9"),s=o["a"],n=i("2877"),l=i("6544"),c=i.n(l),u=i("8336"),d=i("b0af"),p=i("99d9"),h=i("62ad"),f=i("8fea"),b=i("ce7e"),m=i("8e36"),v=i("0fd9"),g=i("2db4"),k=Object(n["a"])(s,r,a,!1,null,null,null);t["default"]=k.exports;c()(k,{VBtn:u["a"],VCard:d["a"],VCardActions:p["a"],VCardText:p["b"],VCol:h["a"],VDataTable:f["a"],VDivider:b["a"],VProgressLinear:m["a"],VRow:v["a"],VSnackbar:g["a"]})},8131:function(e,t,i){"use strict";i.d(t,"a",(function(){return l}));var r=i("d4ec"),a=i("bee2"),o=i("0d59"),s=(i("b65f"),function(){function e(){Object(r["a"])(this,e)}return Object(a["a"])(e,[{key:"apply",value:function(e,t){var i=this.determineSetsExtraAbility(e.sets),r={hp:Math.trunc(t.hp*(1+(e.ability.hpp+i.hpp)/100))+e.ability.hp,def:Math.trunc(t.def*(1+(e.ability.defp+i.defp)/100))+e.ability.def,atk:Math.trunc(t.atk*(1+(e.ability.atkp+i.atkp)/100))+e.ability.atk,cri:t.cri+e.ability.cri+i.cri,cdmg:t.cdmg+e.ability.cdmg+i.cdmg,spd:Math.trunc(t.spd*(1+i.spdp/100))+e.ability.spd,eff:t.eff+e.ability.eff+i.eff,res:t.res+e.ability.res+i.res,combination:e,damage:0,ehp:0};return r.damage=Math.trunc(r.atk*Math.min(r.cdmg,350)/1e3),r.ehp=Math.trunc(r.hp*(1+r.def/300)),r}},{key:"determineSetsExtraAbility",value:function(e){for(var t={hpp:0,defp:0,atkp:0,cri:0,cdmg:0,spdp:0,eff:0,res:0},i=0;i<e.length;i++)e[i]==o["b"].Set.Health?t.hpp+=12:e[i]==o["b"].Set.Defense?t.defp+=12:e[i]==o["b"].Set.Attack?t.atkp+=35:e[i]==o["b"].Set.Critical?t.cri+=12:e[i]==o["b"].Set.Destruction?t.cdmg+=40:e[i]==o["b"].Set.Speed?t.spdp+=25:e[i]==o["b"].Set.Hit?t.eff+=12:e[i]==o["b"].Set.Resist&&(t.res+=12);return t}}]),e}()),n=new s,l=function(){function e(t,i,a){Object(r["a"])(this,e),this.store=t,this.profile=i,this.progressCallback=a}return Object(a["a"])(e,[{key:"optimize",value:function(){console.log("optimize::start"),console.log("optimize::profile =",this.profile);var e=Date.now();this.progressCallback(1);var t=this.performOptimize();return this.progressCallback(0),console.log("optimize::processing time =",(Date.now()-e)/1e3,"seconds"),t}},{key:"minFilter",value:function(e){var t=this;return this.profile.stat[e].min?function(i){return i[e]>=t.profile.stat[e].min}:function(e){return!0}}},{key:"maxFilter",value:function(e){var t=this;return this.profile.stat[e].max?function(i){return i[e]<=t.profile.stat[e].max}:function(e){return!0}}},{key:"combinationFilter",value:function(){var e,t;if(0==this.profile.combination.forcedSets.length)return function(e,t){return!0};for(var i={},r=0;r<this.profile.combination.forcedSets.length;r++){var a=this.profile.combination.forcedSets[r];switch(a){case o["b"].Set.Speed:case o["b"].Set.Attack:case o["b"].Set.Destruction:i[a]=null!==(e=i[a])&&void 0!==e?e:4;break;default:i[a]=(null!==(t=i[a])&&void 0!==t?t:0)+2;break}}return function(e,t){return e._sets.isPossible(i,t)}}},{key:"equipedHeroFilter",value:function(){var e=this.minFilter(o["b"].Stat.HP.value),t=this.maxFilter(o["b"].Stat.HP.value),i=this.minFilter(o["b"].Stat.DEF.value),r=this.maxFilter(o["b"].Stat.DEF.value),a=this.minFilter(o["b"].Stat.ATK.value),s=this.maxFilter(o["b"].Stat.ATK.value),n=this.minFilter(o["b"].Stat.CRI.value),l=this.maxFilter(o["b"].Stat.CRI.value),c=this.minFilter(o["b"].Stat.CDMG.value),u=this.maxFilter(o["b"].Stat.CDMG.value),d=this.minFilter(o["b"].Stat.SPD.value),p=this.maxFilter(o["b"].Stat.SPD.value),h=this.minFilter(o["b"].Stat.EFF.value),f=this.maxFilter(o["b"].Stat.EFF.value),b=this.minFilter(o["b"].Stat.RES.value),m=this.maxFilter(o["b"].Stat.RES.value),v=this.minFilter("ehp"),g=this.minFilter("damage");return function(o){return d(o)&&p(o)&&n(o)&&l(o)&&e(o)&&t(o)&&i(o)&&r(o)&&a(o)&&s(o)&&c(o)&&u(o)&&h(o)&&f(o)&&b(o)&&m(o)&&v(o)&&g(o)}}},{key:"performOptimize",value:function(){for(var t=0,i=0,r=[],a=new o["b"].GearCombinationBuilder,s=this.equipedHeroFilter(),l=this.combinationFilter(),c=0,u=this.store.weapons.length;c<u;c++){a.weapon(this.store.weapons[c]);for(var d=0,p=this.store.helmets.length;d<p;d++){a.helmet(this.store.helmets[d]);for(var h=0,f=this.store.armors.length;h<f;h++)if(a.armor(this.store.armors[h]),l(a,3))for(var b=0,m=this.store.necklaces.length;b<m;b++)if(a.necklace(this.store.necklaces[b]),l(a,2))for(var v=0,g=this.store.rings.length;v<g;v++)if(a.ring(this.store.rings[v]),l(a,1)){for(var k=0,C=this.store.boots.length;k<C;k++)if(a.boot(this.store.boots[k]),!++t||l(a,0)){var y=n.apply(a.build(i),this.profile.hero);if(s(y)&&(r.push(y),r.length>=e.OPTIMIZE_RESULT_LIMIT))return console.log("optimize::hit result limit, actualCount =",t,", result.length =",r.length),r;if(++i%e.REPORT_PROGRESS_COUNT==0&&(console.log("optimize::actualCount =",t,",count =",i,",result.length =",r.length),this.progressCallback(i),i>=e.COMBINATION_HARD_LIMIT))return console.log("optimize::hit combination hard limit"),r}}else t+=this.store.boots.length;else t+=this.store.rings.length*this.store.boots.length;else t+=this.store.necklaces.length*this.store.rings.length*this.store.boots.length}}return r}}]),e}();l.COMBINATION_HARD_LIMIT=1e7,l.OPTIMIZE_RESULT_LIMIT=5e4,l.REPORT_PROGRESS_COUNT=l.COMBINATION_HARD_LIMIT/10},"91b0":function(e,t,i){e.exports=i.p+"js/0.0379903b.worker.js"},d0cd:function(e,t,i){},dac0:function(e,t,i){"use strict";i("4de4"),i("c975"),i("d81d");var r=i("d4ec"),a=i("bee2"),o=i("0d59"),s=function(){function e(){Object(r["a"])(this,e),this.noopFilter=function(e){return!0}}return Object(a["a"])(e,[{key:"filter",value:function(e,t){var i=this.noopFilter;t.sets.length>0&&(i=function(e){return t.sets.indexOf(e.set)>=0});var r=this.noopFilter;t.enhanceMode==o["b"].EnhanceModeFilter.LESS_THAN_15?r=function(e){return e.enhance<15}:t.enhanceMode==o["b"].EnhanceModeFilter.ONLY_15&&(r=function(e){return 15==e.enhance});var a=this.noopFilter;if(t.necklaces.length>0){var s=t.necklaces.map((function(e){return e.value}));a=function(e){return e.type!=o["b"].Type.Necklace||s.indexOf(e.main.value)>=0}}var n=this.noopFilter;if(t.rings.length>0){var l=t.rings.map((function(e){return e.value}));n=function(e){return e.type!=o["b"].Type.Ring||l.indexOf(e.main.value)>=0}}var c=this.noopFilter;if(t.boots.length>0){var u=t.boots.map((function(e){return e.value}));c=function(e){return e.type!=o["b"].Type.Boot||u.indexOf(e.main.value)>=0}}var d=this.noopFilter;t.locked||(d=function(e){return!e.locked});var p=this.noopFilter;return t.equipped||(p=function(e){return""==e.equippedHero}),e.filter((function(e){return d(e)&&p(e)&&i(e)&&r(e)&&a(e)&&n(e)&&c(e)}))}}]),e}();t["a"]=new s},f8d9:function(e,t,i){"use strict";(function(e){i("4de4"),i("a434");var r=i("5530"),a=(i("96cf"),i("1da1")),o=i("d4ec"),s=i("bee2"),n=i("262e"),l=i("2caf"),c=i("9ab4"),u=i("3617"),d=i("0d59"),p=i("8131"),h=i("dac0"),f=i("60a3"),b=i("2f62"),m=function(t){Object(n["a"])(r,t);var i=Object(l["a"])(r);function r(){var t;return Object(o["a"])(this,r),t=i.apply(this,arguments),t.worker=new Worker(e,void 0),t.profile={id:"",hero:{},filter:{},stat:{},combination:{}},t.result=[],t.selectedCombination={},t.progress=0,t.popupMsg=0,t.headers=[{text:"Set",value:"combination.sets",sortable:!1},{text:"HP",value:"hp"},{text:"DEF",value:"def"},{text:"ATK",value:"atk"},{text:"CRI",value:"cri"},{text:"C.DMG",value:"cdmg"},{text:"SPD",value:"spd"},{text:"EFF",value:"eff"},{text:"RES",value:"res"},{text:"Damage",value:"damage"},{text:"EHP",value:"ehp"}],t}return Object(s["a"])(r,[{key:"optimize",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("optimize::start"),this.result.splice(0,this.result.length),this.worker.postMessage({action:"optimize",store:this.gearStore,profile:this.profile});case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"reset",value:function(){this.profile.hero.id||(this.profile.hero=this.e7db.heros[4]),this.profile.filter=Object.assign({},d["a"].GEAR_FILTER_DEFAULT),this.profile.stat={hp:{},def:{},atk:{},cri:{max:110},cdmg:{max:360},spd:{},eff:{},res:{},ehp:{},damage:{}},this.profile.combination={forcedSets:[]},this.selectedCombination=this.getEquipped(this.profile.hero.id)}},{key:"clickRow",value:function(e,t){console.log("clickRow::item =",e),console.log("clickRow::e =",t),t.select(),this.selectedCombination=e.combination}},{key:"equipAll",value:function(){console.log("equipAll::hero =",this.profile.hero),this.selectedCombination.weapon.equippedHero=this.profile.hero.id,this.updateGear(this.selectedCombination.weapon),this.selectedCombination.helmet.equippedHero=this.profile.hero.id,this.updateGear(this.selectedCombination.helmet),this.selectedCombination.armor.equippedHero=this.profile.hero.id,this.updateGear(this.selectedCombination.armor),this.selectedCombination.necklace.equippedHero=this.profile.hero.id,this.updateGear(this.selectedCombination.necklace),this.selectedCombination.ring.equippedHero=this.profile.hero.id,this.updateGear(this.selectedCombination.ring),this.selectedCombination.boot.equippedHero=this.profile.hero.id,this.updateGear(this.selectedCombination.boot)}},{key:"unequipAll",value:function(){this.selectedCombination.weapon.equippedHero="",this.updateGear(this.selectedCombination.weapon),this.selectedCombination.helmet.equippedHero="",this.updateGear(this.selectedCombination.helmet),this.selectedCombination.armor.equippedHero="",this.updateGear(this.selectedCombination.armor),this.selectedCombination.necklace.equippedHero="",this.updateGear(this.selectedCombination.necklace),this.selectedCombination.ring.equippedHero="",this.updateGear(this.selectedCombination.ring),this.selectedCombination.boot.equippedHero="",this.updateGear(this.selectedCombination.boot)}},{key:"saveProfile",value:function(){console.log("saveProfile::profile =",this.profile),this.updateProfiles([this.profile]),this.popupMsg=1}},{key:"loadProfile",value:function(){console.log("loadProfile::hero.id =",this.profile.hero.id);var e=this.getProfile(this.profile.hero.id);console.log("loadProfile::profile =",this.getProfile(this.profile.hero.id)),e&&Object.assign(this.profile,e)}},{key:"created",value:function(){var e=this;this.reset(),this.worker.onmessage=function(t){console.log("worker::onmessage::action =",t.data.action),"optimize-result"==t.data.action?e.result=t.data.result:"progress"==t.data.action&&(e.progress=t.data.result)}}},{key:"destroyed",value:function(){this.worker.terminate()}},{key:"gearStore",get:function(){return new d["b"].GearStore(h["a"].filter(this.gears,this.profile.filter))}},{key:"hardLimit",get:function(){return p["a"].COMBINATION_HARD_LIMIT}}]),r}(f["e"]);m=Object(c["a"])([Object(f["a"])({name:"optimizer-page",components:{GearDetailCard:u["a"],GearSetIcon:u["c"],OptimizationProfiler:u["g"]},computed:Object(r["a"])(Object(r["a"])({},Object(b["d"])(["gears","e7db"])),Object(b["c"])(["getEquipped","getProfile"])),methods:Object(b["b"])(["updateGear","updateProfiles"])})],m),t["a"]=m}).call(this,i("91b0"))}}]);
//# sourceMappingURL=gear.58da890d.js.map