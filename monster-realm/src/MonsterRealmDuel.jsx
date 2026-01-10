// MonsterRealmDuel.jsx

import React, { useState, useEffect } from 'react';
import MonsterArtDisplay from './MonsterArtDisplay';

import "./symbols.css"
import "./App.css"
import * as Art from "./LineArt";




// const MONSTER_DATA = [
//   { "creature": "ORCHID MANTIS", "health": 6, "ability1Symbols": "1", "ability2Symbols": "❅", "ability3Symbols": "⌬" },
//   { "creature": "PANGOLIN", "health": 15, "ability1Symbols": "3", "ability2Symbols": "⌾", "ability3Symbols": "⌬" },
//   { "creature": "PEACOCK SPIDER", "health": 12, "ability1Symbols": "1", "ability2Symbols": "⌾⌬", "ability3Symbols": "❅" },
//   { "creature": "FUNGUS BEETLE", "health": 10, "ability1Symbols": "1", "ability2Symbols": "✿", "ability3Symbols": "❅" },
//   { "creature": "RAFFLESIA", "health": 15, "ability1Symbols": "3", "ability2Symbols": "☀⌾", "ability3Symbols": "☀❦" },
//   { "creature": "TARDIGRADE", "health": 23, "ability1Symbols": "1", "ability2Symbols": "✿", "ability3Symbols": "⌬" },
//   { "creature": "T.M. NAMIBIENSIS", "health": 23, "ability1Symbols": "1", "ability2Symbols": "⌬", "ability3Symbols": "⌾" },
//   { "creature": "VAMPIRE SQUID", "health": 10, "ability1Symbols": "3", "ability2Symbols": "❦", "ability3Symbols": "⌾" },
//   { "creature": "WELWITSCHIA MIRABILIS", "health": 15, "ability1Symbols": "2", "ability2Symbols": "⌬", "ability3Symbols": "⌮" },
//   { "creature": "BIOLUM. MYCENA", "health": 7, "ability1Symbols": "3", "ability2Symbols": "☀✿", "ability3Symbols": "☀⌾" },
//   { "creature": "BIRD'S NEST FUNGUS", "health": 10, "ability1Symbols": "3", "ability2Symbols": "✿", "ability3Symbols": "☀⚠⌮" },
//   { "creature": "CORDYCEPS", "health": 5, "ability1Symbols": "5", "ability2Symbols": "⌾", "ability3Symbols": "☀❦" },
//   { "creature": "DEVIL'S CIGAR", "health": 1, "ability1Symbols": "⚠15", "ability2Symbols": "☀✿", "ability3Symbols": "☀⌾" },
//   { "creature": "GHOST BAT", "health": 6, "ability1Symbols": "6", "ability2Symbols": "⌾", "ability3Symbols": "❦" },
//   { "creature": "GLOWING ROACH", "health": 10, "ability1Symbols": "2", "ability2Symbols": "✿", "ability3Symbols": "⌮" },
//   { "creature": "JEWEL WASP", "health": 5, "ability1Symbols": "5", "ability2Symbols": "⌾3", "ability3Symbols": "❦3" },
//   { "creature": "LEAFY SEA DRAGON", "health": 13, "ability1Symbols": "1", "ability2Symbols": "⌬", "ability3Symbols": "⌾" },
//   { "creature": "LITHOPS", "health": 10, "ability1Symbols": "3", "ability2Symbols": "⌬", "ability3Symbols": "⌮" }
// ];


