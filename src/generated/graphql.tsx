import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  communities: CommunitiesResponse;
  community: CommunityResponse;
  /** Queries all posts in database */
  posts: PostsResponse;
  /** Queries all posts in database */
  allPosts: PostsResponse;
  /** Queries an post by providing an email. If none is found, return null. */
  findPostById?: Maybe<PostResponse>;
  /** Queries a post by providing community and post slugs. If none is found, return null. */
  findPostBySlugs: PostResponse;
  me?: Maybe<UserResponse>;
  /** Queries all users in database */
  users: UsersResponse;
  /** Queries an user by providing an email. If none is found, return null. */
  findUserByEmail?: Maybe<UserResponse>;
  /** Queries all tags in database */
  tags: TagsResponse;
  /** Queries an tag by providing an email. If none is found, return null. */
  tag: TagResponse;
  /** Queries an tag by providing an slug. If none is found, return null. */
  findTagBySlug: TagResponse;
  /** Queries an tag by providing slugs. If none is found, return null. */
  findTagBySlugs: TagResponse;
  /** Queries an tag by providing an user input. If none is found, return null. */
  findTagsByInput: TagsResponse;
  /** Queries all roles in database */
  roles: RolesResponse;
  /** Queries an role by providing an email. If none is found, return null. */
  role?: Maybe<RoleResponse>;
  medias: MediasResponse;
  media: MediaResponse;
};


