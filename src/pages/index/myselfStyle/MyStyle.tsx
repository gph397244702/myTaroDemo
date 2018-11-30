import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text,ScrollView ,Image} from '@tarojs/components'
import { AtTabs, AtTabsPane,AtPagination,AtTag,AtInput  } from 'taro-ui'
import  MyPage from '../../../components/myPage/MyPage'
import Imageurl1 from '../../../pic/icon/up.png'
import Imageurl2 from '../../../pic/icon/down.png'


import './myStyle.scss'
import index from "../../../reducers";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Taro.Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props);
    let contentList = []
    let tabList = []
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/upload',
      data: {
        titleFlag:1,
        dateFlag:1,
        currentPage:1
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
        const rest =  res.data
        contentList = rest.contentList
        contentList.map((item,index)=>{
          tabList.push(item.title)
        })
        const pageSizes =  Math.round(contentList[0].content.length/10)==0?1:Math.round(contentList[0].content.length/10)
        this.setState({
          tabList:tabList,
          contentList:contentList,
          pageSize:pageSizes
        })
      })
    this.state = {
      tabList:[],
      current: 0,
      contentList:[],
      pageSize:[],
      currentPage:1,
      titleFlag:1,
      dateFlag:1,
      titleImage : Imageurl1,
      dateImage :Imageurl1
    };
  }

  //点击标签栏出发的事件
  handleClicks (value) {
    this.setState({
      current: value
    })
  }

  //标题排序
  titleSort(){
      let titleFlag = this.state.titleFlag
      let currentPage = this.state.currentPage

     // const titleImage = this.state.titleImage
     //console.log(titleFlag)
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/upload',
      data: {
        titleFlag:titleFlag,
        currentPage:currentPage
      },
      //method:"post",
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      console.log(rest)
      const  contentList=rest.contentList
      const pageSizes =  Math.round(contentList.length/10)==0?1:Math.round(contentList.length/10)
      //contentList)
      this.setState({
        contentList:contentList,
        pageSize:pageSizes
      })
    })
    if(titleFlag == 1){
      const titleImages  = Imageurl2
      const titleFlag =2;
      const list =  this.state.contentList
      var compare = function (obj1, obj2) {
        var val1 = obj1.content1;
        var val2 = obj2.content1;
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
      const lists =  list.sort(compare)
      console.log(list.sort(compare))
     // console.log(titleImages)
      //console.log(titleFlag)
      this.setState({
        titleImage:titleImages,
        titleFlag:titleFlag,
        contentList:lists
      })
    }else{
      const titleImage  = Imageurl1
      const titleFlag = 1
      const list =  this.state.contentList
      var compare = function (obj1, obj2) {
        var val1 = obj1.content1;
        var val2 = obj2.content1;
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
      const lists =  list.sort(compare)
      this.setState({
        titleImage:titleImage,
        titleFlag:titleFlag,
        contentList:lists
      })
    }
  }
  //日期排序
  dateSort(){
    let dateFlag = this.state.dateFlag
    let currentPage = this.state.currentPage
    // const titleImage = this.state.titleImage
    //console.log(titleFlag)
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/upload',
      data: {
        dateFlag:dateFlag,
        currentPage:currentPage
      },
      //method:"post",
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      console.log(rest)
      const  contentList=rest.contentList
      const pageSizes =  Math.round(contentList.length/10)==0?1:Math.round(contentList.length/10)
      //contentList)
      this.setState({
        contentList:contentList,
        pageSize:pageSizes
      })
    })
    if(dateFlag == 1){
      const dateImage  = Imageurl2
      const dateFlag =2
      const list =  this.state.contentList
      var compare = function (obj1, obj2) {
        var val1 = obj1.content2;
        var val2 = obj2.content2;
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
      const lists =  list.sort(compare)
      console.log(list.sort(compare))
      // console.log(titleImages)
      //console.log(titleFlag)
      this.setState({
        dateImage:dateImage,
        dateFlag:dateFlag,
        contentList:lists
      })
    }else{
      const dateImage  = Imageurl1
      const dateFlag = 1;
      const list =  this.state.contentList
      var compare = function (obj1, obj2) {
        var val1 = obj1.content2;
        var val2 = obj2.content2;
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
      const lists =  list.sort(compare)
      this.setState({
        dateImage:dateImage,
        dateFlag:dateFlag,
        contentList:lists
      })
    }
  }
  navigateTo(url) {
    console.log(url)
    Taro.navigateTo({url:"/pages/index/articleDetails/ArticleDetails"})
  }
  render () {

	const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
    console.log(tabList)
    console.log(this.state.contentList.length)
	//const contentList = this.state.contentList
    const currentPage =  this.state.currentPage
    const pageSize =  this.state.pageSize
	return (

	  <AtTabs current={this.state.current} scroll  tabList={this.state.tabList} onClick={this.handleClicks.bind(this)}>
      {this.state.contentList.map((contentList,index) => {
        return ( <AtTabsPane  current={this.state.current} index={index}>
          <ScrollView className='scrollview'
                      scrollY
                      scrollTop='0'
                      style="height:84vh">
            <View>
              <view class='sort-wrap'>
                <view style="width:1%;height:38px;float: left;"></view>
                <view class='sort-btn' data-index="" onClick={this.titleSort.bind(this)}>
                  标题
                  <view className="titleImage">
                    <Image src={this.state.titleImage}></Image>
                  </view>
                </view>
                <view class='sort-btn' data-index="" onClick={this.dateSort.bind(this)}>
                  日期
                  <view className="titleImage">
                    <Image src={this.state.dateImage}></Image>
                  </view>
                </view>
              </view>
            {contentList.content.map((content,indexs) => {
              return (
                    <View className='box'>
                      <View className='contentBox' style="background-color: darkkhaki;" onClick={this.navigateTo.bind("/pages/index/articleDetails/ArticleDetails")}>
                        {content.content1}
                      </View>
                      <View className='dateBox' style="background-color: lavender;">{content.content2}</View>
                    </View>
              )
            }
        }
              < MyPage
                pageSize  = {pageSize}
                currentPage  = {currentPage}
              / >
            </View>
          </ScrollView>
        </AtTabsPane> )
      })}
      </AtTabs>

    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
