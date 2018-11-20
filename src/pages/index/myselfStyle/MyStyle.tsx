import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text,ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane,AtTabBar,AtList, AtListItem,AtInput ,AtPagination } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../../actions/counter'

import './myStyle.scss'

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

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  constructor(props) {

    super(props);
    this.state = {
      current: 0,
	  contentList:[
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},
	  {content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'}
	  ]
    };
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
 
  //点击标签栏出发的事件

 
  handleClicks (value) {
    this.setState({
      current: value
    })
  }
  
 
  
  render () {
      
	const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
	const contentList = [{content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},{content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'}]
	return (
	 
	  <AtTabs current={this.state.current}   tabList={tabList} onClick={this.handleClicks.bind(this)}>
      
		<AtTabsPane  current={this.state.current} index={0} >
		 <ScrollView className='scrollview'
					  scrollY
					  scrollWithAnimation
					  scrollTop='0'
					  style='height: 650px;'
					  lowerThreshold='20'
					  upperThreshold='20'>
		 <View style='background-color: #FAFBFC;text-align: center;height:736px;' >
			  
				{this.state.contentList.map((contentMap,index)=>{
					return (<View className='at-row' style="background-color: rgb(47, 40, 76);">
								<View className='at-col at-col-1 at-col--auto' style="background-color: darkkhaki;">
								{contentMap.content1}
							  </View>
							   <View className='at-col' style="background-color: lavender;">20181120</View>
				</View>)
				})}
				
				<AtPagination 
					  icon 
					  total='50' 
					  pageSize='10' 
					  current='1'
					>
					</AtPagination>
					
		  </View>
		</ScrollView>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <ScrollView className='scrollview'
					  scrollY
					  scrollWithAnimation
					  scrollTop='0'
					  style='height: 650px;'
					  lowerThreshold='20'
					  upperThreshold='20'>
		 <View style='background-color: #FAFBFC;text-align: center;height:auto;' >
			  
				{this.state.contentList.map((contentMap,index)=>{
					return (<View className='at-row' style="background-color: rgb(47, 40, 76);">
								<View className='at-col at-col-1 at-col--auto' style="background-color: darkkhaki;">
								{contentMap.content1}
							  </View>
							   <View className='at-col' style="background-color: lavender;">20181120</View>
				</View>)
				})}
				<View className='at-row' style="background-color: rgb(47, 40, 76);">
				  <View className='at-col at-col-1 at-col--auto' style="background-color: darkkhaki;">
					被内容撑开被内容撑开被内容撑开被内容撑开
				  </View>
				  <View className='at-col' style="background-color: lavender;">20181120</View>
				</View>
		  </View>
		</ScrollView>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <ScrollView className='scrollview'
					  scrollY
					  scrollWithAnimation
					  scrollTop='0'
					  style='height: 650px;'
					  lowerThreshold='20'
					  upperThreshold='20'>
		 <View style='background-color: #FAFBFC;text-align: center;height:auto;' >
			  
				{this.state.contentList.map((contentMap,index)=>{
					return (<View className='at-row' style="background-color: rgb(47, 40, 76);">
								<View className='at-col at-col-1 at-col--auto' style="background-color: darkkhaki;">
								{contentMap.content1}
							  </View>
							   <View className='at-col' style="background-color: lavender;">20181120</View>
				</View>)
				})}
				<View className='at-row' style="background-color: rgb(47, 40, 76);">
				  <View className='at-col at-col-1 at-col--auto' style="background-color: darkkhaki;">
					被内容撑开被内容撑开被内容撑开被内容撑开
				  </View>
				  <View className='at-col' style="background-color: lavender;">20181120</View>
				</View>
		  </View>
		</ScrollView>
			
        </AtTabsPane>
		
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
