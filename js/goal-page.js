var goalCounter = 0; //used to give each goal a unique id

const dailyButton = document.getElementById('add-daily-goal');
const weeklyButton = document.getElementById('add-weekly-goal');
const longTermButton = document.getElementById('add-longterm-goal');

dailyButton.addEventListener('click', () => {
    let inputBox = document.getElementById('daily-goal-input');
    inputBox.type = 'text';
    inputBox.focus();
    inputBox.addEventListener('keypress', function(event) {
        if(event.key === 'Enter'){
            let value = inputBox.value;
            if (value != ""){
                inputBox.type = 'hidden';
                inputBox.value = "";
                createNewGoal("daily", value);
            }
        }
    });
})

weeklyButton.addEventListener('click', () => {
    let inputBox = document.getElementById('weekly-goal-input');
    inputBox.type = 'text';
    inputBox.focus();
    inputBox.addEventListener('keypress', function(event) {
        if(event.key === 'Enter'){
            let value = inputBox.value;
            if (value != ""){
                inputBox.type = 'hidden';
                inputBox.value = "";
                createNewGoal("weekly", value);
            }
        }
    });
})

longTermButton.addEventListener('click', () => {
    let inputBox = document.getElementById('longterm-goal-input');
    inputBox.type = 'text';
    inputBox.focus();
    inputBox.addEventListener('keypress', function(event) {
        if(event.key === 'Enter'){
            let value = inputBox.value;
            if (value != ""){
                inputBox.type = 'hidden';
                inputBox.value = "";
                createNewGoal("long-term", value);
            }
        }
    });
})

/**
 * Creates and adds a new goal to approporiate list
 * @param {string} category - 'daily', 'weekly', 'long-term'
 * @param {string} input - the text input for the label
 */
function createNewGoal(category, input){
    let div = document.createElement('div');
    div.id = goalCounter;
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "goal#" + goalCounter;
    let label = document.createElement('label');
    label.for = checkbox.id;
    label.textContent = "  " + input;
    goalCounter++;
    let penImg = document.createElement('img');
    penImg.src = "assets/goal_icons/pen.png";
    let trashImg = document.createElement('img');
    trashImg.src = "assets/goal_icons/trash.png";
    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(penImg);
    div.appendChild(trashImg);
    //TO-DO
    //penImg.addEventListener('click', editGoal());
    //trashImg.addEventListener('click', deleteGoal());
    let container = document.getElementById(category);  //select correct container
    let buffer = container.children[container.children.length - 1]; //query that containers very last element(add button)
    container.insertBefore(div, buffer); //new goal is inserted at the end of the list
}