export type QueryCommunityArgs = {
  slug: Scalars['String'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryAllPostsArgs = {
  postOptions?: Maybe<PostOptionsInput>;
};


export type QueryFindPostByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindPostBySlugsArgs = {
  data: FindBySlugsInput;
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryTagArgs = {
  id: Scalars['String'];
};


export type QueryFindTagBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindTagBySlugsArgs = {
  data: FindByTagsInput;
};


export type QueryFindTagsByInputArgs = {
  data: FindByUserInput;
};


export type QueryRolesArgs = {
  userId?: Maybe<Scalars['String']>;
  communitySlug?: Maybe<Scalars['String']>;
};


export type QueryRoleArgs = {
  id: CreateRoleInput;
};


export type QueryMediaArgs = {
  id: Scalars['String'];
};

export type CommunitiesResponse = {
  __typename?: 'CommunitiesResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  communities?: Maybe<Array<Community>>;
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field: Scalars['String'];
  message: Scalars['String'];
};

/** The Communities model */
export type Community = {
  __typename?: 'Community';
  _id: Scalars['ObjectId'];
  /** Community title */
  logo?: Maybe<Scalars['String']>;
  /** Community title */
  title: Scalars['String'];
  /** Community slug to use on url */
  slug: Scalars['String'];
  /** Community description */
  description?: Maybe<Scalars['String']>;
  /** Community avatar used to visually identify community info */
  avatar?: Maybe<Media>;
  /** Community image banner to be displayed in its homepage */
  banner?: Maybe<Media>;
  posts: Array<Post>;
  tags: Array<Tag>;
  roles: Array<Role>;
  /** The user who created this community */
  creator: User;
  /** The number of users following this community */
  followersCount: Scalars['Int'];
  /** The number of subscribed users in this community */
  membersCount: Scalars['Int'];
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** Community creation date */
  createdAt: Scalars['DateTime'];
  /** Community last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};


/** The Communities model */
export type CommunityTagsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


/** Media model */
export type Media = {
  __typename?: 'Media';
  _id: Scalars['ObjectId'];
  /** Media format */
  format: MediaFormat;
  /** Media host url */
  url: Scalars['String'];
  /** Media thumbnail host url */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** Media internal name */
  name?: Maybe<Scalars['String']>;
  /** Media internal description */
  description?: Maybe<Scalars['String']>;
  /** Media file information */
  file: File;
  /** Media original width */
  width?: Maybe<Scalars['Float']>;
  /** Media original height */
  height?: Maybe<Scalars['Float']>;
  /** Link through which the media file should be uploaded to */
  uploadLink: Scalars['String'];
  community: Community;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** Post creation date */
  createdAt: Scalars['DateTime'];
  /** Post last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The possible formats a media might have */
export enum MediaFormat {
  /** Image and audio content */
  Video = 'VIDEO',
  /** Image only content */
  Image = 'IMAGE',
  /** Audio only content */
  Audio = 'AUDIO'
}

/** Media file model */
export type File = {
  __typename?: 'File';
  /** Media file name */
  name?: Maybe<Scalars['String']>;
  /** Media file size */
  size?: Maybe<Scalars['Int']>;
  /** Media file extension */
  extension?: Maybe<Scalars['String']>;
  /** Media file mime type */
  type?: Maybe<Scalars['String']>;
};


/** The Posts model */
export type Post = {
  __typename?: 'Post';
  _id: Scalars['ObjectId'];
  /** Post title */
  title?: Maybe<Scalars['String']>;
  /** Post title with h1 tags */
  formattedTitle?: Maybe<Scalars['String']>;
  /** Post slug to use on url */
  slug?: Maybe<Scalars['String']>;
  /** Post unique slug, combining the post slug with its community to use on url */
  canonicalComponents?: Maybe<Scalars['String']>;
  /** Post description */
  description?: Maybe<Scalars['String']>;
  /** created post status */
  status?: Maybe<PostStatus>;
  /** Post main media information */
  mainMedia?: Maybe<Media>;
  /** Post content */
  content?: Maybe<Scalars['String']>;
  /** True if only exclusive members can access its content */
  exclusive?: Maybe<Scalars['Boolean']>;
  /** Number of likes this post has received */
  likes?: Maybe<Scalars['Float']>;
  creator: User;
  community: Community;
  tags: Array<Tag>;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** Post creation date */
  createdAt: Scalars['DateTime'];
  /** Post last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The possible status a post might have */
export enum PostStatus {
  /** A post after been submited by its creator and now visible to every allowed member */
  Published = 'PUBLISHED',
  /** A post while is being written and visible only its creator */
  Draft = 'DRAFT',
  /** A post scheduled to be submited in a future date and hour */
  Scheduled = 'SCHEDULED'
}

/** The Users model */
export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  /** User name */
  name: Scalars['String'];
  /** User surname */
  surname?: Maybe<Scalars['String']>;
  /** User email to be used on login */
  email: Scalars['String'];
  /** User avatar image link */
  avatar?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  roles: Array<Role>;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** User creation date */
  createdAt: Scalars['DateTime'];
  /** User last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The Roles model */
export type Role = {
  __typename?: 'Role';
  _id: Scalars['ObjectId'];
  /** User role in community */
  role: RoleOptions;
  user: User;
  community: Community;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** User creation date */
  createdAt: Scalars['DateTime'];
  /** User last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The possible roles an user can assume in a community */
export enum RoleOptions {
  /** Super users that have full access rights to all communities */
  SuperAdmin = 'SUPER_ADMIN',
  /** The user who created the community and thus have full access rights to the community */
  Creator = 'CREATOR',
  /** A user who is a paying member of a community, and have access to all its restricted content */
  Member = 'MEMBER',
  /** A user who is a free member of a community and have chosen to share its data with the community, to be notified of new unrestricted content */
  Follower = 'FOLLOWER'
}

/** The Tags model */
export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ObjectId'];
  /** Tag title */
  title: Scalars['String'];
  /** Tag slug to use on url */
  slug: Scalars['String'];
  /** Tag unique slug, combining the tag slug with its community to use on url */
  canonicalComponents: Scalars['String'];
  /** Tag description */
  description?: Maybe<Scalars['String']>;
  community: Community;
  posts: Array<Post>;
  /** The number of posts with this tag */
  postCount: Scalars['Int'];
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** Tag creation date */
  createdAt: Scalars['DateTime'];
  /** Tag last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};


/** The Tags model */
export type TagPostsArgs = {
  postOptions?: Maybe<PostOptionsInput>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


/** The Tags model */
export type TagPostCountArgs = {
  postOptions?: Maybe<PostOptionsInput>;
};

export type PostOptionsInput = {
  /** Specifies which post status should be retrieved */
  status?: Maybe<PostStatus>;
};

export type CommunityResponse = {
  __typename?: 'CommunityResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  community?: Maybe<Community>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  posts?: Maybe<Array<Post>>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  post?: Maybe<Post>;
};

export type FindBySlugsInput = {
  /** Community slug */
  communitySlug: Scalars['String'];
  /** Post slug */
  postSlug: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  user?: Maybe<User>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  users?: Maybe<Array<User>>;
};

export type TagsResponse = {
  __typename?: 'TagsResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  tags?: Maybe<Array<Tag>>;
};

export type TagResponse = {
  __typename?: 'TagResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  tag?: Maybe<Tag>;
};

export type FindByTagsInput = {
  /** Community slug */
  communitySlug: Scalars['String'];
  /** Tag slug */
  tagSlug: Scalars['String'];
};

export type FindByUserInput = {
  /** Community slug */
  communitySlug: Scalars['String'];
  /** User slug */
  userInput: Scalars['String'];
};

export type RolesResponse = {
  __typename?: 'RolesResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  roles?: Maybe<Array<Role>>;
};

export type RoleResponse = {
  __typename?: 'RoleResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  role?: Maybe<Role>;
};

export type CreateRoleInput = {
  /** User role in community */
  role: RoleOptions;
  /** User of which the role is about */
  user: Scalars['ObjectId'];
  /** Community of which the role is about */
  community: Scalars['ObjectId'];
};

export type MediasResponse = {
  __typename?: 'MediasResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  medias?: Maybe<Array<Media>>;
};

export type MediaResponse = {
  __typename?: 'MediaResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  media?: Maybe<Media>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Users can create a community */
  createCommunity: CommunityResponse;
  updateCommunity: CommunityResponse;
  createPost: PostResponse;
  updatePost?: Maybe<PostResponse>;
  updatePostMainMedia: PostResponse;
  /** Users can remove main media from a post */
  deletePostMainMedia: PostResponse;
  /** Users can upload a image directly as a post main media */
  updatePostMainImage: PostResponse;
  register: LoggedUserResponse;
  login: LoggedUserResponse;
  updateUser?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  createTag: TagResponse;
  updateTag?: Maybe<TagResponse>;
  createRole: RoleResponse;
  updateRole?: Maybe<RoleResponse>;
  /** Users can import a media */
  uploadVideo: MediaResponse;
  /** Users can import a media */
  uploadImage: MediaResponse;
};


export type MutationCreateCommunityArgs = {
  communityData: CreateCommunityInput;
};


export type MutationUpdateCommunityArgs = {
  updateData: UpdateCommunityInput;
  id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
  communitySlug: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  updateData: UpdatePostInput;
  id: Scalars['String'];
  communitySlug: Scalars['String'];
};


export type MutationUpdatePostMainMediaArgs = {
  mainMediaData: UpdateMediaInput;
  postId: Scalars['String'];
  communityId: Scalars['String'];
};


export type MutationDeletePostMainMediaArgs = {
  postId: Scalars['String'];
  communitySlug: Scalars['String'];
};


export type MutationUpdatePostMainImageArgs = {
  imageData: UploadImageInput;
  postId: Scalars['String'];
  communitySlug: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterUserInput;
};


export type MutationLoginArgs = {
  loginData: LoginUserInput;
};


export type MutationUpdateUserArgs = {
  updateData: EditMeInput;
  _id: Scalars['ObjectId'];
};


export type MutationCreateTagArgs = {
  data: CreateTagInput;
  communitySlug: Scalars['String'];
};


export type MutationUpdateTagArgs = {
  updateData: UpdateTagInput;
  id: Scalars['String'];
  communitySlug: Scalars['String'];
};


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};


export type MutationUpdateRoleArgs = {
  updateData: UpdateRoleInput;
  id: Scalars['String'];
};


export type MutationUploadVideoArgs = {
  videoData: UploadMediaInput;
  communitySlug: Scalars['String'];
};


export type MutationUploadImageArgs = {
  imageData: UploadImageInput;
  communitySlug: Scalars['String'];
};

export type CreateCommunityInput = {
  /** Community title */
  logo?: Maybe<Scalars['String']>;
  /** Community title */
  title: Scalars['String'];
  /** Community slug to use on url */
  slug: Scalars['String'];
  /** Community description */
  description?: Maybe<Scalars['String']>;
};

export type UpdateCommunityInput = {
  /** Community title */
  logo?: Maybe<Scalars['String']>;
  /** Community title */
  title?: Maybe<Scalars['String']>;
  /** Community slug to use on url */
  slug?: Maybe<Scalars['String']>;
  /** Community description */
  description?: Maybe<Scalars['String']>;
  /** Community avatar used to visually identify community info */
  avatar?: Maybe<Scalars['String']>;
  /** Community image banner to be displayed in its homepage */
  banner?: Maybe<Scalars['String']>;
};

export type CreatePostInput = {
  /** Post title */
  title?: Maybe<Scalars['String']>;
  /** Post title with h1 tags */
  formattedTitle?: Maybe<Scalars['String']>;
  /** Post slug to use on url */
  slug?: Maybe<Scalars['String']>;
  /** Post description */
  description?: Maybe<Scalars['String']>;
  /** Post content */
  content?: Maybe<Scalars['String']>;
  /** Post main media information */
  mainMedia?: Maybe<Scalars['ObjectId']>;
  /** If true, only exclusive members may view its content */
  exclusive?: Maybe<Scalars['Boolean']>;
  /** Post content */
  tags?: Maybe<Array<Scalars['ObjectId']>>;
};

export type UpdatePostInput = {
  /** Post title */
  title?: Maybe<Scalars['String']>;
  /** Post title with h1 tags */
  formattedTitle?: Maybe<Scalars['String']>;
  /** Post slug to use on url */
  slug?: Maybe<Scalars['String']>;
  /** Post description */
  description?: Maybe<Scalars['String']>;
  /** Post content */
  content?: Maybe<Scalars['String']>;
  /** Post main media information */
  mainMedia?: Maybe<Scalars['String']>;
  /** If true, only exclusive members may view its content */
  exclusive?: Maybe<Scalars['Boolean']>;
  /** Post content */
  tags?: Maybe<Array<Scalars['ObjectId']>>;
  /** created post status */
  status?: Maybe<PostStatus>;
};

export type UpdateMediaInput = {
  /** Media format */
  format?: Maybe<MediaFormat>;
  /** Media url */
  url?: Maybe<Scalars['String']>;
  /** Media thumbnail picture url */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** Media internal name */
  name?: Maybe<Scalars['String']>;
  /** Media internal description */
  description?: Maybe<Scalars['String']>;
  /** Media file information */
  file?: Maybe<FileInput>;
  /** Media original width (for images) */
  width?: Maybe<Scalars['Float']>;
  /** Media original height (for images) */
  height?: Maybe<Scalars['Float']>;
};

export type FileInput = {
  /** Media file name */
  name?: Maybe<Scalars['String']>;
  /** Media file size */
  size?: Maybe<Scalars['Int']>;
  /** Media file type */
  type?: Maybe<Scalars['String']>;
  /** Media file extension */
  extension?: Maybe<Scalars['String']>;
};

export type UploadImageInput = {
  /** Media format */
  format: MediaFormat;
  /** Media thumbnail picture url */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** Media internal name */
  name?: Maybe<Scalars['String']>;
  /** Media internal description */
  description?: Maybe<Scalars['String']>;
  /** Media file information */
  file: FileInput;
  /** Media original width */
  width?: Maybe<Scalars['Float']>;
  /** Media original height */
  height?: Maybe<Scalars['Float']>;
};

export type LoggedUserResponse = {
  __typename?: 'LoggedUserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  user?: Maybe<User>;
};

export type RegisterUserInput = {
  /** User name */
  name: Scalars['String'];
  /** User surname */
  surname?: Maybe<Scalars['String']>;
  /** User email to be used on login */
  email: Scalars['String'];
  /** User password to be used on login */
  password?: Maybe<Scalars['String']>;
};

export type LoginUserInput = {
  /** User email to be used on login */
  email: Scalars['String'];
  /** User password to be used on login */
  password?: Maybe<Scalars['String']>;
};

export type EditMeInput = {
  /** User name */
  name?: Maybe<Scalars['String']>;
  /** User surname */
  surname?: Maybe<Scalars['String']>;
  /** User email to be used on login */
  email?: Maybe<Scalars['String']>;
  /** User password to be used on login */
  password?: Maybe<Scalars['String']>;
  /** User avatar image link */
  avatar?: Maybe<Scalars['String']>;
};

export type CreateTagInput = {
  /** Tag title */
  title: Scalars['String'];
  /** Tag slug to use on url */
  slug?: Maybe<Scalars['String']>;
  /** Tag description */
  description?: Maybe<Scalars['String']>;
};

export type UpdateTagInput = {
  /** Tag title */
  title?: Maybe<Scalars['String']>;
  /** Tag slug to use on url */
  slug?: Maybe<Scalars['String']>;
  /** Tag description */
  description?: Maybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  /** User role in community */
  role?: Maybe<RoleOptions>;
};

export type UploadMediaInput = {
  /** Media format */
  format: MediaFormat;
  /** Media thumbnail picture url */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** Media internal name */
  name?: Maybe<Scalars['String']>;
  /** Media internal description */
  description?: Maybe<Scalars['String']>;
  /** Media file information */
  file: FileInput;
};

export type CommonCommunityFragment = (
  { __typename?: 'Community' }
  & Pick<Community, '_id' | 'logo' | 'title' | 'description' | 'slug' | 'followersCount' | 'membersCount'>
  & { creator: (
    { __typename?: 'User' }
    & CreatorNameFragment
  ) }
);

export type CommonUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'name' | 'surname' | 'email' | 'avatar'>
);

export type CreatorNameFragment = (
  { __typename?: 'User' }
  & Pick<User, 'name' | 'surname'>
);

export type CreateCommunityTagMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  tagData: CreateTagInput;
}>;


export type CreateCommunityTagMutation = (
  { __typename?: 'Mutation' }
  & { createTag: (
    { __typename?: 'TagResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, tag?: Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, '_id' | 'title' | 'description' | 'slug'>
    )> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  post: CreatePostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'title' | 'slug' | 'description' | 'status' | 'content' | 'exclusive'>
      & { mainMedia?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )>, tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'title'>
      )> }
    )> }
  ) }
);

export type DeletePostMainMediaMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  postId: Scalars['String'];
}>;


