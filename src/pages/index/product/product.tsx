import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView,Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import  MyPage from '../../../components/pageModule/PageModule'
import './product.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion


export default class Index extends Taro.Component {
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

  componentWillReceiveProps (nextProps) {
    //console.log(this.props, nextProps)
  }

  constructor(props) {
    super(props);
    let currentTab = parseInt(this.props.children)
    this.state = {
      productList:[],
      currentTab: currentTab,
      productTitle:[],
      pageSize:1,
      currentPage:1,
    };
  }

  componentDidMount () {
    let productList = []
    let productTitle = []
    let currentTab = this.state.currentTab
    //console.log("============="+currentTab)
    //获取标签请求
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/productTitle',
      data: {
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data

      productTitle = rest.productTitle
      this.setState({
        productTitle:productTitle,
        currentTab:currentTab
      })
    })
    //获取内容请求
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/productList',
      data: {
        currentPage:1
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      productList = rest.productList
      const pageSizes =  Math.ceil(productList.length/10)==0?1:Math.ceil(productList.length/10)
      this.setState({
        pageSize:pageSizes,
        productList:productList,
      })
    })
  }
  //点击标签栏进入详情页面

  navigateTo(url) {
      const currentTab = this.state.currentTab
      const urls = url+ "?currentTab="+ currentTab
      Taro.navigateTo({url:urls})
  }
  handleClicks (value) {
    this.setState({
      currentTab: value
    })
  }
  //分页功能
  onChanges(pages){
      let productList= []
     let currentTab =  this.state.currentTab
    //获取内容请求
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/productList',
      data: {
        currentPage:pages,
        currentTab:currentTab
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      productList = rest.productList
      const pageSizes =  Math.ceil(productList.length/10)==0?1:Math.ceil(productList.length/10)
      this.setState({
        pageSize:pageSizes,
        productList:productList,
      })
    })
  }
  render () {
    const productTitle = this.state.productTitle
    const currentPage =  this.state.currentPage
    const pageSize =  this.state.pageSize
    const currentTab =  this.state.currentTab
    //console.log(productTitle)
	return (
    <AtTabs current={currentTab} scroll   tabList={productTitle} onClick={this.handleClicks.bind(this)}>
      {productTitle.map((item,index) => {
        return(
      <AtTabsPane  current={index} index={index} >
      <ScrollView className='container'
          scrollY
          scrollWithAnimation
          style='height:84vh'
        >
          <View className='shop_floor'>
                {this.state.productList.map((item, index) => {
                  return (
                    <View key={index} className='goods_item' onClick={this.navigateTo.bind(this,item.url)}>
                    <View className='goods_img'>
                      <Image className='goods_img_image' src={item.src} mode='widthFix' />
                    </View>
                    <View className='goods_info'>
                      <Text className='goods_name' onClick={this.navigateTo.bind(this,item.url)}>{item.name}</Text>
                    </View>
                    </View>)
                })}
            < MyPage
              pageSize={pageSize}
              currentPage={currentPage}
              currentTab={currentTab}
              onChanges={this.onChanges.bind(this)}/>
          </View>
        </ScrollView>
      </AtTabsPane>)
      })}
    </AtTabs>
    )
  }
}
