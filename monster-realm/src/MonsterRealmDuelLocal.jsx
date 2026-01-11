// MonsterRealmDuel.jsx - 2 Player Local Version

import React, { useState, useEffect } from 'react';
import MonsterArtDisplay from './MonsterArtDisplay';
import "./App.css"
import "./symbols.css"

const MONSTER_DATA = [
  { "creature": "ORCHID MANTIS", "health": 6, "ability1Symbols": "1", "ability2Symbols": "❅", "ability3Symbols": "⌬" },
  { "creature": "PANGOLIN", "health": 15, "ability1Symbols": "3", "ability2Symbols": "⌾", "ability3Symbols": "⌬" },
  { "creature": "PEACOCK SPIDER", "health": 12, "ability1Symbols": "1", "ability2Symbols": "⌾⌬", "ability3Symbols": "❅" },
  { "creature": "FUNGUS BEETLE", "health": 10, "ability1Symbols": "1", "ability2Symbols": "✿", "ability3Symbols": "❅" },
  { "creature": "RAFFLESIA", "health": 15, "ability1Symbols": "3", "ability2Symbols": "☀⌾", "ability3Symbols": "☀❦" },
  { "creature": "TARDIGRADE", "health": 23, "ability1Symbols": "1", "ability2Symbols": "✿", "ability3Symbols": "⌬" },
  { "creature": "T.M. NAMIBIENSIS", "health": 23, "ability1Symbols": "1", "ability2Symbols": "⌬", "ability3Symbols": "⌾" },
  { "creature": "VAMPIRE SQUID", "health": 10, "ability1Symbols": "3", "ability2Symbols": "❦", "ability3Symbols": "⌾" },
  { "creature": "WELWITSCHIA MIRABILIS", "health": 15, "ability1Symbols": "2", "ability2Symbols": "⌬", "ability3Symbols": "⌮" },
  { "creature": "BIOLUM. MYCENA", "health": 7, "ability1Symbols": "3", "ability2Symbols": "☀✿", "ability3Symbols": "☀⌾" },
  { "creature": "BIRD'S NEST FUNGUS", "health": 10, "ability1Symbols": "3", "ability2Symbols": "✿", "ability3Symbols": "☀⚠⌮" },
  { "creature": "CORDYCEPS", "health": 5, "ability1Symbols": "5", "ability2Symbols": "⌾", "ability3Symbols": "☀❦" },
  { "creature": "DEVIL'S CIGAR", "health": 1, "ability1Symbols": "⚠15", "ability2Symbols": "☀✿", "ability3Symbols": "☀⌾" },
  { "creature": "GHOST BAT", "health": 6, "ability1Symbols": "6", "ability2Symbols": "⌾", "ability3Symbols": "❦" },
  { "creature": "GLOWING ROACH", "health": 10, "ability1Symbols": "2", "ability2Symbols": "✿", "ability3Symbols": "⌮" },
  { "creature": "JEWEL WASP", "health": 5, "ability1Symbols": "5", "ability2Symbols": "⌾3", "ability3Symbols": "❦3" },
  { "creature": "LEAFY SEA DRAGON", "health": 13, "ability1Symbols": "1", "ability2Symbols": "⌬", "ability3Symbols": "⌾" },
  { "creature": "LITHOPS", "health": 10, "ability1Symbols": "3", "ability2Symbols": "⌬", "ability3Symbols": "⌮" }
];

const SYMBOL_DESCRIPTIONS = {
  '⌮': 'Reflect (3 uses)',
  '❦': 'Prevent Healing',
  '⌾': 'Poison',
  '✿': 'Heal 50%',
  '❅': 'Heal Team',
  '⌬': 'Protect',
  '⚠': 'Self Wound',
  '☀': 'Global Effect'
};

const parseSymbols = (str) => ({
  dmg: parseInt(str.match(/\d+/)?.[0] || 0),
  reflect: str.includes('⌮'),
  preventHeal: str.includes('❦'),
  poison: str.includes('⌾'),
  healHalf: str.includes('✿'),
  healTeam: str.includes('❅'),
  protect: str.includes('⌬'),
  selfWound: str.includes('⚠'),
  isGlobal: str.includes('☀'),
});

