 <template>
    <div class='personinfo'>
         <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span> 个人中心</span>                               
            </div>

             <!-- 账号信息 -->
            <el-form :model="personFrom" status-icon  ref="personFrom" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" >
                    <el-input :disabled="true" type="text" v-model="personFrom.username"  autocomplete="off"></el-input>
                </el-form-item>
                <!--  -->
                <el-form-item label="用户组" >
                    <el-input :disabled="true" type="text" v-model="personFrom.usergrounp" autocomplete="off" show-password></el-input>
                </el-form-item>
                <!--  -->
                <el-form-item label="创建时间" >
                    <el-input :disabled="true" type="text" v-model="personFrom.ctime" autocomplete="off" show-password></el-input>
                </el-form-item>
                
            </el-form>

        </el-card>
    </div>
</template>
<script>
//时间处理模块
import moment from 'moment'
export default {
    data() {
        return {
            personFrom:{
                username:'',
                usergrounp:'',
                ctime:''
            }
        }
    },
    //生命周期created
    created() {
       this.getpersoninfo() 
    },
    //方法
    methods: {
        getpersoninfo(){
            this.request.get('/account/getpersoninfo')
            .then(response=>{
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    //过滤器
    filters:{
        filterCtime(ctime){
            return moment(ctime).format('YYYY-MM-DD hh:dd:ss');
        }
    }
}
</script>
<style lang="less">
    .personinfo{
        .box-card {
            .el-card__body{
                .el-form-item{
                    width:300px
                }
            }
            
        }
    }
</style>