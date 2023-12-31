# Connect-Sphere 

## Overview

Connect-Sphere is a full-stack application designed to provide users with a comprehensive social experience. This README.md file serves as a guide to understand the project structure, features, and how to set it up locally.

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

## Implementation Details
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


## Profile_view Frontend Implementation
Our Social Media App's frontend, powered by React.js, includes the Profile_view component, a central element for viewing user profiles. Here's a brief insight into its features:

### User Profile Display:
Showcases the user's profile picture, background picture, and essential details such as username, name, and age.
Allows users to view the total number of followers, followings, and posts.

### Follow and Message Functionality:
Provides options for users to follow or unfollow a profile.
Includes a messaging button to initiate direct communication.

### Bio Section:
Displays the user's biography and allows for easy editing.

### Post Section:
Presents a collection of user posts with associated details.
Users can like, comment, and view additional information about each post.
## Implementation Details
### User Profile Display:
Utilizes state variables to manage user-related information, such as profile and background pictures, bio, and follower details.
### Follow and Message Functionality:
Employs asynchronous functions for handling follow/unfollow actions.
Integrates a messaging button to direct users to the direct messaging feature.
### Bio Section:
Enables users to view and edit their biography.
Implements functionality to upload a new bio.
### Post Section:
Fetches and displays user posts dynamically.
Utilizes cloudinary for efficient handling of profile pictures associated with each post.
### Dynamic Profile Pictures:
Fetches profile pictures asynchronously and ensures efficient rendering.

## Self-Profile
### Profile Picture and Background Update:
Integrates file input elements for users to select and update their profile and background pictures.
Implements functionality to upload the new pictures to the server.
### Bio Section:
Allows users to view and edit their biography.
Incorporates options for users to edit and submit changes to their bio.

## Followers and Following Component Frontend Implementation
The Followers component in our React.js-based Social Media App focuses on managing user followers and providing a user-friendly interface for interactions. Here's a detailed breakdown of its 
 ### functionality:
State Management
### useState Hook:
Utilizes the useState hook to manage state variables such as friends, Following, username, and profilePic.
### User Avatar Function:
Implements the userAvatar function to construct the appropriate URL for a user's profile picture.
Utilizes Cloudinary for image storage and retrieval.
### Profile Picture Fetching:
Utilizes the getProfilePic function to asynchronously fetch a user's profile picture from the server.
Handles cases where no profile picture is found or an error occurs during fetching.
### Profile Picture Rendering:
Uses the useEffect hook to dynamically fetch and render profile pictures for each follower when the component mounts.
Renders profile pictures within the list of followers and followings.
## User Data Fetching:
### Current Session Retrieval:
Initiates a POST request to the /currentSession endpoint to fetch the current session user's username securely.
Sets the username state variable.
### Follower Data Fetching:
Fetches the list of followers or followings  for the current user with a GET request to the /getFollowers/${username} (Will be /getFollowing/${username} for the following section) endpoint.
Sets the friends state variable with follower data and the following data.
## Unfollow / Remove Functionality:
### Unfollow/ Remove Function:
Implements the unfollow and removes functions to remove a follower or to unfollow and updates the state accordingly.
Sends DELETE requests to the server to remove the follower and following relationships.
## Component Rendering:
### Navbar Integration:
Integrates a NavBar component for seamless navigation within the application.
### Followers and Followings  Display:
Maps through the friends array to render each follower's profile picture, username, and a "Remove" button.
Displays the total number of followers at the top of the component.
## Responsive Design:
### Layout Structure:
Ensures a user-friendly layout with a clean separation of recent conversations and conversation content.
Responsive design adapts the main content area based on user interactions.

# Search Component Frontend Implementation
The Search component in our React.js-based Social Media App focuses on providing users with the ability to search for other users. Here's an in-depth breakdown of its functionality:

## State Management:
### useState Hook:
Utilizes the useState hook to manage state variables such as username and searchInput.
## User Data Fetching:
### Search Query Handling:
Utilizes the useEffect hook to trigger a GET request to the /search endpoint whenever the searchInput changes.
Fetches user data based on the entered search input.
### User Not Found Handling:
Checks if the response contains valid user data. If not, displays a "User Not Found" message.
## User Avatar Handling:
### User Avatar Function:
Implements the userAvatar function to construct the appropriate URL for a user's profile picture.
Utilizes Cloudinary for image storage and retrieval.
## Component Rendering:
### Navbar Integration:

Integrates a NavBar component for consistent navigation within the application.
### Search Bar:

Displays a search bar with an input field and a search button.
Iconography (search icon) enhances the visual appeal of the search bar.
### Search Result Display:

Conditionally renders search results based on whether the user was found or not.
If the user is found, displays their profile picture and username.
## Responsive Design:
### Layout Structure:
Ensures a user-friendly layout with a clean separation of the search bar and search results.
Responsive design adapts to different screen sizes.

## Setup

To run Connect-Sphere  locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Lnguyen19/ConnectSphere
