// dummy data for journal entries
let journalEntries = [
    { date: "4/1/2024", title: "April Fool's Day: Surprises and Smiles" },
    { date: "4/2/2024", title: "Blossoms and Breezes: A Springtime Walk" },
    { date: "4/3/2024", title: "Reflections on Rain: The Sounds of Spring Showers" },
    { date: "4/4/2024", title: "Books I Love: What I'm Reading This Month" },
    { date: "4/5/2024", title: "Fitness Friday: New Goals for Health" },
    { date: "4/6/2024", title: "Saturday's Solitude: Enjoying Time Alone" },
    { date: "4/7/2024", title: "Family Fun Day: Adventures Close to Home" },
    { date: "4/8/2024", title: "Mindful Monday: Practices for a Calm Week" },
    { date: "4/9/2024", title: "Tech Timeout: Disconnecting to Reconnect" },
    { date: "4/10/2024", title: "Midweek Musings: Poems and Prose" },
    { date: "4/11/2024", title: "Throwback Thoughts: Nostalgic Memories" },
    { date: "4/12/2024", title: "Green Thumb Friday: My Gardening Endeavors" },
    { date: "4/13/2024", title: "Exploring Local Markets: Finds and Favorites" },
    { date: "4/14/2024", title: "Spiritual Sunday: Reflections on Inner Peace" },
    { date: "4/15/2024", title: "Tax Day: Financial Check-Up and Future Planning" },
    { date: "4/16/2024", title: "Tea and Tranquility: My Favorite Blends" },
    { date: "4/17/2024", title: "Wellness Wednesday: Balancing Body and Mind" },
    { date: "4/18/2024", title: "Artistic Inspirations: My Creative Process" },
    { date: "4/19/2024", title: "Good Friday Reflections: Gratitude and Grace" },
    { date: "4/20/2024", title: "Easter Eve Preparations: Traditions and Treats" },
    { date: "4/21/2024", title: "Easter Celebrations: Joy and Community" },
    { date: "4/22/2024", title: "Earth Day: Commitments to a Greener Tomorrow" },
    { date: "4/23/2024", title: "Tidying Up Tuesday: Organizing My Life" },
    { date: "4/24/2024", title: "Wordy Wednesday: Diving Into Writing" },
    { date: "4/25/2024", title: "Thinking of Travel: Dream Destinations" },
    { date: "4/26/2024", title: "Fitness Recheck: Measuring My Progress" },
    { date: "4/27/2024", title: "Saturday Strolls: Exploring New Paths" },
    { date: "4/28/2024", title: "Sunny Sunday: Making the Most of the Day" },
    { date: "4/29/2024", title: "Motivation Monday: Setting the Tone for the Week" },
    { date: "4/30/2024", title: "April's End: Monthly Reflections and Lessons Learned" },
    { date: "4/1/2024", title: "April Fool's Day: Surprises and Laughs" },
    { date: "4/2/2024", title: "Quiet Contemplations: The Peace of Early Morning" },
    { date: "4/3/2024", title: "Rainy Day Reflections: Finding Beauty in the Gray" },
    { date: "4/4/2024", title: "Exploring Mindfulness: My Journey Towards Calm" },
    { date: "4/5/2024", title: "Cherishing Community: Volunteering Locally" },
    { date: "4/6/2024", title: "Weekend Wanderlust: Discovering Nearby Places" },
    { date: "4/7/2024", title: "Sunday Soul Food: Cooking Up Comfort" },
    { date: "4/8/2024", title: "Organizational Overhaul: Tidying My Space" },
    { date: "4/9/2024", title: "Taking Strides: Progress in My Fitness Goals" },
    { date: "4/10/2024", title: "Midweek Motivation: Overcoming Slumps" },
    { date: "4/11/2024", title: "Creative Sparks: Innovating with New Art Techniques" },
    { date: "4/24/2024", title: "Completed Major Project Ahead of Schedule" },
    { date: "4/23/2024", title: "Received Employee of the Month Award" },
    { date: "4/22/2024", title: "Delivered Engaging Presentation to Stakeholders" },
    { date: "4/21/2024", title: "Successfully Resolved Complex Technical Issue" },
    { date: "4/20/2024", title: "Implemented Efficiency-Boosting Process Improvement" },
    { date: "4/19/2024", title: "Secured New Client Account" },
    { date: "4/18/2024", title: "Received Positive Feedback from Supervisor" },
    { date: "4/17/2024", title: "Met Tight Deadline on Key Project" },
    { date: "4/16/2024", title: "Collaborated Effectively with Cross-Functional Team" },
    { date: "4/15/2024", title: "Completed Training Program with High Marks" },
    { date: "4/14/2024", title: "Implemented Innovative Solution to Improve Workflow" },
    { date: "4/13/2024", title: "Recognized for Outstanding Customer Service" },
    { date: "4/13/2024", title: "Through the Lens: Capturing Life in Photos" },
    { date: "4/13/2024", title: "Echoes of Laughter: Joyful Times with Friends" },
    { date: "4/13/2024", title: "Beyond the Horizon: Adventures in Travel" },
    { date: "4/12/2024", title: "Published Article in Industry Journal" },
    { date: "4/12/2024", title: "A Day to Remember: Unforgettable Moments" },
    { date: "4/12/2024", title: "Reflections Under the Stars: A Nighttime Journal" },
    { date: "4/12/2024", title: "The Crossroads: Decisions That Changed My Life" },
    { date: "4/25/2024", title: "Spring Cleaning: Renewing My Space and Spirit" },
    { date: "4/25/2024", title: "New Recipe Success: A Culinary Experiment" },
    { date: "4/25/2024", title: "Under the Moonlight: An Evening Walk to Remember" },
    { date: "4/26/2024", title: "Morning Meditation: Starting the Day with Peace" },
    { date: "4/26/2024", title: "Reflections on a Rainy Afternoon" },
    { date: "4/26/2024", title: "Catching Up with Old Friends: A Joyful Reunion" },
    { date: "4/27/2024", title: "Hidden Gems: Discovering Local Attractions" },
    { date: "4/27/2024", title: "The Joy of Gardening: Planting New Beginnings" },
    { date: "4/27/2024", title: "Movie Night: A Film That Moved Me" },
    { date: "4/28/2024", title: "A Breakthrough in My Hobby Project" },
    { date: "4/28/2024", title: "Pampering Myself: A Day of Self-Care" },
    { date: "4/28/2024", title: "A Burst of Creativity: New Artwork Ideas" },
    { date: "4/29/2024", title: "Setting Goals: My Aspirations for the Next Month" },
    { date: "4/29/2024", title: "A Visit to the Farmer Market: The Colors and Tastes of Spring" },
    { date: "4/29/2024", title: "A Long Walk and Deep Thoughts" },
    { date: "4/30/2024", title: "An Unexpected Adventure: Lost and Found in the City" },
    { date: "4/30/2024", title: "The Books That Are Shaping My Year" },
    { date: "4/30/2024", title: "Planning a Small Gathering: Excitement and Ideas" },
    { date: "5/1/2024", title: "May Day Celebrations: History and Personal Experience" },
    { date: "5/1/2024", title: "Refreshing My Workspace: A Productivity Boost" },
    { date: "5/1/2024", title: "Trying Out Yoga: First Impressions and Effects" },
    { date: "5/2/2024", title: "A Surprising Call from an Old Friend" },
    { date: "5/2/2024", title: "Exploring Photography: Capturing Spring Beauty" },
    { date: "5/2/2024", title: "New Beginnings: Starting a Journaling Habit" },
    { date: "5/3/2024", title: "Revisiting Childhood Memories: A Nostalgic Journey" },
    { date: "5/3/2024", title: "Mastering a New Skill: My Progress So Far" },
    { date: "5/3/2024", title: "Sights Unseen: Planning My Next Travel Destination" },
    { date: "5/4/2024", title: "A Day at the Beach: Sun, Sand, and Surf" },
    { date: "5/4/2024", title: "Harnessing the Morning: How Early Rising Is Changing My Days" },
    { date: "5/4/2024", title: "The Power of Music: How It Influences My Mood and Productivity" },
    { date: "5/5/2024", title: "Cinco de Mayo: Celebrating with Authentic Cuisine" },
    { date: "5/5/2024", title: "A Break in Routine: What I Learned by Doing Something Different" },
    { date: "5/5/2024", title: "Gearing Up for the Big Race: Preparations and Expectations" },
    { date: "5/6/2024", title: "Anticipation: The Eve of an Important Event" },
    { date: "5/6/2024", title: "Crafting for Charity: Making a Difference Handmade" },
    { date: "5/6/2024", title: "Back to Basics: Simplifying My Daily Routine" },
    { date: "5/7/2024", title: "Reflections on Leadership: Lessons from Leading a Team" },
    { date: "5/7/2024", title: "Watching the Seasons Change: Observations from My Window" },
    { date: "5/7/2024", title: "Learning to Let Go: The Art of Decluttering My Life"}
];

