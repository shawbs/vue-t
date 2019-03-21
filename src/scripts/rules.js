module.exports = {

    mobile: {
        reg: /^1(2|3|4|5|6|7|8|9)[0-9]{9}$/g,
    },

    code: {
        reg: /\d{4,}/g
    },
    
    pwd: {
        reg: /\S{6,}/g
    },
    
    inverterCode: {
        reg: /\w*/g
    },
    
    text: {
        reg: /\S+/g
    },

}