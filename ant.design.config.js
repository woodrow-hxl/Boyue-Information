import {Icon,Form,Button,Checkbox,Input,Avatar} from 'ant-design-vue'

const antdComponents = [Icon, Form, Button, Checkbox,Input, Avatar]

export default{
    install(Vue){
        antdComponents.forEach(Component=>Vue.use(Component))
    }
}