<template>
	<div id="table">
		<el-table
		    ref="multipleTable"
		    :data="users"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column label="id" prop="id" width="50px"></el-table-column>
		    <el-table-column label="姓名" prop="name"  width="100px"></el-table-column>
		    <el-table-column label="性别" prop="sex"  width="100px"></el-table-column>
		    <el-table-column label="年龄" prop="age"  width="100px"></el-table-column>
		    <el-table-column label="生日" prop="birth"></el-table-column>
		    <el-table-column label="地址" prop="addr"></el-table-column>
		    <el-table-column label="操作">
				<template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
		    </el-table-column>
		  </el-table>	
		  <el-col :span="24" class="toobar">
		  	<el-button type="danger" >批量删除</el-button>
		  	<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total" style="float:right"
			  @current-change= "currentChange"
			  page-size = "20"
			  >
			</el-pagination>
		  </el-col>
	</div>
</template>

<script>
import {getUserListPage,removeUser,batchRemoveUser,editUser,addUser} from '../api/api'
	export default {
		data(){
			return {
				page: 1, //页码
				users: [],//存储用户数据
				total: 4, //总共页数
				listLoading: true, //数据是否正在加载中
			}
		},
		methods: {
			loadUserInfos(){
				var params = {
					page: this.page,
					name: '' //用于稍后过滤
				}
				getUserListPage(params).then((response)=>{
					console.log(response);
					this.total = response.data.total;
					this.users = response.data.users;
				})
			},
			handleSelectionChange(val) {
			    this.multipleSelection = val;
			},
			//index是下标,row是要编辑的数据对象

			handleEdit(index, row) {
				console.log(index, row);
			},
			//index是下标,row是要删除的数据对象
			handleDelete(index, row) {
				console.log(index, row);
				//删除指定用户
				this.users.splice(index,1);
			},
			currentChange(value){
				console.log(value);
				this.page = value;
				this.loadUserInfos();
			}	
		},
		created(){
			this.loadUserInfos();
		}
	}
</script>

<style scoped lang="scss">
	
</style>