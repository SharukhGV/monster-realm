import React from 'react';
import * as Art from "./LineArt";

const MonsterArtDisplay = ({ monsterName, size = 200 }) => {
  const ArtComponent = Art.MONSTER_ART_MAP[monsterName?.toUpperCase()];
  
  if (!ArtComponent) {
    return (
      <div style={{
        width: size,
        height: size * 0.5,
        backgroundColor: '#2d3748',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#718096',
        fontSize: '12px'
      }}>
        No art
      </div>
    );
  }
  
  return (
    <div style={{
      width: size,
      height: size * 0.5,
      backgroundColor: '#1a1a2e',
      borderRadius: '8px',
      border: '2px solid #4a5568',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <ArtComponent size={size * 0.6} />
    </div>
  );
};

export default MonsterArtDisplay;