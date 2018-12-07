import Taro, { Component, Config } from '@tarojs/taro'
import { AtTag,AtInput  } from 'taro-ui'
import { View  } from '@tarojs/components'

import './PageModule.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

export default class  PageModule extends Component {

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

  constructor(propss) {
    super(propss);
    console.log(this.props)
    this.state = {
      pageSize:"",
      currentPage:this.props.currentPage
    };
  }
  //点击标签栏出发的事件
  handleChange(value1){
    this.setState({
      currentPage: value1
    })
  }
  //回到首页
  pageleftOne(){
    this.props.onChanges(1)
    this.setState({
      currentPage: 1
    })
  }
  //回到上一页
  pageleft(){
   const currentPage =  this.state.currentPage
    if(currentPage <=1) return
    this.props.onChanges(currentPage-1)
    this.setState({
      currentPage: currentPage-1
    })
  }
  //进入下一页
  pageRight(){
    const currentPage =  this.state.currentPage
    const pageSize =  this.props.pageSize
    if(currentPage >=pageSize) return
    this.props.onChanges(currentPage+1)
    this.setState({
      currentPage: currentPage+1
    })
  }
  //进入尾页
  pageRightLast(){
    const pageSize = this.props.pageSize
    this.props.onChanges(pageSize)
    this.setState({
      currentPage: pageSize
    })
  }

  clickEnter(event){
      //console.log(event.detail)
    //const inputValue = event.detail.value
    const value = this.state.currentPage
    const pageSize =  this.props.pageSize
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
          currentPage: 1
        })
      } else {
        this.props.onChanges(value)
        alert("当前跳转到" + value + "页")
      }

    }
  }

  render () {
      //console.log("father============" +this.props.pageSize)
	  const currentPage =  this.state.currentPage
    const pageSize =  this.props.pageSize
	  return (
				<View className='pageBox'>
          <View className = 'pageleftOne'>
            {currentPage ==1 ?
            <AtTag
           name='|<'
           type='primary'
           active
         >
           {'|<'}
         </AtTag> :
              <AtTag
              name='|<'
              type='primary'
              onClick={this.pageleftOne.bind(this)}
              >
              {'|<'}
              </AtTag>}
       </View>
       <View className = 'pageleft'>
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
       </View >
          <View className="inputValue" onkeydown ={this.clickEnter.bind(this)}>
          <AtInput
            className="enterPage"
            name='value2'
            type='number'
            placeholder='请输入数字'
            value={currentPage}
            onChange={this.handleChange.bind(this)}
          />
          </View>
          <View >
              <AtTag
                name={pageSize}
                type='primary'
              >
                {pageSize}
              </AtTag>
          </View>
       <View className = 'pageRight'>
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
       </View>
       <View className = 'pageRightLast'>
         {currentPage == pageSize ?
         <AtTag
           name='>|'
           type='primary'
            active
         >
           {'>|'}
         </AtTag>:
           <AtTag
             name='>|'
             type='primary'

             onClick={this.pageRightLast.bind(this)}
           >
             {'>|'}
           </AtTag>}
       </View>
        </View>
    )
  }
}


