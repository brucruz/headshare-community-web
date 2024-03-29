### Upload Modal contents

#### For main media

1. Upload modal state (useMemo)

- [x] switches between states to display the initial state, select video or select image

2. Upload video function

- [x] starts upload video mutation
- [x] manages Tus upload states and info
- [x] updates upload states to upper component
- [x] associates newly created media as post's main media

3. Upload image as main media function

- [x] gets S3 filename
- [x] starts upload image mutation -- this also sets the selected image as post's main media
- [x] uploads image to S3
- [x] updates upload states to upper component

### Draft page

#### For thumbnail

1. handleMediaUpload callback

- upload image mutation - creates an Media in DB

2. handleThumbnailSelect callback

- update thumbnail mutation - assigns thumbnail as main media thumbnail

#### For main media

1. post useEffect

- [x] sets main media state to empty or ready

2. formatted upload (useMemo)

- [x] transforms the upload info state to a human-readable format

3. publish post (useCallback)

- [ ] updates Post mutation to status published
- [ ] REMOVE also updates description, slug and exclusive
- [x] if the user does not want to publish the post, but wants to updates a post description, slug, or exclusivity he does not have other way of doing this
- [x] also: the button is not clear that it also is saving the other fields
- [x] after the mutation is done, it redirects the user to the published post

4. main media (useMemo)

- [x] a constant that is assigned from postMainMedia (or a main media already linked to a post in the server) or uploadedInfoMainMedia (or a media recently uploaded to server)

5. remove post main media (useCallback)

- [x] updates a post to a empty main media state

## So.. what to do?

[x] isolate main media:
[x] it should be separated component, containing the different states
[x] it should be handle the mutations and querying (if provided with an media id) of the
[x] it should call upload modal whenever an user wants to update the component
[x] it should delegate what to do about the post thumbnail to the server
[x] create tests to this component

[x] make upload modal independent
[x] it should be able to serve both the thumbnail and the main media
[x] create tests to this component
