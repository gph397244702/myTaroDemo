import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Image  } from '@tarojs/components'
import { AtSearchBar,AtTag ,AtDivider } from 'taro-ui'


import './Search.scss'

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

   constructor () {
    super(...arguments)
    this.state = {
      value: '',
      tags:['热血高校','火影','指环王','霍比特人','我的兄弟叫顺溜','海贼王','海贼王',],
      histags:[]
    }
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    let histags  = this.state.histags
    const inputVal = this.state.value
    console.log(this.state.value)
    if (inputVal == '') return
    else{
      histags.push(inputVal)
    }
    this.setState({
      histags,
      value:''
    })
  }
 delete(){
     //let histags  = this.state.histags;
     this.setState({
       histags :[]
     })
 }

  onClick(param){
    console.log(param.name)
  }
  render () {
     const falg = 'false'
    return (
      <view>
      <AtSearchBar
        showActionButton
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
        <view className='hotSearch'>
          热搜
        </view>
        {this.state.tags.map((item,index) => {
          const  isOdd = index
          return isOdd < 3 ? (
            (
            <view className='content'>
            <AtTag
              name={item}
              type='primary'
              circle
               active
              onClick={this.onClick.bind(this)}
            >
              {item}
            </AtTag>
          </view>):(<view className='content'>
            <AtTag
              name={item}
              type='primary'
              circle
              onClick={this.onClick.bind(this)}
            >
              {item}
            </AtTag>
          </view>))
        }
        <AtDivider height="50"/>
        <view >
          <view className='historySearch'>
          历史
          <Image  src={require('../../../pic/icon/delete.png')} alt="" className= 'deleteIcon'/>
          </view>
          {this.state.histags.map((item,index) => {
            return (<view className='content'>
              <AtTag
                name={item}
                type='primary'
                circle
                onClick={this.onClick.bind(this)}
              >
                {item}
              </AtTag>
            </view>)
          })}


        </view>

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
