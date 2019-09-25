/**
 * 
 * 封装axios 
 * 
 */
import axios from 'axios';//引入axios模块
import qs from 'qs';

//设置默认服务器根目录
axios.defaults.baseURL = 'http://127.0.0.1:666';

//设置一个请求拦截 在axios发送之前 在请求头中携带token
axios.interceptors.request.use((config)=>{
    const token = window.localStorage.getItem('token');//获取token  
    // console.log(token)
    config.headers.authorization = `Bearer ${token}`; //在请求头中携带token
    return config;
})

//封装get post方法 并暴露出去
export default{
    get(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params})
            .then(response=>{
                resolve(response.data);
            })
            .catch(err=>{
                reject(err)
            })
        })
    },
    post(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(params))
            .then(response=>{
                resolve(response.data);
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

}
