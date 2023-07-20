// 对象
let obj = {
    location: '10110101',
    key: '657cd27e08124efd94f6f692238ecc3c'
}


// 获取当前时间
function nowTime() {
    var current = new Date();  // 实例化Date对象
    var nowYear = current.getFullYear();
    var nowMonth = current.getMonth() + 1;  // 默认显示的是 0-11 月，比我们正常的月份少一个月，所以要 +1
    var nowdates = current.getDate(); // 获取日期
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = current.getDay();
    // getDay（）返回 1 2 数字  获取星期几 先写好数组存放 通过数组的索引来获取星期几
    // 补零

    var nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
    var nowdates = nowdates < 10 ? '0' + nowdates : nowdates;


    // 时间
    let h = current.getHours();
    h = h < 10 ? '0' + h : h;
    let m = current.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = current.getSeconds();
    s = s < 10 ? '0' + s : s;

    // 渲染在页面上
    nowtime.innerHTML = `<i>中国</i> ${nowYear}-${nowMonth}-${nowdates}   <i>${arr[day]}</i>`;

    return `${nowYear}-${nowMonth}-${nowdates}  ${h}:${m}:${s}`;

}
nowTime();


// 实时更新时间
setInterval(function () {
    currentime.innerHTML = nowTime()
})

// 定位
locate.addEventListener('click', function () {
    alert('定位失败！')
})


// 页面一加载 就显示西安
window.addEventListener('load', main)

// 用 promise 链式调用
// 点击搜索事件
var cityid;
var weatherdata;
var hourdata;
var cityname;

input.addEventListener('focus', function () {
    input.value = ''
})
mirror.addEventListener('click', main)

function main() {
    // 第一次请求
    // 城市搜索  根据城市名字搜索城市 ID
    obj.location = input.value

    ajax(
        'GET',
        'https://geoapi.qweather.com/v2/city/lookup',
        obj
    ).then(res1 => {
        res1 = JSON.parse(res1)
        console.log('success1');
        // id id id
        cityid = res1.location[0].id;
        console.log(cityid);
        nowcity.innerHTML = res1.location[0].name;
        cityname = res1.location[0].name  // 后面要用

        // 发送第二次请求
        obj.location = cityid
        return ajax(
            'GET',
            'https://devapi.qweather.com/v7/weather/now?',
            obj)

    }).then(res2 => {
        console.log('success2');
        // console.log(res2);

        res2 = JSON.parse(res2)
        console.log(res2);
        // weatherdata = res2.now
        // console.log(weatherdata);

        // 渲染页面
        render1(res2.now)

        // 发送第三次请求
        return ajax(
            'GET',
            'https://devapi.qweather.com/v7/weather/24h?',
            obj)

    }).then(res3 => {
        console.log('success3');

        res3 = JSON.parse(res3)

        // 数据
        hourdata = res3.hourly;

        // 渲染页面
        render2(hourdata)

        // 发送第四次请求
        return ajax('GET', 'https://devapi.qweather.com/v7/weather/7d?', obj)
            

    }).then(res4 => {
        res4 = JSON.parse(res4)
        res4 = res4.daily

        console.log('success4');

        // 渲染页面
        render3(res4)

        // 发送第五次请求
        let obj1 = { ...obj };  // 对象复制
        obj1.type = ['1,2,3,6,16']  // type 参数
        return ajax('GET', 'https://devapi.qweather.com/v7/indices/1d?', obj1)
    }).then(res5 => {
        res5 = JSON.parse(res5)

        let data = res5.daily  // 数组

        // 渲染页面
        render4(data)

    })
        .catch(error => {
        console.log('error', error);
    })

}




