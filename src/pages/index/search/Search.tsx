import Taro from '@tarojs/taro'
import { Image ,ScrollView ,View} from '@tarojs/components'
import { AtSearchBar,AtTag ,AtDivider,AtList,AtListItem,AtIcon} from 'taro-ui'
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

   constructor (props) {
     let  histags = []
     let tags = []
     let searchStore = []
     super(...props)
     //获取热搜
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
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/searchStore',
      data: {
        SearchData:value,
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      const searchStore = rest.searchStore
      this.setState({
        searchStore:searchStore
      })
    })
    let searchStore =  this.state.searchStore
    let newSearchStore = []
    if(value==""){
      newSearchStore = searchStore
    }else{
    searchStore.map((item,index)=>{
      if(item.content.includes(value)) {
        newSearchStore.push(item)
      }
    })
    }
    var compare = function (obj1, obj2) {
      var val1 = obj1.hits;
      var val2 = obj2.hits;
      if (val1 > val2) {
        return -1;
      } else if (val1 < val2) {
        return 1;
      } else {
        return 0;
      }
    }
    const lists =newSearchStore.sort(compare)
    console.log(lists)
    this.setState({
      active:"selectListBlock",
      value: value,
      newSearchStore:lists
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
      indexs < 0 ? histags : histags.splice(indexs,1)
      //console.log(inputVal)
      const newValue = inputVal.length>4? inputVal.substring(0,3) + "...":inputVal
      histags.unshift({oldValue:inputVal,newValue:newValue})
    }
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
     const itemName = test.item.content
     //console.log(itemName)
    this.setState({
      active:"selectListNone",
      value:itemName
  })
  }
  clickEnters(event){
    const keyCode = event.keyCode
    let inputVal = this.state.value
    let histags  = this.state.histags
    if(keyCode == "13") {
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
        indexs < 0 ? histags : histags.splice(indexs,1)
        //console.log(inputVal)
        const newValue = inputVal.length>4? inputVal.substring(0,3) + "...":inputVal
        histags.unshift({oldValue:inputVal,newValue:newValue})
      }
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
        value:inputVal
      })
    }
}
  onBlurs(name, test, e){
      console.log(12312323123)
   }

  //热搜跳转到搜索结果页面
  navigateTo(item) {
     let urls='/pages/index/index?current=1&SearchResult=1'
    //const currentTab = this.state.currentTab
    const tagTitle = item.tagsTitle?item.tagsTitle:item.oldValue
     urls = urls+ "&tagName="+ tagTitle
    console.log(urls)
    Taro.navigateTo({url:urls})
  }
  render () {
    return (
      <View className="myStyle">
        <View onkeydown ={this.clickEnters.bind(this)}>
      <AtSearchBar
        showActionButton
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
          <View  className={this.state.active} onBlur={this.onBlurs.bind(this,this.state,'')}>
            <ScrollView className='container'
                        scrollY
                        scrollWithAnimation
                        scrollTop={0}
                        lowerThreshold={10}
                        upperThreshold={10}
                        style='height:240px'
            >
            {this.state.newSearchStore.map((item,index)=>{
              const  indexs = index
              return  indexs < 3? ( <View className="searchBox" onClick={this.onClickQuery.bind(this,this.state,{item})}>
                <View className="searchBoxLeft">{item.content}</View><View className="searchBoxRight" style="color:red">{item.hits}
                  <AtIcon value='arrow-up' size='20' color='#F00'></AtIcon>
                </View></View>):
                (<View className="searchBox" onClick={this.onClickQuery.bind(this,this.state,{item})}>
                  <View className="searchBoxLeft">{item.content}</View><View className="searchBoxRight">{item.hits}</View></View>)
            })}
            </ScrollView>
          </View>
        </View>
        <View className='hotSearch'>
          热搜
        </View>
        {this.state.tags.map((item,index) => {
          const  isOdd = index
          return isOdd < 3 ? (
            (<View className='content'>
            <AtTag
              name={item.tagsTitle}
              type='primary'
              circle
               active
              onClick={this.navigateTo.bind(this,item)}
            >
              {item.tagsTitle}
            </AtTag>
          </View>):(<View className='content'>
            <AtTag
              name={item.tagsTitle}
              type='primary'
              circle
              onClick={this.navigateTo.bind(this,item)}
            >
              {item.tagsTitle}
            </AtTag>
          </View>))
        }
        <AtDivider height="50"/>
        <View >
          <View className='historySearch' >
          历史
              <Image  src={require('../../../pic/icon/delete.png')} onClick={this.delete.bind(this)} alt="" className= 'deleteIcon'/>
          </View>
          {this.state.histags.map((item,index) => {
            return (<View className='content'>
              <AtTag
                name={item.oldValue}
                type='primary'
                circle
                onClick={this.navigateTo.bind(this,item)}
              >
                {item.newValue}
              </AtTag>
            </View>)
          })}
        </View>
      </View>
    )
  }
}


