import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Login from '@/view/login'
import MemberCenter from '@/view/membercenter'
import Publish from '@/view/publish'
import Qualification from '@/view/qualification'
import auditinfo1 from '@/view/qualification/upload/upload1.vue'
import Contract from '@/view/contract'
import CompanyInfo from '@/view/companyInfo'
import ContactInfo from '@/view/contactInfo'
import ChangePwd from '@/view/changepassword'

Vue.use(Router)
// const baseUrl = '/blade/'
const baseUrl = ''
export default new Router({
  base: baseUrl,
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Index,
      meta: {requiresLogin: true},
      children: [
        {path: 'membercenter', component: MemberCenter, meta: {requiresLogin: true}},
        {path: 'publish', component: Publish, meta: {requiresLogin: true}},
        {path: 'qualification', component: Qualification, meta: {requiresLogin: true}},
        {path: 'qualification/auditinfo1', component: auditinfo1, meta: {requiresLogin: true}},
        {path: 'contract', component: Contract, meta: {requiresLogin: true}},
        {path: 'companyinfo', component: CompanyInfo, meta: {requiresLogin: true}},
        {path: 'contactinfo', component: ContactInfo, meta: {requiresLogin: true}},
        {path: 'changepwd', component: ChangePwd, meta: {requiresLogin: true}}
      ]
    },
    {path: '*', component: Login}
  ],
  mode: 'history'
})
