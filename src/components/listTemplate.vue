/*
 * @Author: CoolLsk 
 * @Date: 2018-07-03 14:10:34 
 * @Last Modified by: CoolLsk
 * @Last Modified time: 2018-07-19 11:11:09
 */
//  list列表数据模板
<style scoped>
  .header_box {
    overflow: hidden;
    min-width: 1000px;
  }

  .title {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #333333;
    line-height: 1.6em;
    text-align: left;
    margin: .15rem 0 .15rem .15rem;
  }
  .left, .right {
    line-height: 0;
  }
  .left {
    float: left;
    margin-left: 14px;
  }
  
  .right {
    float: right;
    margin-right: 37px;
  }

  .title_x {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #666666;
    line-height: 28px;
    text-align: left;
    margin: 18px 0 16px 15px;
  }

  .el-col-3 {
    width: 150px;
  }



  .table_box {
    margin: 11px 37px 0 14px;
    border: 1px solid #e7e7e7;
    min-width: 1002px;
  }

  .title_detail {
    width: 71px;
    height: 27px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #333333;
    line-height: 27px;
    text-align: left;
    margin: 16px 29px 22px 17px;
  }

  .name_text {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #333333;
    text-align: left;
    min-width: 1000px;
    height: 40px;
    padding-left: 17px;
    width: 0%;
  }

  .name_text_color {
    opacity: 0.93;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #2d8cf0;
    text-align: left;
  }

  .trim {
    border: 1px solid #e2e2e2;
    width: 496px;
    height: 0px;
    margin-left: 17px;
  }

  .prompt_text {
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #ff9f00;
    text-align: left;
  }

  /* .see {
    max-height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
  } */

  .make {
    display: flex;
  }

  .make_son {
    flex: 1;
    text-align: center;
  }

  .lzcl {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #333333;
    line-height: 27px;
    text-align: center;
    margin: 11px auto 20px;
  }
  .search_box {
    overflow: hidden;
  }
</style>

