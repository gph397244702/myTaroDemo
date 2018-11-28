import Taro from '@tarojs/taro'
import { Image  } from '@tarojs/components'
import { AtSearchBar,AtTag ,AtDivider,AtList, AtListItem} from 'taro-ui'
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
     let tags = []
     let searchStore = []
     super(...arguments)
     //或者热搜
     Taro.request({
       url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/search',
       data: {
       },
       header: {
         'content-type': 'application/json'
       }
     }).then(res => {
       const rest =  res.data
      // console.log(rest)
       tags = rest.tags
       //contentList)
       this.setState({
         tags:tags
       })
     })
     //获取搜索下拉框数据
     Taro.request({
       url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/searchStore',
       data: {
       },
       header: {
         'content-type': 'application/json'
       }
     }).then(res => {
       const rest =  res.data
       //console.log(rest)
       searchStore = rest.searchStore
       //contentList)
       this.setState({
         searchStore:searchStore
       })
     })
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
      tags:[],
      searchStore:[],
       newSearchStore:[],
      histags:histags,
       active:'selectListNone'
    }
  }
  componentWillMount() {
}
  onChange (value) {
    const searchStore =  this.state.searchStore
    let newSearchStore = []
    if(value==""){
      newSearchStore = searchStore
    }else{
    searchStore.map((item,index)=>{
      if(item.includes(value)) {
        newSearchStore.push(item)
      }
    })
    }
    this.setState({
      active:"selectListBlock",
      value: value,
      newSearchStore:newSearchStore
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
      const newValue = inputVal.length>4? inputVal.substring(0,3) + "...":inputVal
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
      active:"selectListNone",
      histags:histags,
      value:''
    })
  }
  keyUp(){

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
  onClickQuery(name, test, e){
    console.log(name)
    console.log(test.item)
    console.log(e)
     const itemName = test.item
     //console.log(itemName)
    this.setState({
      active:"selectListNone",
      value:itemName

  })
  }

  onClicks(param){
    console.log(param.name)
  }
  changeClick(){}
  render () {
     const falg = 'false'
    return (
      <view className="myStyle">
        <view onKeyUp={this.keyUp.bind(this)}>
      <AtSearchBar
        showActionButton
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
          <view id="cityList" className={this.state.active} onBlur={this.onBlurs}>
            {this.state.newSearchStore.map((item,index)=>{
              return( <div onClick={this.onClickQuery.bind(this,this.state,{item})}>{item}</div>)
            })}
          </view>
        </view>

        <view className='hotSearch'>
          热搜
        </view>
        {this.state.tags.map((item,index) => {
          const  isOdd = index
          return isOdd < 3 ? (
            (
            <view className='content'>
            <AtTag
              name={item.tagsTitle}
              type='primary'
              circle
               active
              onClick={this.onClicks.bind(this)}
            >
              {item.tagsTitle}
            </AtTag>
          </view>):(<view className='content'>
            <AtTag
              name={item.tagsTitle}
              type='primary'
              circle
              onClick={this.onClicks.bind(this)}
            >
              {item.tagsTitle}
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
                onClick={this.onClicks.bind(this)}
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


