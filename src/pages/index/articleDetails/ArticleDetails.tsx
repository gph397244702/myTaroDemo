import Taro from '@tarojs/taro'
import { Image ,ScrollView } from '@tarojs/components'
import { AtSearchBar,AtTag ,AtDivider,AtList,AtListItem,AtIcon} from 'taro-ui'
import './ArticleDetails.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

export default  class ArticleDetails extends Taro.Component {

   constructor (props) {
     super(props)
     const currentTab =  props._$router.params.currentTab
     //console.log(  props._$router.params.currentTab)
     //获取热搜
     this.state = {
       currentTab:currentTab,
       color:"white",
       fontSize:0.59733,
       fontSizeStyle:"font-size: 0.6rem;"
    }
  }

  goBack(url) {
     //console.log(url)
    const currentTab =  this.state.currentTab
    const currentTabs = url  + currentTab
    //console.log("currentTabs   ===== " +currentTabs)
    Taro.navigateTo({url:currentTabs})
  }
  onPrev(){}
  onNext(){}
  whiteCircle(){
     this.setState({
       color:"white"
     })
  }
  redCircle(){
    this.setState({
      color:"green"
    })
  }
  blackCircle(){
    this.setState({
      color:"yellow"
    })
  }
  //加大字体
  addClass(){
      const fontSize =  this.state.fontSize
     let fontSizes = parseFloat((fontSize +0.1).toFixed(1))
     if(fontSizes > 1) {return}
     const fontSizeStyle = "font-size: " +fontSizes +"rem;"
      this.setState({
        fontSize:fontSizes,
        fontSizeStyle:fontSizeStyle
      })
  }
  //改小字体
  subtractClass(){
    const fontSize =  this.state.fontSize
    let fontSizes = parseFloat((fontSize -0.1).toFixed(1))
    if(fontSizes == 0.1) {return}
    const fontSizeStyle = "font-size: " +fontSizes +"rem;"
    this.setState({
      fontSize:fontSizes,
      fontSizeStyle:fontSizeStyle
    })
  }

  render () {
     const falg = 'false'
    return (
      <div className={this.state.color}>
          <view className='articleStyle'>
            <view className='return' onClick={this.goBack.bind(this,'/pages/index/index?current=0&currentTab=')}><AtIcon value='arrow-left' size='30' color='#F00'></AtIcon></view>
            <view className='whiteCircle '  onClick={this.whiteCircle.bind(this)}></view>
            <view className='redCircle ' onClick={this.redCircle.bind(this)}></view>
            <view className='blackCircle ' onClick={this.blackCircle.bind(this)}></view>
            <view className='subtractClass' onClick={this.subtractClass.bind(this)}><AtIcon value='subtract' size='25' color='black'></AtIcon></view>
            <view className='addClass' onClick={this.addClass.bind(this)}><AtIcon value='add' size='25' color='black'></AtIcon></view>

          </view>
        <AtDivider height="50"/>

        <view className='at-article' style='display: grid;'>
          <view className='at-article__h1' style="text-align:center;">
            金哲宏案改判无罪
          </view>
          <view className='at-article__info' style="margin-top:2vh;text-align:center;">
            2018-11-30&nbsp;&nbsp;&nbsp;弘哥&nbsp;&nbsp;&nbsp;&nbsp;热度:325
          </view>
          <view className='at-article__content' style="margin-top:3vh;width:85vw;margin-left:6vw; ">
            <view className='at-article__section'>
              <view className='at-article__p' style={this.state.fontSizeStyle}>
                金哲宏家属和辩护律师在法院门口
                封面新闻消息，11月30日上午，封面新闻记者获悉，吉林省高级人民法院再审宣判金哲宏一案，金哲宏无罪释放。
                宣判认为，原判事实不清，证据不足，无罪释放。审判长告诉金哲宏，可以申请国家赔偿。
                1995年，吉林省永吉县一名20岁的少女遇害，金哲宏被锁定为杀人嫌犯，后4次被判处死缓，在监狱服刑至今。金哲宏案经历了3次一审，2次发回重审，4次被判死缓。
                原标题：吉林金哲宏入狱23年4次被判死缓 今日再审宣判无罪
              </view>
            </view>
          </view>
          <view className='pageStyle'>
            <view  style="margin-left:24vw">
              <AtTag
              name='上一章'
              type='primary'
              circle
              onClick={this.onPrev.bind(this)}
            >
                上一章
            </AtTag></view>
            <view style="margin-left:10vw">
              <AtTag
                name='下一章'
                type='primary'
                circle
                onClick={this.onNext.bind(this)}
              >
                下一章
              </AtTag>
            </view>
          </view>
          <view className='recommend'>
              <view className='recommendTitle'>作者推荐</view>
                <view className='recommendContent'>作dsfsd 荐</view>
                <view className='recommendContent'>作者推荐胜多负少</view>
                <view className='recommendContent'>作者推荐111111</view>
                <view className='recommendContent'>作dsfsd 荐11111111</view>
                <view className='recommendContent'>作者推荐1111111</view>
                <view className='recommendContent'>作者推荐1111111</view>
          </view>
        </view>


      </div>



    )
  }
}