const MonsterCard = ({ monster, player, isActive, onClick, showPoison, showProtected, isDead }) => {
  const hpPercentage = (monster.currentHp / monster.health) * 100;
  let hpBarClass = 'bg-green-500';
  if (hpPercentage <= 30) hpBarClass = 'bg-red-500';
  else if (hpPercentage <= 60) hpBarClass = 'bg-yellow-500';

  const reflectRemaining = Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0));

  return (
    <div 
      className={`
        relative bg-gray-800 rounded-lg p-4 border-2 transition-all
        ${player === 1 ? 'border-blue-500' : 'border-red-500'}
        ${isActive ? 'ring-4 ring-yellow-400' : ''}
        ${isDead ? 'opacity-40 grayscale' : 'hover:scale-105'}
      `}
      onClick={onClick}
      style={{ width: '180px' }}
    >
      <div className="mb-2">
        <h3 className="text-white font-bold text-sm truncate">{monster.creature}</h3>
        <div className="text-xs text-gray-400">
          Player {player}'s monster
        </div>
      </div>
      
      <div className="flex justify-center mb-2">
        <MonsterArtDisplay monsterName={monster.creature} size={200} />
      </div>
      
      <div className="flex flex-wrap gap-1 mb-2 min-h-[24px]">
        {showPoison && monster.poisonStacks > 0 && (
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            <span className="symbol symbol-poison">⌾</span> Poison{monster.poisonStacks > 1 ? ` x${monster.poisonStacks}` : ''}
          </span>
        )}
        {showProtected && (
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            <span className="symbol symbol-protect">⌬</span> Protected
          </span>
        )}
        {monster.canHeal === false && (
          <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            <span className="symbol symbol-prevent">❦</span> No Heal
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>HEALTH</span>
          <span className="text-white font-bold">{monster.currentHp}/{monster.health}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all ${hpBarClass}`}
            style={{ width: `${Math.max(hpPercentage, 0)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        <div className="bg-black/40 p-1 rounded text-center">
          <div className="text-lg symbol symbol-damage">{monster.ability1Symbols}</div>
          <div className="text-[8px] text-gray-400">Ability 1</div>
        </div>
        <div className="bg-black/40 p-1 rounded text-center">
          <div className="text-lg">{monster.ability2Symbols}</div>
          <div className="text-[8px] text-gray-400">Ability 2</div>
        </div>
        <div className="bg-black/40 p-1 rounded text-center">
          <div className="text-lg">{monster.ability3Symbols}</div>
          <div className="text-[8px] text-gray-400">Ability 3</div>
        </div>
      </div>

      {(monster.ability1Symbols.includes('⌮') || 
       monster.ability2Symbols.includes('⌮') || 
       monster.ability3Symbols.includes('⌮')) ? (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <span className="symbol symbol-reflect">⌮</span>
          <span>{reflectRemaining}/{(monster.reflectUses ?? 3)} uses</span>
        </div>
      ) : null}
    </div>
  );
};

const SymbolLegend = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHorizontal, setIsHorizontal] = useState(true);

  const symbolAnimations = {
    '⌮': 'symbol-glow reflect',
    '❦': '',
    '⌾': 'symbol-glow poison',
    '✿': 'symbol-glow heal',
    '❅': 'symbol-float',
    '⌬': 'symbol-pulse',
    '⚠': 'symbol-pulse',
    '☀': 'symbol-glow global symbol-spin slow'
  };

  const symbolIcons = {
    '⌮': '🛡️',
    '❦': '💔',
    '⌾': '☠️',
    '✿': '🌸',
    '❅': '❄️',
    '⌬': '🔰',
    '⚠': '⚡',
    '☀': '☀️'
  };

  if (!isOpen) {
    return (
      <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-white font-medium hover:text-yellow-400 transition-colors"
          >
            <span className="symbol symbol-global">☀</span>
            <span>Show Symbol Guide ({Object.keys(SYMBOL_DESCRIPTIONS).length})</span>
          </button>
          <span className="text-xs text-gray-400">Click to expand</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/40 mb-6">
      {/* Header with toggle buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h4 className="text-white font-bold text-lg flex items-center gap-2">
            <span className="symbol symbol-global symbol-lg">☀</span>
            <span>Symbol Guide</span>
          </h4>
          <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
            {Object.keys(SYMBOL_DESCRIPTIONS).length} Symbols
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Layout toggle */}
          <button
            onClick={() => setIsHorizontal(!isHorizontal)}
            className="flex items-center gap-1 text-xs text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-all"
            title={`Switch to ${isHorizontal ? 'grid' : 'horizontal'} layout`}
          >
            {isHorizontal ? (
              <>
                <span className="text-sm">📊</span>
                <span>Grid</span>
              </>
            ) : (
              <>
                <span className="text-sm">↔️</span>
                <span>Horizontal</span>
              </>
            )}
          </button>
          
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white bg-gray-700/30 hover:bg-gray-700/60 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            title="Close guide"
          >
            <span className="text-lg">×</span>
          </button>
        </div>
      </div>
      
      {/* Horizontal Layout */}
      {isHorizontal ? (
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div className="flex gap-2 min-w-max">
            {Object.entries(SYMBOL_DESCRIPTIONS).map(([symbol, desc]) => (
              <div 
                key={symbol}
                className="symbol-legend-item-horizontal group bg-gray-800/30 hover:bg-gray-700/40 rounded-lg p-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-gray-700/30 hover:border-gray-600/50 flex-shrink-0 w-48"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className={`symbol ${symbolAnimations[symbol] || ''} text-3xl`}>
                      {symbol}
                    </div>
                    <div className="absolute -top-1 -right-1 opacity-20 group-hover:opacity-40 transition-opacity">
                      <span className="text-sm">{symbolIcons[symbol]}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm mb-1 tracking-wide uppercase truncate">
                      {desc.split(' ')[0]}
                    </div>
                    <div className="text-gray-300 text-xs leading-tight">
                      {desc}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Grid Layout (original) */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(SYMBOL_DESCRIPTIONS).map(([symbol, desc]) => (
            <div 
              key={symbol}
              className="symbol-legend-item group bg-gray-800/30 hover:bg-gray-700/40 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-gray-700/30 hover:border-gray-600/50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className={`symbol ${symbolAnimations[symbol] || ''} text-4xl mb-1`}>
                    {symbol}
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                    <span className="text-lg">{symbolIcons[symbol]}</span>
                  </div>
                </div>
                
                <div className="text-white font-semibold text-sm mb-1 tracking-wide uppercase">
                  {desc.split(' ')[0]}
                </div>
                
                <div className="text-gray-300 text-xs leading-tight min-h-[2.5rem]">
                  {desc}
                </div>
                
                <div className="mt-3 w-8 h-1 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30 group-hover:opacity-60 transition-opacity"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-700/40 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>Active Effects</span>
          <span className="text-gray-500">•</span>
          <span>{isHorizontal ? 'Horizontal' : 'Grid'} View</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Hover for details</span>
          <button
            onClick={() => setIsHorizontal(!isHorizontal)}
            className="text-xs text-gray-300 hover:text-white px-2 py-1 rounded hover:bg-gray-700/30 transition-colors"
          >
            {isHorizontal ? 'Switch to Grid' : 'Switch to Horizontal'}
          </button>
        </div>
      </div>
    </div>
  );
};

const MonsterRealmDuelLocal = () => {
  const [gameState, setGameState] = useState('player1Selection'); // 'player1Selection', 'player2Selection', 'battle'
  const [player1Team, setPlayer1Team] = useState([]);
  const [player2Team, setPlayer2Team] = useState([]);
  const [turn, setTurn] = useState(1);
  const [logs, setLogs] = useState(["Welcome to Monster Realm Duel!"]);
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [targetMode, setTargetMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 or 2
  const [monstersActed, setMonstersActed] = useState([]);
  const [movesMade, setMovesMade] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(true);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const formattedMessage = `[${timestamp}] ${message}`;
    setLogs(prev => [formattedMessage, ...prev].slice(0, 15));
  };

  const initializeMonster = (monster) => ({
    ...monster,
    currentHp: monster.health,
    maxHp: monster.health,
    poisonStacks: 0,
    isProtected: false,
    canHeal: true,
    preventHealing: false,
    reflectUses: 3,
    reflectUsesUsed: 0
  });

const toggleSelect = (monster, player) => {
  if (player === 1) {
    if (player1Team.find(m => m.creature === monster.creature)) {
      setPlayer1Team(player1Team.filter(m => m.creature !== monster.creature));
    } else if (player1Team.length < 5) {
      setPlayer1Team([...player1Team, initializeMonster(monster)]);
    }
  } else {
    // Player 2 selection - should only check if Player 2 already has it
    // NOT if Player 1 has it (that's handled by the UI showing it as "taken")
    if (player2Team.find(m => m.creature === monster.creature)) {
      setPlayer2Team(player2Team.filter(m => m.creature !== monster.creature));
    } else if (player2Team.length < 5) {
      setPlayer2Team([...player2Team, initializeMonster(monster)]);
    }
  }
};

const startBattle = () => {
  setGameState('battle');
  setMonstersActed([]);
  setMovesMade(0);
  setTurn(1);
  setCurrentPlayer(1);
  // Remove the "only 2 moves on turn 1" restriction
  addLog("Battle started! Each player may use up to 5 monsters per turn.");
  addLog("Player 1's turn begins!");
};

// Function to randomize team for the current selecting player
const randomizeTeam = (player) => {
  console.log(`Randomizing team for player ${player}`);
  
  // Get all monsters that are not already selected by the other player
  const otherTeam = player === 1 ? player2Team : player1Team;
  const availableMonsters = MONSTER_DATA.filter(
    monster => !otherTeam.find(m => m.creature === monster.creature)
  );
  
  // If not enough monsters available, show error
  if (availableMonsters.length < 5) {
    addLog(`Not enough monsters available for randomization! Need 5, only ${availableMonsters.length} left.`);
    return;
  }
  
  // Shuffle available monsters
  const shuffled = [...availableMonsters].sort(() => Math.random() - 0.5);
  
  // Take first 5 monsters
  const randomTeam = shuffled.slice(0, 5).map(monster => initializeMonster(monster));
  
  if (player === 1) {
    setPlayer1Team(randomTeam);
    addLog(`Player 1 randomized team: ${randomTeam.map(m => m.creature).join(', ')}`);
  } else {
    setPlayer2Team(randomTeam);
    addLog(`Player 2 randomized team: ${randomTeam.map(m => m.creature).join(', ')}`);
  }
};

// Function to randomize both teams at once (for quick start)
const randomizeBothTeams = () => {
  console.log("Randomizing both teams");
  
  // Shuffle all monsters
  const shuffled = [...MONSTER_DATA].sort(() => Math.random() - 0.5);
  
  // Split into two teams
  const team1 = shuffled.slice(0, 5).map(monster => initializeMonster(monster));
  const team2 = shuffled.slice(5, 10).map(monster => initializeMonster(monster));
  
  setPlayer1Team(team1);
  setPlayer2Team(team2);
  
  addLog("Both teams randomized! Ready to start battle.");
  addLog(`Player 1 got: ${team1.map(m => m.creature).join(', ')}`);
  addLog(`Player 2 got: ${team2.map(m => m.creature).join(', ')}`);
  
  // Auto-confirm both teams and start battle
  if (player1Team.length === 5 && player2Team.length === 5) {
    startBattle();
  }
};

  const handleAbilitySelect = (monster, abilityKey, player) => {
    if (currentPlayer !== player || monster.currentHp <= 0) return;
    
    if (monstersActed.includes(monster.creature)) {
      addLog(`${monster.creature} has already acted this turn!`);
      return;
    }
    
    const maxMoves = turn === 1 ? 2 : 5;
    if (movesMade >= maxMoves) {
      addLog(`You've used all ${maxMoves} moves for this turn!`);
      return;
    }
    
    const ability = monster[abilityKey];
    const effects = parseSymbols(ability);
    
    const requiresTarget = (effects.dmg > 0 || effects.poison || effects.preventHeal) && !effects.isGlobal;
    
    if (requiresTarget) {
      setSelectedAbility({ monster, abilityKey, effects, ability, player });
      setSelectedMonster(monster);
      setTargetMode(true);
      addLog(`Player ${currentPlayer}: Select target for ${monster.creature}'s ability: ${ability}`);
    } else {
      executeAbility(monster, abilityKey, effects, ability, player);
    }
  };

  const handleTargetSelect = (targetMonster, targetPlayer) => {
    if (!selectedAbility || !targetMode) return;
    
    const { monster, abilityKey, effects, ability, player } = selectedAbility;
    
    executeAbility(monster, abilityKey, effects, ability, player, {
      target: targetMonster,
      targetPlayer
    });
    
    setSelectedAbility(null);
    setSelectedMonster(null);
    setTargetMode(false);
  };

const executeAbility = (actor, abilityKey, effects, ability, player, targetData = null) => {
  const abilityText = actor[abilityKey];
  
  // Create deep copies of teams
  let updatedPlayer1Team = JSON.parse(JSON.stringify(player1Team));
  let updatedPlayer2Team = JSON.parse(JSON.stringify(player2Team));
  
  const actorTeam = player === 1 ? updatedPlayer1Team : updatedPlayer2Team;
  const opponentTeam = player === 1 ? updatedPlayer2Team : updatedPlayer1Team;
  
  const actorIndex = actorTeam.findIndex(m => m.creature === actor.creature);
  if (actorIndex === -1) return;
  
  let updatedActor = { ...actorTeam[actorIndex] };
  const newLogs = [];
  
  newLogs.push(`Player ${player}'s ${updatedActor.creature} uses ${abilityText}`);
  
  setMonstersActed(prev => [...prev, updatedActor.creature]);
  setMovesMade(prev => prev + 1);
  
  // Handle self-wound effects
  if (effects.selfWound && effects.dmg > 0) {
    const woundDamage = Math.ceil(effects.dmg / 2);
    updatedActor.currentHp = Math.max(0, updatedActor.currentHp - woundDamage);
    newLogs.push(`${updatedActor.creature} wounded itself for ${woundDamage} damage`);
  }
  
  // Special handling for Bird's Nest Fungus combo
  if (effects.selfWound && effects.reflect && effects.isGlobal && effects.dmg === 0) {
    const selfWoundDamage = 2;
    
    if (updatedActor.reflectUsesUsed < updatedActor.reflectUses) {
      newLogs.push(`${updatedActor.creature} attempts to wound itself for ${selfWoundDamage} damage, but reflects it to all opponents!`);
      
      opponentTeam.forEach((target, index) => {
        if (target.currentHp > 0) {
          const updatedTarget = { ...opponentTeam[index] };
          updatedTarget.currentHp = Math.max(0, updatedTarget.currentHp - selfWoundDamage);
          opponentTeam[index] = updatedTarget;
          newLogs.push(`${updatedActor.creature} reflects ${selfWoundDamage} damage to ${updatedTarget.creature}`);
        }
      });
      
      updatedActor.reflectUsesUsed += 1;
      newLogs.push(`${updatedActor.creature} has ${updatedActor.reflectUses - updatedActor.reflectUsesUsed} reflect uses remaining`);
    } else {
      updatedActor.currentHp = Math.max(0, updatedActor.currentHp - selfWoundDamage);
      newLogs.push(`${updatedActor.creature} wounds itself for ${selfWoundDamage} damage (no reflect uses left)`);
    }
    
    actorTeam[actorIndex] = updatedActor;
    
    // Update state
    if (player === 1) {
      setPlayer1Team(updatedPlayer1Team);
      setPlayer2Team(updatedPlayer2Team);
    } else {
      setPlayer2Team(updatedPlayer2Team);
      setPlayer1Team(updatedPlayer1Team);
    }
    
    newLogs.forEach(log => addLog(log));
    return;
  }
  
  // Handle targeting for damage/poison/preventHeal abilities
  let targets = [];
  
  if (effects.isGlobal) {
    // Global effects target all opponents (for damage/poison/preventHeal)
    if (effects.dmg > 0 || effects.poison || effects.preventHeal) {
      targets = opponentTeam.filter(m => m.currentHp > 0);
    }
  } else if (targetData) {
    // Single target from player selection
    const targetIndex = opponentTeam.findIndex(m => m.creature === targetData.target.creature);
    if (targetIndex !== -1) {
      targets = [opponentTeam[targetIndex]];
    }
  }
  
  // Apply effects to targets
  targets.forEach((target) => {
    if (!target || target.currentHp <= 0) return;
    
    const targetIndex = opponentTeam.findIndex(m => m.creature === target.creature);
    if (targetIndex === -1) return;
    
    const updatedTarget = { ...opponentTeam[targetIndex] };
    
    // Apply damage
    if (effects.dmg > 0) {
      const targetHasReflect = (
        updatedTarget.ability1Symbols.includes('⌮') || 
        updatedTarget.ability2Symbols.includes('⌮') || 
        updatedTarget.ability3Symbols.includes('⌮')
      ) && updatedTarget.reflectUsesUsed < updatedTarget.reflectUses;
      
      if (targetHasReflect) {
        const reflectedDmg = Math.min(effects.dmg, 3);
        updatedActor.currentHp = Math.max(0, updatedActor.currentHp - reflectedDmg);
        updatedTarget.reflectUsesUsed += 1;
        newLogs.push(`${updatedTarget.creature} reflected ${reflectedDmg} damage back to ${updatedActor.creature}! (${updatedTarget.reflectUses - updatedTarget.reflectUsesUsed} reflect uses remaining)`);
      } else if (updatedTarget.isProtected) {
        newLogs.push(`${updatedTarget.creature}'s protection blocked the attack!`);
        updatedTarget.isProtected = false;
      } else {
        updatedTarget.currentHp = Math.max(0, updatedTarget.currentHp - effects.dmg);
        newLogs.push(`${updatedActor.creature} dealt ${effects.dmg} damage to ${updatedTarget.creature}`);
      }
    }
    
    // Apply poison (stacking)
    if (effects.poison) {
      updatedTarget.poisonStacks = (updatedTarget.poisonStacks || 0) + 1;
      newLogs.push(`${updatedTarget.creature} was poisoned! (x${updatedTarget.poisonStacks})`);
    }
    
    // Apply prevent healing
    if (effects.preventHeal) {
      updatedTarget.canHeal = false;
      newLogs.push(`${updatedTarget.creature} cannot be healed this turn`);
    }
    
    opponentTeam[targetIndex] = updatedTarget;
  });
  
  // Update actor in team
  actorTeam[actorIndex] = updatedActor;
  
  // Handle healing abilities (these affect the actor's own team)
  
  // Heal 50% (✿) - self or global
  if (effects.healHalf) {
    if (effects.isGlobal) {
      // Global heal affects all monsters in actor's team
      newLogs.push(`${updatedActor.creature} unleashes a global heal on their team!`);
      
      actorTeam.forEach((teammate, index) => {
        if (teammate.currentHp > 0 && teammate.canHeal) {
          const healAmount = Math.ceil(teammate.health / 2);
          const newHp = Math.min(teammate.maxHp, teammate.currentHp + healAmount);
          if (newHp > teammate.currentHp) {
            actorTeam[index].currentHp = newHp;
            actorTeam[index].poisonStacks = 0; // Clear poison when healed
            newLogs.push(`${teammate.creature} healed for ${newHp - teammate.currentHp} HP`);
          }
        }
      });
    } else {
      // Self heal
      if (updatedActor.canHeal) {
        const healAmount = Math.ceil(updatedActor.health / 2);
        const newHp = Math.min(updatedActor.maxHp, updatedActor.currentHp + healAmount);
        if (newHp > updatedActor.currentHp) {
          updatedActor.currentHp = newHp;
          updatedActor.poisonStacks = 0; // Clear poison when healed
          newLogs.push(`${updatedActor.creature} healed ${healAmount} HP and cured poison`);
          actorTeam[actorIndex] = updatedActor;
        }
      } else {
        newLogs.push(`${updatedActor.creature} cannot be healed this turn`);
      }
    }
  }
  
  // Heal Team (❅) - heals all teammates except self
  if (effects.healTeam) {
    newLogs.push(`${updatedActor.creature} heals their team!`);
    
    actorTeam.forEach((teammate, index) => {
      if (teammate.creature !== updatedActor.creature && 
          teammate.currentHp > 0 && 
          teammate.canHeal) {
        const newHp = Math.min(teammate.maxHp, teammate.currentHp + 3);
        if (newHp > teammate.currentHp) {
          actorTeam[index].currentHp = newHp;
          actorTeam[index].poisonStacks = 0; // Clear poison when healed
          newLogs.push(`${teammate.creature} healed 3 HP`);
        }
      }
    });
  }
  
  // Protection abilities (⌬)
  if (effects.protect) {
    if (effects.isGlobal) {
      // Global protection for entire team
      actorTeam.forEach((teammate, index) => {
        if (teammate.currentHp > 0) {
          actorTeam[index].isProtected = true;
        }
      });
      newLogs.push(`${updatedActor.creature} protected the entire team (each blocks next attack)`);
    } else {
      // Self protection
      updatedActor.isProtected = true;
      actorTeam[actorIndex] = updatedActor;
      newLogs.push(`${updatedActor.creature} is now protected (blocks next attack)`);
    }
  }
  
  // Update state with modified teams
  if (player === 1) {
    setPlayer1Team(actorTeam); // Player 1's team (with heals/protection applied)
    setPlayer2Team(opponentTeam); // Player 2's team (with damage/poison applied)
  } else {
    setPlayer2Team(actorTeam); // Player 2's team (with heals/protection applied)
    setPlayer1Team(opponentTeam); // Player 1's team (with damage/poison applied)
  }
  
  // Add logs
  newLogs.forEach(log => addLog(log));
  
  // Check if turn should end
  const maxMoves = turn === 1 ? 2 : 5;
  
  if (movesMade + 1 >= maxMoves) {
    setTimeout(() => {
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      addLog(`Player ${currentPlayer}'s turn complete. Player ${nextPlayer}'s turn begins.`);
      setCurrentPlayer(nextPlayer);
      setMovesMade(0);
      setMonstersActed([]);
      setSelectedMonster(null);
      setSelectedAbility(null);
      setTargetMode(false);
    }, 1000);
  }
};

const endTurn = () => {
  // Create deep copies of both teams
  const updatedPlayer1Team = JSON.parse(JSON.stringify(player1Team));
  const updatedPlayer2Team = JSON.parse(JSON.stringify(player2Team));
  
  // Apply poison damage to Player 1's team
  updatedPlayer1Team.forEach(monster => {
    const stacks = monster.poisonStacks || 0;
    if (stacks > 0 && monster.currentHp > 0) {
      const dmg = stacks;
      monster.currentHp = Math.max(0, monster.currentHp - dmg);
      addLog(`[Player 1] ${monster.creature} took ${dmg} poison damage`);
      
      // Reduce poison stacks
      monster.poisonStacks = Math.max(0, stacks - 1);
      
      if (monster.poisonStacks > 0) {
        addLog(`${monster.creature} poison reduced to x${monster.poisonStacks}`);
      } else {
        addLog(`${monster.creature} poison cleared`);
      }
    }
    
    // Reset per-turn states
    monster.canHeal = true;
  });
  
  // Apply poison damage to Player 2's team
  updatedPlayer2Team.forEach(monster => {
    const stacks = monster.poisonStacks || 0;
    if (stacks > 0 && monster.currentHp > 0) {
      const dmg = stacks;
      monster.currentHp = Math.max(0, monster.currentHp - dmg);
      addLog(`[Player 2] ${monster.creature} took ${dmg} poison damage`);
      
      // Reduce poison stacks
      monster.poisonStacks = Math.max(0, stacks - 1);
      
      if (monster.poisonStacks > 0) {
        addLog(`${monster.creature} poison reduced to x${monster.poisonStacks}`);
      } else {
        addLog(`${monster.creature} poison cleared`);
      }
    }
    
    // Reset per-turn states
    monster.canHeal = true;
  });
  
  // Update state with modified teams
  setPlayer1Team(updatedPlayer1Team);
  setPlayer2Team(updatedPlayer2Team);
  
  const newTurn = turn + 1;
  
  const player1Alive = updatedPlayer1Team.filter(m => m.currentHp > 0).length;
  const player2Alive = updatedPlayer2Team.filter(m => m.currentHp > 0).length;
  
  // ONLY check for elimination victory (no turn limit)
  if (player1Alive === 0 && player2Alive === 0) {
    addLog("Game Over! It's a draw!");
    setGameState('gameOver');
  } else if (player1Alive === 0) {
    addLog("Game Over! Player 2 wins!");
    setGameState('gameOver');
  } else if (player2Alive === 0) {
    addLog("Game Over! Player 1 wins!");
    setGameState('gameOver');
  } else {
    // Continue playing indefinitely
    setTurn(newTurn);
    setMonstersActed([]);
    setMovesMade(0);
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayer(nextPlayer);
    setSelectedMonster(null);
    setSelectedAbility(null);
    setTargetMode(false);
    
    const maxMoves = 5; // All turns now allow 5 moves
    addLog(`Turn ${newTurn} begins! Each player may use ${maxMoves} monsters.`);
    addLog(`Player ${nextPlayer}'s turn begins!`);
  }
};

  const confirmTeam = () => {
    if (gameState === 'player1Selection') {
      if (player1Team.length === 5) {
        setGameState('player2Selection');
        addLog("Player 1 has selected their team. Player 2's turn to select.");
      }
    } else if (gameState === 'player2Selection') {
      if (player2Team.length === 5) {
        startBattle();
      }
    }
  };
// Update the selection screen to include randomization buttons
  if (gameState === 'player1Selection' || gameState === 'player2Selection') {
    const currentPlayerSelecting = gameState === 'player1Selection' ? 1 : 2;
    const currentTeam = currentPlayerSelecting === 1 ? player1Team : player2Team;
    const otherTeam = currentPlayerSelecting === 1 ? player2Team : player1Team;
    
    return (
      <div className="game-container">
        <header className="game-header">
          <h1 className="game-title">MONSTER REALM DUEL</h1>
          <p className="game-subtitle">Player {currentPlayerSelecting}: Select 5 monsters for your team</p>
          <div className="selection-counter">
            <span className="font-bold text-green-400">{currentTeam.length}/5</span>
            <span className="text-gray-400"> Selected</span>
          </div>
          {gameState === 'player2Selection' && (
            <div className="mt-2 text-sm text-blue-300">
              Player 1 has already selected: {player1Team.map(m => m.creature).join(', ')}
            </div>
          )}
        </header>

        {/* ADD RANDOMIZATION BUTTONS */}
        <div className="randomization-controls">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={() => randomizeTeam(currentPlayerSelecting)}
              className="randomize-button"
              disabled={currentTeam.length === 5}
            >
              <span className="symbol">🎲</span>
              <span>Randomize My Team</span>
            </button>
            
            {/* {gameState === 'player2Selection' && (
              <button
                onClick={randomizeBothTeams}
                className="randomize-button both-teams"
              >
                <span className="symbol">⚡</span>
                <span>Randomize Both Teams & Start</span>
              </button>
            )} */}
            
            {currentTeam.length > 0 && (
              <button
                onClick={() => {
                  if (currentPlayerSelecting === 1) {
                    setPlayer1Team([]);
                  } else {
                    setPlayer2Team([]);
                  }
                  addLog(`Player ${currentPlayerSelecting} cleared their team`);
                }}
                className="clear-button"
              >
                <span className="symbol">🗑️</span>
                <span>Clear My Team</span>
              </button>
            )}
          </div>
          
          <div className="text-xs text-gray-400 mb-4 text-center">
            {currentTeam.length === 0 
              ? "Select monsters manually or click 'Randomize My Team'" 
              : `${currentTeam.length} monsters selected. Click to add/remove.`}
          </div>
        </div>

     <div className="selection-grid">
  {MONSTER_DATA.map(monster => {
    const isSelectedByCurrent = currentTeam.find(m => m.creature === monster.creature);
    const isSelectedByOther = otherTeam.find(m => m.creature === monster.creature);
    
    return (
      <div
        key={monster.creature}
        className={`selection-card ${isSelectedByCurrent ? 'selected' : ''} ${isSelectedByOther ? 'taken' : ''}`}
        onClick={() => {
          // If already taken by other player, do nothing
          if (isSelectedByOther) {
            return;
          }
          
          // Toggle selection for current player
          if (isSelectedByCurrent) {
            // Deselect
            toggleSelect(monster, currentPlayerSelecting);
          } else {
            // Select (if we have room)
            if (currentTeam.length < 5) {
              toggleSelect(monster, currentPlayerSelecting);
            }
          }
        }}
      >
 <div className="selection-card-header">
                  <h3 className="selection-card-name">{monster.creature}</h3>
                  <span className="selection-card-hp">
                    HP: {monster.health}
                  </span>
                </div>
                <div className="flex justify-center">
                  <MonsterArtDisplay monsterName={monster.creature} size={200} />
                </div>
                <div className="ability-grid">
                  <div className="ability-slot">
                    <div className="symbol symbol-md">{monster.ability1Symbols}</div>
                  </div>
                  <div className="ability-slot">
                    <div className="symbol symbol-md">{monster.ability2Symbols}</div>
                  </div>
                  <div className="ability-slot">
                    <div className="symbol symbol-md">{monster.ability3Symbols}</div>
                  </div>
                </div>        {isSelectedByOther && (
          <div className="mt-2 inline-block bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            Already selected by {currentPlayerSelecting === 1 ? 'Player 2' : 'Player 1'}
          </div>
        )}
   </div>
            );
          })}
        </div>

        <div className="game-controls">
          {currentTeam.length === 5 ? (
            <button
              onClick={confirmTeam}
              className="start-button"
            >
              {gameState === 'player1Selection' ? 'CONFIRM TEAM →' : 'START BATTLE'}
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="text-gray-400">
                Select {5 - currentTeam.length} more monster{5 - currentTeam.length !== 1 ? 's' : ''}
              </div>
              <button
                onClick={() => randomizeTeam(currentPlayerSelecting)}
                className="randomize-button-small"
              >
                <span className="symbol">🎲</span>
                <span>Fill Randomly</span>
              </button>
            </div>
          )}
        </div>

       {/* Symbols Guide */}
  <div className="info-card game-rules">
    <div className="info-card-header">
      <div className="info-card-title">
        <span className="symbol symbol-global">☀</span>
        <h3>SYMBOL GUIDE</h3>
      </div>
      <div className="info-card-subtitle">
        Master the language of monster abilities
      </div>
    </div>
    
    <div className="symbols-grid">
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-reflect">⌮</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Reflect</div>
          <div className="symbol-description">Reflects physical attack back to attacker (max 3 uses per battle)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-poison">❦</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Prevent Healing</div>
          <div className="symbol-description">Target cannot be healed this turn</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol">⌾</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Poison</div>
          <div className="symbol-description">Target loses 1 HP per turn (removed by healing)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-heal">✿</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Heal 50%</div>
          <div className="symbol-description">Heals half of current HP (rounded up)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-team">❅</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Team Heal</div>
          <div className="symbol-description">Heals all teammates by 3 HP (except self)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-protect">⌬</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Protect</div>
          <div className="symbol-description">Blocks next incoming attack for target</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-warning">⚠</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Self Wound</div>
          <div className="symbol-description">Inflicts half damage to self (rounded up)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-global">☀</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Global Effect</div>
          <div className="symbol-description">Affects all creatures in play</div>
        </div>
      </div>
    </div>
    
    <div className="info-card-footer">
      <div className="footer-note">
        <span className="symbol">💡</span>
        <span>Combine symbols for powerful combos!</span>
      </div>
    </div>
  </div>

  {/* Game Rules */}
  <div className="info-card game-manual">
    <div className="info-card-header">
      <div className="info-card-title">
        <span className="symbol">📖</span>
        <h3>MONSTER REALM DUEL RULES</h3>
      </div>
      <div className="info-card-subtitle">
        How to command your monstrous army
      </div>
    </div>
    
    <div className="rules-content">
      <div className="rule-item">
        <div className="rule-icon">🃏</div>
        <div className="rule-text">
          <strong>DECK SIZE:</strong> Each player needs a full set of <strong>18 monster cards</strong>
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">⚔️</div>
        <div className="rule-text">
          <strong>TEAM SELECTION:</strong> Choose <strong>5 monsters</strong> from your collection for battle
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">⏱️</div>
        <div className="rule-text">
          <strong>TURN LIMITS:</strong> Turn 1: <strong>2 monsters</strong> can act. Turns 2 and onwards: <strong>All 5 monsters</strong> can act
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">🎯</div>
        <div className="rule-text">
          <strong>ACTIONS:</strong> Each monster may use <strong>one ability</strong> per turn (adjacent symbols combine)
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">💥</div>
        <div className="rule-text">
          <strong>DAMAGE:</strong> Numbers on abilities deal <strong>physical damage</strong> to opponents
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">❤️</div>
        <div className="rule-text">
          <strong>HEALTH SYSTEM:</strong> Monsters have <strong>two-digit HP</strong> displayed near their art
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">☠️</div>
        <div className="rule-text">
          <strong>DEFEAT:</strong> Lose when <strong>all your monsters reach 0 HP</strong>
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">⏳</div>
        <div className="rule-text">
          <strong>TIME LIMIT:</strong> Battle ends in a <strong>tie after 5 turns</strong> if no victor emerges
        </div>
      </div>
    </div>
    
    <div className="info-card-footer">
<div className="rule-item">
  <div className="rule-icon">🛡️</div>
  <div className="rule-text">
    <strong>REFLECT:</strong> Each creature with <strong>⌮</strong> can reflect <strong>3 damaging attacks</strong> (individual counter)
  </div>
</div>
    </div>
  </div>
      </div>
    );
  }


  return (
    <div className="battle-container">
      <div className="battle-header">
        <div>
          <h1 className="battle-title">MONSTER REALM DUEL</h1>
          <div className="battle-info-grid">
            <div className="info-card">
              <div className="info-label">Turn</div>
              <div className="info-value">{turn}/5</div>
            </div>
            <div className="info-card">
              <div className="info-label">Moves</div>
              <div className="info-value">
                {movesMade}/{turn === 1 ? 2 : 5}
              </div>
            </div>
            <div className={`turn-indicator ${currentPlayer === 1 ? 'player1-turn' : 'player2-turn'}`}>
              Player {currentPlayer}'s Turn
            </div>
          </div>
        </div>
        
        {targetMode && selectedAbility && (
          <div className="target-prompt">
            <div className="bg-yellow-600/20 border-2 border-yellow-500 rounded-lg p-4 text-center">
              <p className="text-white font-bold">Select Target for {selectedAbility.monster.creature}'s Ability</p>
              <p className="text-yellow-300">{selectedAbility.ability}</p>
              <p className="text-gray-300 text-sm mt-2">Click on an opponent's monster to target it</p>
            </div>
          </div>
        )}
      </div>

      <div className="battle-grid">
        {/* Player 2 Team Section */}
    {/* Player 2 Team Section - UPDATED WITH ABILITIES */}
<div className="team-section player2-team">
  <h2 className="team-label player2">Player 2's Team</h2>
  <div className="team-container">
    {player2Team.map((monster, index) => {
      const hpPercentage = (monster.currentHp / monster.health) * 100;
      let hpClass = '';
      if (hpPercentage <= 30) hpClass = 'low';
      else if (hpPercentage <= 60) hpClass = 'medium';

      const hasActed = monstersActed.includes(monster.creature);
      const isSelected = selectedMonster?.creature === monster.creature;
      const isTargetable = targetMode && 
                         currentPlayer === 1 && 
                         monster.currentHp > 0 &&
                         selectedAbility?.player === 1;

      return (
        <div 
          key={index}
          className={`monster-card player2 ${
            hasActed ? 'acted' : ''
          } ${isTargetable ? 'targetable' : ''} ${
            monster.currentHp <= 0 ? 'dead' : ''
          } ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            if (isTargetable) {
              handleTargetSelect(monster, 2);
            } else if (!targetMode && 
                      currentPlayer === 2 && 
                      monster.currentHp > 0 && 
                      !hasActed) {
              setSelectedMonster(monster);
              setSelectedAbility(null);
            }
          }}
        >
          <div className="monster-header">
            <h3 className="monster-name">{monster.creature}</h3>
            <span className="monster-hp">{monster.currentHp}/{monster.health}</span>
          </div>
          <div className="flex justify-center">
            <MonsterArtDisplay monsterName={monster.creature} size={200} />
          </div>
          
          {/* MONSTER STATUS BADGES */}
          <div className="monster-status">
            {monster.poisonStacks > 0 && (
              <span className="status-badge poison">
                <span className="symbol">⌾</span> Poison{monster.poisonStacks > 1 ? ` x${monster.poisonStacks}` : ''}
              </span>
            )}
            {monster.isProtected && (
              <span className="status-badge protected">
                <span className="symbol">⌬</span> Protected
              </span>
            )}
            {monster.canHeal === false && (
              <span className="status-badge prevent">
                <span className="symbol">❦</span> No Heal
              </span>
            )}
            {hasActed && currentPlayer === 2 && (
              <span className="status-badge acted">
                <span className="symbol">✓</span> Acted
              </span>
            )}
          </div>
          
          {/* HEALTH BAR */}
          <div className="hp-container">
            <div className="hp-label">
              <span>HEALTH</span>
            </div>
            <div className="hp-bar">
              <div 
                className={`hp-fill ${hpClass}`}
                style={{ width: `${Math.max(hpPercentage, 0)}%` }}
              ></div>
            </div>
          </div>
          
          {/* ABILITIES FOR PLAYER 2 */}
          <div className="ability-grid-battle">
            <div 
              className={`ability-slot-battle relative ${
                selectedAbility?.monster?.creature === monster.creature && 
                selectedAbility?.abilityKey === 'ability1Symbols' ? 'active' : ''
              } ${
                hasActed || monster.currentHp <= 0 || currentPlayer !== 2 ? 'disabled' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasActed && 
                    monster.currentHp > 0 && 
                    currentPlayer === 2 && 
                    !targetMode) {
                  handleAbilitySelect(monster, 'ability1Symbols', 2);
                }
              }}
            >
              <div className="ability-symbol symbol symbol-damage">{monster.ability1Symbols}</div>
              <div className="ability-label">Ability 1</div>
            </div>
            <div 
              className={`ability-slot-battle relative ${
                selectedAbility?.monster?.creature === monster.creature && 
                selectedAbility?.abilityKey === 'ability2Symbols' ? 'active' : ''
              } ${
                hasActed || monster.currentHp <= 0 || currentPlayer !== 2 ? 'disabled' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasActed && 
                    monster.currentHp > 0 && 
                    currentPlayer === 2 && 
                    !targetMode) {
                  handleAbilitySelect(monster, 'ability2Symbols', 2);
                }
              }}
            >
              <div className="ability-symbol">{monster.ability2Symbols}</div>
              <div className="ability-label">Ability 2</div>
            </div>
            <div 
              className={`ability-slot-battle relative ${
                selectedAbility?.monster?.creature === monster.creature && 
                selectedAbility?.abilityKey === 'ability3Symbols' ? 'active' : ''
              } ${
                hasActed || monster.currentHp <= 0 || currentPlayer !== 2 ? 'disabled' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasActed && 
                    monster.currentHp > 0 && 
                    currentPlayer === 2 && 
                    !targetMode) {
                  handleAbilitySelect(monster, 'ability3Symbols', 2);
                }
              }}
            >
              <div className="ability-symbol">{monster.ability3Symbols}</div>
              <div className="ability-label">Ability 3</div>
            </div>
          </div>
          
          {/* REFLECT INDICATOR */}
          {(monster.ability1Symbols.includes('⌮') || monster.ability2Symbols.includes('⌮') || monster.ability3Symbols.includes('⌮')) && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-600/80 to-amber-500/80 text-white text-xs px-2 py-1 rounded-full">
                <span className="symbol symbol-reflect">⌮</span>
                <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3} uses</span>
              </div>
            </div>
          )}
          
          {/* ACTION INDICATORS */}
          {isSelected && !targetMode && currentPlayer === 2 && (
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full">
                <span className="symbol">✨</span> Selected
              </div>
            </div>
          )}
          
          {targetMode && isSelected && currentPlayer === 2 && (
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                <span className="symbol">🎯</span> Selecting Target...
              </div>
            </div>
          )}
          
          {isTargetable && (
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                <span className="symbol">🎯</span> Click to Target
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

  <div className="log-and-info-container">
  <div className="info-toggle-container">
    <button className="info-toggle-button" onClick={() => setIsInfoVisible(!isInfoVisible)}>
      <span className="symbol">{isInfoVisible ? '📖' : '📖'}</span>
      <span>{isInfoVisible ? 'Hide Rules & Symbols' : 'Show Rules & Symbols'}</span>
    </button>
    
    {/* SHOW END TURN BUTTON FOR CURRENT PLAYER */}
    {currentPlayer === 1 ? (
      <button
        onClick={endTurn}
        className="end-turn-button"
        disabled={movesMade === 0}
      >
        End Turn (Player 1)
      </button>
    ) : (
      <button
        onClick={endTurn}
        className="end-turn-button"
        disabled={movesMade === 0}
      >
        End Turn (Player 2)
      </button>
    )}
  </div>
  
  <div className="log-panel">
    <h3>
      <span className="symbol">📜</span> Battle Log
    </h3>
    <div className="log-list">
      {logs.map((log, index) => (
        <div key={index} className="log-item">
          {log}
        </div>
      ))}
    </div>
  </div>
  
  {isInfoVisible && <>  {/* Symbols Guide */}
  <div className="info-card game-rules">
    <div className="info-card-header">
      <div className="info-card-title">
        <span className="symbol symbol-global">☀</span>
        <h3>SYMBOL GUIDE</h3>
      </div>
      <div className="info-card-subtitle">
        Master the language of monster abilities
      </div>
    </div>
    
    <div className="symbols-grid">
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-reflect">⌮</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Reflect</div>
          <div className="symbol-description">Reflects physical attack back to attacker (max 3 uses per battle)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-poison">❦</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Prevent Healing</div>
          <div className="symbol-description">Target cannot be healed this turn</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol">⌾</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Poison</div>
          <div className="symbol-description">Target loses 1 HP per turn (removed by healing)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-heal">✿</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Heal 50%</div>
          <div className="symbol-description">Heals half of current HP (rounded up)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-team">❅</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Team Heal</div>
          <div className="symbol-description">Heals all teammates by 3 HP (except self)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-protect">⌬</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Protect</div>
          <div className="symbol-description">Blocks next incoming attack for target</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-warning">⚠</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Self Wound</div>
          <div className="symbol-description">Inflicts half damage to self (rounded up)</div>
        </div>
      </div>
      
      <div className="symbol-entry">
        <div className="symbol-display">
          <span className="symbol symbol-global">☀</span>
        </div>
        <div className="symbol-details">
          <div className="symbol-name">Global Effect</div>
          <div className="symbol-description">Affects all creatures in play</div>
        </div>
      </div>
    </div>
    
    <div className="info-card-footer">
      <div className="footer-note">
        <span className="symbol">💡</span>
        <span>Combine symbols for powerful combos!</span>
      </div>
    </div>
  </div>

  {/* Game Rules */}
  <div className="info-card game-manual">
    <div className="info-card-header">
      <div className="info-card-title">
        <span className="symbol">📖</span>
        <h3>MONSTER REALM DUEL RULES</h3>
      </div>
      <div className="info-card-subtitle">
        How to command your monstrous army
      </div>
    </div>
    
    <div className="rules-content">
      <div className="rule-item">
        <div className="rule-icon">🃏</div>
        <div className="rule-text">
          <strong>DECK SIZE:</strong> Each player needs a full set of <strong>18 monster cards</strong>
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">⚔️</div>
        <div className="rule-text">
          <strong>TEAM SELECTION:</strong> Choose <strong>5 monsters</strong> from your collection for battle
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">⏱️</div>
        <div className="rule-text">
          <strong>TURN LIMITS:</strong> Turn 1: <strong>2 monsters</strong> can act. Turns 2 and onwards: <strong>All 5 monsters</strong> can act
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">🎯</div>
        <div className="rule-text">
          <strong>ACTIONS:</strong> Each monster may use <strong>one ability</strong> per turn (adjacent symbols combine)
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">💥</div>
        <div className="rule-text">
          <strong>DAMAGE:</strong> Numbers on abilities deal <strong>physical damage</strong> to opponents
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">❤️</div>
        <div className="rule-text">
          <strong>HEALTH SYSTEM:</strong> Monsters have <strong>two-digit HP</strong> displayed near their art
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">☠️</div>
        <div className="rule-text">
          <strong>DEFEAT:</strong> Lose when <strong>all your monsters reach 0 HP</strong>
        </div>
      </div>
      
      <div className="rule-item">
        <div className="rule-icon">⏳</div>
        <div className="rule-text">
          <strong>TIME LIMIT:</strong> Battle ends in a <strong>tie after 5 turns</strong> if no victor emerges
        </div>
      </div>
    </div>
    
    <div className="info-card-footer">
<div className="rule-item">
  <div className="rule-icon">🛡️</div>
  <div className="rule-text">
    <strong>REFLECT:</strong> Each creature with <strong>⌮</strong> can reflect <strong>3 damaging attacks</strong> (individual counter)
  </div>
</div>
    </div>
  </div></>}
</div>

        {/* Player 1 Team Section */}
       {/* Player 1 Team Section - Local Game */}
<div className="team-section player1-team">
  <h2 className="team-label player1">Player 1's Team</h2>
  <div className="team-container">
    {player1Team.map((monster, index) => {
      const hpPercentage = (monster.currentHp / monster.health) * 100;
      let hpClass = '';
      if (hpPercentage <= 30) hpClass = 'low';
      else if (hpPercentage <= 60) hpClass = 'medium';
      
      const hasActed = monstersActed.includes(monster.creature);
      const isSelected = selectedMonster?.creature === monster.creature;
      const isTargetable = targetMode && 
                         currentPlayer === 2 && 
                         monster.currentHp > 0 &&
                         selectedAbility?.player === 2;

      return (
        <div 
          key={index}
          className={`monster-card player1 ${
            hasActed ? 'acted' : ''
          } ${monster.currentHp <= 0 ? 'dead' : ''} ${
            isSelected ? 'selected' : ''
          } ${isTargetable ? 'targetable' : ''}`}
          onClick={() => {
            if (isTargetable) {
              handleTargetSelect(monster, 1);
            } else if (!targetMode && 
                      currentPlayer === 1 && 
                      monster.currentHp > 0 && 
                      !hasActed) {
              setSelectedMonster(monster);
              setSelectedAbility(null);
            }
          }}
        >
          <div className="monster-header">
            <h3 className="monster-name">{monster.creature}</h3>
            <span className="monster-hp">{monster.currentHp}/{monster.health}</span>
          </div>
          <div className="flex justify-center">
            <MonsterArtDisplay monsterName={monster.creature} size={200} />
          </div>
          
          {/* MONSTER STATUS BADGES */}
          <div className="monster-status">
            {monster.poisonStacks > 0 && (
              <span className="status-badge poison">
                <span className="symbol">⌾</span> Poison{monster.poisonStacks > 1 ? ` x${monster.poisonStacks}` : ''}
              </span>
            )}
            {monster.isProtected && (
              <span className="status-badge protected">
                <span className="symbol">⌬</span> Protected
              </span>
            )}
            {monster.canHeal === false && (
              <span className="status-badge prevent">
                <span className="symbol">❦</span> No Heal
              </span>
            )}
            {hasActed && (
              <span className="status-badge acted">
                <span className="symbol">✓</span> Acted
              </span>
            )}
          </div>
          
          {/* HEALTH BAR */}
          <div className="hp-container">
            <div className="hp-label">
              <span>HEALTH</span>
            </div>
            <div className="hp-bar">
              <div 
                className={`hp-fill ${hpClass}`}
                style={{ width: `${Math.max(hpPercentage, 0)}%` }}
              ></div>
            </div>
          </div>
          
          {/* ABILITIES - THIS IS WHAT WAS MISSING! */}
          <div className="ability-grid-battle">
            <div 
              className={`ability-slot-battle relative ${
                selectedAbility?.monster?.creature === monster.creature && 
                selectedAbility?.abilityKey === 'ability1Symbols' ? 'active' : ''
              } ${
                hasActed || monster.currentHp <= 0 || currentPlayer !== 1 ? 'disabled' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasActed && 
                    monster.currentHp > 0 && 
                    currentPlayer === 1 && 
                    !targetMode) {
                  handleAbilitySelect(monster, 'ability1Symbols', 1);
                }
              }}
            >
              <div className="ability-symbol symbol symbol-damage">{monster.ability1Symbols}</div>
              <div className="ability-label">Ability 1</div>
            </div>
            <div 
              className={`ability-slot-battle relative ${
                selectedAbility?.monster?.creature === monster.creature && 
                selectedAbility?.abilityKey === 'ability2Symbols' ? 'active' : ''
              } ${
                hasActed || monster.currentHp <= 0 || currentPlayer !== 1 ? 'disabled' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasActed && 
                    monster.currentHp > 0 && 
                    currentPlayer === 1 && 
                    !targetMode) {
                  handleAbilitySelect(monster, 'ability2Symbols', 1);
                }
              }}
            >
              <div className="ability-symbol">{monster.ability2Symbols}</div>
              <div className="ability-label">Ability 2</div>
            </div>
            <div 
              className={`ability-slot-battle relative ${
                selectedAbility?.monster?.creature === monster.creature && 
                selectedAbility?.abilityKey === 'ability3Symbols' ? 'active' : ''
              } ${
                hasActed || monster.currentHp <= 0 || currentPlayer !== 1 ? 'disabled' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasActed && 
                    monster.currentHp > 0 && 
                    currentPlayer === 1 && 
                    !targetMode) {
                  handleAbilitySelect(monster, 'ability3Symbols', 1);
                }
              }}
            >
              <div className="ability-symbol">{monster.ability3Symbols}</div>
              <div className="ability-label">Ability 3</div>
            </div>
          </div>
          
          {/* REFLECT INDICATOR */}
          {(monster.ability1Symbols.includes('⌮') || monster.ability2Symbols.includes('⌮') || monster.ability3Symbols.includes('⌮')) && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-600/80 to-amber-500/80 text-white text-xs px-2 py-1 rounded-full">
                <span className="symbol symbol-reflect">⌮</span>
                <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3} uses</span>
              </div>
            </div>
          )}
          
          {/* ACTION INDICATOR */}
          {isSelected && !targetMode && (
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full">
                <span className="symbol">✨</span> Selected
              </div>
            </div>
          )}
          
          {targetMode && isSelected && (
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                <span className="symbol">🎯</span> Selecting Target...
              </div>
            </div>
          )}
          
          {isTargetable && (
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                <span className="symbol">🎯</span> Click to Target
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
      </div>

      {gameState === 'gameOver' && (
        <div className="game-over-modal">
          <div className="game-over-content">
            <h2 className="game-over-title">GAME OVER</h2>
            <p className="game-over-message">
              {player1Team.filter(m => m.currentHp > 0).length === 0 && player2Team.filter(m => m.currentHp > 0).length === 0
                ? "It's a draw!"
                : player1Team.filter(m => m.currentHp > 0).length === 0
                ? "Player 2 Wins!"
                : "Player 1 Wins!"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="play-again-button"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonsterRealmDuelLocal;