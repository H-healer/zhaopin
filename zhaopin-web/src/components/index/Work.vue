<!-- 首页热门职位模块 -->
<template>
  <div class="work">
    <div class="contains">
      <el-tabs v-model="activeWork" class="post">
        <el-tab-pane name="hot" >
          <span slot="label" :class="{'fontSize':true}">热门职位 </span>
        </el-tab-pane >
      </el-tabs>
    </div>
  </div>
  <div class="table">
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" @row-click="showInfo">
      <el-table-column prop="jobImg" label="岗位图片">
        <template #default="scope">
          <el-image :src="scope.row.jobImg" style="width: 150px;height: 150px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="jobName" label="岗位名称"></el-table-column>
      <el-table-column prop="jobEdu" label="学历要求"></el-table-column>
      <el-table-column prop="jobCity" label="城市"></el-table-column>
      <el-table-column prop="jobType" label="岗位类型"></el-table-column>
      <el-table-column prop="jobName" label="收藏">
        <template #default="scope">
          <el-button icon="Star" @click="favorite(scope.row)">点击收藏</el-button>
        </template>
      </el-table-column>
      <!--  隐藏列   -->
      <el-table-column prop="jobId" label="岗位Id" v-if="false"></el-table-column>
      <el-table-column prop="jobLowSalary" label="最低薪资" v-if="false"></el-table-column>
      <el-table-column prop="jobHighSalary" label="最高薪资" v-if="false"></el-table-column>
      <el-table-column prop="jobInfo" label="岗位具体描述" v-if="false"></el-table-column>
      <el-table-column prop="jobCount" label="岗位被收藏次数" v-if="false"></el-table-column>
      <el-table-column prop="bossName" label="岗位的HR" v-if="false"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block" style="display: flex;justify-content: center;margin: 30px;">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
  <el-drawer v-model="showInfoDrawer" title="岗位详细信息" :with-header="false">
    <el-descriptions
        class="margin-top"
        title="岗位详细信息"
        direction="horizontal"
        :column="1"
        size="default"
        border
    >
      <el-descriptions-item width="140">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <PictureFilled />
            </el-icon>
            岗位图片
          </div>
        </template>
        <el-image :src="this.info.jobImg" style="width: 250px;height: 250px;"></el-image>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <User />
            </el-icon>
            岗位名称
          </div>
        </template>
        {{this.info.jobName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <User />
            </el-icon>
            岗位所要求的学历
          </div>
        </template>
        {{this.info.jobEdu}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Money />
            </el-icon>
            薪资
          </div>
        </template>
        {{this.info.jobSalary}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Location />
            </el-icon>
            岗位所在城市
          </div>
        </template>
        {{this.info.jobCity}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Paperclip />
            </el-icon>
            岗位类型
          </div>
        </template>
        {{this.info.jobType}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Document />
            </el-icon>
            岗位具体描述
          </div>
        </template>
        {{this.info.jobInfo}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <StarFilled />
            </el-icon>
            岗位被收藏次数
          </div>
        </template>
        {{this.info.jobCount}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Avatar />
            </el-icon>
            岗位的HR
          </div>
        </template>
        {{this.info.bossName}}
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
export default{
	components:{
	},
	props:{
    tableData :{
			default:[]
		}
	},
	data(){
		return {
      showInfoDrawer:false,
      info:{},
			activeWork:'hot',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 2
    }
	},
  methods:{
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getlivestockInfo(val);
    },
    getlivestockInfo(num1){
      const that = this;
      const params = new URLSearchParams();
      params.append('pageNum',num1);
      axios.post('http://127.0.0.1:4523/m1/2031408-0-default/favorite',params)    //补上后台接口即可
          .then(response => {  // 请求成功
            console.log('请求成功');
            that.tableData=response.data.data;
            that.currentPage=num1;
            that.pageSize=that.tableData.pageSize;
            that.total=that.tableData.total;
            console.log(that.tableData.list.length);
          }).catch(error => {  // 请求失败
        console.log('请求失败');
        console.log(error);
      })
    },
    favorite(jobName){
      axios.post('/favorite', {'jobId': jobName['jobId']})
          .then(response => {  // 请求成功
            ElMessage({
              message: '收藏成功',
              type: 'success',
            })
          }).catch(error => {  // 请求失败
        ElMessage({
          message: '收藏失败',
          type: 'error',
        })
      })
    },
    showInfo(row){
      this.info['jobImg']=row.jobImg
      this.info['jobName']=row.jobName
      this.info['jobEdu']=row.jobEdu
      this.info['jobSalary']=row.jobLowSalary.toString()+'~'+row.jobHighSalary
      this.info['jobCity']=row.jobCity
      this.info['jobType']=row.jobType
      this.info['jobInfo']=row.jobInfo
      this.info['jobCount']=row.jobCount
      this.info['bossName']=row.bossName
      this.showInfoDrawer = true
    }
	},
	async mounted() {
    this.getlivestockInfo(1);
		try{
			if (this.tableData.length==0) return;
			this.tableData = res
		}catch(e){
			this.tableData = [
				{
					title:"没有更多职位",
					hits:0,
					city:"未知",
					salary_down:0,
					salary_up:0,
					requirement:"该职位没有详细的描述",
					logo:require("@/assets/image/logo.png"),
					company_name:"校企直聘",
					edu_back:"专科"
				}
			]
		}
	}
}
</script>

<style lang="scss">
$nx-width:76.25rem;
$nx-color2:#0470B8;
.fontSize{
  font-size: 1rem;
}
.work{
  width: 100%;
  .contains{
    width: $nx-width;
    margin:0 auto ;
    .post{
      padding:1rem;
    }
  }
}
.el-descriptions {
  width: 100%;
}
</style>
