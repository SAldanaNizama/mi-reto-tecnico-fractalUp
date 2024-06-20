import Vue from 'vue'
import Router from 'vue-router'
import CountryList from '@/components/CountryList.vue'
import CountryDetails from '@/components/CountryDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CountryList',
      component: CountryList
    },
    {
      path: '/country/:code',
      name: 'CountryDetails',
      component: CountryDetails
    }
  ]
})