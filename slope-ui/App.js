/**
 * 
 * @authors huxiao (you@example.org)
 * @date    2018-01-22 15:59:06
 * @version $Id$
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Button, 
	List,
	Layout,
	Menu,
	Breadcrumb,
	Icon,
	Row,
	Col} from 'antd' 
import './components/index.less'
const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu
class App extends Component {
  render() {
    return (
	   	<div className="page">
	   	  <Layout>
		    <Header className="header">
		      <div className="logo">
		      	 <span className="mr10">slope.js</span>		
		      	 <span>数据可视化类库</span>		
		      </div>
		    </Header>
		
		    <Content style={{padding: 0, marginTop: '20px', minHeight: 280 }}>
		        <Row>
			      <Col span={12} className="mainList">
			      	<div className="circle-item" id="JcircleType1">
							</div>
			      </Col>
			      <Col span={12} className="mainList">
			      	<div className="circle-item" id="JcircleType2">
							</div>
			      </Col>
			      <Col span={12} className="mainList">
			      	<div className="circle-item" id="JcircleType3">
							</div>
			      </Col>
			      <Col span={12} className="mainList">
			      	<div className="circle-item" id="JcircleType4">
							</div>
			      </Col>
			    </Row>
		    </Content>
  		  </Layout>
	    </div>
    )
  }
  componentDidMount() {
  	new SE.circle({
			container: 'JcircleType1',
			data:[
        [{
          name: '',
          value: 1,
          index: 0
        }],
        [{
          value: 3,
          index: 0,
          name: '江苏',
					type: '家具',
					ratio: '30%',
					unit: '%'

        }, {
          value: 9,
          index: 1,
          name: '全国',
					type: '家具',
					ratio: '70',
					unit: '%'
        }]
      ],
      conf: [
        [{
          r: [50, 105],
          color: '#ff8960',
          opacity: '0.36',
          strokeWidth: '2',
          strokeColor: '#fff'
        }],
        [{
          r: [65, 90], // 饼图内外半径
          strokeWidth: '1',
          strokeColor: '#000',
          lineConf: {
            pointer: [{
              x: -130,
              y: 0
            }]
          },
          padAngle: 0.1
        }, {
          r: [70, 85],
          lineConf: {
            centerOffset: [50, -20], // 线起点位置偏移
            pointer: [{
              x: -140,
              y: 0
            }]
          }
        }]
      ],
      gOffset: [-100, 0]
		})
		new SE.circle({
			container: 'JcircleType2',
			data: [
				[{
					value: 1,
					index: 0
				}],
				[{
					value: 3,
					index: 0,
					name: '江苏',
					type: '家具',
					ratio: '30',
					unit: '%'
				}, {
					value: 9,
					index: 1,
					name: '江苏',
					type: '汽车类',
					ratio: '30',
					unit: '%'
				}],
				[{
					value: 5,
					index: 0,
					name: '全国',
					type: '家具',
					ratio: '30',
					unit: '%'
				}, {
					value: 9,
					index: 1,
					name: '全国',
					type: '汽车类',
					ratio: '30',
					unit: '%'
				}]
			],
			conf: [
				[{
					r: [55, 100],
					opacity: '0',
					strokeWidth: '1',
					strokeColor: '#fff'
				}],
				[{
					r: [70, 85], // 饼图内外半径
					lineConf: {
						pointer: [{
							x: -130,
							y: 0
						}]
					}

				}, {
					r: [70, 85],
					lineConf: {
						centerOffset: [110, 0], // 线起点位置偏移
						pointer: [{
							x: -130,
							y: 0
						}]
					}
				}],
				[{
					r: [25, 40], // 饼图内外半径
					lineConf: {
						pointer: [{
							x: 20,
							y: -90
						}, {
							x: 100,
							y: -90
						}]
					}

				}, {
					r: [25, 40],
					lineConf: {
						pointer: [{
							x: 105,
							y: 0
						}]
					}
				}]
			]
		})
		new SE.circle({
			container: 'JcircleType3',
			data: [
				[{
					value: 1,
					index: 0
				}],
				[{
					value: 3,
					name: '家具',
					unit:'%',
					ratio: '30%',
					area: '江苏',
					index: 0,
				}, {
					value: 5,
					index: 1,
					unit:'%',
					ratio: '70%',
					name: '汽车类',
					area: '江苏',
				}, {
					value: 8,
					index: 2,
					unit:'%',
					ratio: '70%',
					name: '粮油、食品',
					area: '江苏',
				}, {
					value: 9,
					index: 3,
					unit:'%',
					ratio: '70%',
					name: '住宿和餐饮业',
					area: '江苏',
				}, {
					value: 10,
					index: 4,
					unit:'%',
					ratio: '70%',
					name: '住宿和餐饮业',
					area: '江苏',
				}],
				[{
					value: 3,
					name: '家具',
					unit:'%',
					ratio: '30%',
					area: '全国',
					index: 0,
				}, {
					value: 5,
					index: 1,
					unit:'%',
					ratio: '70%',
					name: '汽车类',
					area: '全国',
				}, {
					value: 8,
					index: 2,
					unit:'%',
					ratio: '70%',
					name: '粮油、食品',
					area: '全国',
				}, {
					value: 9,
					index: 3,
					unit:'%',
					ratio: '70%',
					name: '住宿和餐饮业',
					area: '全国',
				}, {
					value: 10,
					index: 4,
					ratio: '70%',
					name: '住宿和餐饮业',
					area: '全国',
				}],
			],
			conf: [
				[{
					r: [55, 100],
					opacity: '0',
					strokeWidth: '2`',
					strokeColor: '#fff'
				}],
				[{
					r: [70, 85], // 饼图内外半径
					lineConf: {
						type: 'lineType1',
						centerOffset: [55, -60],
						pointer: [{
							x: -120,
							y: -110
						}, {
							x: -260,
							y: -110
						}]
					}

				}, {
					r: [70, 85]
				}, {
					r: [70, 85]
				}, {
					r: [70, 85]
				}, {
					r: [70, 85]
				}],
				[{
					r: [25, 40], // 饼图内外半径
					lineConf: {
						type: 'lineType1',
						centerOffset: [-40, -20],
						pointer: [{
							x: 70,
							y: -110
						}, {
							x: 270,
							y: -110
						}]
					}

				}, {
					r: [25, 40]
				}, {
					r: [25, 40]
				}, {
					r: [25, 40]
				}, {
					r: [25, 40]
				}]
			],
			color: ['#db8766', '#3657e6', '#b3c76d', '#acdafd', '#4784cb', ],
		})
  }
} 

// class App1 extends Component {
//   constructor (props) {
//   	super(props)
//   	this.state = {
//   		solders:['1', '2', '4', '6']
//   	}
//   	// this.add = this.add.bind(this)
//   }
//   add = () => {
//   	this.setState({
//   		solders: [...this.state.solders, 'nenw'+Math.random()]
//   	})
//   }
//   render() {
//   	return (
//   	  <div className="setColor">
//   	  	<List>
//   	  		{this.state.solders.map(index=>{
// 	  	  		return <List.Item key={index}>{index}</List.Item>
// 	  	  	})}
//   	  	</List>
  	  	
//   	  	<Button type="primary" onClick={this.add}>添加</Button>
//   	  </div>
//   	)
//   }
// }
// function App2(props) {
// 	return <div> hello world {props.name}</div>
// }
ReactDOM.render(<App />, document.getElementById('charts'))
