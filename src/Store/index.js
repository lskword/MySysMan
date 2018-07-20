// <!-- Copyright (c) 2018 by coollsk. All Rights Reserved. -->
import Vue from "vue"

import Vuex from "vuex"
import { stat } from "fs";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 加载中。。
        loadingLock: true,
        // 人事管理新增继续编辑、修改控制开关
        // 继续编辑0、修改1
        addOrEdit: 0,
        // 响应式数据处理
        sOrB: false,
        
        userMenus:[]
    },
    mutations: {
        loading (state, i){
            state.loadingLock = i;
        },
        smallOrB (state, i){
            state.sOrB = i;
        },
        // 新增修改控制开关
        AorE (state, i){
            state.addOrEdit = i;
        },
        // 更新用户权限菜单
        upUsMenus (state, i) {
            state.userMenus = i;
        }

    },

})
