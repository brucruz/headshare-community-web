/* eslint-disable no-underscore-dangle */
import { withApollo as createWithApollo } from 'next-apollo';
import {
  ApolloCache,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { NextPageContext } from 'next';
import { PostsResponse, TagsResponse } from '../generated/graphql';

const cache: ApolloCache<NormalizedCacheObject> = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(
            existing: PostsResponse | undefined,
            incoming: PostsResponse,
          ): PostsResponse {
            const paginatedPosts: PostsResponse = {
              ...incoming,
              paginatedPosts: {
                __typename: 'PaginatedPosts',
                hasMore: incoming.paginatedPosts?.hasMore || false,
                posts: [
                  ...(existing?.paginatedPosts?.posts || []),
                  ...(incoming.paginatedPosts?.posts || []),
                ],
              },
            };

            return paginatedPosts;
          },
        },
        tags: {
          keyArgs: false,
          merge(
            existing: TagsResponse | undefined,
            incoming: TagsResponse,
          ): TagsResponse {
            const paginatedTags: TagsResponse = {
              ...incoming,
              paginatedTags: {
                __typename: 'PaginatedTags',
                hasMore: incoming.paginatedTags?.hasMore || false,
                tags: [
                  ...(existing?.paginatedTags?.tags || []),
                  ...(incoming.paginatedTags?.tags || []),
                ],
              },
            };

            return paginatedTags;
          },
        },
      },
    },
  },
});

const createClient =
  // (
  //   ctx: NextPageContext,
  // ): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    // headers: {
    //   cookie:
    //     (typeof window === 'undefined' ? ctx.req?.headers.cookie : undefined) ||
    //     '',
    // },
    cache,
  });

export const withApollo = createWithApollo(createClient);
