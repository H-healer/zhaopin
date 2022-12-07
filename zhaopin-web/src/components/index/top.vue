<template>
  <!-- 注册框 -->
  <div>
    <el-drawer title="注册" v-model="showregister" :direction="direction" :before-close="handleClose1">
      <el-card class="box-card" style="margin-top: 10%;">
        <div slot="header" style="margin-top: 5%;">
          <H1 style="margin-bottom: 5%;">注册账号</H1>
          <el-form ref="form" :model="registerform" :rules="registerRules">
            <el-form-item label="账号" prop="username" label-width="25%">
              <el-input type="text" placeholder="请输入账号" v-model="registerform.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="nickname" label-width="25%">
              <el-input type="text" placeholder="请输入姓名" v-model="registerform.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" label-width="25%">
              <el-input type="text" placeholder="请输入邮箱" v-model="registerform.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel" label-width="25%">
              <el-input type="text" placeholder="请输入手机号码" v-model="registerform.tel"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="25%">
              <el-input type="password" placeholder="请输入密码" v-model="registerform.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm_password" label-width="25%">
              <el-input type="password" placeholder="请输入密码" v-model="registerform.confirm_password"></el-input>
            </el-form-item>
            <el-form-item inline-message>
              <el-button type="primary" @click="userRegister()" style="width: 100%;">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-drawer>
  </div>

  <!-- 登录框 -->
  <div>
    <el-drawer title="登录" v-model="showlogin" :direction="direction" :before-close="handleClose">
      <el-card class="box-card" style="margin-top: 20%;">
        <div slot="header" style="margin-top: 20%;">
          <H1 style="margin-bottom: 5%;">欢迎登录</H1>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="账号" prop="username" label-width="15%">
              <el-input type="text" placeholder="请输入用户名" v-model="form.username"  @keyup.enter.native="signLogin"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="15%">
              <el-input type="password" placeholder="请输入密码" v-model="form.password" @keyup.enter.native="signLogin"></el-input>
            </el-form-item>
            <el-form-item inline-message>
              <el-row>
                <el-col>
                  <el-button type="primary" @click.native.prevent="signLogin" style="width: 100%;">登录
                  </el-button>
                </el-col>
                <el-col>
                  <p @click="showlogin = false; showfind = true" style="cursor:pointer;text-decoration:underline">忘记密码
                  </p>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-drawer>
  </div>

  <!-- 忘记密码 -->
  <div>
    <el-drawer title="忘记密码" v-model="showfind" :direction="direction" :before-close="handleClose2">
      <el-card class="box-card" style="margin-top: 20%;">
        <div slot="header" style="margin-top: 8%;">
          <H1 style="margin-bottom: 5%;">找回密码</H1>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="账号" prop="username" label-width="25%">
              <el-input type="text" placeholder="请输入账号" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" label-width="25%">
              <el-input type="text" placeholder="请输入邮箱" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password" label-width="25%">
              <el-input type="password" placeholder="请输入新密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="password" label-width="25%">
              <el-input type="password" placeholder="请确认新密码" v-model="form.confirm_password"></el-input>
            </el-form-item>
            <el-form-item inline-message>
              <el-row>
                <el-col>
                  <el-button type="primary" @click="forgotPwd" @keyup.enter="forgotPwd" style="width: 100%;">提交</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-drawer>
  </div>

  <!-- 头部 -->
  <div id="headTop">
    <div>
      <div>
        <ul class="right2">
          <li v-if="this.userstate" class="right2-r">
						<span class="right2-button">
								<el-button type="danger" round @click="outLogin">注销</el-button>
						</span>
            <!-- 用户名 -->
            <span style="font-size:22px;" v-if="nickname">
							<span @click="goToCenter" class="gotoUser">{{ nickname }}</span>
							<span v-if="userImg">
									<img :src='userImg' alt="">
							</span>
						</span>
            <span v-else>未登录</span>
          </li>
        </ul>
        <ul class="right1">
          <span v-if="!this.userstate">
							<el-button @click="showlogin = true" type="primary" round>登录</el-button>&nbsp;&nbsp;
							<el-button @click="showregister = true" round>注册</el-button>
          </span>
        </ul>
      </div>
    </div>
  </div>
  <div id="headnav">
    <div class="contains">
      <div class="logo left">
        <img class="logoimg" :src="require('@/assets/image/logo.png')" />
      </div>
      <ul class="navlist" id="navNum">
        <li>
          <router-link to="/index">首页</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Utils from "@/lin/util/util";
