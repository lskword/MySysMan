/* * @Author: CoolLsk * @Date: 2018-07-05 15:07:53 * @Last Modified by: CoolLsk * @Last Modified time: 2018-07-09 16:12:32
*/
<!-- Copyright (c) 2018 by coollsk. All Rights Reserved. -->
<style scoped>
  .loginBox {
    border: 1px solid #28394b;
    background: rgba(12, 76, 143, 0.09);
    box-shadow: 1px 6px 6px 0 #000000;
    border-radius: 4px;
    width: 5.63rem;
    height: 4.94rem;
    min-width: 400px;
    min-height: 380px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.6rem;
    margin-left: -2.81rem;

  }

  .box {
    height: 100%;
    background: url(../assets/login.png) no-repeat;
    position: relative;
  }

  .logo {
    position: absolute;
    top: 36px;
    left: 40px;
  }

  .right,
  .left {
    float: left;
  }

  .left {
    margin: 1px 0px 1px 10px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #ffffff;
    text-align: left;
  }

  p.one {
    font-size: 20px;
  }

  .login_header {
    background: rgba(72, 94, 120, .19);
    width: 5.60rem;
    min-width: 400px;
    /* height:28px; */
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #ffffff;
    line-height: 28px;
    text-align: left;
    padding: .36rem 0 .29rem .24rem;
  }

  .form_box {
    width: 3.81rem;
    margin: .39rem auto .56rem;
    min-width: 300px;
  }

  #v_container_box {
    margin-left: .05rem;
    float: right;

  }

  #v_container {
    width: .92rem;
    height: 34px;
    min-width: 65px;
    display: inline-block;
    text-align: center;
    letter-spacing: 5px;
    line-height: 34px;
    color: #667bb3;
    font-weight: 800;
    border-radius: 4px;
    background: rgba(72, 94, 120, .4);
  }

  .text {
    font-family: MicrosoftYaHei;
    font-size: .12rem;
    color: #b8b8b8;
    text-align: left;
    cursor: pointer;
  }

  .prompt {
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #666666;
    text-align: center;
    width: 2rem;
    min-width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 3rem;
    margin-left: -100px;
  }

  .el-form-item {
    margin-bottom: .22rem !important;
  }

</style>


<template>
  <div class="box">
    <div class="logo">
    
      <div class="left">
        <p class="one">综合管理后台</p>
      </div>

    </div>
    <div class="loginBox">
      <transition name="el-zoom-in-center">
        <div v-show="lock_xx">
          <div class="login_header">
            用户登录
          </div>
          <div class="form_box">
            <el-form :model="formInline" :rules="ruleInline" ref="formInline" class="demo-ruleForm">
              <el-form-item prop="user">
                <el-input v-model="formInline.user" placeholder="请输入登录账号" suffix-icon="el-icon-u-yonghutouxiang">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" @keyup.enter.native="handleSubmit('formInline')" v-model="formInline.password" placeholder="请输入密码"
                  suffix-icon="el-icon-u-icon-test"></el-input>
              </el-form-item>

              <el-form-item>
                <el-input v-model="yzm" placeholder="请输入验证码" @keyup.enter.native="handleSubmit('formInline')" style="width:1.5rem;min-width: 120px;"></el-input>
                <div id="v_container_box">
                  <span onselectstart="return false" id="v_container">{{checkCode}}</span>
                  <span @click="createCode" class="text" onselectstart="return false">看不清楚，换一张</span>
                </div>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-button type="primary" style="width:100%;" :loading="loadLock" @click="handleSubmit('formInline')">登录</el-button>
              </el-form-item>
              <el-form-item prop="check">
                <el-checkbox v-model="checked" style="color:#fff;">记住密码</el-checkbox>
              </el-form-item>
            </el-form>
          </div>

          <div class="prompt">
            Copyright © CoolLsk 2018
          </div>
        </div>
      </transition>
    </div>


  </div>


</template>

<script>
  let path = '' || '/'
  export default {
    data() {
      return {
        // 路由锁
        routerNum: false,
        // 加载中
        loadLock: false,

        formInline: {
          user: '',
          password: ""
        },
        ruleInline: {
          user: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          user: [{
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 6,
              message: '密码长度不能低于6位数',
              trigger: 'blur'
            }
          ]
        },
        checkCode: '',
        yzm: '',
        checked: true,
        lock_xx: false
      }
    },
    computed: {
      lock: function () {
        return this.$store.state.rLock
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        path = from.path
      })
    },
    created() {
      var self = this;

      this.createCode()
      // console.log(window.localStorage.getItem("user"));

      if (window.localStorage.getItem("user") !== "" && window.localStorage.getItem("user") !== null) {
        var _data = JSON.parse(window.localStorage.getItem("user"))
        // console.log(_data.userName, _data.passWord);
        self.formInline.user = _data.userName
        self.formInline.password = _data.passWord
      }
      window.onresize = fontSizeS;

      function fontSizeS() {
        var winWidth = document.documentElement.clientWidth || document.body.clientWidth
        var isCollapse = false;
        if (winWidth <= 1200) {
          isCollapse = true;
        }
        self.$store.commit("smallOrB", isCollapse)
        var size = (winWidth / 1920) * 100
        if (size > 100) {
          size = 100
        } else if (size < 50) {
          size = 50
        }

        document.documentElement.style.fontSize = size + 'px'
        // console.log(size + "尺寸")
      }
      fontSizeS()
      // console.log(this.$route);
    },
    mounted() {
      this.lock_xx = true
    },
    methods: {

      // 生成图片验证码
      createCode() {
        var code = "";
        var codeLength = 4; //验证码的长度
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
          'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
          'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 's'); //随机数
        for (var i = 0; i < codeLength; i++) { //循环操作
          var index = Math.floor(Math.random() * 50); //取得随机数的索引（0~35）
          code += random[index]; //根据索引取得随机数加到code上
        }
        this.checkCode = code; //把code值赋给验证码
      },
      // 提交、
      handleSubmit(name) {
        var self = this;
        self.loadLock = true;
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (self.checkCode.toLowerCase() != self.yzm.toLowerCase()) {
              this.$Message.error('验证码错误，请重新输入!');
              self.loadLock = false;
              return
            }
            
          } else {
            self.loadLock = false;
          }
        })
      },
      // 所有列表集合
    }
  }

</script>
