/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-12-11 22:55:38
 * @version $Id$
 */
import _store from './store'
// cirle 1
new SE.circle({
  width: 650,
  height: 300,
  data: _store.circles._dl2,
  container: '#JcircleType1'

})

// cirle 6
new SE.circle({
  width: 1050,
  height: 300,
  data: _store.circles._dl6,
  container: '#JcircleType2',
  variedConf: {},
  color: ['#db8766', '#dcb364', '#b3c76d', '#acdafd','#4784cb', '#3657e6']
})
