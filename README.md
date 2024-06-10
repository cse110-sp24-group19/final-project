# Coding Monkeys presents... The Cool Gen Z Work Journal

## Overview

The Cool Gen Z Work Journal is a web application designed to help you manage your tasks, set goals, and maintain a daily journal. It offers a variety of features such as creative play, goal setting, rewards, and a calendar/journal view to keep you organized and motivated.

- [Project Link](https://cse110-sp24-group19.github.io/final-project/)
- [Internal Documentation](https://cse110-sp24-group19.github.io/final-project/docs)
- [Codacy Code Coverage](https://app.codacy.com/organizations/gh/cse110-sp24-group19/dashboard)

## Table of Contents

1. [Features](#features)
2. [Setup](#setup)
3. [Usage](#usage)
4. [Future Features](#future-features)
5. [Contributing](#contributing)
6. [Developer Guide](#developer-guide)

## Features

### Main Page

- **Overview:** The landing page of the app provides easy navigation to different sections.
- **Links to:**
  - **Creative Play:** Engage in creative activities like drawing on a whiteboard.
  - **Goal Setting:** Create, track, and manage your goals.
  - **Rewards:** View your character's progress and earned rewards.
  - **Calendar/Journal:** Manage your daily journal entries and view your calendar.

### Calendar/Journal

- **Views:**
  - **Calendar View:** Displays the month with previews of journal entries for each day.
  - **Journal Entry View:** View entries specific to each day, add, edit, and delete entries.
- **Search Feature:** Search for journal entries by title in the Calendar View.

### Goal Setting

- **Categories:** Daily, Weekly, and Long-term goals.
- **Functionality:** Create, mark as complete, edit, and delete goals.

### Rewards

- **Character Status:** Track your character's evolution through stages (Egg -> Cracked Egg -> Baby -> Teenager -> Adult).
- **Point System:** Earn points for logging in daily and completing tasks.
- **Level-up Mechanism:** First level-up occurs after 10 points, with each successive level-up incrementing by 5 points.

### Creative Play

- **Whiteboard Feature:** Add text, drawings, and other elements using p5.js.

## Setup

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your machine.

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/cse110-sp24-group19/final-project.git
    ```

2. Install NPM packages

    ```sh
    npm install
    ```

## Usage

1. **Main Page:**
   - Navigate to different sections: Creative Play, Goal Setting, Rewards, and Calendar/Journal.
2. **Calendar/Journal:**
   - Switch between Calendar View and Journal Entry View to manage your entries.
   - Use the search bar in Calendar View to find specific entries by title.
3. **Goal Setting:**
   - Add new goals, mark them as complete, edit, or delete them.
4. **Rewards:**
   - Track your character's progress and evolution.
   - Earn points by logging in daily and completing tasks.
5. **Creative Play:**
   - Use the whiteboard to draw, write, and create freely.

## Future Features

- **GitHub Integration:** Track commits and integrate work logs with journal entries.
- **Labels for Journal Entries:** Categorize entries with labels such as Work, School, Personal.
- **Advanced Search:** Search entries by date range.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For detailed information, refer to our [Developer Guide](./developer-guide.md).