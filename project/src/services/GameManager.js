import { apiClient } from '../utils/apiClient.js';
import { GameState } from '../models/GameState.js';
import { Character } from '../models/Character.js';
import { handleError } from '../utils/errorHandler.js';
import { validatePlayerInput, validateCharacter } from '../utils/validators.js';

export class GameManager {
  constructor() {
    this.gameState = new GameState();
  }

  async initializeGame(playerName, characterType) {
    try {
      const { name, type } = validateCharacter(playerName, characterType);
      this.gameState.setCharacter(new Character(name, type));
      
      const initialPrompt = `Begin a Star Wars adventure for ${name}, a ${type}. 
        Start with an exciting opening scene and provide 2-4 choices for the player.`;
      
      return await this.processPlayerInput(initialPrompt);
    } catch (error) {
      return handleError(error, 'Initialization Error');
    }
  }

  async processPlayerInput(input) {
    try {
      const validatedInput = validatePlayerInput(input);
      const response = await apiClient.generateResponse(
        validatedInput,
        this.gameState.getContext()
      );

      this.gameState.addToHistory({ role: "user", content: validatedInput });
      this.gameState.addToHistory({ role: "assistant", content: response });
      this.gameState.save();

      return response;
    } catch (error) {
      return handleError(error, 'Input Processing Error');
    }
  }

  saveGame() {
    try {
      this.gameState.save();
      return true;
    } catch (error) {
      return handleError(error, 'Save Game Error');
    }
  }

  loadGame() {
    try {
      this.gameState.load();
      return this.gameState;
    } catch (error) {
      return handleError(error, 'Load Game Error');
    }
  }
}