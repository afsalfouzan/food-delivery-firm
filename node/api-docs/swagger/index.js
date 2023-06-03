//top informatiom section 
const info = require('./info.json')
const modules = require('./modules/index')
//import definitions
const definitions = require('./definitions/index')
//footer section
const footer = require('./footer.json')

let swaggerPayload = {
    ...info,
    ...modules,
    ...definitions,
    ...footer
}

module.exports = swaggerPayload

