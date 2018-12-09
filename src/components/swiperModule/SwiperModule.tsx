
import Taro, {Component,  Config } from '@tarojs/taro'
import { Swiper, SwiperItem,Image,View  } from '@tarojs/components'


import PropTypes from 'prop-types';
import './SwiperModule.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion


  export default  class Index extends Component {


    static propTypes = {
      banner: PropTypes.array,
    };

    static defaultProps = {
      banner: []
    };
  render () {
    const { banner } = this.props;
    return (
      <Swiper
        className='swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        interval='2000'
        duration='500'
        indicatorColor="#030303"
        indicatorDots='true'
        autoplay='true'
        current={0}
        >
		{banner.map((imgs,index) => {
		  return  (<SwiperItem key={index}>
			 <Image  src={imgs} mode='widthFix' className='slide-image' />
		  </SwiperItem>)
		})}
      </Swiper>
    )
  }
}
