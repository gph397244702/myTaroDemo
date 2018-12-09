import Taro, {Component, Config} from '@tarojs/taro'
import { View, Button,Image} from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Img from '../../../pic/productImg/222.jpg'
import Imgs from '../../../pic/productImg/333.jpg'
import Imgss from '../../../pic/productImg/444.jpg'
import MySwiperStyle from '../../../components/swiperModule/SwiperModule'
import { PRODUCTURL } from '../../../constants/counter'

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
export default  class ShopDetail extends Component {



	config: Config = {
    navigationBarTitleText: '商品详情'
  }
  constructor(...props) {
    super(...props);

  }

  componentWillMount () {
    const currentTab =  this.$router.params.currentTab
    //console.log(currentTab)
    let imgs = []
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/productDetail',
      data: {
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      imgs=rest.url
      console.log(imgs)
      //const pageSizes =  Math.round(contentList.length/10)==0?1:Math.round(contentList.length/10)
      //contentList)
      this.setState({
        imgUrls:imgs
      })
    })
    this.state = {
      imgUrls: [],
      currentTab:currentTab
    };
  }

  componentDidShow () { }

  componentDidHide () { }


  //点击标签栏进入商品页面
  navigateTo(url) {
    const currentTab = this.state.currentTab
    const urls = url+ "&currentTab="+ currentTab
    Taro.navigateTo({url:urls})
  }
  render () {
    return (
      <View className="detail-page">
         <View className="atIconClass" onClick={this.navigateTo.bind(this,'/pages/index/index?current=2')}><AtIcon value='arrow-left' size='30' color='#F00'></AtIcon> </View>
           <View className="image-box-wrap">
                <View className="images-box">
                   <MySwiperStyle banner={this.state.imgUrls} />
                     <View className="share-btn">
                       <Button open-type="share" />
                     </View>
                </View>
          </View>
      </View>
    )
  }
}
