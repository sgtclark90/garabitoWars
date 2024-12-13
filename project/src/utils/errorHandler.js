export class GameError extends Error {
  constructor(message, type = 'GENERAL_ERROR') {
    super(message);
    this.type = type;
    this.name = 'GameError';
  }
}

export const handleError = (error, context = '') => {
  console.error(`${context}:`, error);
  if (error instanceof GameError) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};