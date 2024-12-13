export const validatePlayerInput = (input) => {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input provided');
  }
  return input.trim();
};

export const validateCharacter = (name, type) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Please provide a valid player name');
  }
  
  const validTypes = ['Jedi Padawan', 'Smuggler', 'Rebel Pilot', 'Bounty Hunter'];
  if (!validTypes.includes(type)) {
    throw new Error('Invalid character type selected');
  }
  
  return { name: name.trim(), type };
};