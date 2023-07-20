// 工具函数

// 获取星期 近七天
function nowday() {
    var current = new Date();  // 实例化Date对象
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = current.getDay();
    var week = [];

    for (let i = 0; i < 7; i++)
    {
        if (day === 7)
        {
            day = 0;
        }
        week.push(arr[day])
        day++;
    }
    // console.log(week);
    return week;
}
nowday()


// 拼接参数
function addQuery(string, obj)
{
    let str = ''

    for (let i in obj)
    {
        str += `&${i}=${obj[i]}`
    }

    // todo 如果有 query 参数 怎么做区分
    if (string.indexOf('?') !== -1) {
        // console.log(string + str.slice(1));
        return string + str.slice(1)
    }
    else
    {
        return  string + '?' + str.slice(1)
    }
}

// const str = addQuery('https://?', {name: 123, age: 12})
// console.log(str);
