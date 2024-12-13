import { handleError } from '../utils/errorHandler.js';

export class GameUI {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.setupUI();
  }

  setupUI() {
    this.outputElement = document.getElementById('game-output');
    this.inputElement = document.getElementById('game-input');
    this.submitButton = document.getElementById('submit-button');
    this.startButton = document.getElementById('start-game');

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.submitButton.addEventListener('click', () => this.handlePlayerInput());
    this.inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handlePlayerInput();
    });
    this.startButton.addEventListener('click', () => this.startNewGame());
  }

  async startNewGame() {
    try {
      const playerName = document.getElementById('player-name').value;
      const characterType = document.getElementById('character-type').value;

      if (!playerName) {
        this.displayMessage('Please enter your name to begin.', 'error-message');
        return;
      }

      document.getElementById('start-screen').style.display = 'none';
      document.getElementById('game-screen').style.display = 'block';

      const response = await this.gameManager.initializeGame(playerName, characterType);
      this.displayMessage(response);
    } catch (error) {
      this.displayMessage(handleError(error, 'Game Start Error'), 'error-message');
    }
  }

  async handlePlayerInput() {
    try {
      const input = this.inputElement.value.trim();
      if (!input) return;

      this.inputElement.value = '';
      this.displayMessage(`You: ${input}`, 'player-input');

      const response = await this.gameManager.processPlayerInput(input);
      this.displayMessage(response);
    } catch (error) {
      this.displayMessage(handleError(error, 'Input Error'), 'error-message');
    }
  }

  displayMessage(message, className = '') {
    const messageDiv = document.createElement('div');
    messageDiv.className = className;
    messageDiv.textContent = message;
    this.outputElement.appendChild(messageDiv);
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
  }
}