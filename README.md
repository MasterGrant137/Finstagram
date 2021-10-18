<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/Finstagram-favicon.png" alt="Logo" width="90" height="90">
  </a>

  <h3 align="center">Finstagram</h3>

  <p align="center">
    A portfolio clone of <a href="https://www.instagram.com/">Instagram.com</a>
    <br />
    <a href="https://finstagram-1.herokuapp.com/" target="_blank"><strong>Explore the website »</strong></a>
    <br />
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <a href="#interesting-issues">Interesting Issues</a>
      <ul>
        <li><a href="#redux-interactions-with-follow-state">Redux Interactions With Follow State</a></li>
        <li><a href="#coordinating-feature-implementations-with-multiple-collaborators">Coordinating Feature Implementation With Multiple Collaborators</a></li>
      </ul>
    </li>
    <li>
      <a href="#features-to-implement-next">Features to Implement Next</a>
      <ul>
        <li><a href="#loading-time-efficiency">Loading Time Efficiency</a></li>
      </ul>
    <li><a href="#contact">Contact</a></li>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
*clicking the feature images below redirects you to that feature's location in the site*

[Back to top](#table-of-contents)
[![Product Name Screen Shot][product-screenshot]](https://finstagram-1.herokuapp.com/)

Instagram is a well known website with a lot of interesting social media aspects, which presented challenges with redux state and database relationships. It was a good opportunity to show our ability to create a full stack website built after one of the most popular websites in the world.

### Built With
[Back to top](#table-of-contents)
* [AWS - Amazon Web Services](https://aws.amazon.com/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

<!-- USAGE EXAMPLES -->
## Usage
[Back to top](#table-of-contents)

Users can signup and login to use Finstagram, and can login as a demo user to experience the website quickly.

[![Product Name Screen Shot][signup]](https://finstagram-1.herokuapp.com/signup)
[![Product Name Screen Shot][product-screenshot]](https://finstagram-1.herokuapp.com/login)
<br>
<br>
Once logged in, the user is directed to the Feed page, where logged-in users can view a feed of posts from users they follow, as well as their own posts.

[![Product Name Screen Shot][feed]](https://finstagram-1.herokuapp.com/signup)

Logged in users can add a new post, which appears at the top of the screen. Users can post images, gifs, or videos, as accepted file types. For posts a user owns, they can edit and delete the post. Users can also like and unlike a post.

### Adding a post:
[![Product Name Screen Shot][addPost]](https://finstagram-1.herokuapp.com/feed)

### Editing a post:
[![Product Name Screen Shot][editPost]](https://finstagram-1.herokuapp.com/feed)

### Deleting a post:
[![Product Name Screen Shot][deletePost]](https://finstagram-1.herokuapp.com/feed)

### Liking and unliking a post:
[![Product Name Screen Shot][likeUnlike]](https://finstagram-1.herokuapp.com/feed)

Users can add, edit, and delete a comment.

### Adding a comment:
[![Product Name Screen Shot][addComment]](https://finstagram-1.herokuapp.com/feed)

### Editing a comment:
[![Product Name Screen Shot][editComment]](https://finstagram-1.herokuapp.com/feed)

### Deleting a comment:
[![Product Name Screen Shot][deleteComment]](https://finstagram-1.herokuapp.com/feed)

Users can hover over the username or user image of a post's author to view that user's information. It also shows the following status of the logged in user in relation to the post author user.

### View user hover card:
[![Product Name Screen Shot][viewHover]](https://finstagram-1.herokuapp.com/feed)

Users can also click on the likes count on any post to view which users liked that post. From here, users can see whether they're following anyone in this list, and follow/unfollow as they wish.

### View post's liked users:
[![Product Name Screen Shot][viewLikes]](https://finstagram-1.herokuapp.com/feed)

<br>
<br>
Over on the Explore page, users can view posts from users they don't follow, and interact with these posts like on the Feed page.
<br>
<br>

### View posts from unfollowed users:
[![Product Name Screen Shot][exploreModal]](https://finstagram-1.herokuapp.com/explore)


Once you follow a user, their posts will appear on the feed page

### Newly followed users posts:

[![Product Name Screen Shot][newlyFollowedPosts]](https://finstagram-1.herokuapp.com/explore)
<br>
<br>

From any page where there are user posts or comments, you can click on a user's username to go to their profile page, which displays that user's number of posts, followers, and users followed.

### User profile pages:

(add profile navigation gif)

## Interesting Issues:
### Redux Interactions With Follow State
[Back to top](#table-of-contents)

<b>Issue</b>: The explore page was based on a slice of state that held all of the user's posts of users that the current session user did not follow, while the feed page was based on a separate slice that held all of the user's posts of users that the session user <i>does</i> follow. This created an issue when following a user on the explore page, as the website would crash because it would be looking for a user in the non-followed user's posts slice after that user had been moved out of that redux slice of state. A similar issue would happen on the feed page when unfollowing a user.

<b>Solution</b>: A new slice of state had to be made that held all users that both the explore and feed pages depended their views on. That way, whether a user was being followed or not, their movement between the followed users slice of state and the non-followed users slice of state did not affect the rendering of each page. This taught us the importance of not only thinking of ways to organize redux state, but how information would be moved between slices of state based on user interaction. In the future, it is important to think of how state is malleable, and how to defensively code against changes in state.

### Coordinating Feature Implementation With Multiple Collaborators
[Back to top](#table-of-contents)

<b>Issue</b>: Though it may seem simple, having multiple people work on a project in tandem created some interesting challenges when it came to maximizing the efficiency of our coding, while preventing each of us from stepping on the others toes when it comes to editing the same files.

<b>Solution</b>: Constant communication and planning helped us stay efficient so that we could each work on a separate feature of the website, and when we had to work on the same files/features, talking out how to organize merge conflicts helped enormously so that we could keep the ball rolling on coding out the project.

## Features to Implement Next
### Loading Time Efficiency
[Back to top](#table-of-contents)

<b>Issue</b>: As more posts, comments, likes, and users get added to the database, the amount of time it takes for the website to store new likes and comments and render that change on the frontend increases.

<b>How I would do it</b>: Currently, the redux thunk that adds these entities wait for the database to be updated before updating the redux store. The best solution would be to key into the specific post that is being liked/commented on, and change the redux store in parallel to the fetch to the database. That way, a user can see the result of their action immediately, instead of waiting for the database update to complete.

## Contact
[Back to top](#table-of-contents)

Jason Cahela - [LinkedIn](https://www.linkedin.com/in/jason-cahela/)

Alejandro C. Grant - [LinkedIn](https://www.linkedin.com/in/josue-e-j-lugaro-3462131b8/)

Josue E.J. Lugaro - [LinkedIn](https://www.linkedin.com/in/alejandro-c-grant/)

Project Repo Link: [https://github.com/jcahela/Finstagram](https://github.com/jcahela/Finstagram)

Project Link: [https://finstagram-1.herokuapp.com/](https://finstagram-1.herokuapp.com/)

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/Finstagram_landing.gif
[signup]: images/Finstagram-signup.PNG
[login]: images/loginmodal.png
[feed]: images/Finstagram-feed.gif
[addPost]: images/Finstagram-add-post.gif
[editPost]: images/Finstagram-edit-post.gif
[deletePost]: images/Finstagram-delete-post.gif
[likeUnlike]: images/Finstagram-like-unlike-post.gif
[addComment]: images/Finstagram-add-comment.gif
[editComment]: images/Finstagram-edit-comment.gif
[deleteComment]: images/Finstagram-delete-comment.gif
[addComment]: images/Finstagram-add-comment.gif
[viewHover]: images/Finstagram-hover-info.gif
[viewLikes]: images/Finstagram-like-info.gif
[exploreModal]: images/Finstagram-explore-modal.gif
[newlyFollowedPosts]: images/Finstagram-newly-followed.gif
