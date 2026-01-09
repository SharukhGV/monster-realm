// LineArt.jsx
import SvgBase from "./SvgBase";

export const OrchidMantis = () => (
  <SvgBase>
    {/* Main body and head */}
    <circle cx="60" cy="25" r="8" />
    <line x1="60" y1="33" x2="60" y2="65" />
    
    {/* Praying arms/forelegs */}
    <path d="M60 40 Q40 35, 35 50 Q38 55, 45 60" />
    <path d="M60 40 Q80 35, 85 50 Q82 55, 75 60" />
    
    {/* Middle legs */}
    <path d="M60 45 Q50 55, 48 70" />
    <path d="M60 45 Q70 55, 72 70" />
    
    {/* Back legs */}
    <path d="M60 60 Q45 65, 40 85 Q42 90, 50 95" />
    <path d="M60 60 Q75 65, 80 85 Q78 90, 70 95" />
    
    {/* Wing details */}
    <path d="M55 35 Q52 38, 50 35" />
    <path d="M65 35 Q68 38, 70 35" />
  </SvgBase>
);

export const Pangolin = () => (
  <SvgBase>
    {/* Body shape - curved armored back */}
    <path d="M25 70 Q40 45, 60 40 Q80 45, 95 70" />
    
    {/* Armor scales */}
    {[30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map((x, i) => (
      <path key={i} d={`M${x} ${60 + i*1.5} Q${x+5} ${55 + i*1.5}, ${x+10} ${60 + i*1.5}`} />
    ))}
    
    {/* Head */}
    <circle cx="20" cy="75" r="6" />
    
    {/* Legs */}
    <path d="M35 80 Q30 90, 35 100" />
    <path d="M50 85 Q45 95, 50 105" />
    <path d="M70 85 Q75 95, 70 105" />
    <path d="M85 80 Q90 90, 85 100" />
    
    {/* Tail - curled */}
    <path d="M95 70 Q105 65, 100 55 Q95 50, 85 55" />
  </SvgBase>
);

export const PeacockSpider = () => (
  <SvgBase>
    {/* Body */}
    <circle cx="60" cy="65" r="12" />
    
    {/* Head */}
    <circle cx="60" cy="48" r="6" />
    
    {/* Front legs */}
    <path d="M60 52 Q50 45, 45 35" />
    <path d="M60 52 Q70 45, 75 35" />
    
    {/* Middle legs */}
    <path d="M55 65 Q45 60, 40 75" />
    <path d="M65 65 Q75 60, 80 75" />
    
    {/* Back legs */}
    <path d="M50 75 Q40 85, 35 95" />
    <path d="M70 75 Q80 85, 85 95" />
    
    {/* Display pattern (peacock feathers) */}
    <circle cx="60" cy="65" r="18" fill="none" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <path 
        key={i}
        d="M60 65 L60 47"
        transform={`rotate(${angle} 60 65)`}
      />
    ))}
  </SvgBase>
);

export const FungusBeetle = () => (
  <SvgBase>
    {/* Wing casing (elytra) */}
    <ellipse cx="60" cy="65" rx="20" ry="25" />
    
    {/* Head */}
    <circle cx="60" cy="40" r="8" />
    
    {/* Body line */}
    <line x1="60" y1="48" x2="60" y2="82" />
    
    {/* Antennae */}
    <path d="M55 38 Q50 30, 45 25" />
    <path d="M65 38 Q70 30, 75 25" />
    
    {/* Legs */}
    <path d="M40 65 Q30 70, 25 80" />
    <path d="M45 75 Q40 85, 35 95" />
    <path d="M75 65 Q85 70, 95 80" />
    <path d="M75 75 Q80 85, 85 95" />
    
    {/* Fungus-like spots */}
    <circle cx="50" cy="55" r="3" />
    <circle cx="70" cy="55" r="3" />
    <circle cx="55" cy="70" r="3" />
    <circle cx="65" cy="70" r="3" />
  </SvgBase>
);

