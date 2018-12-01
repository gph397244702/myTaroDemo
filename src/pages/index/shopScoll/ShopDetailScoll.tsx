import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text,Swiper, SwiperItem,Image,ScrollView  } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import Img from '../../../pic/productImg/222.jpg'
import Imgs from '../../../pic/productImg/333.jpg'
import Imgss from '../../../pic/productImg/444.jpg'

import './ShopDetailScoll.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

export default  class ShopDetailScoll extends Taro.Component {



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
      imgUrls: [Img,'',''],
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

      //模拟2秒延迟
      setTimeout(() => {
        // Taro.hideLoading({title: '加载中'})
        //const ind =  indexs + 1
        const imgsurl = imgUrlslists[indexs]
        //imgs.splice(0, 1)
        imgs[indexs]=imgsurl
        console.log(indexs)
        this.setState({
          imgUrls:imgs
        })
        this.setState({
          index:indexs
        })
        Taro.hideLoading({title: '加载中'})
      }, 1000)
    }
  }
  navigateTo(url){
    Taro.navigateTo({url:url})
  }
  render () {

    return (
      <View className="detail-page">
      <View className="image-box-wrap">
        <View className="atIconClass" onClick={this.navigateTo.bind(this,'/pages/index/index?current=2')}><AtIcon value='arrow-left' size='30' color='#F00'></AtIcon> </View>
        <View className="images-box">
          <view className='detailTitle'>商品详情</view>
          <ScrollView className='scrollview'
                      scrollY
                      scrollWithAnimation
                      lowerThreshold={10}
                      style='height: 85vh;'
                      onScroll={this.appendNextPageList.bind(this)}
                      >
          {this.state.imgUrls.map((imgs,index) => {
            return (<Image  src={imgs} mode='widthFix' className='slide-image'  />)
          })}
          </ScrollView>
        </View>
      </View>
    </View>
    )
  }
}
