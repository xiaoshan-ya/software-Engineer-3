import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/view/MainView.vue'
import ManagementView from '@/view/ManagementView'
import ChartView from '@/view/ChartView'
import wordCloudView from '@/view/WordCloudView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'MainView',
      component: MainView
    },
    {
      path: '/management',
      name: 'ManagementView',
      component: ManagementView
    },
    {
      path: '/',
      name: 'WordCloudView',
      component: wordCloudView
    },
    {
      path: '/chart',
      name: 'ChartView',
      component: ChartView
    }
  ]
})