export type DeletePostMainMediaMutation = (
  { __typename?: 'Mutation' }
  & { deletePostMainMedia: (
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & { mainMedia?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )> }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  loginData: LoginUserInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoggedUserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & CommonUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  data: RegisterUserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoggedUserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & CommonUserFragment
    )> }
  ) }
);

export type UpdateCategoryMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  id: Scalars['String'];
  updateData: UpdateTagInput;
}>;


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateTag?: Maybe<(
    { __typename?: 'TagResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, tag?: Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, '_id' | 'title' | 'slug' | 'description'>
    )> }
  )> }
);

export type UpdateCommunityAvatarMutationVariables = Exact<{
  communityId: Scalars['String'];
  avatarId: Scalars['String'];
}>;


export type UpdateCommunityAvatarMutation = (
  { __typename?: 'Mutation' }
  & { updateCommunity: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )> }
    )> }
  ) }
);

export type UpdateCommunityBannerMutationVariables = Exact<{
  communityId: Scalars['String'];
  bannerId: Scalars['String'];
}>;


export type UpdateCommunityBannerMutation = (
  { __typename?: 'Mutation' }
  & { updateCommunity: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & { banner?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )> }
    )> }
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  postId: Scalars['String'];
  post: UpdatePostInput;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'title' | 'formattedTitle' | 'slug' | 'description' | 'status' | 'content' | 'exclusive'>
      & { mainMedia?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, '_id' | 'url' | 'thumbnailUrl' | 'format'>
      )>, tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, '_id' | 'title'>
      )> }
    )> }
  )> }
);

export type UpdatePostMainImageMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  postId: Scalars['String'];
  imageData: UploadImageInput;
}>;


export type UpdatePostMainImageMutation = (
  { __typename?: 'Mutation' }
  & { updatePostMainImage: (
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'title' | 'formattedTitle' | 'slug' | 'description' | 'status' | 'content' | 'exclusive'>
      & { mainMedia?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, '_id' | 'url' | 'thumbnailUrl' | 'format' | 'uploadLink' | 'height' | 'width'>
        & { file: (
          { __typename?: 'File' }
          & Pick<File, 'name' | 'size' | 'extension' | 'type'>
        ) }
      )>, tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, '_id' | 'title'>
      )> }
    )> }
  ) }
);

export type UpdatePostMainMediaThumbnailMutationVariables = Exact<{
  communityId: Scalars['String'];
  postId: Scalars['String'];
  mainMediaData: UpdateMediaInput;
}>;


export type UpdatePostMainMediaThumbnailMutation = (
  { __typename?: 'Mutation' }
  & { updatePostMainMedia: (
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & { mainMedia?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'thumbnailUrl'>
      )> }
    )> }
  ) }
);

export type UploadImageMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  imageData: UploadImageInput;
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { uploadImage: (
    { __typename?: 'MediaResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, '_id' | 'uploadLink' | 'url' | 'thumbnailUrl'>
    )> }
  ) }
);

export type UploadVideoMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  videoData: UploadMediaInput;
}>;


