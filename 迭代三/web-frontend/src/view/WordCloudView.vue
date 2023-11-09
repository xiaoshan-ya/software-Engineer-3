<template>
<div>
  <div style="left: 5%;bottom:10%;position: fixed;">
    <input style="background-color: transparent;border: 0;z-index: 100;text-align: center" v-model="project"><br/>
    <input style="background-color: transparent;border: 0;z-index: 100;text-align: center" v-model="version"><br/>
    <el-button type="primary" plain="plain" :circle="true" @click="getData">
      <i class="el-icon-search"></i>
    </el-button>
  </div>
  <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;top: 0;overflow: clip;">
  <div id="wordCloud" style="top:0;width: 80%;height: 80%;"></div>
  <div style="font-size: 2rem; color: #bae3f8;margin-top: 20px;"
        @click="enterMain">Press To Enter<i class="el-icon-arrow-down"></i></div>
  </div>
</div>
</template>

<script>
import {PATH} from '@/commons/const'
import * as echarts from 'echarts'
import axios from 'axios'
require('echarts-wordcloud')
export default {
  name: 'WordCloudView',
  data: () => ({
    path: PATH,
    project: 'superset',
    version: 'v2.0',
    word_cloud_view: null,
    word_cloud_options: {},
    word_list: [{name:'docs', value:2}
      ,{name:'documentation', value:1}
      ,{name:'Presto', value:2}
      ,{name:'bug', value:9}
      ,{name:'dashboard', value:7}
      ,{name:'issue', value:11}
      ,{name:'problem', value:4}
      ,{name:'error', value:3}
      ,{name:'filter', value:6}
      ,{name:'postgreSQL', value:5}
      ,{name:'metal', value:1}
      ,{name:'migration', value:2}
      ,{name:'update', value:2}
      ,{name:'upgrade', value:2}
      ,{name:'PR', value:6}
      ,{name:'version', value:2}
      ,{name:'review', value:1}
      ,{name:'database', value:2}
      ,{name:'dataset', value:4}
      ,{name:'export', value:1}
      ,{name:'item', value:1}
      ,{name:'SQL', value:4}
      ,{name:'Editor', value:1}
      ,{name:'blank', value:1}
      ,{name:'screen', value:1}
      ,{name:'browser', value:1}
      ,{name:'build', value:1}
      ,{name:'datatype', value:1}
      ,{name:'Lab', value:1}
      ,{name:'upload', value:1}
      ,{name:'file', value:1}
      ,{name:'button', value:1}
      ,{name:'storybook', value:1}
    ]
  }),
  methods: {
    enterMain () {
      this.$router.push(this.path.MAIN_VIEW)
    },
    draw_word_cloud_view() {
      if (this.word_cloud_view) {
        this.word_cloud_view.dispose();
      }
      let chartDom = document.getElementById('wordCloud')
      let resizeMainContainer = function () {
        chartDom.style.width = window.innerWidth * 0.8 + 'px'
        chartDom.style.height = window.innerHeight * 0.8 + 'px'
      }
      resizeMainContainer()
      this.word_cloud_view = echarts.init(chartDom)
      window.onresize = () => {
        resizeMainContainer()
        this.word_cloud_view.resize()
      }
      this.word_cloud_view.setOption(this.word_cloud_options);
    },
    init_view_data() {
      let word_cloud_series = [{
        type: 'wordCloud',
        shape: 'diamond',
        //maskImage: maskImage,
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [20, 120],
        layoutAnimation: true,
        rotationRange: [0, 0],
        autoSize: {
          enable: true,
          minSize: 6
        },
        textPadding: 10,
        gridSize: 8,
        drawOutOfBound: true,
        // Global text style
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // Color can be a callback function or a color string
          color: function () {
            // Random color
            return 'rgb(' + [
              198 - 25 + Math.round(Math.random() * 50),
              226 - 25 + Math.round(Math.random() * 50),
              255].join(',') + ')';
          }
        },
        emphasis: {

          textStyle: {
            color: 'rgb(40,158,255)',
          }
        },
        data: this.word_list
      }]

      this.word_cloud_options = {
        series: word_cloud_series
      }
    },
    getData () {
      let fd = new FormData()
      fd.append('project', this.project)
      fd.append('version', this.version)
      axios.post('http://124.70.198.102:5000/weight', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(res => {
        console.log(res.data.data)
        if(res.status === 200){

          this.word_list=res.data.data
          this.init_view_data()
        }else{
          this.$message.error("error")
        }
      }).then(() => {
        setTimeout(() => {
          this.draw_word_cloud_view()
        }, 500)

      })
    }
  },
  mounted() {
    this.init_view_data()
    this.draw_word_cloud_view()

  }
}
</script>

<style scoped>

</style>
