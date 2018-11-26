import Taro, { Component, Config } from '@tarojs/taro'
import { AtTag,AtInput  } from 'taro-ui'


import './MyPage.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion



export default class  MyPage extends Component {

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

  constructor(props) {
    super(props);
    const pageSize = props.pageSize
    const currentPage = props.currentPage
    this.state = {
      pageSize:pageSize,
      currentPage:currentPage
    };
  }

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
  clickEnter(event){
    const value = this.state.currentPage
    const pageSize =  this.state.pageSize
    const keyCode = event.keyCode
    if(keyCode == "13") {
      if (value > pageSize) {
          alert("当前输入页数超过越大页数")
          this.setState({
            currentPage:pageSize
          })
      }else if(value==0) {
        alert("当前输入页数不能为0")
        this.setState({
          currentPage:1
        })
      }

        else {
        console.log(value)
        alert("当前跳转到" + value + "页")
      }

    }


    //console.log(event.keyCode)
    //alert(value)
  }

  render () {

	  const currentPage =  this.state.currentPage
    const pageSize =  this.state.pageSize
	return (
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

    )
  }
}


