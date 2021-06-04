import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor } from '../../test/testUtils';
import { PostCover } from '.';
import {
  DeletePostCoverDocument,
  DeletePostCoverMutation,
  DeletePostCoverMutationVariables,
  GetPostCoverDocument,
  GetPostCoverQuery,
  GetPostCoverQueryVariables,
  MediaFormat,
} from '../../generated/graphql';

describe('PostCover', () => {
  it('should render empty state if post does not contain cover', async () => {
    const postId = 'valid-post-id';

    const mocks: MockedResponse<GetPostCoverQuery>[] = [
      {
        request: {
          query: GetPostCoverDocument,
          variables: { id: postId } as GetPostCoverQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                cover: null,
              },
            },
          },
        },
      },
    ];

    const postCover = (
      <MockedProvider mocks={mocks}>
        <PostCover communitySlug="test" postId={postId} />
      </MockedProvider>
    );
    const { getByTestId } = render(postCover);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const postCoverComponent = getByTestId('post-cover');
    const imageUpload = getByTestId('post-cover-empty');
    expect(postCoverComponent).toBeTruthy();
    expect(imageUpload).toBeTruthy();
  });

  it('should render ready state if post contains cover', async () => {
    const postId = 'valid-post-id';

    const mocks: MockedResponse<GetPostCoverQuery>[] = [
      {
        request: {
          query: GetPostCoverDocument,
          variables: { id: postId } as GetPostCoverQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                cover: {
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

    const postCover = (
      <MockedProvider mocks={mocks}>
        <PostCover communitySlug="test" postId={postId} />
      </MockedProvider>
    );
    const { getByTestId } = render(postCover);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const postCoverComponent = getByTestId('post-cover');
    const mediaComponent = getByTestId('media-image');
    expect(postCoverComponent).toBeTruthy();
    expect(mediaComponent).toBeTruthy();
  });

  it('should render UploadModal if component is clicked on empty state', async () => {
    const postId = 'valid-post-id';

    const mocks: MockedResponse<GetPostCoverQuery>[] = [
      {
        request: {
          query: GetPostCoverDocument,
          variables: { id: postId } as GetPostCoverQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                cover: null,
              },
            },
          },
        },
      },
    ];

    const postCover = (
      <MockedProvider mocks={mocks}>
        <PostCover communitySlug="test" postId={postId} />
      </MockedProvider>
    );
    const { getByTestId } = render(postCover);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const imageUpload = getByTestId('post-cover-empty');
    imageUpload.click();

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const uploadModal = getByTestId('modal-container');
    expect(uploadModal).toBeTruthy();
  });

  it('should render UploadModal if edit button is clicked on ready state', async () => {
    const postId = 'valid-post-id';

    const mocks: MockedResponse<GetPostCoverQuery>[] = [
      {
        request: {
          query: GetPostCoverDocument,
          variables: { id: postId } as GetPostCoverQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                cover: {
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

    const postCover = (
      <MockedProvider mocks={mocks}>
        <PostCover communitySlug="test" postId={postId} />
      </MockedProvider>
    );
    const { getByTestId, getByText } = render(postCover);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const postCoverComponent = getByTestId('post-cover');
    const mediaComponent = getByTestId('media-image');
    expect(postCoverComponent).toBeTruthy();
    expect(mediaComponent).toBeTruthy();

    const editButton = getByText('Alterar');
    expect(editButton).toBeTruthy();
    editButton.click();

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const uploadModal = getByTestId('modal-container');
    expect(uploadModal).toBeTruthy();
  });

  it('should remove cover, when clicking on remove button on ready state', async () => {
    const postId = 'valid-post-id';
    const communitySlug = 'test';

    const getPostCoverMock: MockedResponse<GetPostCoverQuery>[] = [
      {
        request: {
          query: GetPostCoverDocument,
          variables: { id: postId } as GetPostCoverQueryVariables,
        },
        result: {
          data: {
            findPostById: {
              errors: [],
              post: {
                cover: {
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

    const deletePostCoverMock: MockedResponse<DeletePostCoverMutation>[] = [
      {
        request: {
          query: DeletePostCoverDocument,
          variables: {
            postId,
            communitySlug,
          } as DeletePostCoverMutationVariables,
        },
        result: {
          data: {
            deletePostCover: {
              cover: null,
            },
          },
        },
      },
    ];

    const postMainMedia = (
      <MockedProvider mocks={[...deletePostCoverMock, ...getPostCoverMock]}>
        <PostCover communitySlug={communitySlug} postId={postId} />
      </MockedProvider>
    );
    const { getByTestId, getByText } = render(postMainMedia);

    await waitFor(() => new Promise(res => setTimeout(res, 0)));

    const postMainMediaComponent = getByTestId('post-cover');
    const mediaComponent = getByTestId('media-image');
    expect(postMainMediaComponent).toBeTruthy();
    expect(mediaComponent).toBeTruthy();

    const deleteButton = getByText('Excluir');
    expect(deleteButton).toBeTruthy();
    deleteButton.click();

    await waitFor(() => new Promise(res => setTimeout(res, 900)));

    const imageUpload = getByTestId('post-cover-empty');
    expect(imageUpload).toBeTruthy();
  });
});
