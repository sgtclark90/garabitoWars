export class GameState {
  constructor() {
    this.conversationHistory = [];
    this.currentScene = null;
    this.character = null;
  }

  addToHistory(message) {
    this.conversationHistory.push(message);
  }

  getContext() {
    return this.conversationHistory.slice(-5); // Keep last 5 messages for context
  }

  setCharacter(character) {
    this.character = character;
  }

  setScene(scene) {
    this.currentScene = scene;
  }

  save() {
    localStorage.setItem('gameState', JSON.stringify({
      conversationHistory: this.conversationHistory,
      currentScene: this.currentScene,
      character: this.character
    }));
  }

  load() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.conversationHistory = state.conversationHistory;
      this.currentScene = state.currentScene;
      this.character = state.character;
    }
  }
}