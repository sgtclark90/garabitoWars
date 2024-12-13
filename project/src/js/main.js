import { GameManager } from '../services/GameManager.js';
import { GameUI } from '../ui/GameUI.js';
import '../styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  const gameManager = new GameManager();
  new GameUI(gameManager);
});