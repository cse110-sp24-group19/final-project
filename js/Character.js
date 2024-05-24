/**
 * Represents a character with progression tracking across different life stages.
 */
class Character {
  /**
   * Creates an instance of a Character. If no name and type are provided, it loads the first available character from storage.
   * @param {string} [name=null] - The name of the character.
   * @param {string} [type=null] - The type of the character (Monkey, Dragon, TBD).
   * @param {number} [progressionPoints=0] - Initial progression points (default is 0).
   * @example
   * const usercharacter = new Character('Smaug', 'Dragon', 50);
   * console.log(usercharacter.getCurrentProgression()); // 50
   * console.log(usercharacter.fetchImageAsset) // images/dragon-baby.png
   * console.log(usercharacter.updateProgression(100);
   * console.log(usercharacter.getCurrentProgression()); // 150
   */
  constructor (name = null, type = null, progressionPoints = 0) {
    if (name && type) {
      this.name = name
      this.type = this._validateType(type)
      this.progressionPoints = progressionPoints
      this._saveCharacter() // Save character to localStorage when it's created with new parameters.
    } else {
      this._loadCharacter() // Load the first available character from storage.
    }
  }

  /**
   * Validates the type of the character to ensure it is one of the predefined types.
   * @param {string} type - The proposed type of the character.
   * @returns {string} The validated type.
   * @private
   */
  _validateType (type) {
    const validTypes = ['Monkey', 'Dragon', 'TBD']
    if (!validTypes.includes(type)) {
      throw new Error("Invalid type specified. Must be 'Monkey', 'Dragon', or 'TBD'.")
    }
    return type
  }

  /**
   * Gets the current progression points of the character.
   * @returns {number} The current progression points.
   * @example
   * console.log(dragon.getCurrentProgression()); // Outputs the current progression points
   */
  getCurrentProgression () {
    return this.progressionPoints
  }

  /**
   * Updates the progression points of the character.
   * @param {number} points - The number of points to add to the current progression.
   * @example
   * dragon.updateProgression(30);
   * console.log(dragon.getCurrentProgression()); // 80
   */
  updateProgression (points) {
    const newProgression = this.progressionPoints + points
    if (newProgression > 300) {
      this.progressionPoints = 300
    } else if (newProgression < 0) {
      this.progressionPoints = 0
    } else {
      this.progressionPoints = newProgression
    }
    this._saveCharacter() // Save after updating.
  }

  /**
   * Determines the current life stage of the character based on progression points.
   * @returns {string} The current life stage (Baby, Child, Adult).
   * @example
   * console.log(dragon.getProgressionStage()); // Returns 'Baby', 'Child', or 'Adult' based on points
   */
  getProgressionStage () {
    if (this.progressionPoints <= 10) {
      return 'Baby'
    } else if (this.progressionPoints <= 25) {
      return 'Child'
    } else {
      return 'Adult'
    }
  }

  /**
   * Fetches the image asset URL for the character based on the current type and stage.
   * @returns {string} The URL to the image representing the current type and stage.
   * @example
   * console.log(dragon.fetchImageAsset()); // Outputs 'images/dragon-baby.png'
   */
  fetchImageAsset () {
    const stage = this.getProgressionStage().toLowerCase()
    const type = this.type.toLowerCase()
    return `images/${type}-${stage}.png` // Assuming images are named like 'dragon-baby.png'.
  }

  /**
   * Saves the character data to local storage.
   * @private
   */
  _saveCharacter () {
    const data = {
      name: this.name,
      type: this.type,
      progressionPoints: this.progressionPoints
    }
    localStorage.setItem('character', JSON.stringify(data))
  }

  /**
   * Loads the character data from local storage for a given name and type.
   * @private
   */
  _loadCharacter () {
    const datapoint = JSON.parse(localStorage.getItem('character'))
    if (datapoint) {
      this.name = datapoint.name
      this.type = this._validateType(datapoint.type)
      this.progressionPoints = datapoint.progressionPoints
    }
  }
}
export default Character
