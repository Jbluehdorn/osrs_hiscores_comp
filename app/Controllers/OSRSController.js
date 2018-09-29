const mapper = require('../SkillMap')
const {constants, hiscores} = require('osrs-api')

module.exports = {
    async getUser(type, name) {
        let temp_type;

        switch(type) {
            case 'norm':
                temp_type = constants.playerTypes.normal
                break
            case 'im':
                temp_type = constants.playerTypes.ironman
                break
            case 'hcim':
                temp_type = constants.playerTypes.hardcoreIronman
                break
            case 'uim':
                temp_type = constants.playerTypes.ultimateIronman
                break
            default:
                temp_type = constants.playerTypes.normal
                console.error(`Type "${type}" was not recognized`)
                break
        }

        try {
            let user = await hiscores.getPlayer({name: name, type: temp_type})

            mapper.map(user)

            return user
        } catch(ex) {
            return ex
        }
    }
}