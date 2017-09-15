# getRandomColor Api
## 调用
```javascript
var color = getRandomColor([option]);
```
## 参数
option **可选参数** | PlainObject

支持的选项:

1. type (default: 'HEX')  **可选参数** | String

   getRandomColor返回的颜色类型，暂时只支持HEX和RGB；
   
2. range (default: [['#000','#fff']])  **可选参数** | Array

   随机颜色的取值范围，支持加入单个颜色，多个取色区间和常用颜色名；

## DEMO
```javascript
// 默认颜色范围#000 ~ #fff, 返回格式HEX
getRandomColor()
=> '#88a090'

// 颜色范围#000 ~ #00f, 返回格式RGB
getRandomColor({type:'rgb',range:[['#000','#00f']]})
=> 'rgb(0,0,152)'

// 颜色范围#000 ~ #00f，blue, red
getRandomColor({range:[['#000','#00f'],'blue','red']})
=> '#00003f'

// 颜色范围#000 ~ #00f，#f00 ~ #ff0
getRandomColor({range:[['#000','#00f'],['#f00','#ff0']]})
=> '#00003f'
```

## 后续添加

- [x] HEX
- [x] RGB
- [ ] RGBA
- [ ] HSL
- [ ] HSLA
