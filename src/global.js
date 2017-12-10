/**
 * @authors hgcoder (you@example.org)
 * @version $Id$
 */

import Circle from './shapes/circle'
export default class {
  constructor () {
    new Circle({
      width: 400,
      height: 300,
      data: [
      	[{
      		index: 0,
      		time: '2017-08-08',
      		areaName: '南京',
      		unitName: '元',
      		ratio: '20',
      		value: '30'
      	},
      	{
      		index: 1,
      		time: '2017-08-08',
      		areaName: '南京',
      		unitName: '元',
      		ratio: '20',
      		value: '32'
      	}],
      	[{
      		index: 0,
      		time: '2017-08-09',
      		areaName: '北京',
      		unitName: '元',
      		ratio: '40',
      		value: '70'
      	},
      	{
      		index: 1,
      		time: '2017-08-08',
      		areaName: '南京',
      		unitName: '元',
      		ratio: '20',
      		value: '33'
      	}]
      ],
      container: '#JcircleType1'
    })
  }
}
