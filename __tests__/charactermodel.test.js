import Character from '../src/models/Character.js'
describe('Basic character model tests for Character.js', () => {
  beforeAll(() => {
    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[`${key}`] || null;
      }

      setItem(key, value) {
        this.store[`${key}`] = String(value);
      }

      removeItem(key) {
        this.store[`${key}`] = undefined;
      }
    }

    global.localStorage = new LocalStorageMock;
  });
  // Test for creating a character
  it('should create a character with default progression points', () => {
    const character = new Character('Alice', 'Dragon');
    expect(character.name).toBe('Alice');
    expect(character.type).toBe('Dragon');
    expect(character.getCurrentProgression()).toBe(0);
  });

  // Test for updating progression
  it('should update progression points correctly', () => {
    const character = new Character('Bob', 'Monkey');
    character.updateProgression(25);
    expect(character.getCurrentProgression()).toBe(25);
    character.updateProgression(-5);
    expect(character.getCurrentProgression()).toBe(20);
  });

  // Test for character stage based on progression
  it('should return the correct stage based on progression points', () => {
    const character = new Character('Charlie', 'Dragon', 105);
    expect(character.getProgressionStage()).toBe('Child');
    character.updateProgression(100);
    expect(character.getProgressionStage()).toBe('Adult');
  });

  // Test for fetching image assets
  it('should fetch the correct image asset based on type and stage', () => {
    const character = new Character('Dave', 'Monkey', 150);
    expect(character.fetchImageAsset()).toBe('images/monkey-child.png');
  });

  // Test localStorage interactions
  it('should save and load character from localStorage', () => {
    const character = new Character('Eve', 'Dragon', 75);
    character.updateProgression(25);  // This should also trigger save to localStorage
    console.log(localStorage.store)
    const loadedCharacter = new Character();  // This should load from localStorage
    expect(loadedCharacter.getCurrentProgression()).toBe(100);
  });
});
