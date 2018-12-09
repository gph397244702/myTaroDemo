import Taro, { Component, Config } from '@tarojs/taro'
import { Image ,ScrollView ,View} from '@tarojs/components'
import { AtSearchBar,AtTag ,AtDivider,AtList,AtListItem,AtIcon} from 'taro-ui'
import './SearchResult.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

export default  class SearchResult extends Component {

  config: Config = {
    navigationBarTitleText: '搜索结果'
  }
   constructor (...props) {
     super(...props)
  }
  componentWillMount(){
    const currentTab =  ''
    const tagName =  ''
    this.state = {
      currentTab:currentTab,
      searchStore:[],
      tagName:tagName,
      active:'selectListNone',
      searchResult:[],
      value:'',
      newSearchStore:[]
    }
  }
  componentDidMount(){
    let tagName = this.state.tagName
    let searchResult =[]
    //获取标签请求
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/searchResult',
      data: {
        tagName:tagName
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      searchResult = rest.searchResult
      this.setState({
        searchResult:searchResult
      })
    })
  }
  onChange (value) {
     console.log(value)
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
    this.setState({
      active:"selectListBlock",
      value: value,
      newSearchStore:lists
    })
  }
  //点击搜索
  onActionClick () {
    const inputVal = this.state.value
    let searchResult =[]
    //获取搜索结果
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/searchResult',
      data: {
        tagName:inputVal
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      searchResult = rest.searchResult
      //console.log(searchResult)
      this.setState({
        searchResult:searchResult,
        active:"selectListNone"
      })
    })
  }
  //点击选择搜索框里的标题
  onClickQuery(name, test, e){
     const itemName = test.item.content
    this.setState({
      active:"selectListNone",
      value:itemName
  })
  }

  clickEnters(event){
    const keyCode = event.keyCode
    let inputVal = this.state.value
    let searchResult =[]
    if(keyCode == "13") {
      if (inputVal == '') return
      //获取标题请求
      Taro.request({
        url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/searchResult',
        data: {
          tagName:inputVal
        },
        header: {
          'content-type': 'application/json'
        }
      }).then(res => {
        const rest =  res.data
        searchResult = rest.searchResult
        //console.log(searchResult)
        this.setState({
          active:"selectListNone",
          searchResult:searchResult
        })
      })
    }
  }

    //跳转到文章详情页面
  navigateTo(item){
      const urls = "/pages/index/articleDetails/ArticleDetails?current=1&searchResult=1&contentTitle="+item.titleId
      console.log(urls)
      Taro.navigateTo({url:urls})
   }

  render () {
    return (
      <View className="myStyle">
        <View onkeydown={this.clickEnters.bind(this)}>
          <AtSearchBar
            showActionButton
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
          <View className={this.state.active}>
            <ScrollView className='container'
                        scrollY
                        scrollWithAnimation
                        scrollTop={0}
                        lowerThreshold={10}
                        upperThreshold={10}
                        style='height:240px'
            >
              {this.state.newSearchStore.map((item, index) => {
                const indexs = index
                return indexs < 3 ? (<View className="searchBox" onClick={this.onClickQuery.bind(this,this.state, {item})}>
                    <View className="searchBoxLeft">{item.content}</View><View className="searchBoxRight" style="color:red">{item.hits}
                    <AtIcon value='arrow-up' size='20' color='#F00'></AtIcon>
                  </View></View>) :
                  (<View className="searchBox" onClick={this.onClickQuery.bind(this,this.state, {item})}>
                      <View className="searchBoxLeft">{item.content}</View>
                      <View className="searchBoxRight">{item.hits}</View>
                  </View>)
              })}
            </ScrollView>
          </View>
        </View>
        <View className='hotSearch'>
          搜索结果
        </View>
        <ScrollView className='container'
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    style='height:80vh'
        >
          {this.state.searchResult.map((item,index) => {
            return (
              <View className='at-row' onClick={this.navigateTo.bind(this,item)}>
                <View className='at-col at-col-2 article-class'>
                  <AtTag
                    name={item.title}
                    type='primary'
                    circle

                  >
                    {item.classs}
                  </AtTag>
                </View>
                <View className='at-col at-col-9 article-title'>{item.title}</View>
              </View>)
          })}
        </ScrollView>
      </View>)
  }
}