export const Tardigrade = () => (
  <SvgBase>
    {/* Main body - plump and segmented */}
    <ellipse cx="60" cy="60" rx="30" ry="20" />
    
    {/* Head region */}
    <circle cx="60" cy="40" r="8" />
    
    {/* Body segments */}
    <line x1="30" y1="55" x2="90" y2="55" />
    <line x1="30" y1="65" x2="90" y2="65" />
    
    {/* Legs - four pairs */}
    {[35, 45, 75, 85].map((x, i) => (
      <path key={`front-${i}`} d={`M${x} ${50} Q${x + (i<2 ? -5 : 5)} ${45}, ${x + (i<2 ? -8 : 8)} ${40}`} />
    ))}
    
    {[35, 45, 75, 85].map((x, i) => (
      <path key={`back-${i}`} d={`M${x} ${70} Q${x + (i<2 ? -5 : 5)} ${75}, ${x + (i<2 ? -8 : 8)} ${80}`} />
    ))}
    
    {/* Mouth/claws */}
    <path d="M55 38 Q58 35, 60 38 Q62 35, 65 38" />
  </SvgBase>
);

export const TMNamibiensis = () => (
  <SvgBase>
    {/* Main germ body - irregular oval shape */}
    <path d="M40 60 Q45 40, 60 38 Q75 40, 80 60 Q75 80, 60 82 Q45 80, 40 60" />
    
    {/* Flagella/tails */}
    <path d="M80 60 Q90 55, 95 50" />
    <path d="M80 60 Q85 65, 90 70" />
    <path d="M40 60 Q35 55, 30 50" />
    <path d="M40 60 Q35 65, 30 70" />
    
    {/* Surface details - spots and irregular patterns */}
    <circle cx="50" cy="55" r="3" />
    <circle cx="65" cy="65" r="2.5" />
    <circle cx="55" cy="70" r="2" />
    <circle cx="70" cy="50" r="2.5" />
    
    {/* Irregular surface texture lines */}
    <path d="M45 50 Q48 52, 50 48" />
    <path d="M60 45 Q63 47, 65 43" />
    <path d="M55 75 Q58 73, 60 77" />
  </SvgBase>
);

export const VampireSquid = () => (
  <SvgBase>
    {/* Mantle/body */}
    <ellipse cx="60" cy="55" rx="15" ry="20" />
    
    {/* Head/eyes */}
    <circle cx="60" cy="45" r="5" />
    <circle cx="57" cy="44" r="1.5" />
    <circle cx="63" cy="44" r="1.5" />
    
    {/* Arms/tentacles - flowing outward */}
    {[0, 30, 60, 90, 120, 150, 180, 210].map((angle, i) => (
      <path 
        key={i}
        d="M60 75 Q65 85, 55 95"
        transform={`rotate(${angle} 60 60)`}
      />
    ))}
    
    {/* Fins */}
    <path d="M45 40 Q40 35, 45 30" />
    <path d="M75 40 Q80 35, 75 30" />
    
    {/* Web between arms */}
    <circle cx="60" cy="60" r="25" fill="none" />
  </SvgBase>
);

export const GhostBat = () => (
  <SvgBase>
    {/* Head */}
    <circle cx="60" cy="45" r="7" />
    
    {/* Body */}
    <ellipse cx="60" cy="65" rx="12" ry="15" />
    
    {/* Wings - ghostly shape */}
    <path d="M48 60 Q30 40, 20 60 Q25 80, 40 90 Q60 95, 48 60" />
    <path d="M72 60 Q90 40, 100 60 Q95 80, 80 90 Q60 95, 72 60" />
    
    {/* Ears */}
    <path d="M55 38 Q53 30, 58 32" />
    <path d="M65 38 Q67 30, 62 32" />
    
    {/* Feet */}
    <path d="M55 80 Q53 85, 57 87" />
    <path d="M65 80 Q67 85, 63 87" />
    
    {/* Wing bones/fingers */}
    <path d="M48 60 L40 70" />
    <path d="M72 60 L80 70" />
  </SvgBase>
);

