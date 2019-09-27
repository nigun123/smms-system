 <template>
    <div class='addgoods'>
       <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span> 添加商品</span>               
            </div>
            <!-- 添加商品 -->
            <el-form :model="addGoodsForm" status-icon :rules="rules" ref="addGoodsForm" label-width="150px" class="demo-ruleForm">

                <!-- 所属分类 -->
                <el-form-item label="请选择分类" prop="cateName">
                    <el-select v-model="addGoodsForm.cateName" placeholder="请选择分类">
                        <el-option label="酒水类" value="酒水类"></el-option>
                        <el-option label="水果类" value="水果类"></el-option>
                        <el-option label="电子类" value="电子类"></el-option>
                        <el-option label="食品类" value="食品类"></el-option>
                        <el-option label="生活用品" value="生活用品"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 条形码 -->
                <el-form-item label="条形码" prop="barCode">
                    <el-input type="text" v-model="addGoodsForm.barCode" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 商品名称 -->
                <el-form-item label="商品名称" prop="goodsName">
                    <el-input type="text"  v-model="addGoodsForm.goodsName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 商品进价 -->
                <el-form-item label="商品进价" prop="costPrice">
                    <el-input type="text" placeholder="保留一位小数"  v-model="addGoodsForm.costPrice" @blur="autoPrice"></el-input>
                </el-form-item>
                <!-- 商品市场价 -->
                <el-form-item label="商品市场价" prop="marketPrice">
                    <el-input type="text" placeholder="默认为商品进价3倍" v-model.number="addGoodsForm.marketPrice" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 商品售价 -->
                <el-form-item label="商品售价" prop="salePrice">
                    <el-input type="text"  placeholder="默认为商品进价2倍" v-model.number="addGoodsForm.salePrice" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 入库数量 -->
                <el-form-item label="入库数量" prop="goodsNum">
                    <el-input type="text" v-model.number="addGoodsForm.goodsNum" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 商品重量 -->
                <el-form-item label="商品重量" prop="goodsWeight">
                    <el-input type="text" v-model.number="addGoodsForm.goodsWeight" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 商品单位 -->
                <el-form-item label="选择单位" prop="unit">
                    <el-select v-model="addGoodsForm.unit" placeholder="选择单位">
                        <el-option label="个" value="个"></el-option>
                        <el-option label="件" value="件"></el-option>
                        <el-option label="盒" value="盒"></el-option>
                        <el-option label="斤" value="斤"></el-option>
                        <el-option label="袋" value="袋"></el-option>
                        <el-option label="瓶" value="瓶"></el-option>
                        <el-option label="箱" value="箱"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 会员优惠 -->
                <el-form-item label="会员优惠">
                    <el-radio-group v-model="addGoodsForm.discount">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 是否促销 -->
                <el-form-item label="是否促销">
                    <el-radio-group v-model="addGoodsForm.promotion">
                        <el-radio label="促销"></el-radio>
                        <el-radio label="不促销"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 商品描述 -->
                <el-form-item label="商品描述">
                    <el-input type="textarea" v-model="addGoodsForm.goodsDesc"></el-input>
                </el-form-item>
                <!-- 重置及登录按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addGoodsForm')">添加</el-button>
                    <el-button @click="resetForm('addGoodsForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        //设置商品价格保留一位小数
        const checkPrice = ( rule,value,callback)=>{           
            if (value === '') {
                callback(new Error('不能为空'));
            }
            let reg =/\d+(\.\d{1})?/g;
            this.addGoodsForm.costPrice = reg.exec(value)[0];
            callback();
        }
      return {
        addGoodsForm: {
            cateName: "",
            barCode: "",
            goodsName: "",
            costPrice: "",
            marketPrice: "",
            salePrice: "",
            goodsNum: "",
            goodsWeight: "",
            unit: "",
            discount: "",
            promotion: "",
            goodsDesc: ""
        },
        rules: {
             // 验证分类名称
            cateName: [
            //validator自定义验证函数
            { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
            {
                min: 3,
                max: 6,
                message: "长度必须 3 到 6 个字符",
                trigger: "change"
            } // 长度验证
            ],
            // 条形码
            barCode: [
                { required: true, message: "条形码不能为空", trigger: "blur" } // 非空验证
            ],
            // 商品名称
            goodsName: [
                { required: true, message: "商品名称不能为空", trigger: "blur" } // 非空验证
            ],
            // 商品进价
            costPrice: [
                { required: true,  validator: checkPrice, trigger: "blur" } // 非空验证
            ],
            // 市场价
            marketPrice: [
                { required: true, message: "不能为空", trigger: "blur" } // 非空验证
            ],
            // 售价
            salePrice: [
                { required: true, message: "不能为空", trigger: "blur" } // 非空验证
            ],
            // 入库数量
            goodsNum: [
                { required: true, message: "不能为空", trigger: "blur" } // 非空验证
            ],
            // 商品重量
            goodsWeight: [
                { required: true, message: "不能为空", trigger: "blur" } // 非空验证
            ],
            // 单位
            unit: [
                { required: true, message: "不能为空", trigger: "change" } // 非空验证
            ],
            // 是否打折
            discount: [
                { required: true, message: "不能为空", trigger: "blur" } // 非空验证
            ],
            // 是否促销
            promotion: [
                { required: true, message: "不能为空", trigger: "blur" } // 非空验证
            ],
            // 商品描述
            goodsDesc: [
                { required: true, message: "不能为空", trigger: "blur" } // 非空验证
            ]
        }
      };
    },
    methods: {
        // 自动填充价格
        autoPrice () {
            let reg =/\d+(\.\d{1})?/g;
            let reg1 =/\d+(\.\d{1})?/g;
            this.addGoodsForm.marketPrice = reg.exec(this.addGoodsForm.costPrice * 3)[0];
            this.addGoodsForm.salePrice = reg1.exec(this.addGoodsForm.costPrice * 2)[0];
        },
        // 添加商品
      submitForm(formName) {
        // 获取整个表单组件  调用验证方法
        this.$refs[formName].validate((valid) => {
          if (valid) {  //如果所有验证通过valid为true
            let params = { //收集商品信息
                cateName : this.addGoodsForm.cateName,
                barCode : this.addGoodsForm.barCode,
                goodsName : this.addGoodsForm.goodsName,
                costPrice : this.addGoodsForm.costPrice,
                marketPrice : this.addGoodsForm.marketPrice,
                salePrice : this.addGoodsForm.salePrice,
                goodsNum : this.addGoodsForm.goodsNum,
                goodsWeight : this.addGoodsForm.goodsWeight,
                unit : this.addGoodsForm.unit,
                discount : this.addGoodsForm.discount,
                promotion : this.addGoodsForm.promotion,
                goodsDesc : this.addGoodsForm.goodsDesc
            }
            //发送给后台
            this.request.post('/goods/addgoods',params)
            .then(respose=>{
                let {res_code,msg} = respose;
                if(res_code === 1){
                    this.$message({
                        type:'success',
                        message: msg,//request
                    })
                    this.$router.push('/goodsmanager');
                }else{
                    this.$message.error(msg)
                }
            })
            .catch(err=>{
                console.log(err)
            })

          } else {//失败时valid为false
            alert('前端验证失败');
            return false;
          }
        });
      },
      // 重置
      resetForm(formName) {
          //获取整个表单组件  调用重置方法
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="less">
    .addgoods{
        .box-card {
            .el-card__body{
                .el-form-item{
                    width:300px
                }
            }
            
        }
    }
</style>