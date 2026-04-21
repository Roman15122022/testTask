import { GameApp } from './game/GameApp';
import './styles.css';

const mountNode = document.querySelector<HTMLDivElement>('#app');

if (!mountNode) {
  throw new Error('Missing #app mount node.');
}

const gameApp = new GameApp(mountNode);
gameApp.mount();
