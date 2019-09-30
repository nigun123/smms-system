 <template>
    <div class='stockstatistics'>
         <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span> 进货统计</span>               
            </div>
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="myChart" style="height:300px"></div>
        </el-card>
    </div>
</template>
<script>
    // 引入echarts
    import echarts from 'echarts';
    export default {
         //操作dom的生命周期
         mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '进货统计'
                },
                tooltip: {},
                legend: {
                    data:['库存']
                },
                xAxis: {
                    data: ["1月","2月","3月","4月","5月","6月"]
                },
                yAxis: {
                    type:'value'
                },
                series: [{
                    name: '库存',
                    type: 'line',
                    data: []
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            //发送ajax请求数据
            let stocks = [200,658,500,365,248,800];

            //重新赋值
            myChart.setOption({
                series: [{
                    name: '库存',
                    type: 'line',
                    data: stocks
                }]
            })
         },
    }

        
</script>

<style lang="less">
 .stockstatistics{
     
 }
</style>
    