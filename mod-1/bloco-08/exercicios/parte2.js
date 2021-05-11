const { battleMembers, mage, warrior, dragon, getWeaponDamage, getMonsterDamage, getSpellDamage } = require('./bonus');

const gameActions = {
  warriorTurn: (weaponDamageFunction) => {
    const damage = weaponDamageFunction(warrior.weaponDmg, warrior.strength);
    dragon.healthPoints -= damage;
    warrior.damage += damage;
  },

  mageTurn: (spelllDamageFunction) => {
    const damage = spelllDamageFunction(mage);
    dragon.healthPoints -= damage;
    mage.damage += damage;
  },

  dragonTurn: (monsterDamageFunction) => {
    const damage = monsterDamageFunction(15, dragon.strength);
    mage.healthPoints -= damage;
    warrior.healthPoints -= damage;
    dragon.damage += damage * 2;
  }
}

function runRound(gameActions) {
  gameActions.mageTurn(getSpellDamage);
  gameActions.dragonTurn(getMonsterDamage);
  gameActions.warriorTurn(getWeaponDamage);

  return battleMembers;
}

console.log(runRound(gameActions));
