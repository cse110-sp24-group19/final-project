/**
 * Represents a character with progression tracking across different life stages.
 */
class Character {
  /**
   * Creates an instance of a Character. If no name and type are provided it loads the first available character from storage.
   * @param {string} [name=null] - The name of the character.
   * @param {string} [type=null] - The type of the character (Monkey, Dragon).
   * @param {number} [progressionPoints=0] - Initial progression points (default is 0).
   * @example
   * const usercharacter = new Character('Smaug', 'Dragon', 5);
   * console.log(usercharacter.getCurrentProgression()); // 5
   * console.log(usercharacter.getCharacterInfo()[2] // assets/dragon-baby.png
   * console.log(usercharacter.updateProgression(10);
   * console.log(usercharacter.getCharacterInfo()[0]); // 15
   */
  constructor (name = null, type = null, progressionPoints = 0) {
    if (name === null || type === null) {
      this._loadCharacter() // Load the first available character from storage.
    } else {
      this.name = name
      this.type = this._validateType(type)
      this.progressionPoints = progressionPoints
      this._saveCharacter() // Save character to localStorage when it's created with new parameters.
    }
  }

  /**
   * Validates the type of the character to ensure it is one of the predefined types.
   * @param {string} type - The proposed type of the character.
   * @returns {string} The validated type.
   * @private
   */
  _validateType (type) {
    const validTypes = ['Monkey', 'Dragon']
    if (!validTypes.includes(type)) {
      throw new Error("Invalid type specified. Must be 'Monkey' or 'Dragon'")
    }
    return type
  }

  /**
   * Gets the current character info as a tuple.
   * @returns {array}The current progression points, the current life stage, and the image asset URL.
   * @example
   * console.log(dragon.getCharacterInfo()); // Outputs [progressionPoints, 'LifeStage', 'assets/character-stage.png',
   * progressionStagePercentage, 'progressionStageFrac']
   */
  getCharacterInfo () {
    this._loadCharacter()
    const progressionPoints = this.progressionPoints
    const progressionStage = this._getProgressionStage()
    const imageAsset = this._fetchImageAsset()
    const progressionStagePercentage = this._getStageProgressionPercentage()
    const progressionStageFrac = this._getStageProgressionFrac()
    return [progressionPoints, progressionStage, imageAsset, progressionStagePercentage, progressionStageFrac]
  }

  /**
   * Gets the current progression points of the character.
   * @returns {number} The current progression points.
   * @example
   * console.log(dragon.getCurrentProgression()); // Outputs the current progression points
   */
  _getCurrentProgression () {
    this._loadCharacter()
    return this.progressionPoints
  }

  /**
   * Updates the progression points of the character and broadcasts an event to let other resources know to update their
   * assets. The event is called 'characterInfoUpdated'.
   * @param {number} points - The number of points to add to the current progression.
   * @example
   * dragon.updateProgression(30);
   * console.log(dragon.getCharacterInfo()[0]); // 30
   */
  updateProgression (points) {
    this._loadCharacter()
    const newProgression = this.progressionPoints + points
    if (newProgression > 100) {
      this.progressionPoints = 100
    } else if (newProgression < 0) {
      this.progressionPoints = 0
    } else {
      this.progressionPoints = newProgression
    }
    // Dispatch custom event 'characterInfoUpdated'
    const event = new CustomEvent('characterInfoUpdated')
    document.dispatchEvent(event)
    this._saveCharacter() // Save after updating.
  }

  /**
   * Determines the current life stage of the character based on progression points.
   * @returns {string} The current life stage (Baby, Child, Adult).
   * @example
   * console.log(dragon.getProgressionStage()); // Returns 'Baby', 'Child', or 'Adult' based on points
   */
  _getProgressionStage () {
    this._loadCharacter()
    if (this.progressionPoints < 10) {
      return 'Egg'
    } else if (this.progressionPoints < 25) {
      return 'Hatching'
    } else if (this.progressionPoints < 45) {
      return 'Baby'
    } else if (this.progressionPoints < 70) {
      return 'Child'
    } else {
      return 'Adult'
    }
  }

