# Social Media App

## Overview

The Social Media App is a full-stack application designed to provide users with a comprehensive social experience. This README.md file serves as a guide to understand the project structure, features, and how to set it up locally.

## Features

### 1. User Authentication

Users can securely **register**, **log in**, and manage their accounts. Authentication ensures a personalized and secure experience for each user.

### 2. Profile Management

- **Bio:** Users can add a personal bio to share information about themselves.
  
- **Profile Picture:** Customization includes the option to set a profile picture, enhancing personalization.

- **Background Image:** Users can choose a background image for their profiles, adding a creative touch.

### 3. Post Creation

Users have the ability to share their thoughts, experiences, and multimedia content by creating posts. This feature promotes self-expression and content sharing within the community.

### 4. Friendship and Following

- **Add Friends:** Users can connect with each other by adding friends, creating a network of connections.

- **Following:** The application allows users to follow each other, staying updated on their activities and posts.

### 5. Direct Messaging

Users can engage in private conversations through direct messaging, facilitating one-on-one communication.

### 6. Post Interactions

- **Likes:** Users can express appreciation for posts by liking them.

- **Comments:** Interactive discussions are encouraged through the ability to add comments to posts.

- **View Friends' Posts:** A dedicated section allows users to view posts specifically from their friends.

### 7. Search Functionality

Users can search for other users by entering their usernames, making it easy to find and connect with friends.

### 8. Home Feed

The latest addition to the project is the Home Feed feature, which allows users to share their current feelings or opinions about the weather. Users can select from predefined options, add a location, and upload an optional image. The Home Feed displays posts with associated weather icons, providing a unique and personalized touch to each user's contribution.

## Frontend Implementation

The frontend is built using **React.js**. The `HomeFeed` component is responsible for handling the new Home Feed feature. Users can input their thoughts about the weather, select from predefined options, add a location, and even upload an image. The posts are displayed with associated weather icons, and users can interact by liking, commenting, and viewing friends' posts.

### All_Messages Frontend Implementation
The frontend of our Social Media App is crafted with React.js, and the All_Messages component plays a pivotal role in managing direct conversations. Here's a concise overview of its functionality:

### Recent Conversations
Displays recent conversations with usernames and timestamps, providing a preview of the latest messages.

### User Authentication
Ensures secure user authentication by fetching and displaying the current user's information.

### Message Content
Dynamically loads and displays messages tailored to the selected user, ensuring a seamless user experience.

### Responsive Design
The sidebar showcases recent conversations, while the main content area adapts based on user interactions.

### Implementation Details
### User Authentication:
Initiates by fetching the current user's information through a secure POST request to the server's /currentSession endpoint.

### Recent Conversations:
Utilizes a GET request to the server's /recentConversation endpoint to filter and present the most recent messages for each user.

### Interaction:
Clicking on a conversation triggers an event that sets the selected user, dynamically updating the right-side panel.

### Right Side Panel:
Adapts its content based on whether a conversation is selected. If no user is chosen, a friendly message is displayed. Otherwise, it loads the Inbox_messages component for the selected user.

### Dynamic Loading:
Messages for the selected user are loaded dynamically, enhancing the user experience and providing a seamless interaction flow.


## Setup

To run the Social Media App locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Lnguyen19/ConnectSphere
