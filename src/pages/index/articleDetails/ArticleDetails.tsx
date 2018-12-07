import Taro from '@tarojs/taro'
import { Image ,ScrollView ,View} from '@tarojs/components'
import { AtSearchBar,AtTag ,AtDivider,AtList,AtListItem,AtIcon,AtButton ,AtButton} from 'taro-ui'
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
     //console.log(props._$router.params)
     const contentTitle =  props._$router.params.contentTitle
     let fontSizeStyle = ''
     let fontSizes = ''
     let color = ''
     //console.log(  props._$router.params.currentTab)
     if(!window.localStorage){
       alert("浏览器不支持localstorage");
       return ;
     }else {
       const storage=window.localStorage;
       fontSizeStyle = storage["fontSizeStyle"];
       fontSizes = storage["fontSizes"];
       color = storage["colorStyle"]
     }
     console.log(fontSizeStyle)
     fontSizeStyle =fontSizeStyle?fontSizeStyle:"font-size: 0.6rem;"
     fontSizes = fontSizes?fontSizes:0.6
     color = color?color:'white'
     console.log(fontSizes)
     //获取热搜
     this.state = {
       currentTab:currentTab,
       color:color,
       fontSize:fontSizes,
       fontSizeStyle:fontSizeStyle,
       contentTitle:contentTitle,
       articleContent:[],
       articleTitle:[]
    }
  }
  componentDidMount(){
    let currentTab = this.state.currentTab
    let contentTitle = this.state.contentTitle
    //console.log("============="+currentTab)
    //获取详细内容请求
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/queryArticle',
      data: {
        currentTab:currentTab,
        contentTitle:contentTitle,
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      this.setState({
        articleContent:rest,
        currentTab:currentTab
      })
    })
    //获取推荐文章内容
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/articleTitle',
      data: {
        currentTab:currentTab,
       // contentTitle:contentTitle,
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      this.setState({
        articleTitle:rest.article,

      })
    })
  }
  goBack(url) {
     //console.log(url)
    const currentTab =  this.state.currentTab
    const currentTabs = url  + currentTab
    //console.log("currentTabs   ===== " +currentTabs)
    Taro.navigateTo({url:currentTabs})
  }
  prevArticle(){
    let previd = this.state.articleContent.previd
    let currentTab = this.state.currentTab
    //获取详细内容请求
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/queryArticle',
      data: {
        currentTab:currentTab,
        contentTitle:previd,
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      this.setState({
        articleContent:rest,
        currentTab:currentTab
      })
    })
  }
  nextArticle(){
    let nextid = this.state.articleContent.nextid
    let currentTab = this.state.currentTab
    //获取详细内容请求
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/queryArticle',
      data: {
        currentTab:currentTab,
        contentTitle:nextid,
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      this.setState({
        articleContent:rest,
        currentTab:currentTab
      })
    })
  }
  toArticle(item){
    let currentTab = this.state.currentTab
    //let contentTitle = this.state.contentTitle
    console.log(item)
    //获取详细内容请求
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bfe130e4cb7421a8c76d793/example/queryArticle',
      data: {
        currentTab:currentTab,
        contentTitle:item.articleid,
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      const rest =  res.data
      this.setState({
        articleContent:rest,
        currentTab:currentTab
      })
    })

  }
  whiteCircle(){
     let color ="white"
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return ;
    }else {
      const storage=window.localStorage;
      storage["colorStyle"]=color ;
    }
     this.setState({
       color:color
     })
  }
  redCircle(){
    let color ="green"
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return ;
    }else {
      const storage=window.localStorage;
      storage["colorStyle"]=color ;
    }
    this.setState({
      color:color
    })
  }
  blackCircle(){
    let color ="yellow"
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return ;
    }else {
      const storage=window.localStorage;
      storage["colorStyle"]=color ;
    }
    this.setState({
      color:color
    })
  }
  //加大字体
  addClass(){
      const fontSize =  parseFloat(this.state.fontSize)
     let fontSizes = parseFloat((fontSize +0.1).toFixed(1))
     if(fontSizes > 1) {return}
     const fontSizeStyle = "font-size: " +fontSizes +"rem;"
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return ;
    }else {
      const storage = window.localStorage;
      storage["fontSizeStyle"] = fontSizeStyle;
      storage["fontSizes"] = fontSizes;
    }
      this.setState({
        fontSize:fontSizes,
        fontSizeStyle:fontSizeStyle
      })
  }
  //改小字体
  subtractClass(){
    const fontSize =  this.state.fontSize
    console.log(fontSize)
    let fontSizes = parseFloat((fontSize -0.1).toFixed(1))
    if(fontSizes == 0) {return}
    const fontSizeStyle = "font-size: " +fontSizes +"rem;"
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return ;
    }else {
      const storage = window.localStorage;
      storage["fontSizeStyle"] = fontSizeStyle;
      storage["fontSizes"] = fontSizes;
    }
    this.setState({
      fontSize:fontSizes,
      fontSizeStyle:fontSizeStyle
    })
  }

  render () {
     const falg = 'false'
    return (
      <div className={this.state.color}>
          <View className='articleStyle'>
            <View className='return' onClick={this.goBack.bind(this,'/pages/index/index?current=0&currentTab=')}><AtIcon value='arrow-left' size='30' color='#F00'></AtIcon></View>
            <View className='whiteCircle '  onClick={this.whiteCircle.bind(this)}></View>
            <View className='redCircle ' onClick={this.redCircle.bind(this)}></View>
            <View className='blackCircle ' onClick={this.blackCircle.bind(this)}></View>
            <View className='subtractClass' onClick={this.subtractClass.bind(this)}><AtIcon value='subtract' size='25' color='black'></AtIcon></View>
            <View className='addClass' onClick={this.addClass.bind(this)}><AtIcon value='add' size='25' color='black'></AtIcon></View>

          </View>
        <AtDivider height="50"/>

        <View className='at-article'>
          <View className='at-article__h1' style="text-align:center;">
            {this.state.articleContent.title}
          </View>
          <View className='at-article__info' style="margin-top:2vh;text-align:center;">
            {this.state.articleContent.date}&nbsp;&nbsp;&nbsp;{this.state.articleContent.writer}&nbsp;&nbsp;&nbsp;&nbsp;热度:{this.state.articleContent.heat}
          </View>
          <View className='at-article__content' style="margin-top:3vh;width:85vw;margin-left:6vw; ">
            <View className='at-article__section'>
              <View className='at-article__p' style={this.state.fontSizeStyle}>
                {this.state.articleContent.content}
              </View>
            </View>
          </View>
          <View className='pageStyle'>
            <View className='prevStyle'>
              <AtButton onClick={this.prevArticle.bind(this)}>上一章 :{this.state.articleContent.prevtitle} </AtButton>
            </View>
            <View className='nextStyle'>
              <AtButton  size='normal' onClick={this.nextArticle.bind(this,)}>下一章 : {this.state.articleContent.nexttitle}</AtButton>
            </View>
          </View>
          <View className='recommend'>
                <View className='recommendTitle'>作者推荐</View>
            {this.state.articleTitle.map((item,index) => {
              return ( <View className='recommendContent' onClick={this.toArticle.bind(this,item)}>{item.articleTitle}</View>)
            })}
          </View>
        </View>
      </div>



    )
  }
}


