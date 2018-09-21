const _ = require('lodash')

module.exports = {
    map(user) {
        _.forOwn(user, (val, key) => {
            switch(key) {
                case 'agility':
                    val.img = 'agi.png'
                    break
                case 'attack':
                    val.img = 'atk.png'
                    break
                case 'construction':
                    val.img = 'cons.png'
                    break
                case 'cooking':
                    val.img = 'cook.png'
                    break
                case 'crafting':
                    val.img = 'craft.png'
                    break
                case 'defence':
                    val.img = 'def.png'
                    break
                case 'farming':
                    val.img = 'farm.png'
                    break
                case 'fishing':
                    val.img = 'fish.png'
                    break
                case 'fletching':
                    val.img = 'fletch.png'
                    break
                case 'firemaking':
                    val.img = 'fm.png'
                    break
                case 'herblore':
                    val.img = 'herb.png'
                    break
                case 'hitpoints':
                    val.img = 'hp.png'
                    break
                case 'hunter':
                    val.img = 'hunt.png'
                    break
                case 'magic':
                    val.img = 'mage.png'
                    break
                case 'mining':
                    val.img = 'mine.png'
                    break
                case 'prayer':
                    val.img = 'pray.png'
                    break
                case 'ranged':
                    val.img = 'range.png'
                    break
                case 'runecrafting':
                    val.img = 'rc.png'
                    break
                case 'slayer':
                    val.img = 'slay.png'
                    break
                case 'smithing':
                    val.img = 'smith.png'
                    break
                case 'strength':
                    val.img = 'str.png'
                    break
                case 'thieving':
                    val.img = 'thief.png'
                    break
                case 'woodcutting':
                    val.img = 'wc.png'
                    break
            }
        })
    }
}