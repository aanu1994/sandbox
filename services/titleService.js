const getTitle = (title) => {

    title = title.toLowerCase();

    const titles = {
        mr: 1,
        mrs: 2,
        ms: 3,
        miss: 4,
        dr: 5
    }

    if (titles.hasOwnProperty(title)) {
        return { 
            result: true,
            value: titles[title]
        }
    }

    return {
        result: false,
        value: null
    }
}

module.exports = {getTitle};