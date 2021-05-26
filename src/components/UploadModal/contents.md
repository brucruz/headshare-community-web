### Upload Modal contents

#### For main media

1. Upload modal state (useMemo)

- switches between states to display the initial state, select video or select image

2. Upload video function

- starts upload video mutation
- manages Tus upload states and info
- updates upload states to upper component
- does not associate newly created media as post's main media

3. Upload image as main media function

- gets S3 filename
- starts upload image mutation -- this also sets the selected image as post's main media
- uploads image to S3
- updates upload states to upper component

### Draft page

#### For thumbnail

1. handleMediaUpload callback

- upload image mutation - creates an Media in DB

2. handleThumbnailSelect callback

- update thumbnail mutation - assigns thumbnail as main media thumbnail

#### For main media

1. OK post useEffect

- sets main media state to empty or ready

2. OK postData useEffect

- sets post, description, slug, tags, exclusive and thumbnailUrl, if they exists in postData (result from query)

3. OK mainMedia + post + updatePost + communitySlug + id + uploadInfo + exclusive useEffect

- update Post mutation - sets the new uploaded media as the post's main Madia

4. formatted upload (useMemo)

- transforms the upload info state to a human-readable format

5. get editor save state (useCallback)

- fetches the post builder (editor) save state (saving or saved)

6. publish post (useCallback)

- updates Post mutation to status published
- also updates description, slug and exclusive
- if the user does not want to publish the post, but wants to updates a post description, slug, or exclusivity he does not have other way of doing this
- also: the button is not clear that it also is saving the other fields
- after the mutation is done, it redirects the user to the published post

7. main media (useMemo)

- a constant that is assigned from postMainMedia (or a main media already linked to a post in the server) or uploadedInfoMainMedia (or a media recently uploaded to server)

8. remove post main media (useCallback)

- updates a post to a empty main media state

9. handle remove tag from post (useCallback)

- resets the post tags to a new state without the clicked tag
- update post mutation to register the new state in the server

10. handle select tag (useCallback)

- resets the post tags to a new state including the clicked tag
- update post mutation to register the new state in the server

## So.. what to do?

[ ] isolate main media:
[x] it should be separated component, containing the different states
[x] it should be handle the mutations and querying (if provided with an media id) of the
[x] it should call upload modal whenever an user wants to update the component
[x] it should delegate what to do about the post thumbnail to the server
[ ] create tests to this component

[x] make upload modal independent
[x] it should be able to serve both the thumbnail and the main media
[x] create tests to this component
