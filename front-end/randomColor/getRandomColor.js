function getRandomColor(option){
	// 重复字符串 ('abcd',2) => 'aabbccdd'
	function repeatStr(str,num){
		var arr = str.split('');
		return arr.reduce(function(a,b){
			return a + Array(num+1).join(b);
		},'')
	}

	// 转换成HEX的形式(#ffff00)
	// 支持 rgb => HEX , HEX => HEX , colorname => HEX;
	function toHEX(str){
		str = str.toString().replace(' ','');
		if(/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/i.test(str)){
			return str.match(/\d+/g).reduce(function(a,b){
                var s = parseInt(b).toString(16);
				return a + (s.length === 1?'0'+s:s);
			},'#')
		}

		for(var n in STRCOLOR){
			if(n === str){
				str = STRCOLOR[n];
				break;
			}
		}

		if(str.charAt(0) === '#'){
			if(/^#[\d | a-f]{3}$/i.test(str))
				return '#' + repeatStr(str.slice(1),2);
			if(!/^#[\d | a-f]{6}$/i.test(str)){
				throw new Error('wrong option params: HEX color is wrong.')
			}
			return str;
		}
		throw new Error('wrong option params: range color is wrong.')
	}

	// 十进制数字转换成HEX格式的颜色 (15) => '#00000f'
	function numToHEX(num){
		var str = num.toString(16),
			len = str.length;
		return '#' + Array(6-len+1).join('0') + str;
	}

	// 常用的颜色名词
	var STRCOLOR = {
		aqua: '#0ff',
		black: '#000',
		blue: '#00f',
		fuchsia: '#f0f',
		gray: '#808080',
		green: '#008000',
		lime: '#0f0',
		maroon: '#800000',
		navy: '#000080',
		olive: '#808000',
		purple: '#800080',
		red: '#f00',
		silver: '#c0c0c0',
		teal: '#008080',
		white: '#fff',
		yellow: '#ff0'
	}

	var opt = {
		type: option && option.type ? option.type : 'HEX',
		range: option && option.range ? option.range : [['#000','#fff']],
	}, rangeData = [];
	
	if (Object.prototype.toString.call(opt.range) !== '[object Array]'){
		return new Error('wrong option params: range type must be array.')
	}

	for(var t = 0, i = 0, len = opt.range.length; i < len; ++i, ++t){
		var e = opt.range[i];
		if(Object.prototype.toString.call(e) === '[object Array]'){
			var a = parseInt(toHEX(e[0]).slice(1),16),
				b = parseInt(toHEX(e[1]).slice(1),16),
				change = void 0;
			if( a > b ){ change = a, a = b, b = change; }
			rangeData.push( t, a, b-a+t, b);
			t = b - a + t;
		}else{
			rangeData.push(t,parseInt(toHEX(e).slice(1),16))
		}
	}

	var random = Math.floor(Math.random() * (rangeData[rangeData.length - 2] + 1)),
		gap = void 0;
	for(var i = 0, len = rangeData.length; i < len; i=i+2){
		if(rangeData[i] === random){
			gap = rangeData[i+1];
			break;
		}
		if(rangeData[i] > random){
			gap = random - rangeData[i-2] + rangeData[i-1];
			break;
		}
	}

	switch(opt.type.toUpperCase()){
		case 'RGB':
			var str = numToHEX(gap).slice(1).match(/\S{2}/g).map(function(e){
				return parseInt(e,16);
			}).join(',');
			return 'rgb(' + str + ')';
		case 'HEX':
		default:
			return numToHEX(gap);
	}

}