export type UploadVideoMutation = (
  { __typename?: 'Mutation' }
  & { uploadVideo: (
    { __typename?: 'MediaResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, '_id' | 'url' | 'thumbnailUrl' | 'uploadLink' | 'format'>
      & { file: (
        { __typename?: 'File' }
        & Pick<File, 'name' | 'size' | 'extension' | 'type'>
      ) }
    )> }
  ) }
);

export type CommunityAdminCategoriesQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CommunityAdminCategoriesQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, 'title'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'surname'>
      ), tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, '_id' | 'title' | 'slug' | 'description' | 'postCount'>
      )> }
    )> }
  ) }
);

export type CommunityAdminPostsQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CommunityAdminPostsQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, 'title'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'surname'>
      ), posts: Array<(
        { __typename?: 'Post' }
        & Pick<Post, '_id' | 'title' | 'description' | 'slug' | 'status' | 'exclusive'>
        & { mainMedia?: Maybe<(
          { __typename?: 'Media' }
          & Pick<Media, 'thumbnailUrl'>
        )> }
      )> }
    )> }
  ) }
);

export type GetCommunityBasicDataQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetCommunityBasicDataQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & CommonCommunityFragment
    )> }
  ) }
);

export type CommunityPageTemplateMeQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunityPageTemplateMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & { roles: Array<(
        { __typename?: 'Role' }
        & Pick<Role, 'role'>
        & { community: (
          { __typename?: 'Community' }
          & Pick<Community, 'slug'>
        ) }
      )> }
      & CommonUserFragment
    )> }
  )> }
);

export type CommunityTagPostsQueryVariables = Exact<{
  data: FindByTagsInput;
}>;


export type CommunityTagPostsQuery = (
  { __typename?: 'Query' }
  & { findTagBySlugs: (
    { __typename?: 'TagResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, tag?: Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'title' | 'description' | 'postCount' | 'slug'>
      & { posts: Array<(
        { __typename?: 'Post' }
        & Pick<Post, 'title' | 'description' | 'exclusive' | 'likes' | 'slug'>
        & { mainMedia?: Maybe<(
          { __typename?: 'Media' }
          & Pick<Media, 'url' | 'thumbnailUrl' | 'format'>
        )> }
      )>, community: (
        { __typename?: 'Community' }
        & { banner?: Maybe<(
          { __typename?: 'Media' }
          & Pick<Media, 'url'>
        )>, avatar?: Maybe<(
          { __typename?: 'Media' }
          & Pick<Media, 'url'>
        )> }
        & CommonCommunityFragment
      ) }
    )> }
  ) }
);

export type FindCommunityTagsByUserInputQueryVariables = Exact<{
  communitySlug: Scalars['String'];
  input: Scalars['String'];
}>;


export type FindCommunityTagsByUserInputQuery = (
  { __typename?: 'Query' }
  & { findTagsByInput: (
    { __typename?: 'TagsResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, tags?: Maybe<Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, '_id' | 'title'>
    )>> }
  ) }
);

export type GetCommunitiesSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommunitiesSlugsQuery = (
  { __typename?: 'Query' }
  & { communities: (
    { __typename?: 'CommunitiesResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, communities?: Maybe<Array<(
      { __typename?: 'Community' }
      & Pick<Community, 'slug'>
    )>> }
  ) }
);

export type GetCommunityHomeDataQueryVariables = Exact<{
  slug: Scalars['String'];
  postsStatus: PostStatus;
}>;


export type GetCommunityHomeDataQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, '_id' | 'logo' | 'title' | 'description' | 'slug' | 'followersCount' | 'membersCount'>
      & { banner?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )>, avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )>, tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'title' | 'slug' | 'postCount'>
        & { posts: Array<(
          { __typename?: 'Post' }
          & Pick<Post, 'title' | 'slug' | 'likes' | 'exclusive'>
          & { mainMedia?: Maybe<(
            { __typename?: 'Media' }
            & Pick<Media, 'thumbnailUrl'>
          )> }
        )> }
      )>, creator: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'surname'>
      ) }
    )> }
  ) }
);

export type GetCommunityTagsDataQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetCommunityTagsDataQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'title' | 'slug'>
      )>, banner?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )>, avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )> }
      & CommonCommunityFragment
    )> }
  ) }
);

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostByIdQuery = (
  { __typename?: 'Query' }
  & { findPostById?: Maybe<(
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'title' | 'formattedTitle' | 'slug' | 'description' | 'status' | 'content' | 'exclusive'>
      & { mainMedia?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, '_id' | 'url' | 'thumbnailUrl' | 'format' | 'width' | 'height'>
      )>, tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, '_id' | 'title'>
      )> }
    )> }
  )> }
);

export type GetPostsSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsSlugsQuery = (
  { __typename?: 'Query' }
  & { allPosts: (
    { __typename?: 'PostsResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, posts?: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'slug'>
      & { community: (
        { __typename?: 'Community' }
        & Pick<Community, 'slug'>
      ) }
    )>> }
  ) }
);

export type HeaderMeQueryVariables = Exact<{ [key: string]: never; }>;


export type HeaderMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & { roles: Array<(
        { __typename?: 'Role' }
        & Pick<Role, 'role'>
        & { community: (
          { __typename?: 'Community' }
          & Pick<Community, 'slug'>
        ) }
      )> }
      & CommonUserFragment
    )> }
  )> }
);

export type PostBySlugsQueryVariables = Exact<{
  data: FindBySlugsInput;
}>;


export type PostBySlugsQuery = (
  { __typename?: 'Query' }
  & { findPostBySlugs: (
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'title' | 'slug' | 'description' | 'content' | 'exclusive' | 'createdAt'>
      & { mainMedia?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'format' | 'url' | 'thumbnailUrl' | 'width' | 'height'>
      )>, creator: (
        { __typename?: 'User' }
        & CreatorNameFragment
      ), tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'title'>
      )>, community: (
        { __typename?: 'Community' }
        & Pick<Community, 'title' | 'slug'>
        & { creator: (
          { __typename?: 'User' }
          & CreatorNameFragment
        ) }
      ) }
    )> }
  ) }
);

export const CreatorNameFragmentDoc = gql`
    fragment CreatorName on User {
  name
  surname
}
    `;
export const CommonCommunityFragmentDoc = gql`
    fragment CommonCommunity on Community {
  _id
  logo
  title
  description
  slug
  creator {
    ...CreatorName
  }
  followersCount
  membersCount
}
    ${CreatorNameFragmentDoc}`;
export const CommonUserFragmentDoc = gql`
    fragment CommonUser on User {
  _id
  name
  surname
  email
  avatar
}
    `;
export const CreateCommunityTagDocument = gql`
    mutation CreateCommunityTag($communitySlug: String!, $tagData: CreateTagInput!) {
  createTag(communitySlug: $communitySlug, data: $tagData) {
    errors {
      field
      message
    }
    tag {
      _id
      title
      description
      slug
    }
  }
}
    `;
export type CreateCommunityTagMutationFn = Apollo.MutationFunction<CreateCommunityTagMutation, CreateCommunityTagMutationVariables>;

/**
 * __useCreateCommunityTagMutation__
 *
 * To run a mutation, you first call `useCreateCommunityTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityTagMutation, { data, loading, error }] = useCreateCommunityTagMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      tagData: // value for 'tagData'
 *   },
 * });
 */
