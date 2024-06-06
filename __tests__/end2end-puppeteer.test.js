import puppeteer from 'puppeteer';

  // Launch Browser
    let browser;
    let page;
    beforeAll(async () => {
      browser = await puppeteer.launch({ defaultViewport: null, headless: false, slowMo: 50 }); 
      page = await browser.newPage();
      await page.goto('https://cse110-sp24-group19.github.io/final-project/', { waitUntil: 'networkidle2' });

       // Selecting a character once page loads
      await page.waitForSelector('#character-selection-container', { visible: true });
      const characterContainers = await page.$$('.character-container');
      await characterContainers[0].hover();  // Hover over the element
      await characterContainers[0].click();  // Click the element
    }, 100000);
  
    // Close Browser
    afterAll(async () => {
        if (browser) {
          await browser.close();
        }
      });
   
    // Gets element from shadow DOM, useful for navigation bar
    const getShadowElement = async (selector) => {
      const shadowHost = await page.$('nav-bar');
      const shadowRoot = await shadowHost.evaluateHandle(el => el.shadowRoot);
      return await shadowRoot.$(selector);
    };

    const selectors = {
      mainNav: '.main-nav',
      calendarJournalNav: '.calendar-journal-nav',
      creativePlayNav: '.creative-play-nav',
      goalSettingNav: '.goal-setting-nav',
      rewardNav: '.reward-nav',
      mainPage: '#main-page',
      calendarJournalPage: '#calendar-journal-page',
      creativePlayPage: '#creative-play-page',
      goalSettingPage: '#goal-setting-page',
      rewardPage: '#reward-page',
      dayView: '#day-view',
      newEntryPage: '#new-entry-page',
      addButton: '.add-button',
      backButton: '.back-button',
      entryTitleInput: '#entry-title',
      entryInfoInput: '#entry-info',
      saveButton: '.save-button',
      journalList: '#journal-list li',
      calendarDate: `.calendar-dates li:nth-child(10)`, // Pick date that is always non-greyed out
      editEntryButton: '#edit-entry-button',
      detailsTitleInput: '#details-title-input',
      detailsInfoTextarea: '#details-info-textarea',
      saveDetailsButton: '#save-details-button',
      deleteEntryButton: '#delete-entry-button',
      entryDetailsPage: '#entry-details-page',
      addDailyGoalButton: '#add-daily-goal',
      dailyGoalInput: '#daily-goal-input',
      dailyGoalList: '#daily .list-container > div:not(.last-child) label',
      addWeeklyGoalButton: '#add-weekly-goal',
      weeklyGoalInput: '#weekly-goal-input',
      weeklyGoalList: '#weekly .list-container > div:not(.last-child) label',
      addLongTermGoalButton: '#add-long-term-goal',
      longTermGoalInput: '#long-term-goal-input',
      longTermGoalList: '#long-term .list-container > div:not(.last-child) label',
      calendarJournal: '#calendar-journal',
      editButton: '.pen-icon',
      deleteButton: 'img[src="assets/goal_icons/trash.png"]',
      inputBox: 'input.goal-input'
    };


    // -- Navigation Testing --

    // User checks out different pages .. 
    describe('Navigation testing for work journal pages', () => {
      test('navigating to calendar journal', async () => {
        const calendarJournalNav = await getShadowElement(selectors.calendarJournalNav);
        await calendarJournalNav.evaluate(el => el.click());
        await page.waitForSelector(selectors.calendarJournalPage, { visible: true });
        const calendarJournalPage = await page.$(selectors.calendarJournalPage);
        expect(calendarJournalPage).toBeTruthy();
      });
    
      test('navigating to creative play', async () => {
        const creativePlayNav = await getShadowElement(selectors.creativePlayNav);
        await creativePlayNav.evaluate(el => el.click());
        await page.waitForSelector(selectors.creativePlayPage, { visible: true });
        const creativePlayPage = await page.$(selectors.creativePlayPage);
        expect(creativePlayPage).toBeTruthy();
      });
    
      test('navigating to reward page', async () => {
        const rewardNav = await getShadowElement(selectors.rewardNav);
        await rewardNav.evaluate(el => el.click());
        await page.waitForSelector(selectors.rewardPage, { visible: true });
        const rewardPage = await page.$(selectors.rewardPage);
        expect(rewardPage).toBeTruthy();
      });
    
      test('navigating back to main page', async () => {
        const mainNav = await getShadowElement(selectors.mainNav);
        await mainNav.evaluate(el => el.click());
        await page.waitForSelector(selectors.mainPage, { visible: true });
        const mainPage = await page.$(selectors.mainPage);
        expect(mainPage).toBeTruthy();
      });
    });


    // -- Journal Entry Page Testing -- 

    // User adds, deletes, and edits entries
    describe('Journal Entry Tests', () => {

      test('adding a journal entry', async () => {
        await page.click(selectors.calendarJournal); //navigate to calendar
        await page.click(selectors.calendarDate); //navigate to entry

        let prevNoteCount = await page.$$eval(selectors.journalList, notes => notes.length);
        await page.click(selectors.addButton);
        let entryTitle = 'Internship Applications';
        let entryInfo = 'Today I applied to 10 internships';
        await page.type(selectors.entryTitleInput, entryTitle);
        await page.type(selectors.entryInfoInput, entryInfo);
        await page.click(selectors.saveButton);
        let currNoteCount = await page.$$eval(selectors.journalList, notes => notes.length);
    
        expect(currNoteCount).toBe(prevNoteCount + 1);
        // Validate the content of the last added entry
        let lastEntry = await page.$eval(`${selectors.journalList}:last-child`, el => {
          return {
            title: el.textContent,
            info: el.dataset.info
          };
        });
        expect(lastEntry.title).toBe(entryTitle);
        expect(lastEntry.info).toBe(entryInfo);
      }, 50000);
    
      test('editing a journal entry', async () => {
        await page.click(`${selectors.journalList}:last-child`); // Click on the last added entry to open details
        let oldEntry = await page.$eval(`${selectors.journalList}:last-child`, el => {
          return {
            title: el.textContent,
            info: el.dataset.info
          };
        });
        await page.click(selectors.editEntryButton);
        let updatedInfo = '!! :)';
        await page.type(selectors.detailsInfoTextarea, updatedInfo);
        await page.click(selectors.saveDetailsButton);
    
        // Validate the updated content
        let editedEntry = await page.$eval(`${selectors.journalList}:last-child`, el => {
          return {
            title: el.textContent,
            info: el.dataset.info
          };
        });
        expect(editedEntry.info).toBe(oldEntry.info+updatedInfo);
      }, 50000);

      //entries should still appear after reloading
      test('entries saved locally', async () => {
        const getJournalEntries = async () => {
          return await page.$$eval(`${selectors.journalList} p`, entries => entries.map(entry => entry.textContent));
        };
        let savedEntries = await getJournalEntries();
        await page.reload(); 
       // await page.click(calendarJournal);
        await page.click(selectors.calendarDate);  // Go back to that specific journal entry
        let entriesAfterReload = await getJournalEntries();

        expect(JSON.stringify(entriesAfterReload)).toBe(JSON.stringify(savedEntries));
      }, 10000);

      test('deleting a journal entry', async () => {
        // Add another entry before deleting
        await page.click(selectors.addButton);
        let entry = 'I want to start going to the gym?';
        await page.type(selectors.entryTitleInput, entry);
        await page.click(selectors.saveButton);
        
        await page.click(`${selectors.journalList}:last-child`);
        let prevNoteCount = await page.$$eval(selectors.journalList, notes => notes.length);
        await page.click(selectors.deleteEntryButton);
        let currNoteCount = await page.$$eval(selectors.journalList, notes => notes.length);

        expect(currNoteCount).toBe(prevNoteCount - 1);
      }, 10000);
    });

