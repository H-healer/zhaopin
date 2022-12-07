<template>
  <div>
    <div class="searchIndex">
      <div class="contains" :width="nxw">
        <div class="search">
          <div style="width: 70%;margin: 0 auto; text-align: center">
            <el-row span="10">
              <el-col>
                <el-input v-model="searchKeyword" @change="onQueryChange" placeholder="请输入职位名称" size="large" clearable>
                  <template #append>
                    <el-button @click="onQueryChange" slot="append" icon="Search">查询</el-button>
                  </template>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <!-- 展示热门职位搜索列表 -->
          <div class="s_hot">
            <div>
              热门职位搜索：
              <span class="s_hot_like" v-if="recommendList.length">
								<span @click="searchPositionList()">
									全部<span class="hot_before"></span>
								</span>
								<span @click="searchPositionList(item.key_word)" v-for="(item,index) in recommendList" :key="index" :title="item.description">
									{{item.name}}
									<span class="hot_before"></span>
								</span>
							</span>
              <span class="s_hot_like" v-else>
								<span>无法获取职位数据<span class="hot_before"></span></span>
							</span>
            </div>
          </div>
          <div class="nav-box">
            <!-- 轮播图 -->
            <Nav></Nav>
          </div>
        </div>
        <template v-if="!showDetail">
          <div class="workList">
            <ul class="work_list">
              <Work :tableData="tableData"/>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "@/components/index/Nav";
import Work from "@/components/index/Work";
import axios from "axios";
import {ElMessage} from "element-plus";
export default {
  components: {Work, Nav},
  data(){
    return{
      searchKeyword:'',
      recommendList:[],
      tableData:[],
      showDetail: false,
    }
  },
  created: function () {
    axios.post('http://127.0.0.1:4523/m1/2031408-0-default/favorite', {})
        .then(response => {  // 请求成功
          this.tableData=response.data
        }).catch(error => {  // 请求失败
      ElMessage({
        message: '获取数据失败',
        type: 'error',
      })
    })
  },
  methods:{
    onQueryChange(){
      axios.post('http://127.0.0.1:4523/m1/2031408-0-default/favorite', {})
          .then(response => {  // 请求成功
            this.tableData=response.data
            ElMessage({
              message: '查询成功',
              type: 'success',
            })
          }).catch(error => {  // 请求失败
        ElMessage({
          message: '查询失败',
          type: 'error',
        })
      })
    }
  }
}
</script>
<style lang="scss">
.searchIndex {
  width: 100%;
  background: #fff;
  margin-top: 20px;
  .contains {
    width: 100%;
    margin: 0 auto;

    .search {
      text-align: center;
      position: relative;

      .nav-box {
        width: 1200px;
        margin: 50px auto 0;
        text-align: center
      }
      // img {
      // 	display: inline-block;
      // 	width: 150px;
      // }
      .search1 {
        width: initial;
        text-align: center;
        position: relative;
      }

      .s_box {
        height: 5rem;
        padding-top: 2rem;

        .search_input,
        .search_button {
          float: left;
          box-sizing: content-box;
          width: 39.5rem;
          border: 1px solid #ddd;

          // margin-top: 20px;
          &:focus {
            outline: 0px;
            outline-offset: 0px;
          }
        }

        .search_input {
          height: 19px;
          padding: 16px;
          font-size: 16px;
          border-right: none;

          &:focus {
            border: 1px solid #3CBEF9;
            border-right: 0px;
          }
        }

        .search_button {
          width: 8rem;
          height: 51px;
          font-size: 20px;
          line-height: 51px;
          text-align: center;
          cursor: pointer;
          color: #fff;
          border: 1px solid #3CBEF9;
          background: #3CBEF9;
        }
      }

      .s_hot {
        clear: both;
        text-align: center;
        margin-top: 20px;
        color: #666;
        font-size: 18px;
        div {
          height: 25px;
        }

        .s_hot_like {
          margin-right: 16px;
          cursor: pointer;
          display: inline-block;
          height: 100%;
          display: inline-block;

          >span {
            margin: 0 5px;
            display: inline-block;
            font-family: cursive;
            position: relative;
            overflow: hidden;
            transition: all .5s !important;
            padding: 2px;
            height: 100%;
            line-height: 25px;
            transform: translateY(5px);
            // text-shadow: 0px 1px 3px #000000 !important;
            color: #6c6c6c !important;
            &:hover {
              transform: translateY(0px);

              .hot_before {
                background: #3636361f;
                left: 0% !important;
              }
            }
          }
          .hot_before {
            position: absolute;
            left: -100% !important;
            width: 100%;
            height: 80%;
            display: inline-block;
            transition: all .8s;
            padding-bottom: 2px;
            border-top: 1px solid #3affad;
            border-bottom: 1px solid #3CBEF9;
            color: #3CBEF9 !important;
          }
          // >span:hover  .hot_before{
          // }
        }
      }

      .nosee {
        display: none;
      }

    }
  }

}