export function useCreateCommunityTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityTagMutation, CreateCommunityTagMutationVariables>) {
        return Apollo.useMutation<CreateCommunityTagMutation, CreateCommunityTagMutationVariables>(CreateCommunityTagDocument, baseOptions);
      }
export type CreateCommunityTagMutationHookResult = ReturnType<typeof useCreateCommunityTagMutation>;
export type CreateCommunityTagMutationResult = Apollo.MutationResult<CreateCommunityTagMutation>;
export type CreateCommunityTagMutationOptions = Apollo.BaseMutationOptions<CreateCommunityTagMutation, CreateCommunityTagMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($communitySlug: String!, $post: CreatePostInput!) {
  createPost(communitySlug: $communitySlug, data: $post) {
    errors {
      field
      message
    }
    post {
      _id
      title
      slug
      description
      status
      content
      mainMedia {
        url
      }
      exclusive
      tags {
        title
      }
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      post: // value for 'post'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostMainMediaDocument = gql`
    mutation DeletePostMainMedia($communitySlug: String!, $postId: String!) {
  deletePostMainMedia(communitySlug: $communitySlug, postId: $postId) {
    errors {
      field
      message
    }
    post {
      mainMedia {
        url
      }
    }
  }
}
    `;
export type DeletePostMainMediaMutationFn = Apollo.MutationFunction<DeletePostMainMediaMutation, DeletePostMainMediaMutationVariables>;

/**
 * __useDeletePostMainMediaMutation__
 *
 * To run a mutation, you first call `useDeletePostMainMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMainMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMainMediaMutation, { data, loading, error }] = useDeletePostMainMediaMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMainMediaMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMainMediaMutation, DeletePostMainMediaMutationVariables>) {
        return Apollo.useMutation<DeletePostMainMediaMutation, DeletePostMainMediaMutationVariables>(DeletePostMainMediaDocument, baseOptions);
      }
export type DeletePostMainMediaMutationHookResult = ReturnType<typeof useDeletePostMainMediaMutation>;
export type DeletePostMainMediaMutationResult = Apollo.MutationResult<DeletePostMainMediaMutation>;
export type DeletePostMainMediaMutationOptions = Apollo.BaseMutationOptions<DeletePostMainMediaMutation, DeletePostMainMediaMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginData: LoginUserInput!) {
  login(loginData: $loginData) {
    errors {
      field
      message
    }
    user {
      ...CommonUser
    }
  }
}
    ${CommonUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginData: // value for 'loginData'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterUserInput!) {
  register(data: $data) {
    errors {
      field
      message
    }
    user {
      ...CommonUser
    }
  }
}
    ${CommonUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($communitySlug: String!, $id: String!, $updateData: UpdateTagInput!) {
  updateTag(communitySlug: $communitySlug, id: $id, updateData: $updateData) {
    errors {
      field
      message
    }
    tag {
      _id
      title
      slug
      description
    }
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      id: // value for 'id'
 *      updateData: // value for 'updateData'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, baseOptions);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateCommunityAvatarDocument = gql`
    mutation UpdateCommunityAvatar($communityId: String!, $avatarId: String!) {
  updateCommunity(id: $communityId, updateData: {avatar: $avatarId}) {
    errors {
      field
      message
    }
    community {
      avatar {
        url
      }
    }
  }
}
    `;
export type UpdateCommunityAvatarMutationFn = Apollo.MutationFunction<UpdateCommunityAvatarMutation, UpdateCommunityAvatarMutationVariables>;

/**
 * __useUpdateCommunityAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityAvatarMutation, { data, loading, error }] = useUpdateCommunityAvatarMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      avatarId: // value for 'avatarId'
 *   },
 * });
 */
export function useUpdateCommunityAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityAvatarMutation, UpdateCommunityAvatarMutationVariables>) {
        return Apollo.useMutation<UpdateCommunityAvatarMutation, UpdateCommunityAvatarMutationVariables>(UpdateCommunityAvatarDocument, baseOptions);
      }
export type UpdateCommunityAvatarMutationHookResult = ReturnType<typeof useUpdateCommunityAvatarMutation>;
export type UpdateCommunityAvatarMutationResult = Apollo.MutationResult<UpdateCommunityAvatarMutation>;
export type UpdateCommunityAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityAvatarMutation, UpdateCommunityAvatarMutationVariables>;
export const UpdateCommunityBannerDocument = gql`
    mutation UpdateCommunityBanner($communityId: String!, $bannerId: String!) {
  updateCommunity(id: $communityId, updateData: {banner: $bannerId}) {
    errors {
      field
      message
    }
    community {
      banner {
        url
      }
    }
  }
}
    `;
export type UpdateCommunityBannerMutationFn = Apollo.MutationFunction<UpdateCommunityBannerMutation, UpdateCommunityBannerMutationVariables>;

/**
 * __useUpdateCommunityBannerMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityBannerMutation, { data, loading, error }] = useUpdateCommunityBannerMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      bannerId: // value for 'bannerId'
 *   },
 * });
 */
export function useUpdateCommunityBannerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityBannerMutation, UpdateCommunityBannerMutationVariables>) {
        return Apollo.useMutation<UpdateCommunityBannerMutation, UpdateCommunityBannerMutationVariables>(UpdateCommunityBannerDocument, baseOptions);
      }
export type UpdateCommunityBannerMutationHookResult = ReturnType<typeof useUpdateCommunityBannerMutation>;
export type UpdateCommunityBannerMutationResult = Apollo.MutationResult<UpdateCommunityBannerMutation>;
export type UpdateCommunityBannerMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityBannerMutation, UpdateCommunityBannerMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($communitySlug: String!, $postId: String!, $post: UpdatePostInput!) {
  updatePost(communitySlug: $communitySlug, id: $postId, updateData: $post) {
    errors {
      field
      message
    }
    post {
      _id
      title
      formattedTitle
      slug
      description
      status
      mainMedia {
        _id
        url
        thumbnailUrl
        format
      }
      content
      exclusive
      tags {
        _id
        title
      }
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      postId: // value for 'postId'
 *      post: // value for 'post'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdatePostMainImageDocument = gql`
    mutation UpdatePostMainImage($communitySlug: String!, $postId: String!, $imageData: UploadImageInput!) {
  updatePostMainImage(
    communitySlug: $communitySlug
    postId: $postId
    imageData: $imageData
  ) {
    errors {
      field
      message
    }
    post {
      _id
      title
      formattedTitle
      slug
      description
      status
      mainMedia {
        _id
        url
        thumbnailUrl
        format
        uploadLink
        height
        width
        file {
          name
          size
          extension
          type
        }
      }
      content
      exclusive
      tags {
        _id
        title
      }
    }
  }
}
    `;
export type UpdatePostMainImageMutationFn = Apollo.MutationFunction<UpdatePostMainImageMutation, UpdatePostMainImageMutationVariables>;

/**
 * __useUpdatePostMainImageMutation__
 *
 * To run a mutation, you first call `useUpdatePostMainImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMainImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMainImageMutation, { data, loading, error }] = useUpdatePostMainImageMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      postId: // value for 'postId'
 *      imageData: // value for 'imageData'
 *   },
 * });
 */
