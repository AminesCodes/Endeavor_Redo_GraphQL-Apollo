const formatStr = str => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}


module.exports = {
    formatStr,
}