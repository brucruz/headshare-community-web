import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor } from '../../test/testUtils';
import { PostMainMedia } from '.';
import {
  DeletePostMainMediaDocument,
  DeletePostMainMediaMutation,
  DeletePostMainMediaMutationVariables,
  GetPostMainMediaDocument,
  GetPostMainMediaQuery,
  GetPostMainMediaQueryVariables,
  MediaFormat,
} from '../../generated/graphql';

describe('PostMainMedia', () => {
  it('should render empty state if post does not contain main media', async () => {
    const postId = 'valid-post-id';

    const mocks: MockedResponse<GetPostMainMediaQuery>[] = [
      {
        request: {
          query: GetPostMainMediaDocument,
          variables: { id: postId } as GetPostMainMediaQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                mainMedia: null,
              },
            },
          },
        },
      },
    ];

    const postMainMedia = (
      <MockedProvider mocks={mocks}>
        <PostMainMedia communitySlug="test" postId={postId} />
      </MockedProvider>
    );
    const { getByTestId } = render(postMainMedia);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const postMainMediaComponent = getByTestId('post-main-media');
    const imageVideoUpload = getByTestId('post-main-media-empty');
    expect(postMainMediaComponent).toBeTruthy();
    expect(imageVideoUpload).toBeTruthy();
  });

  it('should render ready state if post contains main media', async () => {
    const postId = 'valid-post-id';

    const mocks: MockedResponse<GetPostMainMediaQuery>[] = [
      {
        request: {
          query: GetPostMainMediaDocument,
          variables: { id: postId } as GetPostMainMediaQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                mainMedia: {
                  _id: 'valid-media-id',
                  format: MediaFormat.Image,
                  url: 'https://example.com',
                  thumbnailUrl: 'https://example.com',
                  height: 100,
                  width: 100,
                },
              },
            },
          },
        },
      },
    ];

    const postMainMedia = (
      <MockedProvider mocks={mocks}>
        <PostMainMedia communitySlug="test" postId={postId} />
      </MockedProvider>
    );
    const { getByTestId } = render(postMainMedia);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const postMainMediaComponent = getByTestId('post-main-media');
    const mediaComponent = getByTestId('media-image');
    expect(postMainMediaComponent).toBeTruthy();
    expect(mediaComponent).toBeTruthy();
  });

  it.skip('should render uploading state if post is uploading a main video', async () => {
    ('');
  });

  it('should render UploadModal if component is clicked on empty state', async () => {
    const postId = 'valid-post-id';

    const mocks: MockedResponse<GetPostMainMediaQuery>[] = [
      {
        request: {
          query: GetPostMainMediaDocument,
          variables: { id: postId } as GetPostMainMediaQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                mainMedia: null,
              },
            },
          },
        },
      },
    ];

    const postMainMedia = (
      <MockedProvider mocks={mocks}>
        <PostMainMedia communitySlug="test" postId={postId} />
      </MockedProvider>
    );
    const { getByTestId } = render(postMainMedia);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const imageVideoUpload = getByTestId('post-main-media-empty');
    imageVideoUpload.click();

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const uploadModal = getByTestId('modal-container');
    expect(uploadModal).toBeTruthy();
  });

  it('should render UploadModal if edit button is clicked on ready state', async () => {
    const postId = 'valid-post-id';

    const mocks: MockedResponse<GetPostMainMediaQuery>[] = [
      {
        request: {
          query: GetPostMainMediaDocument,
          variables: { id: postId } as GetPostMainMediaQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                mainMedia: {
                  _id: 'valid-media-id',
                  format: MediaFormat.Image,
                  url: 'https://example.com',
                  thumbnailUrl: 'https://example.com',
                  height: 100,
                  width: 100,
                },
              },
            },
          },
        },
      },
    ];

    const postMainMedia = (
      <MockedProvider mocks={mocks}>
        <PostMainMedia communitySlug="test" postId={postId} />
      </MockedProvider>
    );
    const { getByTestId, getByText } = render(postMainMedia);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const postMainMediaComponent = getByTestId('post-main-media');
    const mediaComponent = getByTestId('media-image');
    expect(postMainMediaComponent).toBeTruthy();
    expect(mediaComponent).toBeTruthy();

    const editButton = getByText('Alterar');
    expect(editButton).toBeTruthy();
    editButton.click();

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const uploadModal = getByTestId('modal-container');
    expect(uploadModal).toBeTruthy();
  });

  it('should remove main media, when clicking on remove button on ready state', async () => {
    const postId = 'valid-post-id';
    const communitySlug = 'test';

    const getPostMainMediaMock: MockedResponse<GetPostMainMediaQuery>[] = [
      {
        request: {
          query: GetPostMainMediaDocument,
          variables: { id: postId } as GetPostMainMediaQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                mainMedia: {
                  _id: 'valid-media-id',
                  format: MediaFormat.Image,
                  url: 'https://example.com',
                  thumbnailUrl: 'https://example.com',
                  height: 100,
                  width: 100,
                },
              },
            },
          },
        },
      },
    ];

    const deletePostMainMediaMock: MockedResponse<DeletePostMainMediaMutation>[] =
      [
        {
          request: {
            query: DeletePostMainMediaDocument,
            variables: {
              postId,
              communitySlug,
            } as DeletePostMainMediaMutationVariables,
          },
          result: {
            data: {
              deletePostMainMedia: {
                errors: null,
                post: {
                  mainMedia: null,
                },
              },
            },
          },
        },
      ];

    const postMainMedia = (
      <MockedProvider
        mocks={[...deletePostMainMediaMock, ...getPostMainMediaMock]}
      >
        <PostMainMedia communitySlug={communitySlug} postId={postId} />
      </MockedProvider>
    );
    const { getByTestId, getByText } = render(postMainMedia);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const postMainMediaComponent = getByTestId('post-main-media');
    const mediaComponent = getByTestId('media-image');
    expect(postMainMediaComponent).toBeTruthy();
    expect(mediaComponent).toBeTruthy();

    const deleteButton = getByText('Excluir');
    expect(deleteButton).toBeTruthy();
    deleteButton.click();

    await waitFor(() => new Promise(res => setTimeout(res, 900)));

    const imageVideoUpload = getByTestId('post-main-media-empty');
    expect(imageVideoUpload).toBeTruthy();
  });
});