export function useUpdatePostMainImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMainImageMutation, UpdatePostMainImageMutationVariables>) {
        return Apollo.useMutation<UpdatePostMainImageMutation, UpdatePostMainImageMutationVariables>(UpdatePostMainImageDocument, baseOptions);
      }
export type UpdatePostMainImageMutationHookResult = ReturnType<typeof useUpdatePostMainImageMutation>;
export type UpdatePostMainImageMutationResult = Apollo.MutationResult<UpdatePostMainImageMutation>;
export type UpdatePostMainImageMutationOptions = Apollo.BaseMutationOptions<UpdatePostMainImageMutation, UpdatePostMainImageMutationVariables>;
export const UpdatePostMainMediaThumbnailDocument = gql`
    mutation UpdatePostMainMediaThumbnail($communityId: String!, $postId: String!, $mainMediaData: UpdateMediaInput!) {
  updatePostMainMedia(
    communityId: $communityId
    postId: $postId
    mainMediaData: $mainMediaData
  ) {
    errors {
      field
      message
    }
    post {
      mainMedia {
        thumbnailUrl
      }
    }
  }
}
    `;
export type UpdatePostMainMediaThumbnailMutationFn = Apollo.MutationFunction<UpdatePostMainMediaThumbnailMutation, UpdatePostMainMediaThumbnailMutationVariables>;

/**
 * __useUpdatePostMainMediaThumbnailMutation__
 *
 * To run a mutation, you first call `useUpdatePostMainMediaThumbnailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMainMediaThumbnailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMainMediaThumbnailMutation, { data, loading, error }] = useUpdatePostMainMediaThumbnailMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      postId: // value for 'postId'
 *      mainMediaData: // value for 'mainMediaData'
 *   },
 * });
 */
export function useUpdatePostMainMediaThumbnailMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMainMediaThumbnailMutation, UpdatePostMainMediaThumbnailMutationVariables>) {
        return Apollo.useMutation<UpdatePostMainMediaThumbnailMutation, UpdatePostMainMediaThumbnailMutationVariables>(UpdatePostMainMediaThumbnailDocument, baseOptions);
      }
export type UpdatePostMainMediaThumbnailMutationHookResult = ReturnType<typeof useUpdatePostMainMediaThumbnailMutation>;
export type UpdatePostMainMediaThumbnailMutationResult = Apollo.MutationResult<UpdatePostMainMediaThumbnailMutation>;
export type UpdatePostMainMediaThumbnailMutationOptions = Apollo.BaseMutationOptions<UpdatePostMainMediaThumbnailMutation, UpdatePostMainMediaThumbnailMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($communitySlug: String!, $imageData: UploadImageInput!) {
  uploadImage(communitySlug: $communitySlug, imageData: $imageData) {
    errors {
      field
      message
    }
    media {
      _id
      uploadLink
      url
      thumbnailUrl
    }
  }
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      imageData: // value for 'imageData'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, baseOptions);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const UploadVideoDocument = gql`
    mutation UploadVideo($communitySlug: String!, $videoData: UploadMediaInput!) {
  uploadVideo(communitySlug: $communitySlug, videoData: $videoData) {
    errors {
      field
      message
    }
    media {
      _id
      url
      thumbnailUrl
      file {
        name
        size
        extension
        type
      }
      uploadLink
      format
    }
  }
}
    `;
export type UploadVideoMutationFn = Apollo.MutationFunction<UploadVideoMutation, UploadVideoMutationVariables>;

/**
 * __useUploadVideoMutation__
 *
 * To run a mutation, you first call `useUploadVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadVideoMutation, { data, loading, error }] = useUploadVideoMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      videoData: // value for 'videoData'
 *   },
 * });
 */
export function useUploadVideoMutation(baseOptions?: Apollo.MutationHookOptions<UploadVideoMutation, UploadVideoMutationVariables>) {
        return Apollo.useMutation<UploadVideoMutation, UploadVideoMutationVariables>(UploadVideoDocument, baseOptions);
      }
export type UploadVideoMutationHookResult = ReturnType<typeof useUploadVideoMutation>;
export type UploadVideoMutationResult = Apollo.MutationResult<UploadVideoMutation>;
export type UploadVideoMutationOptions = Apollo.BaseMutationOptions<UploadVideoMutation, UploadVideoMutationVariables>;
export const CommunityAdminCategoriesDocument = gql`
    query communityAdminCategories($slug: String!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      title
      creator {
        name
        surname
      }
      tags(limit: 10) {
        _id
        title
        slug
        description
        postCount
      }
    }
  }
}
    `;