import axios from 'axios'
import {ElMessage} from "element-plus";
export default {
  data() {
    return{
      userstate:false,
      nickname:null,
      userImg:null,
      showfind: false,
      showlogin: false,
      showregister: false,
      direction: "rtl",
      nowWait:0,
      form: {
        username: '',
        password: '',
        email:"",
        confirm_password: ''
      },
      registerform: {
        nickname: '',
        username: '',
        password: '',
        confirm_password: '',
        email:'',
        tel: '',
        group_ids: ['', ],
      },
      registerRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        tel: [{
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }],
        confirm_password: [{
          required: true,
          message: '请确认输入密码',
          trigger: 'blur'
        }],
        nickname: [{
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }]
      },
    }
  },
  created() {
    this.nickname=localStorage.getItem('nickname')
    this.userstate=localStorage.getItem('userstate')
  },
  methods:{
    async userRegister() {
      try {
        // check
        for(let i in this.registerform){
          if(typeof(this.registerform[i]) != "string") continue;
          if(!this.registerform[i].replace(/ /g,"").length){
            return this.$message.warning("内容不能为空");
          }
        }
        // 判断两次密码是否相同
        if(this.registerform.password != this.registerform.confirm_password){
          return this.$message.warning("两次密码不一致");
        }
        // 判断邮箱和手机格式是否正确
        if(!Utils.checkEmail(this.registerform.email) || !Utils.checkTel(this.registerform.tel)){
          return this.$message.warning("邮箱或电话的格式错误");
        }
        axios.post('http://127.0.0.1:4523/m1/2031408-0-default/favorite', this.registerform)
            .then(response => {  // 请求成功
              const res =response
              this.userstate=true
              this.nickname=this.registerform['nickname']
              localStorage.setItem('nickname',this.nickname)
              localStorage.setItem('userstate',this.userstate)
              this.form = {
                username: '',
                password: '',
              }
              this.showregister = false
              ElMessage({
                message: '注册成功',
                type: 'success',
              })
            }).catch(error => {  // 请求失败
          ElMessage({
            message: '注册失败',
            type: 'error',
          })
        })
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 登录,并对登录的操作进行简单的处理
    signLogin(){
      if(this.form.username.replace(/ /g,"").length<1 || this.form.password.replace(/ /g,"").length<1){
        return this.$message.warning("账号或密码不能为空");
      }
      if(this.nowWait>0){return this.$message.warning("操作过快.");}
      this.nowWait = 1
      axios.post('http://127.0.0.1:4523/m1/2031408-0-default/favorite', {'username':this.form.username,'password':this.form.password})
          .then(response => {  // 请求成功
            this.nickname="22"
            this.userstate=true
            localStorage.setItem('nickname',this.nickname)
            localStorage.setItem('userstate',this.userstate)
            this.form = {
              username: '',
              password: '',
            }
            this.showlogin = false
            ElMessage({
              message: '登录成功',
              type: 'success',
            })
          }).catch(error => {  // 请求失败
        ElMessage({
          message: '登录失败',
          type: 'error',
        })
      })
    },
    outLogin() {
      if(this.nickname){
        localStorage.clear()
        this.$message.success("退出登录成功")
        return
      }
      localStorage.clear()
      this.showlogin = true
    },
    // 忘记密码
    async forgotPwd(){
      for(let i in this.form){if(!this.form[i].length){return this.$message.warning("内容不能为空.")}}
      if(this.form.password != this.form.confirm_password){return this.$message.error("两次密码不一致")}
      if(!Utils.checkEmail(this.form.email)){return this.$message.warning("邮箱格式错误");}
      axios.post('http://127.0.0.1:4523/m1/2031408-0-default/favorite', {'username':this.form.username,'email':this.form.email,'password':this.form.password})
          .then(response => {  // 请求成功
            this.form = {
              username: '',
              password: '',
            }
            this.showfind = false
            ElMessage({
              message: '修改成功',
              type: 'success',
            })
          }).catch(error => {  // 请求失败
        ElMessage({
          message: '修改失败',
          type: 'error',
        })
      })
    },
    handleClose(done) {
      this.form = {
        username: '',
        password: '',
      }
      this.showlogin = false
    },
    handleClose1(done) {
      this.form = {
        username: '',
        password: '',
      }
      this.showregister = false
    },
    handleClose2(done) {
      this.form = {
        username: '',
        password: '',
      }
      this.showfind = false
    },
  },
}
</script>

<style lang="scss">
$nx-color: #449efe;
$nx-color2: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;

.left {
  float: left;
  padding-left: $all-padding;
}

.right2 {
  font-size: large;
  margin-top: auto;
  float: right;
  padding-left: $all-padding;
}
.right2-r {
  position: relative;

}
.right2-button {
  margin-right: 15px;
}
.gotoUser {
  cursor: pointer;
  border-bottom: 1px solid white;
  margin-right: 10px;
  +span {
    display: inline-block;
    width: 30px;
    position: absolute;
    // right:-30px
  }
}

.right {
  margin-top: 7px;
  cursor: pointer;
  float: right;
  padding-right: $all-padding;
}

.right1 {
  cursor: pointer;
  float: right;
  padding-right: $all-padding;
}

#headTop {
  width: 100%;
  height: 3rem;
  background: rgb(51, 51, 51);
  // background: #587cf7;
  line-height: 40px;

  // padding: $all-padding;
  div {
    width: $nx-width;
    height: 100%;
    margin: 0 auto;

    ul {
      height: 100%;

      .iconfont {
        float: left;
        line-height: 2rem;
        font-size: 1.3rem;
        color: $nx-color2;
      }

      li {
        float: left;
        height: 100%;
        font-size: 14px;
        color: #c4c3c3;
        margin-top: 0.3rem;

        a {
          color: #aaa;
        }

        .lgstyle {
          color: $nx-color2;
          font-size: 28px;
          font-family: cursive;
        }
      }
    }
  }
}

#headnav {
  width: 100%;
  height: 4rem;
  // padding: $all-padding;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  overflow: hidden;

  .contains {
    width: 76.25rem;
    height: 100%;
    margin: 0 auto;

    .logo {
      width: 10rem;
      height: 1.2rem;
      margin-left: 4rem;
      margin-right: 2rem;

      img {
        margin: 5px;
        height: 50px;
      }

      span {
        float: right;
        display: inline-block;
        line-height: 80px;
        margin-left: 5px;
      }
    }

    .navlist {
      height: 100%;

      li {
        float: left;
        font-size: 20px;
        margin: 20px;
        padding: 0 6px 11px;

        &.now,
        &:hover {
          border-bottom: 2px solid $nx-color2;
        }
      }
    }
  }
}

</style>