export const GlowingRoach = () => (
  <SvgBase>
    {/* Body - flattened oval */}
    <ellipse cx="60" cy="60" rx="20" ry="12" />
    
    {/* Head */}
    <circle cx="60" cy="45" r="6" />
    
    {/* Antennae */}
    <path d="M55 42 Q50 30, 45 25" />
    <path d="M65 42 Q70 30, 75 25" />
    
    {/* Legs - six total */}
    {[45, 55, 65, 75].map((x, i) => (
      <path key={`left-${i}`} d={`M${x-5} ${55} Q${x-10} ${60}, ${x-12} ${65}`} />
    ))}
    
    {[45, 55, 65, 75].map((x, i) => (
      <path key={`right-${i}`} d={`M${x+5} ${55} Q${x+10} ${60}, ${x+12} ${65}`} />
    ))}
    
    {/* Wing covers */}
    <path d="M40 50 Q35 48, 40 46" />
    <path d="M80 50 Q85 48, 80 46" />
    
    {/* Glowing spots */}
    <circle cx="60" cy="60" r="4" fill="none" />
    <circle cx="50" cy="55" r="2" fill="none" />
    <circle cx="70" cy="55" r="2" fill="none" />
  </SvgBase>
);

export const JewelWasp = () => (
  <SvgBase>
    {/* Thorax */}
    <ellipse cx="60" cy="65" rx="8" ry="12" />
    
    {/* Abdomen - jewel-like segments */}
    <ellipse cx="60" cy="45" rx="6" ry="10" />
    <ellipse cx="60" cy="55" rx="7" ry="8" />
    
    {/* Head */}
    <circle cx="60" cy="35" r="5" />
    
    {/* Wings */}
    <path d="M52 60 Q45 50, 52 45" />
    <path d="M68 60 Q75 50, 68 45" />
    
    {/* Legs - long and thin */}
    {[55, 60, 65].map((x, i) => (
      <path key={`front-${i}`} d={`M${x} ${40} Q${x + (i-1)*3} ${35}, ${x + (i-1)*4} ${30}`} />
    ))}
    
    {[55, 60, 65].map((x, i) => (
      <path key={`middle-${i}`} d={`M${x} ${55} Q${x + (i-1)*3} ${60}, ${x + (i-1)*4} ${65}`} />
    ))}
    
    {[55, 60, 65].map((x, i) => (
      <path key={`back-${i}`} d={`M${x} ${70} Q${x + (i-1)*3} ${75}, ${x + (i-1)*4} ${80}`} />
    ))}
    
    {/* Antennae */}
    <path d="M57 33 Q55 28, 52 25" />
    <path d="M63 33 Q65 28, 68 25" />
  </SvgBase>
);

export const LeafySeaDragon = () => (
  <SvgBase>
    {/* Main body - seahorse-like */}
    <path d="M50 50 Q55 40, 60 45 Q65 50, 70 60 Q65 70, 60 75 Q55 80, 50 70" />
    
    {/* Leafy appendages */}
    {[45, 50, 55, 60, 65, 70, 75].map((x, i) => (
      <path 
        key={`leaf-${i}`}
        d={`M${x} ${55 + i*3} Q${x - 5 + (i%2 ? 10 : 0)} ${50 + i*3}, ${x - 8 + (i%2 ? 16 : 0)} ${45 + i*3}`}
      />
    ))}
    
    {/* Head and snout */}
    <circle cx="55" cy="45" r="4" />
    <path d="M55 45 Q50 40, 45 38" />
    
    {/* Dorsal fin */}
    <path d="M60 55 Q62 50, 65 52" />
    
    {/* Tail curl */}
    <path d="M50 70 Q45 75, 40 70 Q35 65, 40 60" />
  </SvgBase>
);