/**
 * __useCommunityAdminCategoriesQuery__
 *
 * To run a query within a React component, call `useCommunityAdminCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityAdminCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityAdminCategoriesQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCommunityAdminCategoriesQuery(baseOptions: Apollo.QueryHookOptions<CommunityAdminCategoriesQuery, CommunityAdminCategoriesQueryVariables>) {
        return Apollo.useQuery<CommunityAdminCategoriesQuery, CommunityAdminCategoriesQueryVariables>(CommunityAdminCategoriesDocument, baseOptions);
      }
export function useCommunityAdminCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityAdminCategoriesQuery, CommunityAdminCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<CommunityAdminCategoriesQuery, CommunityAdminCategoriesQueryVariables>(CommunityAdminCategoriesDocument, baseOptions);
        }
export type CommunityAdminCategoriesQueryHookResult = ReturnType<typeof useCommunityAdminCategoriesQuery>;
export type CommunityAdminCategoriesLazyQueryHookResult = ReturnType<typeof useCommunityAdminCategoriesLazyQuery>;
export type CommunityAdminCategoriesQueryResult = Apollo.QueryResult<CommunityAdminCategoriesQuery, CommunityAdminCategoriesQueryVariables>;
export const CommunityAdminPostsDocument = gql`
    query communityAdminPosts($slug: String!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      title
      creator {
        name
        surname
      }
      posts {
        _id
        title
        description
        slug
        status
        mainMedia {
          thumbnailUrl
        }
        exclusive
      }
    }
  }
}
    `;

/**
 * __useCommunityAdminPostsQuery__
 *
 * To run a query within a React component, call `useCommunityAdminPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityAdminPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityAdminPostsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCommunityAdminPostsQuery(baseOptions: Apollo.QueryHookOptions<CommunityAdminPostsQuery, CommunityAdminPostsQueryVariables>) {
        return Apollo.useQuery<CommunityAdminPostsQuery, CommunityAdminPostsQueryVariables>(CommunityAdminPostsDocument, baseOptions);
      }
export function useCommunityAdminPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityAdminPostsQuery, CommunityAdminPostsQueryVariables>) {
          return Apollo.useLazyQuery<CommunityAdminPostsQuery, CommunityAdminPostsQueryVariables>(CommunityAdminPostsDocument, baseOptions);
        }
export type CommunityAdminPostsQueryHookResult = ReturnType<typeof useCommunityAdminPostsQuery>;
export type CommunityAdminPostsLazyQueryHookResult = ReturnType<typeof useCommunityAdminPostsLazyQuery>;
export type CommunityAdminPostsQueryResult = Apollo.QueryResult<CommunityAdminPostsQuery, CommunityAdminPostsQueryVariables>;
export const GetCommunityBasicDataDocument = gql`
    query getCommunityBasicData($slug: String!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      ...CommonCommunity
    }
  }
}
    ${CommonCommunityFragmentDoc}`;

/**
 * __useGetCommunityBasicDataQuery__
 *
 * To run a query within a React component, call `useGetCommunityBasicDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityBasicDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityBasicDataQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCommunityBasicDataQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>) {
        return Apollo.useQuery<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>(GetCommunityBasicDataDocument, baseOptions);
      }
export function useGetCommunityBasicDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>) {
          return Apollo.useLazyQuery<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>(GetCommunityBasicDataDocument, baseOptions);
        }
export type GetCommunityBasicDataQueryHookResult = ReturnType<typeof useGetCommunityBasicDataQuery>;
export type GetCommunityBasicDataLazyQueryHookResult = ReturnType<typeof useGetCommunityBasicDataLazyQuery>;
export type GetCommunityBasicDataQueryResult = Apollo.QueryResult<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>;
export const CommunityPageTemplateMeDocument = gql`
    query CommunityPageTemplateMe {
  me {
    errors {
      field
      message
    }
    user {
      ...CommonUser
      roles {
        community {
          slug
        }
        role
      }
    }
  }
}
    ${CommonUserFragmentDoc}`;

/**
 * __useCommunityPageTemplateMeQuery__
 *
 * To run a query within a React component, call `useCommunityPageTemplateMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityPageTemplateMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityPageTemplateMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommunityPageTemplateMeQuery(baseOptions?: Apollo.QueryHookOptions<CommunityPageTemplateMeQuery, CommunityPageTemplateMeQueryVariables>) {
        return Apollo.useQuery<CommunityPageTemplateMeQuery, CommunityPageTemplateMeQueryVariables>(CommunityPageTemplateMeDocument, baseOptions);
      }
export function useCommunityPageTemplateMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityPageTemplateMeQuery, CommunityPageTemplateMeQueryVariables>) {
          return Apollo.useLazyQuery<CommunityPageTemplateMeQuery, CommunityPageTemplateMeQueryVariables>(CommunityPageTemplateMeDocument, baseOptions);
        }
export type CommunityPageTemplateMeQueryHookResult = ReturnType<typeof useCommunityPageTemplateMeQuery>;
export type CommunityPageTemplateMeLazyQueryHookResult = ReturnType<typeof useCommunityPageTemplateMeLazyQuery>;
export type CommunityPageTemplateMeQueryResult = Apollo.QueryResult<CommunityPageTemplateMeQuery, CommunityPageTemplateMeQueryVariables>;
export const CommunityTagPostsDocument = gql`
    query CommunityTagPosts($data: FindByTagsInput!) {
  findTagBySlugs(data: $data) {
    errors {
      field
      message
    }
    tag {
      title
      description
      postCount(postOptions: {status: PUBLISHED})
      slug
      posts(limit: 5, postOptions: {status: PUBLISHED}) {
        title
        description
        exclusive
        likes
        slug
        mainMedia {
          url
          thumbnailUrl
          format
        }
      }
      community {
        ...CommonCommunity
        banner {
          url
        }
        avatar {
          url
        }
      }
    }
  }
}
    ${CommonCommunityFragmentDoc}`;

/**
 * __useCommunityTagPostsQuery__
 *
 * To run a query within a React component, call `useCommunityTagPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityTagPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityTagPostsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCommunityTagPostsQuery(baseOptions: Apollo.QueryHookOptions<CommunityTagPostsQuery, CommunityTagPostsQueryVariables>) {
        return Apollo.useQuery<CommunityTagPostsQuery, CommunityTagPostsQueryVariables>(CommunityTagPostsDocument, baseOptions);
      }
export function useCommunityTagPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityTagPostsQuery, CommunityTagPostsQueryVariables>) {
          return Apollo.useLazyQuery<CommunityTagPostsQuery, CommunityTagPostsQueryVariables>(CommunityTagPostsDocument, baseOptions);
        }
export type CommunityTagPostsQueryHookResult = ReturnType<typeof useCommunityTagPostsQuery>;
export type CommunityTagPostsLazyQueryHookResult = ReturnType<typeof useCommunityTagPostsLazyQuery>;
export type CommunityTagPostsQueryResult = Apollo.QueryResult<CommunityTagPostsQuery, CommunityTagPostsQueryVariables>;
export const FindCommunityTagsByUserInputDocument = gql`
    query FindCommunityTagsByUserInput($communitySlug: String!, $input: String!) {
  findTagsByInput(data: {communitySlug: $communitySlug, userInput: $input}) {
    errors {
      field
      message
    }
    tags {
      _id
      title
    }
  }
}
    `;

/**
 * __useFindCommunityTagsByUserInputQuery__
 *
 * To run a query within a React component, call `useFindCommunityTagsByUserInputQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommunityTagsByUserInputQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommunityTagsByUserInputQuery({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindCommunityTagsByUserInputQuery(baseOptions: Apollo.QueryHookOptions<FindCommunityTagsByUserInputQuery, FindCommunityTagsByUserInputQueryVariables>) {
        return Apollo.useQuery<FindCommunityTagsByUserInputQuery, FindCommunityTagsByUserInputQueryVariables>(FindCommunityTagsByUserInputDocument, baseOptions);
      }
export function useFindCommunityTagsByUserInputLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCommunityTagsByUserInputQuery, FindCommunityTagsByUserInputQueryVariables>) {
          return Apollo.useLazyQuery<FindCommunityTagsByUserInputQuery, FindCommunityTagsByUserInputQueryVariables>(FindCommunityTagsByUserInputDocument, baseOptions);
        }
export type FindCommunityTagsByUserInputQueryHookResult = ReturnType<typeof useFindCommunityTagsByUserInputQuery>;
export type FindCommunityTagsByUserInputLazyQueryHookResult = ReturnType<typeof useFindCommunityTagsByUserInputLazyQuery>;
export type FindCommunityTagsByUserInputQueryResult = Apollo.QueryResult<FindCommunityTagsByUserInputQuery, FindCommunityTagsByUserInputQueryVariables>;
export const GetCommunitiesSlugsDocument = gql`
    query GetCommunitiesSlugs {
  communities {
    errors {
      field
      message
    }
    communities {
      slug
    }
  }
}
    `;

/**
 * __useGetCommunitiesSlugsQuery__
 *
 * To run a query within a React component, call `useGetCommunitiesSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunitiesSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunitiesSlugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCommunitiesSlugsQuery(baseOptions?: Apollo.QueryHookOptions<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>) {
        return Apollo.useQuery<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>(GetCommunitiesSlugsDocument, baseOptions);
      }
export function useGetCommunitiesSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>) {
          return Apollo.useLazyQuery<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>(GetCommunitiesSlugsDocument, baseOptions);
        }
export type GetCommunitiesSlugsQueryHookResult = ReturnType<typeof useGetCommunitiesSlugsQuery>;
export type GetCommunitiesSlugsLazyQueryHookResult = ReturnType<typeof useGetCommunitiesSlugsLazyQuery>;
export type GetCommunitiesSlugsQueryResult = Apollo.QueryResult<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>;
export const GetCommunityHomeDataDocument = gql`
    query getCommunityHomeData($slug: String!, $postsStatus: PostStatus!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      _id
      logo
      title
      description
      slug
      banner {
        url
      }
      avatar {
        url
      }
      tags(limit: 3) {
        title
        slug
        postCount(postOptions: {status: $postsStatus})
        posts(limit: 10, postOptions: {status: $postsStatus}) {
          title
          slug
          likes
          exclusive
          mainMedia {
            thumbnailUrl
          }
        }
      }
      creator {
        name
        surname
      }
      followersCount
      membersCount
    }
  }
}
    `;

/**
 * __useGetCommunityHomeDataQuery__
 *
 * To run a query within a React component, call `useGetCommunityHomeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityHomeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityHomeDataQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      postsStatus: // value for 'postsStatus'
 *   },
 * });
 */
export function useGetCommunityHomeDataQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>) {
        return Apollo.useQuery<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>(GetCommunityHomeDataDocument, baseOptions);
      }
export function useGetCommunityHomeDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>) {
          return Apollo.useLazyQuery<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>(GetCommunityHomeDataDocument, baseOptions);
        }
export type GetCommunityHomeDataQueryHookResult = ReturnType<typeof useGetCommunityHomeDataQuery>;
export type GetCommunityHomeDataLazyQueryHookResult = ReturnType<typeof useGetCommunityHomeDataLazyQuery>;
export type GetCommunityHomeDataQueryResult = Apollo.QueryResult<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>;
export const GetCommunityTagsDataDocument = gql`
    query getCommunityTagsData($slug: String!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      ...CommonCommunity
      tags(limit: 5) {
        title
        slug
      }
      banner {
        url
      }
      avatar {
        url
      }
    }
  }
}
    ${CommonCommunityFragmentDoc}`;

/**
 * __useGetCommunityTagsDataQuery__
 *
 * To run a query within a React component, call `useGetCommunityTagsDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityTagsDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityTagsDataQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCommunityTagsDataQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityTagsDataQuery, GetCommunityTagsDataQueryVariables>) {
        return Apollo.useQuery<GetCommunityTagsDataQuery, GetCommunityTagsDataQueryVariables>(GetCommunityTagsDataDocument, baseOptions);
      }
export function useGetCommunityTagsDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityTagsDataQuery, GetCommunityTagsDataQueryVariables>) {
          return Apollo.useLazyQuery<GetCommunityTagsDataQuery, GetCommunityTagsDataQueryVariables>(GetCommunityTagsDataDocument, baseOptions);
        }
export type GetCommunityTagsDataQueryHookResult = ReturnType<typeof useGetCommunityTagsDataQuery>;
export type GetCommunityTagsDataLazyQueryHookResult = ReturnType<typeof useGetCommunityTagsDataLazyQuery>;
export type GetCommunityTagsDataQueryResult = Apollo.QueryResult<GetCommunityTagsDataQuery, GetCommunityTagsDataQueryVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($id: String!) {
  findPostById(id: $id) {
    errors {
      field
      message
    }
    post {
      _id
      title
      formattedTitle
      slug
      description
      status
      mainMedia {
        _id
        url
        thumbnailUrl
        format
        width
        height
      }
      content
      exclusive
      tags {
        _id
        title
      }
    }
  }
}
    `;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, baseOptions);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, baseOptions);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPostsSlugsDocument = gql`
    query GetPostsSlugs {
  allPosts(postOptions: {status: PUBLISHED}) {
    errors {
      field
      message
    }
    posts {
      slug
      community {
        slug
      }
    }
  }
}
    `;

/**
 * __useGetPostsSlugsQuery__
 *
 * To run a query within a React component, call `useGetPostsSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsSlugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsSlugsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsSlugsQuery, GetPostsSlugsQueryVariables>) {
        return Apollo.useQuery<GetPostsSlugsQuery, GetPostsSlugsQueryVariables>(GetPostsSlugsDocument, baseOptions);
      }
export function useGetPostsSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsSlugsQuery, GetPostsSlugsQueryVariables>) {
          return Apollo.useLazyQuery<GetPostsSlugsQuery, GetPostsSlugsQueryVariables>(GetPostsSlugsDocument, baseOptions);
        }
export type GetPostsSlugsQueryHookResult = ReturnType<typeof useGetPostsSlugsQuery>;
export type GetPostsSlugsLazyQueryHookResult = ReturnType<typeof useGetPostsSlugsLazyQuery>;
export type GetPostsSlugsQueryResult = Apollo.QueryResult<GetPostsSlugsQuery, GetPostsSlugsQueryVariables>;
export const HeaderMeDocument = gql`
    query HeaderMe {
  me {
    errors {
      field
      message
    }
    user {
      ...CommonUser
      roles {
        community {
          slug
        }
        role
      }
    }
  }
}
    ${CommonUserFragmentDoc}`;

/**
 * __useHeaderMeQuery__
 *
 * To run a query within a React component, call `useHeaderMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeaderMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeaderMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useHeaderMeQuery(baseOptions?: Apollo.QueryHookOptions<HeaderMeQuery, HeaderMeQueryVariables>) {
        return Apollo.useQuery<HeaderMeQuery, HeaderMeQueryVariables>(HeaderMeDocument, baseOptions);
      }
export function useHeaderMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeaderMeQuery, HeaderMeQueryVariables>) {
          return Apollo.useLazyQuery<HeaderMeQuery, HeaderMeQueryVariables>(HeaderMeDocument, baseOptions);
        }
export type HeaderMeQueryHookResult = ReturnType<typeof useHeaderMeQuery>;
export type HeaderMeLazyQueryHookResult = ReturnType<typeof useHeaderMeLazyQuery>;
export type HeaderMeQueryResult = Apollo.QueryResult<HeaderMeQuery, HeaderMeQueryVariables>;
export const PostBySlugsDocument = gql`
    query PostBySlugs($data: FindBySlugsInput!) {
  findPostBySlugs(data: $data) {
    errors {
      field
      message
    }
    post {
      title
      slug
      description
      content
      exclusive
      mainMedia {
        format
        url
        thumbnailUrl
        width
        height
      }
      creator {
        ...CreatorName
      }
      tags {
        title
      }
      community {
        title
        slug
        creator {
          ...CreatorName
        }
      }
      createdAt
    }
  }
}
    ${CreatorNameFragmentDoc}`;

/**
 * __usePostBySlugsQuery__
 *
 * To run a query within a React component, call `usePostBySlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostBySlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostBySlugsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePostBySlugsQuery(baseOptions: Apollo.QueryHookOptions<PostBySlugsQuery, PostBySlugsQueryVariables>) {
        return Apollo.useQuery<PostBySlugsQuery, PostBySlugsQueryVariables>(PostBySlugsDocument, baseOptions);
      }
export function usePostBySlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostBySlugsQuery, PostBySlugsQueryVariables>) {
          return Apollo.useLazyQuery<PostBySlugsQuery, PostBySlugsQueryVariables>(PostBySlugsDocument, baseOptions);
        }
export type PostBySlugsQueryHookResult = ReturnType<typeof usePostBySlugsQuery>;
export type PostBySlugsLazyQueryHookResult = ReturnType<typeof usePostBySlugsLazyQuery>;
export type PostBySlugsQueryResult = Apollo.QueryResult<PostBySlugsQuery, PostBySlugsQueryVariables>;