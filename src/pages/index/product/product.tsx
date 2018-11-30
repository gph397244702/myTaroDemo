import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView,Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Img from '../../../pic/productImg/123.jpg'
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
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  constructor(props) {
    super(props);
    let tabList = []
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/query',
      data: {
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      tabList=rest.tabList
      console.log(tabList)
      //const pageSizes =  Math.round(contentList.length/10)==0?1:Math.round(contentList.length/10)
      //contentList)
      this.setState({
        tabList:tabList
      })
    })
    this.state = {
      tabList:[]
    };
  }
  //点击标签栏进入详情页面

  navigateTo(url) {
    Taro.navigateTo({url:url})
  }
  handleClicks (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const tabflagList = [{ title: '汽车' }, { title: '衣服' }, { title: '食品' }]
	return (
    <AtTabs current={this.state.current}   tabList={tabflagList} onClick={this.handleClicks.bind(this)}>
      <AtTabsPane  current={this.state.current} index={0} >
      <ScrollView className='container'
          scrollY
          scrollWithAnimation
          scrollTop={0}
          lowerThreshold={10}
          upperThreshold={10}
          style='height:569px'
          onScrolltoupper={this.updateList}
          onScrolltolower={this.appendNextPageList}
        >
          <View className='shop_floor'>
                {this.state.tabList.map((item, index) => {
                  return <View key={index} className='goods_item' onClick={this.navigateTo.bind(this,item.url)}>
                    <View className='goods_img'>
                      <Image className='goods_img_image' src={Img} mode='widthFix' />
                    </View>
                    <View className='goods_info'>
                      <Text className='goods_name' onClick={this.navigateTo.bind(this,item.url)}>{item.name}</Text>
                    </View>
                  </View>
                })}
          </View>
        </ScrollView>
      </AtTabsPane>
      <AtTabsPane  current={this.state.current} index={1} >
        <ScrollView className='container'
                    scrollY
                    scrollWithAnimation
                    scrollTop='0'
                    lowerThreshold='10'
                    upperThreshold='10'
                    style='height:658px'
                    onScrolltoupper={this.updateList}
                    onScrolltolower={this.appendNextPageList}
        >
          <View className='shop_floor'>
            {this.state.tabList.map((item, index) => {
              return <View key={index} className='goods_item' onClick={this.navigateTo.bind(this,item.url)}>
                <View className='goods_img'>
                  <Image className='goods_img_image' src={Img} mode='widthFix'  />
                </View>
                <View className='goods_info'>
                  <Text className='goods_name' onClick={this.navigateTo.bind(this.navigateTo.bind(this,item.url)}>{item.name}</Text>
                </View>
              </View>
            })}
          </View>
        </ScrollView>
      </AtTabsPane>
      <AtTabsPane  current={this.state.current} index={2} >
        <ScrollView className='container'
                    scrollY
                    scrollWithAnimation
                    scrollTop='0'
                    lowerThreshold='10'
                    upperThreshold='10'
                    style='height:658px'
                    onScrolltoupper={this.updateList}
                    onScrolltolower={this.appendNextPageList}
        >
          <View className='shop_floor'>
            {this.state.tabList.map((item, index) => {
              return <View key={index} className='goods_item' onClick={this.navigateTo.bind(this,item.url)}>
                <View className='goods_img'>
                  <Image className='goods_img_image' src={Img} mode='widthFix' />
                </View>
                <View className='goods_info'>
                  <Text className='goods_name' onClick={this.navigateTo.bind(this.navigateTo.bind(this,item.url)}>{item.name}</Text>
                </View>
              </View>
            })}
          </View>
        </ScrollView>
      </AtTabsPane>
    </AtTabs>
    )
  }
}
