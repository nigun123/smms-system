 <template>
    <div class='home'>
    <!-- 内容面板 -->
        <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span>系统信息</span>               
            </div>
            <!-- 详细内容面板 -->
            <div  class="text item">
              <el-alert
                title="商品总数：xx。已销售总金额：xxx。库存总价：xxx"
                type="info"
                show-icon>
              </el-alert>
              <el-alert
                title="导入数据"
                type="success"
                :closable="false"
                show-icon>
              </el-alert>
            
                <!-- 详细内容左右面板 :gutter:列间距 -->
              
                <el-row :gutter="20"> 
                     <!-- 左 -->
                    <el-col :span="12">
                        <div>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>销售排行</span>
                                </div>
                                <div class="text item">
                                    <el-table
                                     :data="goodsData"
                                     stripe
                                     style="width: 100%">
                                      <el-row>
                                      <el-col :span="12">
                                        <el-table-column
                                            prop="goods"
                                            label="商品">
                                        </el-table-column>
                                      </el-col>
                                      <el-col :span="12">
                                        <el-table-column
                                                prop="sales"
                                                label="销量">
                                        </el-table-column> 
                                      </el-col>
                                     </el-row>                              
                                    </el-table>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <!-- 右 -->
                    <el-col :span="12">
                        <div>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>缺货的商品</span>
                                </div>
                                <div class="text item">
                                   <el-table
                                     :data="nullGoods"
                                     stripe
                                     style="width: 100%">
                                     <el-row >
                                      <el-col :span="8">
                                            <el-table-column
                                                prop="goods"
                                                label="商品">
                                            </el-table-column>
                                       </el-col>
                                       <el-col :span="8">
                                            <el-table-column
                                                prop="num"
                                                label="库存">
                                            </el-table-column>  
                                        </el-col>
                                        <el-col :span="8">
                                            <el-table-column
                                                fixed="right"
                                                label="操作">
                                                <template slot-scope="scope">                                               
                                                    <el-button type="text" size="small">入库</el-button>
                                                </template>
                                            </el-table-column> 
                                        </el-col>
                                     </el-row >                                     
                                    </el-table> 
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
              
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
      return {
        goodsData: [{
          sales: '2016-05-02',
          goods: '王小虎',
        }, {
          sales: '2016-05-04',
          goods: '王小虎',
        }],
        nullGoods:[{
            goods: '王小虎',
            num:0,
        }]
      }
    }
}
</script>
<style lang="less">   
  .home{
    .box-card {
        .el-card__body{
            .el-alert{
                margin-bottom:10px
            }
        }
    }
 
  }
</style>