export const Rafflesia = () => (
  <SvgBase>
    {/* Flower bloom */}
    <circle cx="60" cy="60" r="25" />
    
    {/* Petal lobes (5 large petals) */}
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <path 
        key={i}
        d="M60 35 Q70 25, 80 35"
        transform={`rotate(${angle} 60 60)`}
      />
    ))}
    
    {/* Center structure */}
    <circle cx="60" cy="60" r="10" />
    
    {/* Radial patterns in center */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line 
        key={i}
        x1="60" y1="50" x2="60" y2="70"
        transform={`rotate(${angle} 60 60)`}
      />
    ))}
    
    {/* Stem */}
    <line x1="60" y1="85" x2="60" y2="100" />
    
    {/* Surface spots/patterns */}
    <circle cx="50" cy="50" r="2" />
    <circle cx="70" cy="50" r="2" />
    <circle cx="55" cy="70" r="2" />
    <circle cx="65" cy="70" r="2" />
  </SvgBase>
);

export const Welwitschia = () => (
  <SvgBase>
    {/* Central stem */}
    <line x1="60" y1="40" x2="60" y2="85" />
    
    {/* Two main leaves - long, strap-like */}
    <path d="M60 50 Q40 55, 30 70 Q35 75, 45 80" />
    <path d="M60 50 Q80 55, 90 70 Q85 75, 75 80" />
    
    {/* Additional leaf fragments */}
    <path d="M60 60 Q45 65, 35 80" />
    <path d="M60 60 Q75 65, 85 80" />
    
    {/* Base/crown */}
    <circle cx="60" cy="45" r="8" />
    
    {/* Root structure */}
    <path d="M60 85 Q55 90, 50 95" />
    <path d="M60 85 Q65 90, 70 95" />
    
    {/* Leaf details - parallel veins */}
    <line x1="55" y1="55" x2="40" y2="65" />
    <line x1="65" y1="55" x2="80" y2="65" />
  </SvgBase>
);

export const BiolumMycena = () => (
  <SvgBase>
    {/* Cap */}
    <path d="M50 40 Q60 30, 70 40 Q65 45, 60 50 Q55 45, 50 40" />
    
    {/* Stem */}
    <line x1="60" y1="50" x2="60" y2="80" />
    
    {/* Gills underside */}
    <path d="M55 50 Q50 55, 55 60" />
    <path d="M65 50 Q70 55, 65 60" />
    
    {/* Mycelium roots */}
    <path d="M55 80 Q50 85, 45 90" />
    <path d="M65 80 Q70 85, 75 90" />
    <path d="M60 80 Q60 85, 58 90" />
    <path d="M60 80 Q60 85, 62 90" />
    
    {/* Bioluminescent spots */}
    <circle cx="60" cy="45" r="3" fill="none" />
    <circle cx="55" cy="42" r="2" fill="none" />
    <circle cx="65" cy="42" r="2" fill="none" />
    <circle cx="60" cy="60" r="2" fill="none" />
  </SvgBase>
);

export const BirdsNestFungus = () => (
  <SvgBase>
    {/* Nest/cup shape */}
    <path d="M40 65 Q50 55, 60 60 Q70 55, 80 65 Q70 75, 60 75 Q50 75, 40 65" />
    
    {/* "Eggs" (peridioles) inside */}
    <circle cx="50" cy="65" r="4" />
    <circle cx="60" cy="62" r="3" />
    <circle cx="70" cy="65" r="4" />
    <circle cx="55" cy="70" r="3" />
    <circle cx="65" cy="70" r="3" />
    
    {/* Cup texture/details */}
    <path d="M45 60 Q50 58, 55 60" />
    <path d="M65 60 Q70 58, 75 60" />
    <path d="M50 70 Q55 72, 60 70 Q65 72, 70 70" />
    
    {/* Stem */}
    <line x1="60" y1="75" x2="60" y2="90" />
  </SvgBase>
);

