/**
 *
 * @authors hgcoder(you@example.org)
 * @version $Id$
 */
/** 全局配置
 * variedConf 饼图变形1
 * color 饼图颜色配置
 */

/**全局配置详情 
 * arcRadius 圆弧半径 []
 * variedConf pie 图形变形1
 * color pie图形颜色配置 Array [,,,,]
 * pieData pie图形数据用于生成pie 图形大小
 * arcR 
 * offset 配置说明
 * offset.endX(Num) 线结束点位置偏移量
 */
import Base from './base'
export default class commonArc extends Base {
  constructor(props) {
    super(props)
    this.pieData = props.data 
    || [
      [{
        value: 1,
        index: 0
      }],
      [{
        value: 3,
        index: 0,


      }, {
        value: 9,
        index: 1,

      }]
    ]
    this.pieConfig = props.conf 
    || [
      [{
        r: [43, 122],
        color: '#ff8960',
        opacity: '0.26',
        strokeWidth: '2',
        strokeColor: '#fff'
      }],
      [{
        r: [60, 100], // 饼图内外半径
        strokeWidth: '2',
        strokeColor: '#000',
        lineConf: {
          pointer: [{
            x: -300,
            y: 0
          }]
        }

      }, {
        r: [72, 90],
        lineConf: {
          centerOffset: [0, 0], // 线起点位置偏移
          pointer: [{
            x: -300,
            y: 0
          }]
        }
      }]
    ]
    this.color = props.color || ['#f8f7cc', '#ff8960']
    this.variedConf = props.variedConf

    this.arcRadius = [] //  弧线半径
    this.showLegend = false || props.showLegend
    this.name = props.name
    this.init()
  }
  init() {
    // 画布位置以外层div的中心点为坐标，暂不支持位置偏移 后续扩展
    let This = this;

    /**
     * 节点配置信息和数据信息整合
     * @param  {[type]} var i             [description]
     * @return {[type]}     [description]
     */
    for (var i = 0; i < This.pieData.length; i++) {
      This.pieData[i].map((item, index) => {
        This.pieData[i][index] = Object.assign(This.pieData[i][index], This.pieConfig[i][index])
      })
    } 

    This.svg = d3.select('#'+this.conf.container)
      .append('svg')
      .attr('width', this.conf.width)
      .attr('height', this.conf.height)
      .append('g')
      .attr('transform', 'translate(' + this.conf.width / 2 + ',' + this.conf.height / 2 + ')')

    // 弧线制作
    if (this.arcRadius && this.arcRadius.length) {
      // arc 生成器 
      const setArc = (innerR, outerR) => {
        var value = d3.arc()
          .innerRadius(innerR)
          .outerRadius(outerR)
          .startAngle(0)
          .endAngle(2 * Math.PI)
        return value
      }
      //  最外层弧线
      for (var i = 0; i < this.arcRadius.length; i++) {
        var arc = setArc(0, this.arcRadius[i])
        This.svg
          .append('g')
          .classed('_arcPath', true)
          .append('path')
          .attr('d', arc)
          .attr('stroke', '#fff')
          .attr('stroke-width', '2')
          .attr('fill', 'none')
        arc = null
      }
    }

    /**
     * 饼图绘制流程
     */
    for (var i = 0; i < this.pieData.length; i++) {
      // 饼图半径
      // pieData[i]
      let arcDefine = d3.arc()
        .innerRadius(function (d) {
          return d.data.r[0]
        })
        .outerRadius(function (d) {
          return d.data.r[1]
        })
        .padAngle(0.05)

      //饼图数据 
      let pieDealData = d3.pie()
        .value(item => {
          return item.value
        })(This.pieData[i]) // 每个环（内环 || 外环）的数据的 This.pieData 是个数组
      let pieBox = this.svg.append('g').attr('class', 'pieBox')


      // 饼图绘制
      pieBox
        .selectAll('._pie')
        .data(pieDealData)
        .enter()
        .append('path')
        .classed('_pie', true)
        .attr('d', function (d) {
          return arcDefine(d)
        })
        .attr('stroke', function (d) {
          if (d.data.strokeColor) {
            return d.data.strokeColor
          } else {
            return 'none'
          }
        })
        .attr('stroke-width', function (d) {
          // 可配置 边框
          if (d.data.strokeWidth) {
            return d.data.strokeWidth
          } else {
            return 0
          }
        })
        .attr('fill', (d) => {
          if (d.data.color) {
            return d.data.color
          }
          return this.color[d.data.index]
        })
        .attr('fill-opacity', function (d) {
          // 可配置透明度
          if (d.data.opacity) {
            return d.data.opacity
          } else {
            return '1'
          }
        })

      /**
       * 指示线的绘制流程
       * @param  {[type]} 
       * @return {[type]}     [description]
       */
      pieDealData.map((item, index) => {
        if (item.data.lineConf) {
          // 定义线
          let canvas = d3.path();
          // 线起点
          var c = arcDefine.centroid(item)
          var circleOrigin = [] // 圆心坐标
          // 绘制线方法

          const drawPath = (context) => {
            var startX = c[0] // 点起点横坐标
            var startY = c[1] // 点起点纵坐标
            var co = item.data.lineConf.centerOffset || []
            if (co &&
              co instanceof Array &&
              co.length > 1) {
              /**
               * 设置线起点位置
               * @type {[type]}
               */
              startX = c[0] - co[0]
              startY = c[1] - co[1]
            }
            context.moveTo(startX, startY)
            // 支持折线
            var pList = item.data.lineConf.pointer
            if (pList &&
              pList instanceof Array &&
              pList.length > 1) {
              for (var h = 0; h < pList.length; h++) {
                context.lineTo(pList[h].x, pList[h].y)
              }
              circleOrigin = [plist[pList.length - 1].x, plist[pList.length - 1].y] //设置圆起点
            } else {
              //直线 当线为直线的时候y坐标为线起点的y坐标
              context.lineTo(pList[0].x, startY)
              circleOrigin = [pList[0].x, startY] //设置圆起点
            }

          }
          // 绘制
          drawPath(canvas)
          // 添加线
          pieBox.append('path')
            .attr('d', canvas.toString())
            .attr('stroke-width', '1px')
            .attr('stroke', '#eeeeef')
            .attr('fill', 'none')

          // 指引线后圆的绘制
          pieBox.append('circle')
            .attr('cx', circleOrigin[0])
            .attr('cy', circleOrigin[1])
            .attr('r', 5)
            .attr('fill', '#fff')

          // 指引线后的文字绘制

         pieBox.append('text')
           .attr('transform', function () {
             return 'translate(' + circleOrigin[0] + ',' + circleOrigin[1] + ')'
           })
           .html(function (d) {

             return '<tspan x=-86 y=-10 fill="#45bae0">江苏</tspan><tspan x=-94 y=35>家具：30%</tspan>'
           })
           .attr('font-size', 26)
           .attr('fill', '#fff')
        
        }
      })
    }

    if (this.showLegend) {
      /**
       * legend 的绘制流程
       * [text_rect description]
       * @type {[type]}
       */
      let _offsetX = This.variedConf[i] ? This.variedConf[i].offsetX :
        This.variedConf[0].offsetX

      let _offsetY = This.variedConf[i] ? This.variedConf[i].offsetY :
        This.variedConf[0].offsetY //tip 文字上线及左右间距
      // tip 文字及 rect容器
      var text_rect = pieBox.append('g')
        .attr("transform", function () {
          return 'translate(' + _offsetX + ',' + _offsetY + ')'
        })
      pieDealData.map((item, index) => {
        text_rect
          .append('text')
          // 设置文字及react位置提示
          .attr("transform", function () {
            // if(index == 0){
            //   return 'translate(35,'+index*36+20+')'
            // }
            return 'translate(30,' + (index * 36 + 16) + ')' // 35为提示位置与rect边距
          })
          .html(function () {
            if (index == 0) {
              return '<tspan font-size="30" x=0 y=-50 fill="#95c6ed">' + item.data.time.slice(0, 4) +
                '</tspan>' +
                '<tspan x=0 y=0  font-size="22">' + (item.data.name || item.data.areaName) + ' ' +
                item.data.ratio + item.data.unitName + '</tspan>'
            } else {
              return '<tspan font-size="30" x=0 y=0 fill="#95c6ed"></tspan>' +
                '<tspan x=0 y=0  font-size="22">' + (item.data.name || item.data.areaName) +
                ' ' + item.data.ratio + item.data.unitName + '</tspan>'
            }
          })
          .attr("font-size", 30)
          .attr("fill", "#b8c3c3")
          .attr('box-raduis', "3px")
      })
      text_rect
        .selectAll('.tip-rect' + i)
        .data(this.pieData[0])
        .enter()
        .append('rect')
        .classed('.tip-rect' + i, true)
        .attr('x', 0) // 35差是react 和文字之间的距离
        .attr('y', function (d) {
          return (d.index) * 36 // tip 图标上下位置设置
        })
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', (d) => {
          return this.color[d.index]
        })
    }

  }
}
