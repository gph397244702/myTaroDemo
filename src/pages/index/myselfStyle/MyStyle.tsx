import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text,ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane,AtPagination,AtTag,AtInput  } from 'taro-ui'
import  MyPage from '../myPage/MyPage'


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
	  ],
      pageSize:10,
      currentPage:1
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

  handleChange(value1){
    this.setState({
      currentPage: value1
    })
  }

  //回到首页
  pageleftOne(){
    this.setState({
      currentPage: 1
    })
  }
  //回到上一页
  pageleft(){
   const currentPage =  this.state.currentPage
    if(currentPage <=1) return
    this.setState({
      currentPage: currentPage-1
    })
  }
  //进入下一页
  pageRight(){
    const currentPage =  this.state.currentPage
    const pageSize =  this.state.pageSize
    if(currentPage >=pageSize) return
    this.setState({
      currentPage: currentPage+1
    })
  }
  //进入尾页
  pageRightLast(){
    const pageSize = this.state.pageSize
    this.setState({
      currentPage: pageSize
    })
  }
  clickEnter(){
    const value = this.state.currentPage
    console.log(value)
  }

  render () {

	const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
	const contentList = [{content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'},{content1 : '被内容撑开被内容撑开被内容撑开被内容撑开',content2 : '20181120'}]
    const currentPage =  this.state.currentPage
    const pageSize =  this.state.pageSize
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
					  style='height: 530px;'
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
			  <MyPage
          pageSize = {pageSize}
          currentPage = {currentPage}
        />
		  </View>
		</ScrollView>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <ScrollView className='scrollview'
					  scrollY
					  scrollWithAnimation
					  scrollTop='0'
					  style='height: 554px;'
					  lowerThreshold='20'
					  upperThreshold='20'>
		 <View style='background-color: #FAFBFC;height:auto;' >

				{this.state.contentList.map((contentMap,index)=>{
          return (<View className='at-row' style="background-color: rgb(47, 40, 76);text-align: center;">
								<View className='at-col at-col-1 at-col--auto' style="background-color: darkkhaki;">
								{contentMap.content1}
							  </View>
							   <View className='at-col' style="background-color: lavender;">20181120</View>
				</View>)
				})}

				<view className='pageBox'>
          <view className = 'pageleftOne'>
            {currentPage ==1 ?
            <AtTag
           name='<<'
           type='primary'

           active
           onClick={this.pageleftOne.bind(this)}
         >
           {'<<'}
         </AtTag> :
              <AtTag
              name='<<'
              type='primary'

              onClick={this.pageleftOne.bind(this)}
              >
              {'<<'}
              </AtTag>}
       </view>
       <view className = 'pageleft'>
         {currentPage == 1 ?
           <AtTag
             name='<'
             type='primary'
             active
             onClick={this.pageleft.bind(this)}
           >
             {'<'}
           </AtTag> :
           <AtTag
           name='<'
           type='primary'
           onClick={this.pageleft.bind(this)}
           >
           {'<'}
           </AtTag>
         }

       </view >
          <view onkeydown ={this.clickEnter.bind(this)}>
          <AtInput
            name='value2'
            type='number'
            placeholder='请输入数字'
            value={this.state.currentPage}
            onChange={this.handleChange.bind(this)}
          />

          </view>
          <view >
              <AtTag
                name={this.state.pageSize}
                type='primary'

              >
                {this.state.pageSize}
              </AtTag>
          </view>
       <view className = 'pageRight'>
         {currentPage == pageSize ?
         <AtTag
           name='>'
           type='primary'

           active
           onClick={this.pageRight.bind(this)}
         >
           {'>'}
         </AtTag>
           :
           <AtTag
             name='>'
             type='primary'


             onClick={this.pageRight.bind(this)}
           >
             {'>'}
           </AtTag>}
       </view>
       <view className = 'pageRightLast'>
         {currentPage == pageSize ?
         <AtTag
           name='>>'
           type='primary'
            active

           onClick={this.pageRightLast.bind(this)}
         >
           {'>>'}
         </AtTag>:
           <AtTag
             name='>>'
             type='primary'

             onClick={this.pageRightLast.bind(this)}
           >
             {'>>'}
           </AtTag>}
       </view>
        </view>
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
