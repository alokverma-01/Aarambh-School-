import {
  LuMonitor, LuBot, LuFlaskConical, LuLibrary, LuTrophy, LuPalette, LuLaptop, LuBus,
  LuCctv, LuMapPin, LuHeartPulse, LuDroplets, LuFlame, LuShieldCheck, LuWaves,
  LuMountain, LuWind, LuLightbulb, LuHand, LuChartLine,
} from 'react-icons/lu';

const map = {
  monitor: LuMonitor, bot: LuBot, flask: LuFlaskConical, library: LuLibrary, trophy: LuTrophy,
  palette: LuPalette, laptop: LuLaptop, bus: LuBus, cctv: LuCctv, pin: LuMapPin, heart: LuHeartPulse,
  water: LuWaves, droplets: LuDroplets, flame: LuFlame, shield: LuShieldCheck, mountain: LuMountain,
  wind: LuWind, idea: LuLightbulb, hands: LuHand, chart: LuChartLine,
};

export default function Icon({ name, size = 24, ...rest }) {
  const C = map[name] || LuLightbulb;
  return <C size={size} aria-hidden="true" {...rest} />;
}
