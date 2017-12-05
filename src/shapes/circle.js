/**
 *
 * @authors hgcoder(you@example.org)
 * @version $Id$
 */
/** 全局配置
 * variedConf 饼图变形1
 * color 饼图颜色配置
 */
/**
 * 饼图模版
 * offset 配置说明
 * offset.location(Array) 线起始点位置偏移量
 * offset.inversion(Boolean) 线结束点配置 默认反转位置 600
 * offset.endX(Num) 线结束点位置偏移量 要求inversion值为true
 * offset.textLocation 字体在左右标志
 */

export default class commonArc {
  constructor (props) {
    console.log(d3)
    this._w = props.width
    this._h = props.height
    this.arc2pieData = props.data
    this._box = props.svgBox
    this.color = props.color || ['#acdafd', '#dcb364']
    this.variedConf = props.variedConf
    this.lineConf = props.lineConf
    this.init()
  }
  init () {
    // 画布位置

    let _this = this
    this.svg = d3.select(this._box)
      .append('svg')
      .attr('width', this._w)
      .attr('height', this._h)
      .append('g')
      .attr('transform', 'translate(' + this._w / 2 + ',' + (this._h + 50) / 2 + ')')

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
    var arc1 = setArc(0, (this._h - 60) / 2)
    this.svg
      .append('g')
      .append('path')
      .attr('d', arc1)
      .attr('stroke', '#fff')
      .attr('stroke-width', '2')
      .attr('fill', 'none')
    for (let i = 0; i < this.arc2pieData.length; i++) {
      // 饼图圆心定义
      let originX = (this._h - (225 + (i - 1) * 125)) / 2
      let originY = (this._h - (260 + (i - 1) * 125)) / 2
      let arc2 = d3.arc().innerRadius(originX).outerRadius(originY)

      // 饼图数据
      let arc2Pie = d3.pie().value(item => {
        return item.value
      })(this.arc2pieData[i])
      let arc2GBox = this.svg.append('g').attr('class', 'arc2GBox')

      // 线路径设置
      let canvas = d3.path()
      // 饼图绘制
      arc2GBox
        .selectAll('.arc2Path')
        .data(arc2Pie)
        .enter()
        .append('path')
        .classed('arc2Path', true)
        .attr('d', arc2)
        .attr('stroke', 'none')
        .attr('fill', (d) => {
          return this.color[d.data.index]
        })
      if (!_this.variedConf) {
        arc2Pie.map((item, index) => {
          let c = arc2.centroid(item) // 线开始点
          // 线
          let endX = 0
          let endY = 0
          let addProperty = item.data
          const drawPath = (context) => {
            if (addProperty.offset) {
              if (addProperty.offset.location) {
                // 重置线的起点位置
                c[0] += addProperty.offset.location[0]
                c[1] += addProperty.offset.location[1]
              }
            }
            // 根据配置设置线结束点
            // 反转线位置
            endX = c[0] - 150
            endY = c[1]
            if (addProperty.offset && addProperty.offset.inversion) {
              endX += (addProperty.offset.endX || 500)
            }
            context.moveTo(c[0], c[1])
            // 设置线转折点
            if (addProperty.offset && addProperty.offset.lineToPointer) {
              context.lineTo(c[0] + addProperty.offset.lineToPointer[0], c[1] + addProperty.offset.lineToPointer[1])
              endY += addProperty.offset.lineToPointer[1]
            }
            context.lineTo(endX, endY)
          }
          drawPath(canvas)
          arc2GBox.append('path')
            .attr('d', canvas.toString())
            .attr('stroke-width', '1px')
            .attr('stroke', '#95c6ed')
            .attr('fill', 'none')
            // 点
          arc2GBox.append('circle')
            .attr('cx', endX)
            .attr('cy', endY)
            .attr('r', 5)
            .attr('fill', '#95c6ed')
            // 文案
          let textOffset = 0
          if (addProperty.offset && addProperty.offset.textLocation === 'right') {
            // textOffset = ( endX+addProperty.offset.endX || endX) + 95;
            textOffset = endX + 95
          } else {
            textOffset = endX
          }
          arc2GBox.append('text')
            .attr('transform', function () {
              return 'translate(' + (textOffset) + ',' + endY + ')'
            })
            .html(function () {
              return '<tspan font-size="20" x=-80 y=5 fill="#95c6ed">' + item.data.time.substring(0, 4) + '</tspan>' + '<tspan x=-80 y=30  font-size="20">' + (item.data.name || item.data.areaName) + ' ' + item.data.ratio + item.data.unitName + '</tspan>'
            })
            .attr('font-size', 30)
            .attr('fill', '#fff')
            .attr('box-raduis', '3px')
        })
      } else {
        arc2Pie.map((item, index) => {
          let _offsetX = _this.variedConf.offsetX
          if (item.data.time === 2016) {
            _offsetX -= 750 // 左右区域间距
          }
          arc2GBox.append('g')
            .attr('transform', function () {
              return 'translate(10, -160)'
            })
            .append('text')
            .attr('transform', function () {
              return 'translate(' + _offsetX + ',' + _this.variedConf.offsetY * -index + ')'
            })
            .html(function () {
              if (index === 0) {
                return '<tspan font-size="30" x=-80 y=-30 fill="#95c6ed">' + item.data.time + '</tspan>' + '<tspan x=-80 y=30  font-size="20">' + (item.data.name || item.data.areaName) + ' ' + item.data.ratio + item.data.unitName + '</tspan>'
              } else {
                return '<tspan font-size="30" x=-80 y=5 fill="#95c6ed"></tspan>' + '<tspan x=-80 y=30  font-size="20">' + (item.data.name || item.data.areaName) + ' ' + item.data.ratio + item.data.unitName + '</tspan>'
              }
            })
            .attr('font-size', 30)
            .attr('fill', '#fff')
            .attr('box-raduis', '3px')
        })
        if (_this.lineConf && _this.lineConf instanceof Array) {
          for (var h = 0; h < _this.lineConf.length; h++) {
            const drawPath = (context) => {
              context.moveTo(_this.lineConf[i].sLocation[0], _this.lineConf[i].sLocation[1])
              context.lineTo(_this.lineConf[i].lineToPointer[0], _this.lineConf[i].lineToPointer[1])
              context.lineTo(_this.lineConf[i].eLocation[0], _this.lineConf[i].eLocation[1])
            }
            drawPath(canvas)
            arc2GBox.append('path')
              .attr('d', canvas.toString())
              .attr('stroke-width', '1px')
              .attr('stroke', '#95c6ed')
              .attr('fill', 'none')
          }
        }
      }
    }
    // 区域提示
    let tipX = (this._w - 20) / -2
    let tipY = (this._h - 30) / -2
    if (_this.variedConf) {
      tipY = tipY + 65
    }
    let arcTip = this.svg.append('g').attr('transform', () => {
      return 'translate(' + tipX + ',' + tipY + ')'
    })
    if (!_this.arc2pieData[0]) {
      return
    }
    arcTip.append('g')
      .attr('transform', function (d, i) {
        return 'translate(0,2)' // rect 位置偏移
      })
      .selectAll('.tip-rect')
      .data(this.arc2pieData[0])
      .enter()
      .append('rect')
      .classed('.tip-rect', true)
      .attr('x', 0)
      .attr('y', function (d) {
        return (d.index) * 36
      })
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', (d) => {
        return this.color[d.index]
      })

    arcTip.append('g')
      .attr('transform', function (d, i) {
        return 'translate(0,18)' // 字位置偏移
      })
      .selectAll('.tip-text')
      .data(this.arc2pieData[0])
      .enter()
      .append('text')
      .attr('transform', (d, i) => {
        return 'translate(25,' + i * 36 + ')' // 字和rect之间的偏移
      })
      .html((d) => {
        let _y = d.index + 1
        return '<tspan font-size="18">' + (d.name || d.areaName) + '</tpan>'
      })
      .attr('fill', '#fff')

    //  弧线
    let arc3 = setArc(0, (this._h - 180) / 2)
    this.svg
      .append('g')
      .append('path')
      .attr('d', arc3)
      .attr('stroke', '#fff')
      .attr('stroke-width', '2')
      .attr('fill', 'none')
  }
}
