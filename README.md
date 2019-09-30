<h1>SETUP</h1>

1. Click the green 'Clone or download' button for this project.
2. On the modal that appears, click the copy icon on the right, or highlight the text url and copy to the clipboard.
3. Open your terminal and type 'git clone' then paste the link and press return.
4. From the newly created project directory run npm install.
5. Run npm start - the React app should open in a browser window with url

<h1>PROJECT DESCRIPTION</h1>
This is a React project to demonstrate getting data from the external iTunes API and displaying it with JSX in React Components. It also sends requests to Google Firebase to store and retrieve data.

<h1>USAGE</h1>
Type a band, song or album in the searchbox at the top of the page. A table of the top 25 results will appear showing Track, Album and Artist columns. You can tab to the next 25 by clicking Next 5, and tab back by clicking Prev 25. Only 50 results are ever returned in the response, but should there be more, the logic will handle it.

Clicking on a row will take you to more detailed information on the row at url "/info:trackID", and clicking Add to Playlist will update the Firebase db. Clicking Submit will take you back to the search. Unique keys for the data are currently set to an index of the returned data, but this is not an ideal practice and I would have set the key to trackID, but not every item in the response is strictly a track although I ended up treating it like one.

<h1>NOTES</h1>

The playlist is saved to an online database using firebase. There is currently no security on the db so I will be deleting it soon, but this means the project should just reach out to the firebase url with no problems.

At the moment there is no Back button from the Info page and this means to go back you have to resend an iTunes PI request. This is not ideal and API requests should be as sparse as possible.

An issue I encountered during development was that the playlist does not update without refreshing the browser. I could have used various methods to push the new state to a component that is not a child, but the correct way would be to use Redux, which I judged to be out of the scope of this exercise.