// function to retrieve journal entry titles from the array of journal entries
function getTitles(date) {
    const titles = [];
    for (let entry of journalEntries) {
        if (entry.date === date) {
            titles.push(entry.title);
        }
    }
    return titles;
}

// get current date information
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
 
const day = document.querySelector(".calendar-dates");
 
const currdate = document
    .querySelector(".calendar-current-date");
 
const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");

const calendarView = document
    .querySelector('.calendar-container');

const dayView = document
    .querySelector('.day-view');

const returnCalendarButton = document
    .getElementById('return-calendar');
 
// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
 
// Function to generate the calendar
const manipulate = () => {
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    let calendarHtml = "";

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        calendarHtml +=
            `<li class="sticky-note inactive">
                <div class="content"> 
                   <div class="date">${monthlastdate - i + 1}</div>
                   <div class="title"></div>
                   <div class="more-tasks"></div>
                </div>
            </li>`;
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
        let date = new Date(year, month, i);
        let dayOfWeek = date.getDay();
        let isWeekend = (dayOfWeek === 0 || dayOfWeek === 6) ? "weekend" : ""; 
        let isToday = i === new Date().getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        calendarHtml += `
            <li class="sticky-note ${isWeekend}" data-date="${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2, '0')}">
               <div class="content"> 
                <div class="date ${isToday}">${i}</div>
                <div class="title">Event ${i}</div>
                <div class="more-tasks">+3 more</div>
               </div>
            </li>`;
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        calendarHtml += `
            <li class="sticky-note inactive">
              <div class="content"> 
                <div class="date">${i - dayend + 1}</div>
                <div class="title"></div>
                <div class="more-tasks"></div>
               </div>
            </li>`;
    }

    // Update the text of the current date element 
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;

    // Update the HTML of the calendar element 
    // with the generated calendar
    document.querySelector('.calendar-dates').innerHTML = calendarHtml;

    // Attach event listeners to each date for opening day view
    document.querySelectorAll('.sticky-note').forEach(item => {
        item.addEventListener('click', function() {
            openDayView(this.getAttribute('data-date'));
        });
    });
};

 
manipulate();