.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: #3CBEF9;
      font-size: 25px;
      font-weight: 500;
      margin-left: 450px;
    }
  }

  .search3 {
    height: 52px;
    width: 100%;
    background: rgba(57, 99, 188, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 24px;

    .search-tip {
      margin-left: 40px;
      height: 52px;
      line-height: 52px;
      color: #354058;
      font-size: 14px;

      .search-keyword {
        color: #3CBEF9;
      }

      .search-num {
        color: #f4516c;
      }
    }

    .search-back {
      margin: 8px 20px;
      height: 32px;
      background: #f4516c;
      border: none;
      border-radius: 2px;
      color: #fff;
      padding: 0 13px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .box {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .left {
      margin-left: 280px;
    }

    .right {
      height: 59px;
      line-height: 59px;
      color: #3CBEF9;
      font-size: 18px;
      font-weight: 400;
      margin-left: 50px;
      cursor: pointer;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 30px;
  }
}

$nx-color2:#0470B8;
$nx-width:76rem;

.workList {
  width: 100%;
  cursor: pointer;

  .work_list {
    width: $nx-width;
    margin: 1rem auto;
    zoom: 1;

    &:after {
      display: block;
      content: '.';
      clear: both;
      line-height: 0;
      visibility: hidden;
    }

    .cardWork {
      float: left;
      width: 17.6rem;
      height: 16.75rem;
      border: 1px solid #eee;
      margin: 1rem 1rem 0 0;

      >div {
        width: 100%;
        height: 100%;
        padding: 1rem;
        overflow: hidden;
        text-align: center;

        .cardWork_Up {
          color: #999;

          .card_workNT {
            display: inline-block;
            font-weight: 400;

            .card_workName {
              float: left;
              max-width: 12rem;
              font-size: 1rem;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;

              &:hover {
                color: $nx-color2;
              }
            }

            .card_workTime {
              font-size: 0.8rem;
            }
          }

          .card_workMoney {
            float: right;
            color: #FA606B;
          }

          .card_workExp {
            font-size: 0.8rem;
            color: #888;
          }

          ul {
            height: 4rem;
            border-bottom: 1px dashed #ddd;

            .card_workTags {
              float: left;
              font-size: 0.6rem;
              border: 1px solid #eee;
              padding: 0.2rem 0.3rem;
              margin: 0.6rem 0.6rem 2rem 0;
            }
          }
        }

        .cardWork_Down {
          float: left;
          width: 100%;
          height: 2.5rem;
          margin-top: 0.5rem;

          .card_workImg img {
            width: 6rem;
            margin-right: 1rem;
          }

          div {
            display: inline-block;

            span {
              font-size: 0.9rem;
            }

            ul .card_workIncTags {
              float: left;
              font-size: 0.8rem;
              color: #aaa;
            }
          }
        }
      }
    }
  }
}

</style>