<template>
  <div>
    <div
    class="list"
    v-if="seeUser"
     >
      <div class="header_box">
        <p class="title">在职人员</p>
        <div class="search_box">
          <div class="left">
            <el-row :gutter="8">
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <el-select v-model="department" filterable placeholder="所属区域" size="mini" clearable >
                    <el-option v-for="item in depOpt" :key="item.value" :label="item.label" :value="item.id"> </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <el-select v-model="region" filterable placeholder="所属部门" size="mini" clearable >
                    <el-option v-for="item in regOpt" :key="item.value" :label="item.label" :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <el-select v-model="position" filterable placeholder="职位" size="mini" clearable >
                    <el-option v-for="item in posOpt" :key="item.value" :label="item.label" :value="item.id"> </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchText" size="mini" clearable>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <el-button type="primary" size="mini" @click="seach">搜索</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="right">
            <el-button type="primary" round size="mini" @click="jAdd">添加审批流</el-button>
          </div>
        </div>
      </div>
      <div class="table_box">
        <el-table max-height="534" v-loading='table_loading' element-loading-text="加载中..." :data="tableData" size="medium" style="width: 100%;min-width: 1000px;">
          <el-table-column prop="userNo" align="center" label="发起职位" min-width="80"> </el-table-column>
          <el-table-column prop="name" align="center" label="默认职位审批流" min-width="120"> </el-table-column>
          <el-table-column prop="sex" align="center" label="信息类型" min-width="50" :formatter="sexTwo"> </el-table-column>
          <el-table-column prop="deparmentName" align="center" label="操作类型" min-width="80"> </el-table-column>
          <el-table-column label="操作" min-width="120" width="240" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" style="font-size:12px;" @click="edit(scope.$index, scope.row)"> 修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p style="float:right;margin:49px 0 50px 0;">
          <el-pagination
            background
            layout="prev, pager, next,sizes"
            :total="ListCount"
            :page-sizes="[10, 20, 30, 50, 100, 9999]"
            :page-size="10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
          </el-pagination>
        </p>
      </div>
    </div>

    <!-- 查看 -->
    <div class="see" v-else v-loading='deatilLoadingLock' element-loading-text="加载中...">
      <div class="header_box">
        <p class="title">人员列表</p>
        <p class="title_x">员工基本信息</p>
      </div>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">姓名：</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{deatilList.name}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple name_text_color">{{"员工工号："+deatilList.userNo}} </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">性别：</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{sexChange(deatilList.sex)}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple name_text_color">{{"员工账号：" + deatilList.userName}} </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">身份证号：</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple ">{{deatilList.card}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">婚姻状况：</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
              {{MarriageChange(deatilList.maritalStatus)}}
            </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">最高学历：</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{deatilList.maxEdu}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">毕业院校：</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{deatilList.school}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">联系电话：</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{deatilList.phone}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">联系地址：</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{deatilList.address}}</div>
        </el-col>
      </el-row>
      <div class="trim"></div>
      <p class="title_x">职位及部门</p>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">入职时间：</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{dateInit(deatilList.joinDate)}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">所属区域：</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{deatilList.cityName}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">部门：</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple ">{{deatilList.departmentName}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="name_text">
        <el-col :span="3">
          <div class="grid-content bg-purple">职位：</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{deatilList.jobName}}</div>
        </el-col>
      </el-row>
      <div class="trim"></div>

      <p class="title_x">社保及薪酬信息</p>
      <el-row :gutter="20" class="name_text">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="line-height:28px;">
            <i class="el-icon-warning" style="color: #ff9f00;"></i>
            <span class="prompt_text">敏感信息需授权展示</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-button plain style="color:#409EFF;font-size:12px;width:140px;height:30px;" size="mini">授权查看</el-button>
          </div>
        </el-col>
      </el-row>

      <div class="trim"></div>
      <el-button type="primary" size="mini" style="width:140px;height:30px;margin:24px 0 40px 17px;" @click="seeUser='false'">返回</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 部门
        department: "",
        depOpt: [],
        // 区域
        region: "",
        regOpt: [],
        // 职位
        position: "",
        posOpt: [],
        // 是否选中今天
        check: false,
        TurnoverOpt: {},
        // 离职操作
        TurnoverOperation: false,
        // 人事框
        dialogPersonnel: false,
        // 查看信息、数据展示
        seeUser: true,
        // 继续编辑
        dialogConEdit: false,
        // 表格数据
        tableData: [],
        options: [{
          value: '选项2',
          label: '黄金糕'
        }],
        value8: '',
        // 搜索关键词
        searchText: '',
        token: '',
        // 用户ID
        userId: '',
        // 查看详情
        deatilList: [],
        // 列表数据总数
        ListCount: 0,
        // 页数
        page: 1,
        // 数量
        pageSize: 10,
        // 表格数据加载中锁
        table_loading: true,
        // 详情数据加载锁
        deatilLoadingLock: true,
      }
    },
    created() {
      var self = this;
      this.token = JSON.parse(this.$cookies.get("userInfo")).token;
      this.posOpt =  JSON.parse(window.localStorage.getItem("positionList"))
      this.depOpt = JSON.parse(window.localStorage.getItem("deparList"))
      this.regOpt = JSON.parse(window.localStorage.getItem("cityList"))
      this.listIint()
      // console.log(1);
    },
    methods: {
      // 时间戳转换日期
      dateInit(val) {
        var self = this;
        var str = self.timestampToTime(val);
        return str
      },
      // 搜索
      seach() { 
        var self = this ;  
        self.listIint()

      },
      // 分页
      handleSizeChange(val) {
        var self = this;
        // console.log(`每页 ${val} 条`);
        this.page = 1;
        this.pageSize = val;
        self.listIint()
      },
      handleCurrentChange(val) {
        var self = this;
        // console.log(val);
        this.page = val;
        // this.pageSize = 10;
        self.listIint()
      },
      // 人员列表数据请求
      listIint() {
        var self = this;
        self.table_loading = true;
        var data = {
          page: self.page,
          pageSize: self.pageSize,
          departmentId: self.department,
            // 区域
          cityId:  self.region,
            // 职位
          jobId:  self.position,
          name:  self.searchText
        }
        data = this.dataInit(data);
        // console.log(data);
        this.$http({
          url: '/api/apiPersonnel/personnelList',
          method: "post",
          data,
          headers: {
            token: self.token
          }
        }).then(res => {
          if (res.data.code === "0") {
            self.tableData = res.data.data.personnelList
            self.ListCount = res.data.data.count;
            setTimeout(function () {
              self.table_loading = false
            },200)
          }
        });
      },
      // 模态框
      rSCd: function () {
        this.dialogPersonnel = false;
        this.TurnoverOperation = true;
      },

      /**
       * 新增
       */
      jAdd: function () {
        this.$router.push({
          path: "/FormManagement/FormConfigAdd"
        })
        console.log("新增");
        
      },
      /**
       * 修改
       */
      edit(index, row) {
        this.$router.push({
          name: 'FormConfigEdit',
          params: {
            userId: row.userId
          }
        })
      },
      typeChange: function (val) {
        return val.type == 3 ? "新增" : "修改"
      },
      sexTwo(item) {
        // console.log();
        return item.sex == 0 ? "女" : "男"
      },
      sexChange(val) {
        // console.log(val);
        return val == 0 ? "女" : "男"
      },
      MarriageChange(val) {
        return val == 0 ? "未婚" : "已婚"
      }
    },
    computed: {

    }
  }

</script>