  /**
   * Determines the percentage of points to reach next stage.
   * @returns {float} percentage
   * @example
   * console.log(dragon.getStageThreshold()); // 0%
   */
  _getStageProgressionPercentage () {
    this._loadCharacter()
    if (this.progressionPoints < 10) {
      return ((this._getCurrentProgression()) / 10) * 100
    } else if (this.progressionPoints < 25) {
      return ((this._getCurrentProgression() - 10) / 15) * 100
    } else if (this.progressionPoints < 45) {
      return ((this._getCurrentProgression() - 25) / 20) * 100
    } else if (this.progressionPoints < 70) {
      return ((this._getCurrentProgression() - 45) / 25) * 100
    } else {
      return ((this._getCurrentProgression() - 70) / 30) * 100
    }
  }

  /**
   * Determines the fraction of points to reach next stage.
   * @returns {string} fraction
   * @example
   * console.log(dragon.getStageThreshold()); // 0/10
   */
  _getStageProgressionFrac () {
    this._loadCharacter()
    const currentProgress = this._getCurrentProgression()

    if (this.progressionPoints < 10) {
      return `${currentProgress}/10`
    } else if (this.progressionPoints < 25) {
      return `${currentProgress - 10}/15`
    } else if (this.progressionPoints < 45) {
      return `${currentProgress - 25}/20`
    } else if (this.progressionPoints < 70) {
      return `${currentProgress - 45}/25`
    } else {
      return `${currentProgress - 70}/30`
    }
  }

  /**
   * Fetches the image asset URL for the character based on the current type and stage.
   * @returns {string} The URL to the image representing the current type and stage.
   * @example
   * console.log(dragon.fetchImageAsset()); // Outputs 'assets/dragon-baby.png'
   */
  _fetchImageAsset () {
    this._loadCharacter()
    const stage = this._getProgressionStage().toLowerCase()
    const type = this.type.toLowerCase()
    return `assets/${type}-${stage}.png` // Assuming images are named like 'dragon-baby.png'.
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
    if (Character.checkStorage()) {
      const datapoint = JSON.parse(localStorage.getItem('character'))
      if (datapoint) {
        this.name = datapoint.name
        this.type = this._validateType(datapoint.type)
        this.progressionPoints = datapoint.progressionPoints
      }
    }
  }

  /**
   * Returns true if there's a character in local storage, false otherwise.
   */
  static checkStorage () {
    const datapoint = localStorage.getItem('character')
    return !!datapoint
  }

  /**
   * Adds one to the login count of the users profile.
   */
  static addLogin () {
    let loginCount = localStorage.getItem('loginsCountProfile')
    if (loginCount !== null) {
      // If the key exists, parse the value to an integer and increment it
      loginCount = parseInt(loginCount, 10) + 1
    } else {
      // If the key doesn't exist, start the count at 1
      loginCount = 1
    }
    localStorage.setItem('loginsCountProfile', loginCount.toString())
    const event = new CustomEvent('characterInfoUpdated')
    document.dispatchEvent(event)
  }

  /**
   * Gets the journal entry count of the users profile
   */
  static updateJournalEntryCount () {
    // Retrieve the journal entries from local storage
    const journalEntries = localStorage.getItem('journalEntries')

    // Parse the journal entries if they exist, or default to an empty array
    const entries = journalEntries ? JSON.parse(journalEntries) : []

    // Count the number of journal entries
    const journalEntryCount = entries.length

    // Update the journal entry count in local storage
    localStorage.setItem('journalEntryCountProfile', journalEntryCount.toString())

    // Dispatch an event to notify the application of the update
    const event = new CustomEvent('characterInfoUpdated')
    document.dispatchEvent(event)
  }

  /**
   * Adds one to the goals completed count of the users profile
   */
  static addGoalComplete () {
    let goalsCount = localStorage.getItem('goalsCompletedCountProfile')
    if (goalsCount !== null) {
      // If the key exists, parse the value to an integer and increment it
      goalsCount = parseInt(goalsCount, 10) + 1
    } else {
      // If the key doesn't exist, start the count at 1
      goalsCount = 1
    }
    localStorage.setItem('goalsCompletedCountProfile', goalsCount.toString())
    const event = new CustomEvent('characterInfoUpdated')
    document.dispatchEvent(event)
  }
}
export default Character
