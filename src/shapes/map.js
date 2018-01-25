/**
 * 
 * @authors huxiao (you@example.org)
 * @version $Id$
 */
import Base from './base'
export default class map extends Base {
	constructor(props) {
		super(props)
		this.mapUrl = props.mapUrl || ''
		this.init()
	}
	init() {
		const This = this
		// 1、定义投影方式 
		this.project = d3.geoMercator()
			.center([119, 33])
			.scale(10660) // 地图缩放
			.translate([this.w / 2, this.h / 2])
		// 2、定义地理路径生成器
		this.path = d3.geoPath(This.project)

		d3.json(this.mapUrl, (error,root) => {
			if (error) {
				return console.error(error)
			}
			this.svg.append('g')
				.attr('id', 'mapG')
				.selectAll('_mPath')
				.data(root.features)
				.enter()
				.append('path')
				.attr('class', '_mPath')
				.attr('stroke', '#ff0000')
        .attr('stroke-width', 2)
        .attr('d', This.path)
        .attr('fill', function (d) {
        	let a = d3.rgb(0,255,255)
          let b = d3.rgb(0,0,255)
          let computeColor = d3.interpolate(a,b);
          return computeColor(Math.random()).toString()
        })
		})
	}

}