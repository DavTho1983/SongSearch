<h1>SETUP</h1>

1. Click the green 'Clone or download' button for this project.
2. On the modal that appears, click the copy icon on the right, or highlight the text url and copy to the clipboard.
3. Open your terminal and type 'git clone' then paste the link and press return.
4. From the newly created project directory run npm install.
5. Run npm start - the React app should open in a browser window with url

<h1>NOTES</h1>

The playlist is saved to an online database using firebase. There is currently no security on the db so I will be deleting it soon, but this means the project should just reach out to the firebase url with no problems.

An issue I encountered during development was that the playlist does not update without refreshing the browser. I could have used various methods to push the new state to a component that is not a child, but the correct way would be to use Redux, which I judged to be out of the scope of this exercise.