// -- Goal Setting Page Testing --

// User adds, deletes, and edits goals
    describe('Goal Entry Tests', () => {
      test('adding daily goal', async () => {
        await page.click(selectors.backButton); //exit journal entry
        const goalSettingNav = await getShadowElement(selectors.goalSettingNav); //select goal setting from nav bar
        await goalSettingNav.evaluate(el => el.click());
        await page.click(selectors.addDailyGoalButton);
        let goal = 'buy my groceries for the week';
        await page.type(selectors.dailyGoalInput, goal);
        await page.keyboard.press('Enter');
        const dailyGoals = await page.$$eval(selectors.dailyGoalList, goals => goals.map(goal => goal.textContent.trim()));

        expect(dailyGoals.includes(goal)).toBe(true);
  }, 30000);

  test('adding weekly goal', async () => {
    await page.click(selectors.addWeeklyGoalButton);
    let goal = 'finish my philosophy final paper';
    await page.type(selectors.weeklyGoalInput, goal);
    await page.keyboard.press('Enter');
    const weeklyGoals = await page.$$eval(selectors.weeklyGoalList, goals => goals.map(goal => goal.textContent.trim()));

    expect(weeklyGoals.includes(goal)).toBe(true);
  }, 30000);

  test('adding long-term goal', async () => {
    await page.click(selectors.addLongTermGoalButton);
    let goal = 'read 10 books this year';
    await page.type(selectors.longTermGoalInput, goal);
    await page.keyboard.press('Enter');
    const longTermGoals = await page.$$eval(selectors.longTermGoalList, goals => goals.map(goal => goal.textContent.trim()));
    
    expect(longTermGoals.includes(goal)).toBe(true);
  }, 30000);

  test('editing a daily goal', async () => {
    const initialGoals = await page.$$eval(selectors.dailyGoalList, goals => goals.map(goal => goal.textContent.trim()));
    
    // Select the last child
    const goalToEditIndex = initialGoals.length - 1; 
    const goalToEditSelector = `#daily .list-container > div:not(.last-child):nth-child(${goalToEditIndex + 1})`;
    const goalToEdit = await page.$(goalToEditSelector);
  
    await goalToEdit.click();
    const editButton = await goalToEdit.$(selectors.editButton);
    await editButton.click();
    const inputBox = await goalToEdit.$(selectors.inputBox);
    const newGoal = 'order food delivery today, buy groceries tomorrow';
    await inputBox.click({ clickCount: 3 }); // Click 3 times to select the goal's current text
    await inputBox.type(newGoal);
    await inputBox.press('Enter');
    const editedGoal = await page.evaluate(el => el.textContent.trim(), goalToEdit);
  
    expect(editedGoal).toBe(newGoal);
  }, 30000);
  
  test('ensuring goals are saved locally after reload', async () => {
    const getGoals = async () => {
      return await page.$$eval(`${selectors.dailyGoalList}`, goals => goals.map(goal => goal.textContent.trim()));
    };
    const savedGoals = await getGoals();
    await page.reload();
    const goalSettingNav = await getShadowElement(selectors.goalSettingNav);
    await goalSettingNav.evaluate(el => el.click());
    const reloadedGoals = await getGoals();
  
    expect(JSON.stringify(reloadedGoals)).toBe(JSON.stringify(savedGoals));
  }, 30000);
  
  test('deleting a daily goal', async () => {
    const initialGoals = await page.$$eval(selectors.dailyGoalList, goals => goals.map(goal => goal.textContent.trim()));
    if (initialGoals.length === 0) {
      console.error('No daily goals found to delete.');
      return;
    }
  
    // Select the last child
    const goalToDeleteIndex = initialGoals.length - 1;  
    const goalToDeleteSelector = `#daily .list-container > div:not(.last-child):nth-child(${goalToDeleteIndex + 1})`;
    const goalToDelete = await page.$(goalToDeleteSelector);
    const deleteButton = await goalToDelete.$(selectors.deleteButton);
    await deleteButton.click();       
    const remainingGoals = await page.$$eval(selectors.dailyGoalList, goals => goals.map(goal => goal.textContent.trim()));
  
    expect(remainingGoals.length).toBe(initialGoals.length - 1);
    const goalText = await page.evaluate(el => el.textContent.trim(), goalToDelete);
    expect(remainingGoals).not.toContain(goalText);
  }, 30000);
});