const MONSTER_DATA = [
  { "creature": "ORCHID MANTIS", "health": 6, "ability1Symbols": "1", "ability2Symbols": "❅", "ability3Symbols": "⌬", "imageUrl": "https://cdn.hswstatic.com/gif/orchid-mantis2.jpg" },
  { "creature": "PANGOLIN", "health": 15, "ability1Symbols": "3", "ability2Symbols": "⌾", "ability3Symbols": "⌬", "imageUrl": "https://cdn.britannica.com/41/124241-050-9027A8EF/Pangolin.jpg" },
  { "creature": "PEACOCK SPIDER", "health": 12, "ability1Symbols": "1", "ability2Symbols": "⌾⌬", "ability3Symbols": "❅", "imageUrl": "https://allyouneedisbiology.wordpress.com/wp-content/uploads/2015/04/8150001846_31bc2d8827_b.jpg?w=1024&h=576&crop=1" },
  { "creature": "FUNGUS BEETLE", "health": 10, "ability1Symbols": "1", "ability2Symbols": "✿", "ability3Symbols": "❅", "imageUrl": "https://assets.vpm.org/dims4/default/a251bb6/2147483647/strip/true/crop/900x554+0+23/resize/880x542!/quality/90/?url=https%3A%2F%2Fk1-prod-vpm.s3.us-east-2.amazonaws.com%2Fbrightspot%2F27%2F73%2F66902d13d5d9b16c1882cf19ca2c%2Fteneb-bolitotherus-cornutus-evans.jpg" },
  { "creature": "RAFFLESIA", "health": 15, "ability1Symbols": "3", "ability2Symbols": "☀⌾", "ability3Symbols": "☀❦", "imageUrl": "https://cdn.britannica.com/67/235867-050-C91B09C3/Rafflesia-Sumatra-Indonesia.jpg" },
  { "creature": "TARDIGRADE", "health": 23, "ability1Symbols": "1", "ability2Symbols": "✿", "ability3Symbols": "⌬", "imageUrl": "https://cdn.shopify.com/s/files/1/0250/0623/files/AdobeStock_128343774.jpg?v=1696605398" },
  { "creature": "T.M. NAMIBIENSIS", "health": 23, "ability1Symbols": "1", "ability2Symbols": "⌬", "ability3Symbols": "⌾", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/40/Sulphide_bacteria_crop.jpg" }, // Same as Tardigrade (likely a variant)
  { "creature": "VAMPIRE SQUID", "health": 10, "ability1Symbols": "3", "ability2Symbols": "❦", "ability3Symbols": "⌾", "imageUrl": "https://i.natgeofe.com/n/79143b44-0ba9-4776-be70-ab948ba7225a/59704.jpg" },
  { "creature": "WELWITSCHIA MIRABILIS", "health": 15, "ability1Symbols": "2", "ability2Symbols": "⌬", "ability3Symbols": "⌮", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Welwitschia_mirabilis%282%29.jpg/1200px-Welwitschia_mirabilis%282%29.jpg" },
  { "creature": "BIOLUM. MYCENA", "health": 7, "ability1Symbols": "3", "ability2Symbols": "☀✿", "ability3Symbols": "☀⌾", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mycena_chlorophos.jpg/1200px-Mycena_chlorophos.jpg" },
  { "creature": "BIRD'S NEST FUNGUS", "health": 10, "ability1Symbols": "3", "ability2Symbols": "✿", "ability3Symbols": "☀⚠⌮", "imageUrl": "https://gardenbetty.com/wp-content/uploads/2020/09/birds-nest-fungus-08.jpg" },
  { "creature": "CORDYCEPS", "health": 5, "ability1Symbols": "5", "ability2Symbols": "⌾", "ability3Symbols": "☀❦", "imageUrl": "https://images.ctfassets.net/mrbo2ykgx5lt/45512/d3c6f795a48a76014c94bdb8b9cd430c/Cordyceps-image.jpg" },
  { "creature": "DEVIL'S CIGAR", "health": 1, "ability1Symbols": "⚠15", "ability2Symbols": "☀✿", "ability3Symbols": "☀⌾", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/18/Devil%27s_cigar_Chorioactis_geaster.jpg" }, // Texas horned lizard (aka "devil's cigar" fungus host resemblance)
  { "creature": "GHOST BAT", "health": 6, "ability1Symbols": "6", "ability2Symbols": "⌾", "ability3Symbols": "❦", "imageUrl": "https://www.australianwildlife.org/sites/default/files/media/image/2024-12/Ghost%20Bat-2.jpg" },
  { "creature": "GLOWING ROACH", "health": 10, "ability1Symbols": "2", "ability2Symbols": "✿", "ability3Symbols": "⌮", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/88/Glowing-roaches.jpg" },
  { "creature": "JEWEL WASP", "health": 5, "ability1Symbols": "5", "ability2Symbols": "⌾3", "ability3Symbols": "❦3", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Emerald_Cockroach_Wasp.JPG" },
  { "creature": "LEAFY SEA DRAGON", "health": 13, "ability1Symbols": "1", "ability2Symbols": "⌬", "ability3Symbols": "⌾", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Leafy_Seadragon_on_Kangaroo_Island.jpg" },
  { "creature": "LITHOPS", "health": 10, "ability1Symbols": "3", "ability2Symbols": "⌬", "ability3Symbols": "⌮", "imageUrl": "https://cdn.mos.cms.futurecdn.net/D278Dj48ErCoY4eoPwCaCF-1600-80.jpg" }
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

const MonsterCard = ({ monster, isPlayer, isActive, onClick, showPoison, showProtected, isDead }) => {
  const hpPercentage = (monster.currentHp / monster.health) * 100;
  let hpBarClass = 'bg-green-500';
  if (hpPercentage <= 30) hpBarClass = 'bg-red-500';
  else if (hpPercentage <= 60) hpBarClass = 'bg-yellow-500';

  // Reflect counters (default to 3 uses if not initialized)
  const totalReflect = monster.reflectUses ?? 3;
  const usedReflect = monster.reflectUsesUsed ?? 0;
  const reflectRemaining = Math.max(0, totalReflect - usedReflect);

  return (
<div 
      className={`
        relative bg-gray-800 rounded-lg p-4 border-2 transition-all
        ${isPlayer ? 'border-blue-500' : 'border-red-500'}
        ${isActive ? 'ring-4 ring-yellow-400' : ''}
        ${isDead ? 'opacity-40 grayscale' : 'hover:scale-105'}
      `}
      onClick={onClick}
      style={{ width: '180px' }}
    >
      <div className="mb-2">
        <h3 className="text-white font-bold text-sm truncate">{monster.creature}</h3>
      </div>
      
      {/* Replace image with line art */}
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
        {/* Prevent Healing badge (shows when monster cannot be healed this turn) */}
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

      {/* reflect indicator */}
      
{(monster.ability1Symbols.includes('⌮') || 
 monster.ability2Symbols.includes('⌮') || 
 monster.ability3Symbols.includes('⌮')) ? (
  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
    <span className="symbol symbol-reflect">⌮</span>
    <span>{reflectRemaining}/{totalReflect} uses</span>
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

const MonsterRealmGame = () => {
  const [gameState, setGameState] = useState('selection');
  const [playerTeam, setPlayerTeam] = useState([]);
  const [cpuTeam, setCpuTeam] = useState([]);
  const [turn, setTurn] = useState(1);
  const [logs, setLogs] = useState(["Welcome to Monster Realm!"]);
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [targetMode, setTargetMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('player');
  const [monstersActed, setMonstersActed] = useState([]);
  const [playerMovesMade, setPlayerMovesMade] = useState(0);
  const [cpuMovesMade, setCpuMovesMade] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
//   const [totalReflectUses, setTotalReflectUses] = useState(0);
  
// Player Turn Auto-End Effect
useEffect(() => {
  if (currentPlayer !== 'player') return;
  if (playerTeam.length === 0) return;  // Skip during team selection

  const maxMoves = turn === 1 ? 2 : 5;

  // Check if player has used all moves
  if (playerMovesMade >= maxMoves) {
    setTimeout(() => {
      addLog("Player's turn complete. CPU's turn begins.");
      setCurrentPlayer('cpu');
      setCpuMovesMade(0);
      setMonstersActed([]);
      // Reset selection states
      setSelectedMonster(null);
      setSelectedAbility(null);
      setTargetMode(false);
    }, 1000);
    return;
  }




  
  // Check if player has no more monsters that can act
  const aliveAndNotActed = playerTeam.filter(
    m => m.currentHp > 0 && !monstersActed.includes(m.creature)
  );

  if (aliveAndNotActed.length === 0 && playerMovesMade < maxMoves) {
    // This means they ran out of acting monsters before using all moves
    addLog("No more monsters can act. Ending your turn.");
    setTimeout(() => {
      setCurrentPlayer('cpu');
      setCpuMovesMade(0);
      setMonstersActed([]);
      setSelectedMonster(null);
      setSelectedAbility(null);
      setTargetMode(false);
    }, 1200);
  }
}, [currentPlayer, playerMovesMade, playerTeam, monstersActed, turn]);



  // CPU Turn Automation Effect
// CPU Turn Automation Effect
useEffect(() => {
  if (currentPlayer !== 'cpu') return;

  const maxMoves = turn === 1 ? 2 : 5;

  // If CPU has used all moves → end turn
  if (cpuMovesMade >= maxMoves) {
    setTimeout(() => {
      addLog("CPU's turn complete.");
      endTurn();
    }, 1200);
    return;
  }

  // If no monsters can act → end turn early
  const aliveMonsters = cpuTeam.filter(
    m => m.currentHp > 0 && !monstersActed.includes(m.creature)
  );

  if (aliveMonsters.length === 0) {
    setTimeout(() => {
      addLog("CPU has no monsters able to act.");
      endTurn();
    }, 1200);
    return;
  }

  // Otherwise: CPU makes a move after a short delay
  const timer = setTimeout(() => {
    // Get fresh state
    const freshAlive = cpuTeam.filter(
      m => m.currentHp > 0 && !monstersActed.includes(m.creature)
    );

    if (freshAlive.length === 0) {
      addLog("CPU has no more actions available.");
      endTurn();
      return;
    }

    const monster = freshAlive[Math.floor(Math.random() * freshAlive.length)];
    const abilities = ['ability1Symbols', 'ability2Symbols', 'ability3Symbols'];
    const abilityKey = abilities[Math.floor(Math.random() * abilities.length)];
    const ability = monster[abilityKey];
    const parsedEffects = parseSymbols(ability);

    let targetData = null;

    // FIX: Include poison-only abilities in targeting logic
    if ((parsedEffects.dmg > 0 || parsedEffects.poison || parsedEffects.preventHeal) && !parsedEffects.isGlobal) {
      const playerAlive = playerTeam.filter(m => m.currentHp > 0);
      if (playerAlive.length > 0) {
        const target = playerAlive[Math.floor(Math.random() * playerAlive.length)];
        targetData = { target, isPlayerTarget: true };
      }
    }

    executeAbility(monster, abilityKey, parsedEffects, ability, targetData);
  }, 1200);

  return () => clearTimeout(timer);
}, [currentPlayer, cpuMovesMade, cpuTeam, playerTeam, monstersActed, turn]);

  // Fix the logs structure - ensure logs are strings, not objects
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
  reflectUses: 3, // Each monster gets 3 reflect uses
  reflectUsesUsed: 0 // Track how many they've used
});

  const toggleSelect = (monster) => {
    if (playerTeam.find(m => m.creature === monster.creature)) {
      setPlayerTeam(playerTeam.filter(m => m.creature !== monster.creature));
    } else if (playerTeam.length < 5) {
      setPlayerTeam([...playerTeam, initializeMonster(monster)]);
    }
  };

  const startBattle = () => {
    const cpuPicks = [...MONSTER_DATA]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map(m => initializeMonster(m));
    
    setCpuTeam(cpuPicks);
    setGameState('battle');
    setMonstersActed([]);
    setPlayerMovesMade(0);
    setCpuMovesMade(0);
    setTurn(1);
    setCurrentPlayer('player');
    addLog("Battle started! Turn 1: Each player may only use 2 monsters.");
  };

 const handleAbilitySelect = (monster, abilityKey) => {
  if (currentPlayer !== 'player' || monster.currentHp <= 0) return;
  
  if (monstersActed.includes(monster.creature)) {
    addLog(`${monster.creature} has already acted this turn!`);
    return;
  }
  
  const maxMoves = turn === 1 ? 2 : 5;
  if (playerMovesMade >= maxMoves) {
    addLog(`You've used all ${maxMoves} moves for this turn!`);
    return;
  }
  
  const ability = monster[abilityKey];
  const effects = parseSymbols(ability);
  
  // Enter target mode if ability requires targeting (damage OR poison OR preventHeal)
  const requiresTarget = (effects.dmg > 0 || effects.poison || effects.preventHeal) && !effects.isGlobal;
  
  if (requiresTarget) {
    setSelectedAbility({ monster, abilityKey, effects, ability });
    setSelectedMonster(monster);
    setTargetMode(true);
    addLog(`Select target for ${monster.creature}'s ability: ${ability}`);
  } else {
    // Execute immediately for global or self-targeting abilities
    executeAbility(monster, abilityKey, effects, ability);
  }
};

  const handleTargetSelect = (targetMonster, isPlayerTarget) => {
    if (!selectedAbility || !targetMode) return;
    
    const { monster, abilityKey, effects, ability } = selectedAbility;
    
    executeAbility(monster, abilityKey, effects, ability, {
      target: targetMonster,
      isPlayerTarget
    });
    
    setSelectedAbility(null);
    setSelectedMonster(null);
    setTargetMode(false);
  };

const executeAbility = (actor, abilityKey, effects, ability, targetData = null) => {
  const abilityText = actor[abilityKey];
  
  // Clone the current state
  let updatedPlayerTeam = [...playerTeam];
  let updatedCpuTeam = [...cpuTeam];
  
  const isPlayerAction = currentPlayer === 'player';
  let actorTeam = isPlayerAction ? updatedPlayerTeam : updatedCpuTeam;
  let targetTeam = isPlayerAction ? updatedCpuTeam : updatedPlayerTeam;
  
  // Find actor
  const actorIndex = actorTeam.findIndex(m => m.creature === actor.creature);
  if (actorIndex === -1) return;
  
  let updatedActor = { ...actorTeam[actorIndex] };
  const newLogs = [];
  
  newLogs.push(`${updatedActor.creature} uses ${abilityText}`);
  
  // Mark as acted
  setMonstersActed(prev => [...prev, updatedActor.creature]);
  
  // Update move counters
  if (isPlayerAction) {
    setPlayerMovesMade(prev => prev + 1);
  } else {
    setCpuMovesMade(prev => prev + 1);
  }
  
  // Apply self wound
  if (effects.selfWound && effects.dmg > 0) {
    const woundDamage = Math.ceil(effects.dmg / 2);
    updatedActor.currentHp = Math.max(0, updatedActor.currentHp - woundDamage);
    newLogs.push(`${updatedActor.creature} wounded itself for ${woundDamage} damage`);
  }
  
  // Bird's Nest Fungus special handling
// Special handling for Bird's Nest Fungus combo - PUT THIS AFTER SELF-WOUND LOGIC BUT BEFORE TARGET FINDING
if (effects.selfWound && effects.reflect && effects.isGlobal && effects.dmg === 0) {
  // This is the "☀⚠⌮" combo (no damage number, just symbols)
  const selfWoundDamage = 2; // 1.5 rounded up
  
  // Check if THIS monster has reflect uses remaining
  if (updatedActor.reflectUsesUsed < updatedActor.reflectUses) {
    // The self-wound damage gets REFLECTED to ALL opponents instead of hitting self
    newLogs.push(`${updatedActor.creature} attempts to wound itself for ${selfWoundDamage} damage, but reflects it to all opponents!`);
    
    // Apply the reflected damage to ALL opponent creatures
    targetTeam.forEach((target, index) => {
      if (target.currentHp > 0) {
        const updatedTarget = { ...targetTeam[index] };
        updatedTarget.currentHp = Math.max(0, updatedTarget.currentHp - selfWoundDamage);
        targetTeam[index] = updatedTarget;
        newLogs.push(`${updatedActor.creature} reflects ${selfWoundDamage} damage to ${updatedTarget.creature}`);
      }
    });
    
    // Monster takes NO damage because it was all reflected
    
    // Consume one of THIS monster's reflect uses
    updatedActor.reflectUsesUsed += 1;
    newLogs.push(`${updatedActor.creature} has ${updatedActor.reflectUses - updatedActor.reflectUsesUsed} reflect uses remaining`);
  } else {
    // If THIS monster's reflect uses are exhausted, then the self-wound hits the monster itself
    updatedActor.currentHp = Math.max(0, updatedActor.currentHp - selfWoundDamage);
    newLogs.push(`${updatedActor.creature} wounds itself for ${selfWoundDamage} damage (no reflect uses left)`);
  }
  
  // Skip the regular targeting logic for this combo
  actorTeam[actorIndex] = updatedActor;
  
  // Update state and return early
  if (isPlayerAction) {
    setPlayerTeam(actorTeam);
    setCpuTeam(targetTeam);
  } else {
    setCpuTeam(actorTeam);
    setPlayerTeam(targetTeam);
  }
  
  newLogs.forEach(log => addLog(log));
  
  // Check turn end logic...
  return;
}
  
  // Find targets
  let targets = [];
  if (effects.isGlobal) {
    if (effects.dmg > 0 || effects.poison || effects.preventHeal) {
      targets = targetTeam.filter(m => m.currentHp > 0);
    }
  } else if (targetData) {
    const targetIndex = targetTeam.findIndex(m => m.creature === targetData.target.creature);
    if (targetIndex !== -1) {
      targets = [targetTeam[targetIndex]];
    }
  } else if (effects.dmg > 0 || effects.poison || effects.preventHeal) {
    const aliveTargets = targetTeam.filter(m => m.currentHp > 0);
    if (aliveTargets.length > 0) {
      const randomTarget = aliveTargets[Math.floor(Math.random() * aliveTargets.length)];
      const targetIndex = targetTeam.findIndex(m => m.creature === randomTarget.creature);
      if (targetIndex !== -1) {
        targets = [targetTeam[targetIndex]];
      }
    }
  }
  
  // Apply effects to targets
  targets.forEach((target) => {
    if (!target || target.currentHp <= 0) return;
    
    const targetIndex = targetTeam.findIndex(m => m.creature === target.creature);
    if (targetIndex === -1) return;
    
    const updatedTarget = { ...targetTeam[targetIndex] };
    
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
    
    targetTeam[targetIndex] = updatedTarget;
  });
  
  // Update actor
  actorTeam[actorIndex] = updatedActor;
  
  // Apply healing effects
  if (effects.healHalf) {
    if (effects.isGlobal) {
        newLogs.push(`${updatedActor.creature} unleashes a global heal on their team!`);
        
        const applyGlobalHeal = (team) => {
            return team.map(monster => {
                if (monster.currentHp > 0 && monster.canHeal) {
                    const healAmount = Math.ceil(monster.health / 2);
                    const newHp = Math.min(monster.maxHp, monster.currentHp + healAmount);
                    if (newHp > monster.currentHp) {
                       newLogs.push(`${monster.creature} healed for ${newHp - monster.currentHp} HP.`);
                    }
                    return { ...monster, currentHp: newHp, poisonStacks: 0 };
                }
                return monster;
            });
        };
        
        if (isPlayerAction) {
            updatedPlayerTeam = applyGlobalHeal(actorTeam);
        } else {
            updatedCpuTeam = applyGlobalHeal(actorTeam);
        }

    } else if (updatedActor.canHeal) { // non-global heal half
        const healAmount = Math.ceil(updatedActor.health / 2);
        updatedActor.currentHp = Math.min(updatedActor.maxHp, updatedActor.currentHp + healAmount);
        updatedActor.poisonStacks = 0;
        newLogs.push(`${updatedActor.creature} healed ${healAmount} HP and cured poison`);
    }
  }
  
  if (effects.healTeam) {
    actorTeam.forEach((teammate, index) => {
      if (teammate.creature !== updatedActor.creature && 
          teammate.currentHp > 0 && 
          teammate.canHeal) {
        const healedTeammate = { ...actorTeam[index] };
        healedTeammate.currentHp = Math.min(healedTeammate.maxHp, healedTeammate.currentHp + 3);
        healedTeammate.poisonStacks = 0;
        actorTeam[index] = healedTeammate;
        newLogs.push(`${healedTeammate.creature} healed 3 HP`);
      }
    });
  }
  
  // Apply protection
  if (effects.protect && !effects.isGlobal) {
    updatedActor.isProtected = true;
    actorTeam[actorIndex] = updatedActor;
    newLogs.push(`${updatedActor.creature} is now protected (blocks next attack)`);
  } else if (effects.protect && effects.isGlobal) {
    actorTeam.forEach((teammate, index) => {
      if (teammate.currentHp > 0) {
        const protectedTeammate = { ...actorTeam[index] };
        protectedTeammate.isProtected = true;
        actorTeam[index] = protectedTeammate;
      }
    });
    newLogs.push(`${updatedActor.creature} protected the entire team (each blocks next attack)`);
  }
  
  // Update state
  if (isPlayerAction) {
    setPlayerTeam(updatedPlayerTeam);
    setCpuTeam(updatedCpuTeam);
  } else {
    setCpuTeam(updatedCpuTeam);
    setPlayerTeam(updatedPlayerTeam);
  }
  
  newLogs.forEach(log => addLog(log));
  
  // Check turn end
  const maxMoves = turn === 1 ? 2 : 5;
  
  if (isPlayerAction && (playerMovesMade + 1) >= maxMoves) {
    setTimeout(() => {
      addLog("Player's turn complete. CPU's turn begins.");
      setCurrentPlayer('cpu');
      setCpuMovesMade(0);
      setMonstersActed([]);
    }, 1000);
  }
};

// const cpuTurn = () => {
//   console.log("CPU Turn called, current state:", {
//     cpuMovesMade,
//     turn,
//     maxMoves: turn === 1 ? 2 : 5,
//     monstersActed,
//     cpuTeamLength: cpuTeam.length,
//     aliveMonsters: cpuTeam.filter(m => m.currentHp > 0).length
//   });
  
//   // Get alive monsters that haven't acted this turn
//   const aliveMonsters = cpuTeam.filter(m => 
//     m.currentHp > 0 && 
//     !monstersActed.includes(m.creature)
//   );
  
//   console.log("Alive monsters that can act:", aliveMonsters.length);
  
//   if (aliveMonsters.length === 0) {
//     console.log("No alive monsters can act, ending turn");
//     setTimeout(endTurn, 1000);
//     return;
//   }

//   const maxMoves = turn === 1 ? 2 : 5;
  
//   console.log(`CPU moves made: ${cpuMovesMade}/${maxMoves}`);
  
//   if (cpuMovesMade >= maxMoves) {
//     console.log("CPU used all moves, ending turn");
//     setTimeout(endTurn, 1000);
//     return;
//   }

//   // Pick a random alive monster
//   const monster = aliveMonsters[Math.floor(Math.random() * aliveMonsters.length)];
  
//   console.log(`CPU selected ${monster.creature} to act`);
  
//   // Pick a random ability
//   const abilities = ['ability1Symbols', 'ability2Symbols', 'ability3Symbols'];
//   const abilityKey = abilities[Math.floor(Math.random() * abilities.length)];
  
//   const ability = monster[abilityKey];
//   const effects = parseSymbols(ability);
  
//   console.log(`CPU using ability ${abilityKey}: ${ability}`);
  
//   let targetData = null;
  
//   // If ability requires a target, pick a random player monster
//   if (effects.dmg > 0 && !effects.isGlobal) {
//     const playerAlive = playerTeam.filter(m => m.currentHp > 0);
//     if (playerAlive.length > 0) {
//       const target = playerAlive[Math.floor(Math.random() * playerAlive.length)];
//       targetData = {
//         target,
//         isPlayerTarget: true
//       };
//       console.log(`CPU targeting ${target.creature}`);
//     } else {
//       console.log("No alive player targets found");
//     }
//   } else if (effects.isGlobal) {
//     console.log("CPU using global ability");
//   }
  
//   executeAbility(monster, abilityKey, effects, ability, targetData);
// };

const endTurn = () => {
  console.log("Ending turn, current turn:", turn);
  
  // Apply poison damage
  const applyPoison = (team) => {
    return team.map(monster => {
      const updatedMonster = { ...monster };
      const stacks = updatedMonster.poisonStacks || 0;
      if (stacks > 0 && updatedMonster.currentHp > 0) {
        const dmg = stacks;
        updatedMonster.currentHp = Math.max(0, updatedMonster.currentHp - dmg);
        addLog(`${updatedMonster.creature} took ${dmg} poison damage`);
      }
      return updatedMonster;
    });
  };

  const pTeam = applyPoison(playerTeam);
  const cTeam = applyPoison(cpuTeam);
  
  // Reset per-turn states
  const resetTeam = (team) => team.map(m => ({
    ...m,
    canHeal: true,
  }));
  
  const updatedPlayerTeam = resetTeam(pTeam);
  const updatedCpuTeam = resetTeam(cTeam);
  
  setPlayerTeam(updatedPlayerTeam);
  setCpuTeam(updatedCpuTeam);
  
  const newTurn = turn + 1;
  
  const playerAlive = updatedPlayerTeam.filter(m => m.currentHp > 0).length;
  const cpuAlive = updatedCpuTeam.filter(m => m.currentHp > 0).length;
  
  console.log("Win check:", { playerAlive, cpuAlive, newTurn });
  
  // Game only ends when one team is completely defeated
  if (playerAlive === 0 && cpuAlive === 0) {
    addLog("Game Over! It's a draw!");
    setGameState('gameOver');
  } else if (playerAlive === 0) {
    addLog("Game Over! CPU wins!");
    setGameState('gameOver');
  } else if (cpuAlive === 0) {
    addLog("Game Over! Player wins!");
    setGameState('gameOver');
  } else {
    // Continue playing - no turn limit
    setTurn(newTurn);
    setMonstersActed([]);
    setPlayerMovesMade(0);
    setCpuMovesMade(0);
    setCurrentPlayer('player');
    setSelectedMonster(null);
    setSelectedAbility(null);
    setTargetMode(false);
    
    const maxMoves = newTurn === 1 ? 2 : 5;
    addLog(`Turn ${newTurn} begins! Each player may use ${maxMoves} monsters.`);
    
    console.log(`New turn ${newTurn} started, player's turn begins`);
  }
};

  if (gameState === 'selection') {
    return (
      <div className="game-container">
        <header className="game-header">
          <h1 className="game-title">MONSTER REALM</h1>
          <p className="game-subtitle">Select 5 monsters for your team</p>
          <div className="selection-counter">
            <span className="font-bold text-green-400">{playerTeam.length}/5</span>
            <span className="text-gray-400"> Selected</span>
          </div>
        </header>

        <div className="selection-grid">
          {MONSTER_DATA.map(monster => {
            const isSelected = playerTeam.find(m => m.creature === monster.creature);
            return (
              <div
                key={monster.creature}
                className={`selection-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleSelect(monster)}
              >
                <div className="selection-card-header">
                  <h3 className="selection-card-name">{monster.creature}</h3>
                  <div className="selection-card-header">
</div>
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
                </div>

                {/* Show reflect uses on selection cards if the monster has reflect */}
                {(monster.ability1Symbols.includes('⌮') || monster.ability2Symbols.includes('⌮') || monster.ability3Symbols.includes('⌮')) && (
                  <div className="mt-2 inline-block bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-2">
                    <span className="symbol symbol-reflect">⌮</span>
                    <span>3 uses</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="game-controls">
          {playerTeam.length === 5 ? (
            <button
              onClick={startBattle}
              className="start-button"
            >
              START BATTLE
            </button>
          ) : (
            <div className="text-gray-400 py-4">
              Select {5 - playerTeam.length} more monster{5 - playerTeam.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        <div className="game-info-section">
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
          <strong>TURN LIMITS:</strong> Turn 1: <strong>2 monsters</strong> can act. Turns 2-5: <strong>All 5 monsters</strong> can act
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
      </div>
    );
  }

  return (
    <div className="battle-container">
      {/* Battle Header */}
      <div className="battle-header">
        <div>
          <h1 className="battle-title">MONSTER REALM BATTLE</h1>
          <div className="battle-info-grid">
            <div className="info-card">
              <div className="info-label">Turn</div>
              <div className="info-value">{turn}/5</div>
            </div>
            <div className="info-card">
              <div className="info-label">Moves</div>
              <div className="info-value">
                {currentPlayer === 'player' ? playerMovesMade : cpuMovesMade}/{turn === 1 ? 2 : 5}
              </div>
            </div>
            <div className={`turn-indicator ${currentPlayer === 'cpu' ? 'cpu-turn' : ''}`}>
              {currentPlayer === 'player' ? 'Your Turn' : 'CPU Turn'}
            </div>
            {/* <div className="info-card reflect-counter">
              <div className="info-label">Reflect Uses</div>
              <div className="info-value">{totalReflectUses}/3</div>
            </div> */}
          </div>
        </div>
        
     </div>


      <div className="battle-grid">

      {/* CPU Team Section */}
      <div className="team-section cpu-team">
        <h2 className="team-label cpu">CPU Team</h2>
        <div className="team-container">
          {cpuTeam.map((monster, index) => {
            const hpPercentage = (monster.currentHp / monster.health) * 100;
            let hpClass = '';
            if (hpPercentage <= 30) hpClass = 'low';
            else if (hpPercentage <= 60) hpClass = 'medium';

            return (
              <div 
                key={index}
                className={`monster-card cpu ${
                  targetMode ? 'targetable' : ''
                } ${monster.currentHp <= 0 ? 'dead' : ''}`}
                onClick={() => {
                  if (targetMode && monster.currentHp > 0) {
                    handleTargetSelect(monster, false);
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
                </div>
                
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
                
                <div className="ability-grid-battle">
                  <div className="ability-slot-battle relative">
                    <div className="ability-symbol symbol symbol-damage">{monster.ability1Symbols}</div>
                    {(monster.ability1Symbols.includes('☀') && monster.ability1Symbols.includes('⚠') && monster.ability1Symbols.includes('⌮')) && (
                      <div className="absolute top-1 right-1 bg-amber-700/80 text-white text-[10px] px-1 py-0.5 rounded flex items-center gap-1">
                        <span className="symbol symbol-reflect">⌮</span>
                        <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3}</span>
                      </div>
                    )}
                    <div className="ability-label">Ability 1</div>
                  </div>
                  <div className="ability-slot-battle relative">
                    <div className="ability-symbol">{monster.ability2Symbols}</div>
                    {(monster.ability2Symbols.includes('☀') && monster.ability2Symbols.includes('⚠') && monster.ability2Symbols.includes('⌮')) && (
                      <div className="absolute top-1 right-1 bg-amber-700/80 text-white text-[10px] px-1 py-0.5 rounded flex items-center gap-1">
                        <span className="symbol symbol-reflect">⌮</span>
                        <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3}</span>
                      </div>
                    )}
                    <div className="ability-label">Ability 2</div>
                  </div>
                  <div className="ability-slot-battle relative">
                    <div className="ability-symbol">{monster.ability3Symbols}</div>
                    {(monster.ability3Symbols.includes('☀') && monster.ability3Symbols.includes('⚠') && monster.ability3Symbols.includes('⌮')) && (
                      <div className="absolute top-1 right-1 bg-amber-700/80 text-white text-[10px] px-1 py-0.5 rounded flex items-center gap-1">
                        <span className="symbol symbol-reflect">⌮</span>
                        <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3}</span>
                      </div>
                    )}
                    <div className="ability-label">Ability 3</div>
                  </div>
                </div>
                
                {/* Target Mode Indicator */}
                {targetMode && monster.currentHp > 0 && (
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                      <span className="symbol">🎯</span> Click to Target
                    </div>
                  </div>
                )}
                
                {/* Reflect Indicator */}
                {(monster.ability1Symbols.includes('⌮') || monster.ability2Symbols.includes('⌮') || monster.ability3Symbols.includes('⌮')) && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-orange-600/80 to-amber-500/80 text-white text-xs px-2 py-1 rounded-full">
                      <span className="symbol symbol-reflect">⌮</span>
                      <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3} uses</span>
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
        {isInfoVisible && (
        <div className="game-info-section">
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
            <strong>TURN LIMITS:</strong> Turn 1: <strong>2 monsters</strong> can act. Turns 2-5: <strong>All 5 monsters</strong> can act
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
    )}
    </div>

      {/* Player Team Section */}
      <div className="team-section player-team">
        <h2 className="team-label player">Your Team</h2>
        <div className="team-container">
          {playerTeam.map((monster, index) => {
            const hpPercentage = (monster.currentHp / monster.health) * 100;
            let hpClass = '';
            if (hpPercentage <= 30) hpClass = 'low';
            else if (hpPercentage <= 60) hpClass = 'medium';
            
            const hasActed = monstersActed.includes(monster.creature);
            const isSelected = selectedMonster?.creature === monster.creature;

            return (
              <div 
                key={index}
                className={`monster-card player ${
                  hasActed ? 'acted' : ''
                } ${monster.currentHp <= 0 ? 'dead' : ''} ${
                  isSelected ? 'selected' : ''
                } ${
                  targetMode && isSelected ? 'active' : ''
                }`}
                onClick={() => {
                  if (!targetMode && 
                      currentPlayer === 'player' && 
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
                
                <div className="ability-grid-battle">
                  <div 
                    className={`ability-slot-battle relative ${
                      selectedAbility?.monster?.creature === monster.creature && 
                      selectedAbility?.abilityKey === 'ability1Symbols' ? 'active' : ''
                    } ${
                      hasActed || monster.currentHp <= 0 ? 'disabled' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!hasActed && 
                          monster.currentHp > 0 && 
                          currentPlayer === 'player' && 
                          !targetMode) {
                        handleAbilitySelect(monster, 'ability1Symbols');
                      }
                    }}
                  >
                    <div className="ability-symbol symbol symbol-damage">{monster.ability1Symbols}</div>
                    {(monster.ability1Symbols.includes('☀') && monster.ability1Symbols.includes('⚠') && monster.ability1Symbols.includes('⌮')) && (
                      <div className="absolute top-1 right-1 bg-amber-700/80 text-white text-[10px] px-1 py-0.5 rounded flex items-center gap-1">
                        <span className="symbol symbol-reflect">⌮</span>
                        <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3}</span>
                      </div>
                    )}
                    <div className="ability-label">Ability 1</div>
                  </div>
                  <div 
                    className={`ability-slot-battle relative ${
                      selectedAbility?.monster?.creature === monster.creature && 
                      selectedAbility?.abilityKey === 'ability2Symbols' ? 'active' : ''
                    } ${
                      hasActed || monster.currentHp <= 0 ? 'disabled' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!hasActed && 
                          monster.currentHp > 0 && 
                          currentPlayer === 'player' && 
                          !targetMode) {
                        handleAbilitySelect(monster, 'ability2Symbols');
                      }
                    }}
                  >
                    <div className="ability-symbol">{monster.ability2Symbols}</div>
                    {(monster.ability2Symbols.includes('☀') && monster.ability2Symbols.includes('⚠') && monster.ability2Symbols.includes('⌮')) && (
                      <div className="absolute top-1 right-1 bg-amber-700/80 text-white text-[10px] px-1 py-0.5 rounded flex items-center gap-1">
                        <span className="symbol symbol-reflect">⌮</span>
                        <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3}</span>
                      </div>
                    )}
                    <div className="ability-label">Ability 2</div>
                  </div>
                  <div 
                    className={`ability-slot-battle relative ${
                      selectedAbility?.monster?.creature === monster.creature && 
                      selectedAbility?.abilityKey === 'ability3Symbols' ? 'active' : ''
                    } ${
                      hasActed || monster.currentHp <= 0 ? 'disabled' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!hasActed && 
                          monster.currentHp > 0 && 
                          currentPlayer === 'player' && 
                          !targetMode) {
                        handleAbilitySelect(monster, 'ability3Symbols');
                      }
                    }}
                  >
                    <div className="ability-symbol">{monster.ability3Symbols}</div>
                    {(monster.ability3Symbols.includes('☀') && monster.ability3Symbols.includes('⚠') && monster.ability3Symbols.includes('⌮')) && (
                      <div className="absolute top-1 right-1 bg-amber-700/80 text-white text-[10px] px-1 py-0.5 rounded flex items-center gap-1">
                        <span className="symbol symbol-reflect">⌮</span>
                        <span>{Math.max(0, (monster.reflectUses ?? 3) - (monster.reflectUsesUsed ?? 0))}/{monster.reflectUses ?? 3}</span>
                      </div>
                    )}
                    <div className="ability-label">Ability 3</div>
                  </div>
                </div>
                
                {/* Action Indicator */}
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
              </div>
            );
          })}
        </div>
      </div>

      </div>
      {/* Game Over Modal */}
      {gameState === 'gameOver' && (
        <div className="game-over-modal">
          <div className="game-over-content">
            <h2 className="game-over-title">GAME OVER</h2>
            <p className="game-over-message">
              {playerTeam.filter(m => m.currentHp > 0).length === 0 && cpuTeam.filter(m => m.currentHp > 0).length === 0
                ? "It's a draw!"
                : playerTeam.filter(m => m.currentHp > 0).length === 0
                ? "CPU Wins!"
                : "You Win!"}
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

      {/* Nature Decorations */}
      <div className="nature-decoration leaf-1">🍃</div>
      <div className="nature-decoration leaf-2">🍂</div>
      <div className="nature-decoration mushroom-1">🍄</div>
      <div className="nature-decoration mushroom-2">🌸</div>
    </div>
  );
};

export default MonsterRealmGame;