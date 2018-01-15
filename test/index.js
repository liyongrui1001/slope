/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-12-11 22:55:38
 * @version $Id$
 */
import _store from './store'
// 
new SE.circle({

	// data: _store.circles._dl2,
	container: 'JcircleType1'

})
new SE.circle({

	// data: _store.circles._dl2,
	container: 'JcircleType2',
	conf:[
		[{
			r: [43, 122],
			
			opacity: '0',
			strokeWidth: '2',
			strokeColor: '#fff'
		}], [{
			r: [72, 90], // 饼图内外半径
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

})