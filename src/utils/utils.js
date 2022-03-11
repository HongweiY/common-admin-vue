export default {
    FormatDate (time, rule) {
        const date = new Date(time)
        let format = rule || 'YYYY-MM-DD HH:mm:ss'
        if (/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, date.getFullYear())
        }

        const option = {
            'M+': date.getMonth() + 1,
            'D+': date.getDay(),
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }

        for (const k in option) {
            if (new RegExp(`(${k})`).test(format)) {
                const val = option[k] + ''
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? val : ('00' + val).substring(val.length))
            }
        }
        return format
    }
}
