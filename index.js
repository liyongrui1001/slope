/**
 * 
 * @authors hgcoder (you@example.org)
 * @version $Id$
 */

import G from './src/global'
import circle from './src/shapes/circle'

const SE = {
	G,
	circle
}
if (window.SE) {
	console.warn(`用多个版本SE，或者接口定义冲突， SE${G.Version}版本应用失败！`);
}
if (window && !window.SE) {
	window.SE = SE
}

export default SE