//Function that opens the day view
function openDayView(dateString){
    //Update day view content based on the clicked date
    let formattedDate = formatDateForJournalEntries(dateString);
    document.querySelector('.day-view-date').textContent = formattedDate;

    // Shows journal entries for selected date
    let titles = getTitles(formattedDate);
    let journalList = document.getElementById('journal-list');
    journalList.innerHTML = '';
    titles.forEach(title => {
        let listItem = document.createElement('li');
        listItem.textContent = title;
        journalList.appendChild(listItem);
    });

    //Shows day view
    dayView.style.display = 'block';
    //Hide calendar view
    calendarView.style.display = 'none';
}

//Format date for journal entries
function formatDateForJournalEntries(dateString){
    const[year, month, day] = dateString.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

//Function to close day view and return to calendar
function closeDayView(){

    //Hides day view
    dayView.style.display = 'none';

    //Shows calendar view
    calendarView.style.display = 'block';
}

// Attach a click event listener to each icon
prenexIcons.forEach(icon => {
 
    // When an icon is clicked
    icon.addEventListener("click", () => {
 
        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;
 
        // Check if the month is out of range
        if (month < 0 || month > 11) {
 
            // Set the date to the first day of the 
            // month with the new year
            date = new Date(year, month, new Date().getDate());
 
            // Set the year to the new year
            year = date.getFullYear();
 
            // Set the month to the new month
            month = date.getMonth();
        }
 
        else {
 
            // Set the date to the current date
            date = new Date();
        }
 
        // Call the manipulate function to 
        // update the calendar display
        manipulate();
    });
});

// Back button functionality 
document.querySelector('.back-button').onclick = closeDayView;

// Attach event listener for the return to calendar button in the day view
returnCalendarButton.addEventListener('click', closeDayView);