(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["gear"],{"4d0a":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mx-auto",staticStyle:{"max-width":"1000px"}},[r("v-row",{attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"auto"}},[r("gear-filter-input-sheet",{attrs:{gears:e.filteredGears},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1),r("v-col",{attrs:{cols:"12",sm:"auto"}},[r("gear-statistics-sheet",{attrs:{gears:e.filteredGears}})],1),r("v-col",[r("gear-action-card",{model:{value:e.selectedGearId,callback:function(t){e.selectedGearId=t},expression:"selectedGearId"}}),r("gear-list-view",{staticClass:"mt-2",attrs:{gears:e.filteredGears,"sort-col":e.filter.sortingColumn},on:{select:e.selectGear}}),r("v-btn",{staticClass:"hidden-sm-and-up",attrs:{bottom:"",fab:"",fixed:"",right:"",small:""},on:{click:e.goToTop}},[r("v-icon",[e._v("mdi-chevron-up")])],1)],1)],1),r("v-snackbar",{attrs:{bottom:"",color:"success",outlined:"",timeout:"1500"},model:{value:e.visible.completeMsg,callback:function(t){e.$set(e.visible,"completeMsg",t)},expression:"visible.completeMsg"}},[r("div",{staticClass:"text-center"},[e._v("A gear is updated")])])],1)},o=[],s=(r("4de4"),r("c975"),r("5530")),a=r("d4ec"),l=r("bee2"),n=r("262e"),c=r("2caf"),u=r("9ab4"),d=r("60a3"),p=r("2f62"),f=r("3617"),m=r("0d59"),v=r("ce96"),h=function(e){Object(n["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.apply(this,arguments),e.selectedGearId="",e.visible={overlay:!1,completeMsg:!1},e.filter={type:void 0,sets:[],levelMode:m["c"].LevelFilterMode.ALL,enhanceMode:m["c"].EnhanceModeFilter.ALL,equippedMode:m["b"].ALL,applyToMain:!1,minStat:{},sortingColumn:"level",sortingOrder:v["b"].DESCENDING},e}return Object(l["a"])(r,[{key:"filteredGears",get:function(){var e=this,t=this.gears.filter((function(t){var r=void 0==e.filter.type||e.filter.type==t.type,i=0==e.filter.sets.length||e.filter.sets.indexOf(t.set)>=0,o=!e.filter.levelMode||e.filter.levelMode==m["c"].LevelFilterMode.LV85&&85==t.level||e.filter.levelMode==m["c"].LevelFilterMode.LV90&&90==t.level||e.filter.levelMode==m["c"].LevelFilterMode.OTHERS&&85!=t.level&&90!=t.level,s=!e.filter.enhanceMode||e.filter.enhanceMode==m["c"].EnhanceModeFilter.LESS_THAN_15&&t.enhance<15||e.filter.enhanceMode==m["c"].EnhanceModeFilter.ONLY_15&&15==t.enhance,a=!e.filter.equippedMode||e.filter.equippedMode==m["b"].YES&&""!=t.equippedHero||e.filter.equippedMode==m["b"].NO&&""==t.equippedHero,l=function(r){var i,o,s;return!(t.main.value==r&&!e.filter.applyToMain&&(null!==(i=e.filter.minStat[r])&&void 0!==i?i:0)>0)&&(null!==(o=t[r])&&void 0!==o?o:0)>=(null!==(s=e.filter.minStat[r])&&void 0!==s?s:0)},n=l("hpp")&&l("hp")&&l("defp")&&l("def")&&l("atkp")&&l("atk")&&l("cri")&&l("cdmg")&&l("spd")&&l("eff")&&l("res")&&l("score")&&l("offScore")&&l("defScore");return r&&i&&o&&s&&a&&n}));if(this.filter.sortingColumn){var r=function(e,t){var r=t.level-e.level;return 0==r?t.enhance-e.enhance:r};t.sort((function(t,i){var o=void 0,s=void 0;return(e.filter.applyToMain||t.main.value!=e.filter.sortingColumn)&&(o=t[e.filter.sortingColumn]),(e.filter.applyToMain||i.main.value!=e.filter.sortingColumn)&&(s=i[e.filter.sortingColumn]),o||s?o?s?o-s==0?r(t,i):e.filter.sortingOrder==v["b"].DESCENDING?s-o:o-s:e.filter.sortingOrder==v["b"].DESCENDING?-1:1:e.filter.sortingOrder==v["b"].DESCENDING?1:-1:r(t,i)}))}return t}},{key:"selectGear",value:function(e){this.selectedGearId=e.id}},{key:"goToTop",value:function(){console.log("called"),window.scrollTo({top:0,left:0,behavior:"smooth"})}}]),r}(d["e"]);h=Object(u["a"])([Object(d["a"])({name:"gear-page",components:{GearActionCard:f["a"],GearTable:f["k"],GearFilterInputSheet:f["d"],GearCard:f["b"],GearStatisticsSheet:f["j"],GearListView:f["f"],GearListViewDisplayConfigSheet:f["g"]},computed:Object(s["a"])({},Object(p["c"])(["gears","getGear"]))})],h);var g=h,b=g,k=r("2877"),S=r("6544"),y=r.n(S),E=r("8336"),w=r("62ad"),C=r("132d"),_=r("0fd9"),G=r("2db4"),x=Object(k["a"])(b,i,o,!1,null,null,null);t["default"]=x.exports;y()(x,{VBtn:E["a"],VCol:w["a"],VIcon:C["a"],VRow:_["a"],VSnackbar:G["a"]})},"4ead":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-sheet",{staticClass:"section body-2 py-1 pl-2 mb-2"},[r("strong",[e._v("Debug Panel")]),r("br"),e._l(e.gearStore.distribution,(function(t,i){return r("span",{key:i},[e._v(e._s(i)+" ("+e._s(t)+"), ")])})),e._v(" Number of combinations: "),r("strong",{staticClass:"body-1"},[e._v(e._s(e._f("formatNumber")(e.gearStore.numOfCombinations)))]),e._v(" / Estimated processing time: "),r("strong",{staticClass:"body-1"},[e._v(e._s(e._f("formatNumber")(Math.ceil(e.gearStore.numOfCombinations/1e7*8/60))))]),e._v(" minutes ")],2),r("optimization-profiler",{staticClass:"mb-2",on:{optimize:e.optimize},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}}),e.progress.processTime>=0?r("v-progress-linear",{staticClass:"mb-2",attrs:{height:"50",indeterminate:e.optimizing,striped:""}},[r("strong",{staticClass:"text-center"},[e._v(" Processed ("+e._s(e._f("formatNumber")(e.progress.proceeded))+") / Evaluated ("+e._s(e._f("formatNumber")(e.progress.evaluated))+")"),r("br"),e._v(" Found ("+e._s(e._f("formatNumber")(e.progress.found))+") in "+e._s(e.progress.processTime)+" seconds ")])]):e._e(),r("v-row",{attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"auto"}},[e.currentEquipped&&e.form.hero?r("hero-detail-card",{staticClass:"mb-2",attrs:{hero:e.form.hero,suit:e.currentEquipped.suit}}):e._e(),e.selectionEquipped?r("hero-detail-card",{attrs:{hero:e.form.hero,suit:e.selectionEquipped.suit}}):e._e()],1),r("v-col",[r("v-row",{attrs:{dense:""}},e._l(e.selectedSuitGears,(function(t,i){return r("v-col",{key:i,attrs:{cols:"12",sm:"6"}},[r("gear-card",{attrs:{gear:t,"ref-hero-id":e.form.profile.hero.id}})],1)})),1),r("div",{staticClass:"d-flex flex-wrap"})],1)],1),r("v-card",{staticClass:"mt-2"},[r("v-card-text",[r("v-row",[r("v-col",[r("v-data-table",{attrs:{dense:"","footer-props":{showFirstLastPage:!0},headers:e.headers,"item-key":"id",items:e.result,"items-per-page":10,"multi-sort":!1,"single-select":""},on:{"click:row":e.clickRow},scopedSlots:e._u([{key:"item.sets",fn:function(t){var i=t.item;return[r("div",{staticClass:"d-flex"},e._l(i.sets,(function(e,t){return r("gear-set-icon",{key:t,attrs:{set:e}})})),1)]}}])})],1),r("v-col",{attrs:{cols:"auto"}})],1)],1)],1)],1)},o=[],s=r("f8d9"),a=s["a"],l=r("2877"),n=r("6544"),c=r.n(n),u=r("b0af"),d=r("99d9"),p=r("62ad"),f=r("8fea"),m=r("8e36"),v=r("0fd9"),h=r("8dd9"),g=Object(l["a"])(a,i,o,!1,null,null,null);t["default"]=g.exports;c()(g,{VCard:u["a"],VCardText:d["b"],VCol:p["a"],VDataTable:f["a"],VProgressLinear:m["a"],VRow:v["a"],VSheet:h["a"]})},"91b0":function(e,t,r){e.exports=r.p+"js/0.4ab00aca.worker.js"},f8d9:function(e,t,r){"use strict";(function(e){r("4de4"),r("4160"),r("a434"),r("159b");var i=r("5530"),o=(r("96cf"),r("1da1")),s=r("d4ec"),a=r("bee2"),l=r("262e"),n=r("2caf"),c=r("9ab4"),u=r("d533"),d=r("3617"),p=r("60a3"),f=r("2f62"),m=r("08ba"),v=function(t){Object(l["a"])(i,t);var r=Object(n["a"])(i);function i(){var t;return Object(s["a"])(this,i),t=r.apply(this,arguments),t.worker=new Worker(e,void 0),t.form={profile:m["a"].emptyOptimizationProfile(),hero:m["a"].emptyHero()},t.result=[],t.selectedSuit=m["a"].emptySuit(),t.optimizing=!1,t.progress={evaluated:0,proceeded:0,found:0,processTime:-1},t.headers=[{text:"Set",value:"sets",sortable:!1},{text:"HP",value:"hp"},{text:"DEF",value:"def"},{text:"ATK",value:"atk"},{text:"CRI",value:"cri"},{text:"C.DMG",value:"cdmg"},{text:"SPD",value:"spd"},{text:"EFF",value:"eff"},{text:"RES",value:"res"},{text:"Damage",value:"damage"},{text:"DMS",value:"dms"},{text:"EHP",value:"ehp"},{text:"Rate",value:"rating"}],t}return Object(a["a"])(i,[{key:"gearStore",get:function(){return m["e"].createGearStore(this.gears,this.form.profile.filter,{hero:this.form.hero,heros:this.heros})}},{key:"currentEquipped",get:function(){return this.getEquippedHero(this.form.hero.id)}},{key:"selectionEquipped",get:function(){return m["b"].equip(this.form.hero,this.selectedSuit)}},{key:"selectedSuitGears",get:function(){return[this.selectedSuit.weapon,this.selectedSuit.helmet,this.selectedSuit.armor,this.selectedSuit.necklace,this.selectedSuit.ring,this.selectedSuit.boot]}},{key:"optimize",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("optimize::start"),this.result.splice(0,this.result.length),this.optimizing=!0,this.worker.postMessage({action:"optimize",store:this.gearStore,profile:this.form.profile,hero:this.form.hero});case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"clickRow",value:function(e,t){console.log("clickRow::item =",e),console.log("clickRow::e =",t),t.select(),this.selectedSuit=this.toSuit(e)}},{key:"toSuit",value:function(e){var t=this,r=new m["d"];return r.bonus(this.form.hero.bonusAbility),[e.weaponId,e.helmetId,e.armorId,e.necklaceId,e.ringId,e.bootId].forEach((function(e){void 0!=e&&r.setGear(t.getGear(e))})),r.build()}},{key:"equipAll",value:function(){var e=this;console.log("equipAll::hero.id =",this.form.profile.hero.id),this.unequipAll(),console.log("equipAll::selectedSuit =",this.selectedSuit),this.selectedSuitGears.forEach((function(t){void 0!=t&&(t.equippedHero=e.form.profile.hero.id,e.saveGears([t]))}))}},{key:"unequipAll",value:function(){var e=this;console.log("unequipAll::",this.currentEquipped),this.currentEquipped&&[this.currentEquipped.suit.weapon,this.currentEquipped.suit.helmet,this.currentEquipped.suit.armor,this.currentEquipped.suit.necklace,this.currentEquipped.suit.ring,this.currentEquipped.suit.boot].forEach((function(t){t&&(t.equippedHero="",e.saveGears([t]))}))}},{key:"created",value:function(){this.setupWorker()}},{key:"setupWorker",value:function(){var e=this;this.worker.onmessage=function(t){console.log("worker::onmessage::action =",t.data.action),"optimize-result"==t.data.action?(e.result=t.data.result,e.optimizing=!1):"progress"==t.data.action&&(console.log("worker::onmessage::result =",t.data.result),e.progress=t.data.result)}}},{key:"destroyed",value:function(){this.worker.terminate()}}]),i}(p["e"]);v=Object(c["a"])([Object(p["a"])({name:"optimizer-page",components:{GearCard:d["b"],GearDetailCard:d["c"],GearSetIcon:d["h"],HeroDetailCard:d["l"],OptimizationProfiler:d["o"],TitleSheet:u["a"]},computed:Object(i["a"])({},Object(f["c"])(["heros","gears","getEquippedHero","getHero","getGear"])),methods:Object(f["b"])(["saveGears","updateState"])})],v),t["a"]=v}).call(this,r("91b0"))}}]);
//# sourceMappingURL=gear.2a086321.js.map