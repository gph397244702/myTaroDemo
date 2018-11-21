import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text,Swiper, SwiperItem,Image  } from '@tarojs/components'
import {AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../../actions/counter'
import Img from '../../../pic/productImg/222.jpg'
import Imgs from '../../../pic/productImg/333.jpg'
import Imgss from '../../../pic/productImg/444.jpg'

import './ShopDetail.scss'

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
    this.state = {
	  imgUrls: [Img,Imgs,Imgss]
    };
  }
  render () {
    return (
	<view >
     <Swiper
        className='activity'
        indicatorColor='#999'
        indicatorActiveColor='#333'
		displayMultipleItems =3
		autoplay='true' 
		interval='1000' 
		duration='500'
		indicatorDots='true'
        circular
        >
		{this.state.imgUrls.map((imgs,index) => {
		  return  (<SwiperItem key={index}> 
			 <Image  src={imgs} mode='widthFix'  width='355' height='475' />
		  </SwiperItem>)
		})}
        
      </Swiper>
	  </view>
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
