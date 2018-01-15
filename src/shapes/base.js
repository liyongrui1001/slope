/**
 * @authors hgcoder (you@example.org)
 * @version $Id$
 * 图形基类
 */
import _ut from '../utils'
import theme from '../default'
export default class Base {
  defaultConf () {
    return {
      width: '',
      height: '',
      container: ''
    }
  }
  constructor (conf) {
    this.conf = _ut.assign(this.defaultConf(), conf)
    this.dom = document.getElementById(this.conf.container)
    if (!this.conf.width) {
      this.conf.width = this.dom.clientWidth
    } 
    if (!this.conf.height){
      this.conf.height= this.dom.clientHeight
    }
    this.theme = theme
    // this.created()
  }
  created () {
    // 画布位置
    let _this = this
    this.svg = d3.select('#'+this.conf.container)
      .append('svg')
      .attr('width', this.conf.width)
      .attr('height', this.conf.height)
      .append('g')
      .attr('transform', 'translate(' + this.conf.width / 2 + ',' + (this.conf.height) / 2 + ')')
  }
}
