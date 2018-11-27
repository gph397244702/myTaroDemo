import Taro from '@tarojs/taro'
import { Image  } from '@tarojs/components'
import { AtSearchBar,AtTag ,AtDivider } from 'taro-ui'
import './Search.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

export default  class Search extends Taro.Component {

   constructor () {
     let  histags = []
     super(...arguments)
     if(!window.localStorage){
       console.log("浏览器支持localstorage")
       return
     }else{
       const storage=window.localStorage;
       //写入a字段
       histags =storage["histags"]
       console.log(histags)
       //storage["histags"]=[]
       histags = histags ? JSON.parse(histags):[]
       console.log(histags)
     }
     this.state = {
      value: '',
      tags:['热血高校','火影','指环王','霍比特人','我的兄弟叫顺溜','海贼王','海贼王'],
      histags:histags
    }
  }
  componentWillMount() {
}
  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    let histags  = this.state.histags
    const inputVal = this.state.value
    if (inputVal == '') return
    else{
      //去重
      let indexs =-1
      histags.map((item,index)=>{
        if(item.oldValue==inputVal){
           indexs = index
          console.log(indexs)
         }else{
           indexs = -1
         }
      })
      //console.log(indexs)
      indexs < 0 ? histags : histags.splice(indexs,1)
      //console.log(inputVal)
      const newValue = inputVal.length>3? inputVal.substring(0,3) + "...":inputVal
      histags.unshift({oldValue:inputVal,newValue:newValue})
    }
    //console.log(histags)
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return ;
    }else{
      const storage=window.localStorage;
      const histagss = histags
      const length = histagss.length
      length>12?histagss.splice(12):histagss
      //写入a字段
      storage["histags"] =JSON.stringify(histagss);
    }
    this.setState({
      histags:histags,
      value:''
    })
  }
 delete(){
     //let histags  = this.state.histags;
   let histags = []
   if(!window.localStorage){
     alert("浏览器不支持localstorage");
     return ;
   }else{
     const storage=window.localStorage;
     //写入a字段
     storage["histags"] = [];
   }
     this.setState({
       histags :[]
     })
 }

  onClick(param){
    console.log(param.name)
  }
  render () {
     const falg = 'false'
    return (
      <view>
      <AtSearchBar
        showActionButton
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
        <view className='hotSearch'>
          热搜
        </view>
        {this.state.tags.map((item,index) => {
          const  isOdd = index
          return isOdd < 3 ? (
            (
            <view className='content'>
            <AtTag
              name={item}
              type='primary'
              circle
               active
              onClick={this.onClick.bind(this)}
            >
              {item}
            </AtTag>
          </view>):(<view className='content'>
            <AtTag
              name={item}
              type='primary'
              circle
              onClick={this.onClick.bind(this)}
            >
              {item}
            </AtTag>
          </view>))
        }
        <AtDivider height="50"/>
        <view >
          <view className='historySearch' onClick={this.delete.bind(this)}>
          历史
          <Image  src={require('../../../pic/icon/delete.png')} alt="" className= 'deleteIcon'/>
          </view>
          {this.state.histags.map((item,index) => {
            return (<view className='content'>
              <AtTag
                name={item.newValue}
                type='primary'
                circle
                onClick={this.onClick.bind(this)}
              >
                {item.newValue}
              </AtTag>
            </view>)
          })}
        </view>
      </view>
    )
  }
}


