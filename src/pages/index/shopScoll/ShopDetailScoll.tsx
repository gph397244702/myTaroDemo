import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text,Swiper, SwiperItem,Image,ScrollView  } from '@tarojs/components'


import Img from '../../../pic/productImg/222.jpg'
import Imgs from '../../../pic/productImg/333.jpg'
import Imgss from '../../../pic/productImg/444.jpg'
import MySwiperStyle from  '../mySwiper/MySwiper'

import './ShopDetailScoll.scss'
import {add} from "../../../actions/counter";

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
      imgUrls: [Img],
      imgUrlslist:[Img,Imgs,Imgss],
      index:0
    };
  }
  goToPage = (e) => {

      Taro.navigateTo({
        url: e.currentTarget.dataset.url,
      })

  }
  commitUtls(){

  }
  appendNextPageList () {
    const imgs = this.state.imgUrls
    //console.log(imgs)
    const imgUrlslists = this.state.imgUrlslist
    const indexs = this.state.index +1
    const lengths =  imgUrlslists.length
    //console.log(indexs + "fdsfsdf" +lengths)

    if (indexs == lengths) {return}
    else{
      Taro.showLoading({title: '加载中'})
      setTimeout(() => {
        // Taro.hideLoading({title: '加载中'})
        //const ind =  indexs + 1
        const imgsurl = imgUrlslists[indexs]
        //imgs.splice(0, 1)
        imgs.push(imgsurl)
        console.log(indexs)
        this.setState({
          imgUrls:imgs
        })
        this.setState({
          index:indexs
        })
        Taro.hideLoading({title: '加载中'})
      }, 2000)

    }

    /*const imgs = this.state.imgUrls
    //console.log(imgs)
    const imgUrlslists = this.state.imgUrlslist
    const indexs = this.state.index +1
    const lengths =  imgUrlslists.length
    console.log(indexs + "fdsfsdf" +lengths)
    if (indexs == lengths) {return}
    else{
      setTimeout(() => {
        Taro.showLoading({title: '加载中'})
        commitUtls
      }, 2000)
      Taro.hideLoading({title: '加载中'})
      //const ind =  indexs + 1
      const imgsurl = imgUrlslists[indexs]
      //imgs.splice(0, 1)
      imgs.push(imgsurl)
      console.log(indexs)
      this.setState({
        imgUrls:imgs
      })
      this.setState({
        index:indexs
      })
    }

    console.log(imgs)*/
  }
  updateList () {
    console.log(321)
    /*const imgs = this.state.imgUrls
    console.log(imgs)
    const imgUrlslists = this.state.imgUrlslist
    const indexs = this.state.index
    //const lengths =  imgUrlslists.length
    if (indexs < 1) {return}
    else{
      Taro.showLoading({title: '加载中'})
      const ind =  indexs -1
      console.log(ind)
      const imgsurl = imgUrlslists[ind]
      imgs.splice(0, 1)
      imgs.push(imgsurl)
      console.log(imgsurl)
      Taro.hideLoading({title: '加载中'})
      this.setState({
        imgUrls:imgs
      })
      this.setState({
        index:ind
      })
    }*/
  }
  render () {

    return (
      <View className="detail-page">

      <View className="image-box-wrap">

        <View className="images-box">
          <view className='detailTitle'>商品详情</view>
          <ScrollView className='scrollview'
                      scrollY
                      scrollWithAnimation
                      lowerThreshold={10}
                      //upperThreshold={0}
                      style='height: 520px;'
                      //onScrollToUpper={this.updateList.bind(this)}
                      onScrollToLower={this.appendNextPageList.bind(this)}
                      >
          {this.state.imgUrls.map((imgs,index) => {
            return (<Image  src={imgs} mode='widthFix' className='slide-image'  />)
          })}

          </ScrollView>
        </View>

      </View>


    { /* 底部操作栏 */ }
    <View className="detail-bottom-btns">
      <View className="nav" data-url="/pages/index/index" onClick={this.goToPage}>
        <Image className="nav-img" src={require('../../../pic/tab/home.png')} alt="" />
        首页
      </View>
      <View className="nav" onClick={this.makePhoneCall}>
        <Image className="nav-img" src={require('../../../pic/icon/customerservice.png')} alt="" />
        客服
      </View>
      <View className="nav" data-url="/pages/cart/index" onClick={this.goToPage}>
        <Image className="nav-img" src={require('../../../pic/tab/cart.png')} alt="" />
        衣袋
        <View className="zan-badge__count"></View>
      </View>
      <View className={'join join-disabled'} onClick={this.join}>加入衣袋</View>
    </View>
    </View>
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
