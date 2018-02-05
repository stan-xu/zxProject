import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Login from '@/view/login'
import ForgetPsw from '@/view/forgetpsw'
import Register from '@/view/register'
import Protocol from '@/view/protocol'
import RegisterCompany from '@/view/registercompany'
import RegSuccess from '@/view/regsuccess'
import MemberCenter from '@/view/membercenter'
import Publish from '@/view/publish'
import AddHonor from '@/view/addhonor'
import AddProject from '@/view/addproject'
import Qualification from '@/view/qualification'
import Estate from '@/view/qualification/estate'
import Contract from '@/view/contract'
import CompanyInfo from '@/view/companyInfo/companyInfoTab'
import ContactInfo from '@/view/contactInfo'
import ChangePwd from '@/view/changepassword'
import HomePage from '@/view/homepage'
Vue.use(Router)
// const baseUrl = '/blade/'
const baseUrl = ''
export default new Router({
  base: baseUrl,
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/login',
      component: Login,
      meta: {userState: 3}
    },
    {
      path: '/home',
      component: Index,
      meta: {userState: 1},
      children: [
        {path: 'membercenter', component: MemberCenter, meta: {userState: 1}},
        {path: 'publish', component: Publish, meta: {userState: 1}},
        {path: 'qualification', component: Qualification, meta: {userState: 1}},
        {path: 'qualification/estate', component: Estate, meta: {userState: 1}},
        {path: 'contract', component: Contract, meta: {userState: 1}},
        {path: 'companyinfo', component: CompanyInfo, meta: {userState: 1}},
        {path: 'contactinfo', component: ContactInfo, meta: {userState: 1}},
        {path: 'changepwd', component: ChangePwd, meta: {userState: 1}}
      ]
    },
    {
      path: '/addhonor',
      component: AddHonor,
      meta: {
        userState: 1
      }
    }, {
      path: '/changehonor/:id',
      component: AddHonor,
      meta: {
        userState: 1
      }
    }, {
      path: '/addproject',
      component: AddProject,
      meta: {
        userState: 1
      }
    }, {
      path: '/changeproject/:id',
      component: AddProject,
      meta: {
        userState: 1
      }
    }, {
      path: '/forgetpsw',
      component: ForgetPsw
    }, {
      path: '/register',
      component: Register
    }, {
      path: '/protocol',
      component: Protocol
    }, {
      path: '/registercompany',
      component: RegisterCompany,
      meta: {
        userState: 2
      }
    }, {
      path: '/regsuccess',
      component: RegSuccess,
      meta: {
        userState: 1
      }
    },
    {path: '*', component: Login, meta: {userState: 3}}
  ],
  mode: 'history'
})
