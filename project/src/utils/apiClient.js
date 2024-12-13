import OpenAI from 'openai';
import { GAME_SETTINGS } from '../config/gameConfig.js';
import { API_CONFIG } from '../config/apiConfig.js';
import { GameError } from './errorHandler.js';

class APIClient {
  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new GameError(
        'API key not configured. Please check your environment variables.',
        'API_CONFIG_ERROR'
      );
    }

    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateResponse(prompt, context) {
    try {
      const response = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: GAME_SETTINGS.DEFAULT_SYSTEM_PROMPT },
          ...context,
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      if (!response.choices?.[0]?.message?.content) {
        throw new GameError('Invalid API response received', 'API_RESPONSE_ERROR');
      }

      return response.choices[0].message.content;
    } catch (error) {
      if (error.code === 'invalid_api_key') {
        throw new GameError(
          'Invalid API key. Please check your configuration.',
          'API_KEY_ERROR'
        );
      }
      throw new GameError(
        'Failed to generate response from AI',
        'API_REQUEST_ERROR'
      );
    }
  }
}

export const apiClient = new APIClient();