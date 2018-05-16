<template>
	<div id="Home">	
		<el-container>
		  	<el-header>
		  		<el-row>
		  			<el-col :span="15">
			  			<el-col  :class="collapsed?'logo-collapsed-width':'logo-width'" class="logo" :span="5">
			  				{{collapsed?'':sysName}}
			  			</el-col>
			  			<el-col :span="10" class="tools" @click.native="collapse">
			  				<i class="fa fa-align-justify"></i>
			  			</el-col>
		  			</el-col>

		  			<el-col :span="9" class="userInfo">
		  				<el-dropdown trigger="click">
							  <span class="el-dropdown-link">
							    {{userName}}
							    <img :src="userAvatar" alt="">
							  </span>
							  <el-dropdown-menu slot="dropdown">
							    <el-dropdown-item command="message">我的消息</el-dropdown-item>
							    <el-dropdown-item command="setting">设置</el-dropdown-item>
							    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
							  </el-dropdown-menu>
							</el-dropdown>
		  			</el-col>
		  		</el-row>
		  	</el-header>
		  	<!-- 侧边栏导航 -->
		  	<el-container>
		    	<el-aside :class="collapsed?'menu-collapsed':'menu-expanded'">
					<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="collapsed"
						 background-color="#EFEFEF"
						 text-color='black'
					>
					  <el-submenu index="1">
					    <template slot="title">
					      <i class="el-icon-message"></i>
					      <span slot="title">导航一</span>
					    </template>
					    <el-menu-item-group>
						 <el-menu-item v-for="(item,index) in navList"  :index=item.index @click.native="pushNav(item.path)" :key=index>
						 	{{item.name}}
						 </el-menu-item>
					    </el-menu-item-group>
					  </el-submenu>
					  <el-menu-item index="2">
					    <i class="el-icon-menu"></i>
					    <span slot="title">导航二</span>
					  </el-menu-item>
					  <el-menu-item index="3">
					    <i class="el-icon-setting"></i>
					    <span slot="title">导航三</span>
					  </el-menu-item>
					</el-menu>
		    	</el-aside>
		    	<el-main>
		    		<router-view></router-view>
		    	</el-main>
		  	</el-container>
		</el-container>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				collapsed: false,
				sysName: 'AlpsMall',
				userAvatar: 'dfsa',
				userName: 'adsfs',
				navList: [
					{
						path: '/home/table',
						name: 'table',
						index: '1-1'
					},
					{
						path: '/home/form',
						name: 'form',
						index: '1-2'
					},
					{
						path: '/home/list',
						name: 'list',
						index: '1-3'
					}
				]
			}
		},
		methods: {
			logout(){
				this.$confirm('您确定要退出系统么?',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=>{
					//点击确定之后,触发这个回调函数
					console.log(this);
					sessionStorage.removeItem('user');
					this.$router.push('/login');
					this.$message({
						type: 'success',
						message: '退出成功'
					})
				},()=>{
					//点击取消之后,触发这个回调函数
					this.$message({
						type: 'error',
						message: '退出失败'
					})
				})
			},
			collapse(){
				console.log("折叠");
				this.collapsed = !this.collapsed;
			},
			handleOpen(key, keyPath) {
				console.log("展开");
				console.log(key, keyPath);
			 },
			handleClose(key, keyPath) {
				console.log("折叠");
				console.log(key, keyPath);
			},
			pushNav(path){
				this.$router.push({path: path});
			}
		},
		created(){
			//将获取的字符串对象化
			var user = JSON.parse(sessionStorage.getItem('user'));
			this.userAvatar = user.avatar;
			this.userName = user.name;
		}
	}
</script>

<style lang="scss" scoped>
	#Home {
		width: 100%;
		height: 100%;
		.el-container {
			width: 100%;
			height: 100%;
			.el-header {
				width: 100%;
				height: 64px;
				background: #73C4E9;
				padding: 0px;
				margin: 0px;
				.el-row{
					width: 100%;
					height: 100%;
					.el-col {
						height: 100%;
					}
					.logo {
						width: 250px;
						line-height: 64px;
						text-align: center;
						font-size:22px;
						border-right: 1px solid rgba(238,214,146,1);
						color:white;
					}
					.logo-collapsed-width {
						width:64px;
					}
					.logo-width {
						width: 250px;
					}
					.tools {
						display: flex;
						align-items: center;
						font-size: 15px;
						color:white;
						padding-left: 20px;
					}
					.userInfo {
						 display: flex;
						 justify-content:flex-end;
						 align-items: center;
						 color:white;
						 .el-dropdown-link {
						 	display: flex;
						 	align-items:center;
							img {
								margin-left: 10px;
								margin-right: 20px;
							 	width: 40px;
							 	height: 40px;
							 	border-radius: 50%;
							 }
						 }
						
					}
				}
			}
			 .menu-collapsed {
				width: 64px !important;
				background: #EFEFEF !important;
			}
			 .el-menu-vertical-demo:not(.el-menu--collapse) {
			    width: 250px;
			    min-height: 400px;
			    border-right: 0;
			  }
			.menu-expanded {
				width: 250px  !important;
				background: #EFEFEF !important;
			}
		}
	}
</style>