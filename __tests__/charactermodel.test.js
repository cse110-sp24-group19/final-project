import Character from '../js/Character.js'
describe('Basic character model tests for Character.js', () => {
  // Test for creating a character
  it('should create a character with default progression points', () => {
    const character = new Character('Alice', 'Dragon');
    expect(character.name).toBe('Alice');
    expect(character.type).toBe('Dragon');
    expect(character.progressionPoints).toBe(0);
  });

  // Test for updating progression
  it('should update progression points correctly', () => {
    const character = new Character('Bob', 'Monkey');
    character.updateProgression(25);
    expect(character._getCurrentProgression()).toBe(25);
    character.updateProgression(-5);
    console.log(character.getCharacterInfo()[0])
    expect(character.progressionPoints).toBe(20);
  });

  // Test for character stage based on progression
  it('should return the correct stage based on progression points', () => {
    const character = new Character('Charlie', 'Dragon', 5);
    expect(character._getProgressionStage()).toBe('Egg');
    character.updateProgression(10);
    expect(character._getProgressionStage()).toBe('Hatching');
  });

  // Test for fetching image assets
  it('should fetch the correct image asset based on type and stage', () => {
    const character = new Character('Dave', 'Dragon', 5);
    expect(character._fetchImageAsset()).toBe('assets/dragon-egg.png');
  });
});