export const Cordyceps = () => (
  <SvgBase>
    {/* Main stalk */}
    <line x1="60" y1="30" x2="60" y2="80" />
    
    {/* Side branches/fruiting bodies */}
    <path d="M60 40 Q55 35, 50 40 Q48 42, 50 45" />
    <path d="M60 50 Q65 45, 70 50 Q72 52, 70 55" />
    <path d="M60 60 Q55 55, 50 60 Q48 62, 50 65" />
    
    {/* Top cluster */}
    <circle cx="60" cy="35" r="5" />
    
    {/* Spore-producing structures */}
    <circle cx="55" cy="42" r="2" />
    <circle cx="65" cy="52" r="2" />
    <circle cx="55" cy="62" r="2" />
    
    {/* Base/root structure */}
    <path d="M60 80 Q55 85, 50 90" />
    <path d="M60 80 Q65 85, 70 90" />
    <path d="M60 80 Q60 85, 58 90" />
  </SvgBase>
);

export const DevilsCigar = () => (
  <SvgBase>
    {/* Cigar-shaped fruiting body */}
    <path d="M40 50 Q50 40, 60 45 Q70 40, 80 50 Q70 60, 60 65 Q50 60, 40 50" />
    
    {/* Splitting open at top */}
    <path d="M50 45 Q55 40, 60 42 Q65 40, 70 45" />
    <path d="M50 45 Q48 42, 50 40" />
    <path d="M70 45 Q72 42, 70 40" />
    
    {/* Stem */}
    <line x1="60" y1="65" x2="60" y2="85" />
    
    {/* Spores escaping */}
    <circle cx="55" cy="40" r="2" />
    <circle cx="60" cy="38" r="1.5" />
    <circle cx="65" cy="40" r="2" />
    <circle cx="58" cy="35" r="1" />
    <circle cx="62" cy="35" r="1" />
    
    {/* Base/roots */}
    <path d="M60 85 Q55 88, 50 90" />
    <path d="M60 85 Q65 88, 70 90" />
  </SvgBase>
);

export const Lithops = () => (
  <SvgBase>
    {/* Pair of succulent leaves */}
    <ellipse cx="50" cy="65" rx="15" ry="20" />
    <ellipse cx="70" cy="65" rx="15" ry="20" />
    
    {/* Fissure between leaves */}
    <line x1="60" y1="45" x2="60" y2="85" />
    
    {/* Window patterns on leaves */}
    <ellipse cx="50" cy="60" rx="8" ry="5" fill="none" />
    <ellipse cx="70" cy="60" rx="8" ry="5" fill="none" />
    
    {/* Surface patterns/markings */}
    <circle cx="45" cy="55" r="2" />
    <circle cx="55" cy="70" r="2" />
    <circle cx="65" cy="55" r="2" />
    <circle cx="75" cy="70" r="2" />
    
    {/* Root system */}
    <path d="M50 85 Q48 90, 45 95" />
    <path d="M70 85 Q72 90, 75 95" />
    <path d="M60 85 Q60 90, 58 95" />
  </SvgBase>
);

export const MONSTER_ART_MAP = {
  "ORCHID MANTIS": OrchidMantis,
  "PANGOLIN": Pangolin,
  "PEACOCK SPIDER": PeacockSpider,
  "FUNGUS BEETLE": FungusBeetle,
  "RAFFLESIA": Rafflesia,
  "TARDIGRADE": Tardigrade,
  "T.M. NAMIBIENSIS": TMNamibiensis,
  "VAMPIRE SQUID": VampireSquid,
  "WELWITSCHIA MIRABILIS": Welwitschia,
  "BIOLUM. MYCENA": BiolumMycena,
  "BIRD'S NEST FUNGUS": BirdsNestFungus,
  "CORDYCEPS": Cordyceps,
  "DEVIL'S CIGAR": DevilsCigar,
  "GHOST BAT": GhostBat,
  "GLOWING ROACH": GlowingRoach,
  "JEWEL WASP": JewelWasp,
  "LEAFY SEA DRAGON": LeafySeaDragon,
  "LITHOPS": Lithops
};