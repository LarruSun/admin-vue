<template>
	<div id="Login">
		<h2 style="text-align:center;margin-bottom:20px">系统登录</h2>
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm">
 		  <el-form-item prop="account">
		    <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="用户名"></el-input>
		  </el-form-item>
		  <el-form-item prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
		  </el-form-item>
		  <el-form-item>
		  	<el-checkbox v-model="remember">
		  		记住密码
		  	</el-checkbox >
		  </el-form-item>
		  <el-form-item>
		  	 <el-button type="primary" @click="submitForm('ruleForm2')" :loading="logining">提交</el-button>
		  </el-form-item>
		</el-form>
	</div>
	</template>
<script>
//获取请求登录的函数
import {requestLogin} from '../api/api'
  export default {
    data() {    
      //验证用户输入的密码是否为空
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
          callback();
        } 
       };
       //验证用户输入的用户名是否为空
      var checkUserName = (rule, value, callback) => {
        if (value.length==0) {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        logining: false,
        ruleForm2: {
          pass: '123456',
          account: 'admin',
        },
        //对进行相应验证
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          account: [
            { validator: checkUserName, trigger: 'blur' }
          ]
        },
        remember: true
      };
    },
    methods: {
      submitForm(formName) {
        var _this = this;
        //获取注册了ref属性的组件,并调用该组件的validate函数进行
        //自定义验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.logining = true;
              //获取用户输入的用户名和密码
              var requestParams = {
                  username: _this.ruleForm2.account,
                  password: _this.ruleForm2.pass
              }
              console.log(requestLogin);
              //发送请求,
              requestLogin(requestParams).then(data => {
                console.log('data');
                //关闭加载动画
                  this.logining = false;
                  /*
                  等价于
                    let code = data.code;
                    let msg = data.masg;
                    lset user = data.user;
                  */
                  let {code,msg,user} = data;
                  //判断后台返回的状态码是否为200,如果不是弹出消息框
                  if (code!==200) {
                      this.$message({
                          message: '登录验证失败,请重新登录',
                          type: 'warning'
                      })
                  }else{
                    //如果状态吗为200,则将登陆信息存储到sessionStorage中
                    //用于下次登陆验证
                      sessionStorage.setItem('user',JSON.stringify(user));
                      //跳转到home组件
                      this.$router.push('/Home');
                  }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">
	#Login {
		margin:0 auto;
		width: 400px;
		margin-top: 150px;
		border: 1px solid lightgray;
		box-shadow: 0px 0px 20px lightgray;
		padding: 40px;
		border-radius: 10px;
		.el-button {
			width:100%;
		}
	}
</style>