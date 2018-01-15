/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-01-14 22:43:50
 * @version $Id$
 */
import Base from './base'
export default class map extends Base {
	constructor (props) {
		super(props)
		this.mapUrl = props.mapUrl || ''
	}
	init () {
		d3.json(this.mapUrl, (d)=>{
			
		})
	}

}