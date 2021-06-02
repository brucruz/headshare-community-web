import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  /** Lists all cards, given filters */
  cards: PaginatedCards;
};


export type QueryCommunityArgs = {
  slug: Scalars['String'];
};


export type QueryPostsArgs = {
  postOptions?: Maybe<PostOptionsInput>;
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


export type QueryTagsArgs = {
  tagOptions?: Maybe<TagOptionsInput>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
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


export type QueryCardsArgs = {
  userId?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
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
  /** Community tagline */
  tagline?: Maybe<Scalars['String']>;
  /** Community description */
  description?: Maybe<Scalars['String']>;
  /** Stripe connected account ID */
  stripeAccountId?: Maybe<Scalars['String']>;
  /** Community avatar used to visually identify community info */
  avatar?: Maybe<Media>;
  /** Community image banner to be displayed in its homepage */
  banner?: Maybe<Media>;
  posts: PaginatedPosts;
  /** All the tags associated with this community */
  tags: Array<Tag>;
  /** Owner selected tags to appear on community home, given a specific order */
  highlightedTags: Array<HighlightedTag>;
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
export type CommunityPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
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


export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
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
  /** Post cover media */
  cover?: Maybe<Media>;
  /** Post content */
  content?: Maybe<Scalars['String']>;
  /** True if only exclusive members can access its content */
  exclusive?: Maybe<Scalars['Boolean']>;
  /** Number of likes this post has received */
  likes?: Maybe<Scalars['Float']>;
  creator: User;
  community: Community;
  tags: PaginatedTags;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** Post creation date */
  createdAt: Scalars['DateTime'];
  /** Post last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};


/** The Posts model */
export type PostTagsArgs = {
  tagOptions?: Maybe<TagOptionsInput>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
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
  /** Stripe customer Id */
  stripeCustomerId?: Maybe<Scalars['String']>;
  /** User address */
  address?: Maybe<Address>;
  /** User personal documents */
  documents: Array<PersonalDocument>;
  /** User phone info */
  phone?: Maybe<Phone>;
  /** User birthday */
  birthday?: Maybe<Scalars['DateTime']>;
  posts: Array<Post>;
  roles: Array<Role>;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** User creation date */
  createdAt: Scalars['DateTime'];
  /** User last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Address model */
export type Address = {
  __typename?: 'Address';
  /** Street name */
  street?: Maybe<Scalars['String']>;
  /** Street number */
  number?: Maybe<Scalars['String']>;
  /** Address complementary info */
  complement?: Maybe<Scalars['String']>;
  /** Address neighbourhood */
  neighbourhood?: Maybe<Scalars['String']>;
  /** Address city name */
  city?: Maybe<Scalars['String']>;
  /** Address zipcode */
  zipcode?: Maybe<Scalars['String']>;
  /** Address state name */
  state?: Maybe<Scalars['String']>;
  /** Address country name */
  country?: Maybe<Scalars['String']>;
};

/** Personal Document Model */
export type PersonalDocument = {
  __typename?: 'PersonalDocument';
  /** Document id type, excluding company documents */
  type: Scalars['String'];
  /** Document id number */
  number: Scalars['String'];
};

/** Phone Info Model */
export type Phone = {
  __typename?: 'Phone';
  /** Phone number country code */
  countryCode: Scalars['String'];
  /** Phone number regional code (DDD), if existent */
  areaCode?: Maybe<Scalars['String']>;
  /** Phone number */
  phone: Scalars['String'];
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

export type PaginatedTags = {
  __typename?: 'PaginatedTags';
  tags: Array<Tag>;
  hasMore: Scalars['Boolean'];
};

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
  posts: PaginatedPosts;
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
  /** Specifies the community id */
  communityId?: Maybe<Scalars['String']>;
  /** Specifies the tag ids */
  tagIds?: Maybe<Array<Scalars['String']>>;
};

export type TagOptionsInput = {
  /** Specifies the community id */
  communityId?: Maybe<Scalars['String']>;
};

/** Community highlighted tag model */
export type HighlightedTag = {
  __typename?: 'HighlightedTag';
  /** The community highlighted tag */
  tag: Tag;
  /** The order of the community highlighted tag */
  order: Scalars['Int'];
};

export type CommunityResponse = {
  __typename?: 'CommunityResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  community?: Maybe<Community>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  paginatedPosts?: Maybe<PaginatedPosts>;
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
  paginatedTags?: Maybe<PaginatedTags>;
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
  userId: Scalars['String'];
  /** Community of which the role is about */
  communityId: Scalars['String'];
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

export type PaginatedCards = {
  __typename?: 'PaginatedCards';
  cards: Array<Card>;
  hasMore: Scalars['Boolean'];
  next?: Maybe<Scalars['String']>;
};

/** The Cards model */
export type Card = {
  __typename?: 'Card';
  _id: Scalars['ObjectId'];
  /** Card ID at Pagarme */
  pagarmeId: Scalars['String'];
  /** Card brand */
  brand: Scalars['String'];
  /** Card holder name */
  holderName: Scalars['String'];
  /** Card first 6 digits */
  firstDigits: Scalars['String'];
  /** Card last 4 digits */
  lastDigits: Scalars['String'];
  /** Card fingerprint */
  fingerprint: Scalars['String'];
  /** Card is valid if it is not expired */
  valid: Scalars['Boolean'];
  /** Card expiration date */
  expirationDate: Scalars['String'];
  /** Indicates if this card is its user main one */
  isMain?: Maybe<Scalars['Boolean']>;
  user: User;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** Card creation date */
  createdAt: Scalars['DateTime'];
  /** Card last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Users can create a community */
  createCommunity: CommunityResponse;
  updateCommunity: CommunityResponse;
  createStripeAccount: Community;
  createStripeAccountLink: Scalars['String'];
  createPost: PostResponse;
  updatePost?: Maybe<PostResponse>;
  updatePostMainMedia: PostResponse;
  /** Users can remove main media from a post */
  deletePostMainMedia: PostResponse;
  /** Owners may  */
  deletePost: SuccessResponse;
  /** Users can upload a image directly as a post main media */
  updatePostMainImage: PostResponse;
  /** Users can upload a video directly as a post main media */
  updatePostMainVideo: Post;
  /** Users can upload a image directly as a post cover */
  updatePostCover: PostResponse;
  register: LoggedUserResponse;
  login: LoggedUserResponse;
  updateUser?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  createTag: TagResponse;
  updateTag?: Maybe<TagResponse>;
  /** Owners may  */
  deleteTag: SuccessResponse;
  createRole: SuccessResponse;
  updateRole?: Maybe<RoleResponse>;
  /** Users can import a media */
  uploadVideo: MediaResponse;
  /** Users can import a media */
  uploadImage: MediaResponse;
  /** Creates a new card for a given user */
  createCard: Card;
  createProduct: Product;
  updateProduct: Product;
  createPrice: Price;
  updatePrice: Price;
};


export type MutationCreateCommunityArgs = {
  communityData: CreateCommunityInput;
};


export type MutationUpdateCommunityArgs = {
  updateData: UpdateCommunityInput;
  id: Scalars['String'];
};


export type MutationCreateStripeAccountArgs = {
  communityId: Scalars['String'];
};


export type MutationCreateStripeAccountLinkArgs = {
  communityId: Scalars['String'];
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


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
  communitySlug: Scalars['String'];
};


export type MutationUpdatePostMainImageArgs = {
  imageData: UploadImageInput;
  postId: Scalars['String'];
  communitySlug: Scalars['String'];
};


export type MutationUpdatePostMainVideoArgs = {
  videoData: UploadVideoInput;
  postId: Scalars['String'];
  communitySlug: Scalars['String'];
};


export type MutationUpdatePostCoverArgs = {
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
  userId: Scalars['String'];
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


export type MutationDeleteTagArgs = {
  tagId: Scalars['String'];
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


export type MutationCreateCardArgs = {
  data: CreateCardInput;
};


export type MutationCreateProductArgs = {
  productData: CreateProductInput;
  communityId: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  productData: UpdateProductInput;
  productId: Scalars['String'];
  communityId: Scalars['String'];
};


export type MutationCreatePriceArgs = {
  priceData: CreatePriceInput;
  productId: Scalars['String'];
  communityId: Scalars['String'];
};


export type MutationUpdatePriceArgs = {
  priceData: UpdatePriceInput;
  priceId: Scalars['String'];
  communityId: Scalars['String'];
};

export type CreateCommunityInput = {
  /** Community title */
  logo?: Maybe<Scalars['String']>;
  /** Community title */
  title: Scalars['String'];
  /** Community slug to use on url */
  slug: Scalars['String'];
  /** Community tagline */
  tagline?: Maybe<Scalars['String']>;
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
  /** Community tagline */
  tagline?: Maybe<Scalars['String']>;
  /** Community description */
  description?: Maybe<Scalars['String']>;
  /** Community avatar used to visually identify community info */
  avatar?: Maybe<Scalars['String']>;
  /** Community image banner to be displayed in its homepage */
  banner?: Maybe<Scalars['String']>;
  /** Owner selected tags to appear on community home, given a specific order */
  highlightedTags?: Maybe<Array<HighlightedTagInput>>;
};

export type HighlightedTagInput = {
  /** The community highlighted tag */
  tag: Scalars['String'];
  /** The order of the community highlighted tag */
  order: Scalars['Int'];
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
  /** Post cover information */
  cover?: Maybe<Scalars['ObjectId']>;
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
  /** Post main media information */
  cover?: Maybe<Scalars['String']>;
  /** If true, only exclusive members may view its content */
  exclusive?: Maybe<Scalars['Boolean']>;
  /** Post content */
  tags?: Maybe<Array<Scalars['String']>>;
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

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  success: Scalars['Boolean'];
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

export type UploadVideoInput = {
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
  /** User address */
  address?: Maybe<CreateAddressInput>;
  /** User personal documents */
  documents?: Maybe<Array<CreatePersonalDocumentInput>>;
  /** User phone info */
  phone?: Maybe<CreatePhoneInput>;
  /** User birthday */
  birthday?: Maybe<Scalars['DateTime']>;
};

export type CreateAddressInput = {
  /** Street name */
  street: Scalars['String'];
  /** Street number */
  number: Scalars['String'];
  /** Address complementary info */
  complement?: Maybe<Scalars['String']>;
  /** Address neighbourhood */
  neighbourhood?: Maybe<Scalars['String']>;
  /** Address city name */
  city: Scalars['String'];
  /** Address zipcode */
  zipcode: Scalars['String'];
  /** Address state name */
  state?: Maybe<Scalars['String']>;
  /** Address country name */
  country: Scalars['String'];
};

export type CreatePersonalDocumentInput = {
  /** Document id type, excluding company documents */
  type: DocumentIdType;
  /** Document id number */
  number: Scalars['String'];
};

/** Acceptable documents for using the platform */
export enum DocumentIdType {
  Cpf = 'CPF',
  Passport = 'PASSPORT',
  Cnpj = 'CNPJ'
}

export type CreatePhoneInput = {
  /** Phone number country code */
  countryCode: Scalars['String'];
  /** Phone number regional code (DDD), if existent */
  areaCode?: Maybe<Scalars['String']>;
  /** Phone number */
  phone: Scalars['String'];
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

export type CreateCardInput = {
  /** Card ID at Pagarme */
  pagarmeId: Scalars['String'];
  /** Card brand */
  brand: Scalars['String'];
  /** Card holder name */
  holderName: Scalars['String'];
  /** Card first 6 digits */
  firstDigits: Scalars['String'];
  /** Card last 4 digits */
  lastDigits: Scalars['String'];
  /** Card fingerprint */
  fingerprint: Scalars['String'];
  /** Card is valid if it is not expired */
  valid: Scalars['Boolean'];
  /** Card expiration date */
  expirationDate: Scalars['String'];
};

/** The Products model */
export type Product = {
  __typename?: 'Product';
  _id: Scalars['ObjectId'];
  /** A community product name */
  name: Scalars['String'];
  /** A community product description */
  description?: Maybe<Scalars['String']>;
  /** Owner selected tags to appear on community home, given a specific order */
  benefits: Array<ProductBenefit>;
  /** Mini-description shown on membership credit card invoice */
  statementDescriptor?: Maybe<Scalars['String']>;
  /** Stripe connected account ID */
  stripeProductId: Scalars['String'];
  /** Community which is the owner of this product */
  community: Community;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** Community creation date */
  createdAt: Scalars['DateTime'];
  /** Community last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Community product benefit model */
export type ProductBenefit = {
  __typename?: 'ProductBenefit';
  /** The community product description */
  description: Scalars['String'];
  /** The order of the community product description */
  order: Scalars['Int'];
};

export type CreateProductInput = {
  /** A community product name */
  name: Scalars['String'];
  /** A community product description */
  description?: Maybe<Scalars['String']>;
  /** Mini-description shown on membership credit card invoice */
  statementDescriptor?: Maybe<Scalars['String']>;
};

export type UpdateProductInput = {
  /** A community product name */
  name?: Maybe<Scalars['String']>;
  /** A community product description */
  description?: Maybe<Scalars['String']>;
  /** Mini-description shown on membership credit card invoice */
  statementDescriptor?: Maybe<Scalars['String']>;
  /** Owner selected tags to appear on community home, given a specific order */
  benefits?: Maybe<Array<ProductBenefitInput>>;
  /** Stripe connected account ID */
  stripeProductId?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
};

export type ProductBenefitInput = {
  /** A community product name */
  description: Scalars['String'];
  /** A community product description */
  order?: Maybe<Scalars['Int']>;
};

/** The Products model */
export type Price = {
  __typename?: 'Price';
  _id: Scalars['ObjectId'];
  /** A product price currency */
  currency: Scalars['String'];
  /** A product price nickname */
  nickname?: Maybe<Scalars['String']>;
  /** Especifies if the customer has to pay once or repeately to mantain access to the product */
  type: PriceType;
  /** The possible diferent periods a recurring price might take */
  recurringInterval?: Maybe<RecurringInterval>;
  /** The number of recurring intervals to aply to each invoice */
  recurringIntervalCount?: Maybe<Scalars['Int']>;
  /** The amount billed per invoice to the customer */
  amount: Scalars['Int'];
  /** The number of days before charging the customer */
  trialDays?: Maybe<Scalars['Int']>;
  /** Stripe price ID */
  stripePriceId: Scalars['String'];
  /** Product to which this price refers to */
  product: Product;
  /** Community to which this price refers to */
  community: Community;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
  /** Community creation date */
  createdAt: Scalars['DateTime'];
  /** Community last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Especifies if the customer has to pay once or repeately to mantain access to the product */
export enum PriceType {
  Onetime = 'ONETIME',
  Recurring = 'RECURRING'
}

/** The possible diferent periods a recurring price might take */
export enum RecurringInterval {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR'
}

export type CreatePriceInput = {
  /** A product price currency */
  currency: Scalars['String'];
  /** A product price nickname */
  nickname?: Maybe<Scalars['String']>;
  /** Especifies if the customer has to pay once or repeately to mantain access to the product */
  type: PriceType;
  /** The possible diferent periods a recurring price might take */
  recurringInterval?: Maybe<RecurringInterval>;
  /** The number of recurring intervals to aply to each invoice */
  recurringIntervalCount?: Maybe<Scalars['Int']>;
  /** The amount billed per invoice to the customer */
  amount: Scalars['Int'];
  /** The number of days before charging the customer */
  trialDays?: Maybe<Scalars['Int']>;
};

export type UpdatePriceInput = {
  /** A product price nickname */
  nickname?: Maybe<Scalars['String']>;
  /** Especifies if price is active */
  isActive?: Maybe<Scalars['Boolean']>;
};

export type CommonCommunityFragment = (
  { __typename?: 'Community' }
  & Pick<Community, '_id' | 'logo' | 'title' | 'tagline' | 'description' | 'slug' | 'followersCount' | 'membersCount'>
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

export type CreateCommunityTagFromAdminTagHighlightMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  tagData: CreateTagInput;
}>;


export type CreateCommunityTagFromAdminTagHighlightMutation = (
  { __typename?: 'Mutation' }
  & { createTag: (
    { __typename?: 'TagResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, tag?: Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, '_id' | 'title' | 'postCount'>
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
      )>, tags: (
        { __typename?: 'PaginatedTags' }
        & Pick<PaginatedTags, 'hasMore'>
        & { tags: Array<(
          { __typename?: 'Tag' }
          & Pick<Tag, 'title'>
        )> }
      ) }
    )> }
  ) }
);

export type DeletePostMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  postId: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>> }
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
        & Pick<Media, '_id'>
      )> }
    )> }
  ) }
);

export type DeleteTagMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  tagId: Scalars['String'];
}>;


export type DeleteTagMutation = (
  { __typename?: 'Mutation' }
  & { deleteTag: (
    { __typename?: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>> }
  ) }
);

export type FollowCommunityMutationVariables = Exact<{
  userId: Scalars['String'];
  communityId: Scalars['String'];
}>;


export type FollowCommunityMutation = (
  { __typename?: 'Mutation' }
  & { createRole: (
    { __typename?: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>> }
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

export type UpdateCommunityConfigMainMutationVariables = Exact<{
  id: Scalars['String'];
  updateData: UpdateCommunityInput;
}>;


export type UpdateCommunityConfigMainMutation = (
  { __typename?: 'Mutation' }
  & { updateCommunity: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, '_id' | 'title' | 'slug' | 'tagline' | 'description'>
    )> }
  ) }
);

export type UpdateCommunityHighlightTagsMutationVariables = Exact<{
  id: Scalars['String'];
  highlightedTags?: Maybe<Array<HighlightedTagInput>>;
}>;


export type UpdateCommunityHighlightTagsMutation = (
  { __typename?: 'Mutation' }
  & { updateCommunity: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, '_id' | 'title'>
      & { highlightedTags: Array<(
        { __typename?: 'HighlightedTag' }
        & Pick<HighlightedTag, 'order'>
        & { tag: (
          { __typename?: 'Tag' }
          & Pick<Tag, '_id' | 'title' | 'postCount'>
        ) }
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
        & Pick<Media, '_id' | 'url' | 'thumbnailUrl' | 'format' | 'width' | 'height'>
      )>, tags: (
        { __typename?: 'PaginatedTags' }
        & Pick<PaginatedTags, 'hasMore'>
        & { tags: Array<(
          { __typename?: 'Tag' }
          & Pick<Tag, '_id' | 'title' | 'postCount'>
        )> }
      ) }
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
      )>, tags: (
        { __typename?: 'PaginatedTags' }
        & Pick<PaginatedTags, 'hasMore'>
        & { tags: Array<(
          { __typename?: 'Tag' }
          & Pick<Tag, '_id' | 'title'>
        )> }
      ) }
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

export type UpdatePostMainVideoMutationVariables = Exact<{
  communitySlug: Scalars['String'];
  postId: Scalars['String'];
  videoData: UploadVideoInput;
}>;


export type UpdatePostMainVideoMutation = (
  { __typename?: 'Mutation' }
  & { updatePostMainVideo: (
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'formattedTitle' | 'slug' | 'description' | 'status' | 'content' | 'exclusive'>
    & { mainMedia?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, '_id' | 'url' | 'thumbnailUrl' | 'format' | 'uploadLink'>
      & { file: (
        { __typename?: 'File' }
        & Pick<File, 'name' | 'size' | 'extension' | 'type'>
      ) }
    )>, tags: (
      { __typename?: 'PaginatedTags' }
      & Pick<PaginatedTags, 'hasMore'>
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, '_id' | 'title'>
      )> }
    ) }
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

export type AdminPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  postOptions?: Maybe<PostOptionsInput>;
}>;


export type AdminPostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostsResponse' }
    & { paginatedPosts?: Maybe<(
      { __typename?: 'PaginatedPosts' }
      & Pick<PaginatedPosts, 'hasMore'>
      & { posts: Array<(
        { __typename?: 'Post' }
        & Pick<Post, '_id' | 'title' | 'description' | 'slug' | 'status' | 'exclusive' | 'createdAt'>
        & { mainMedia?: Maybe<(
          { __typename?: 'Media' }
          & Pick<Media, 'thumbnailUrl'>
        )> }
      )> }
    )> }
  ) }
);

export type AdminTagsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  tagOptions?: Maybe<TagOptionsInput>;
}>;


export type AdminTagsQuery = (
  { __typename?: 'Query' }
  & { tags: (
    { __typename?: 'TagsResponse' }
    & { paginatedTags?: Maybe<(
      { __typename?: 'PaginatedTags' }
      & Pick<PaginatedTags, 'hasMore'>
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, '_id' | 'title' | 'slug' | 'description' | 'postCount' | 'createdAt'>
      )> }
    )> }
  ) }
);

export type CommunityAdminConfigBrandingQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CommunityAdminConfigBrandingQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, '_id' | 'slug' | 'title'>
      & { banner?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )>, avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )>, creator: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'surname'>
      ) }
    )> }
  ) }
);

export type CommunityAdminConfigMainQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CommunityAdminConfigMainQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, '_id' | 'title' | 'tagline' | 'description'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'surname'>
      ) }
    )> }
  ) }
);

export type CommunityAdminHighlightedTagsQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CommunityAdminHighlightedTagsQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, '_id' | 'title' | 'slug'>
      & { highlightedTags: Array<(
        { __typename?: 'HighlightedTag' }
        & Pick<HighlightedTag, 'order'>
        & { tag: (
          { __typename?: 'Tag' }
          & Pick<Tag, '_id' | 'title' | 'postCount'>
        ) }
      )>, creator: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'surname'>
      ) }
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
      & { posts: (
        { __typename?: 'PaginatedPosts' }
        & Pick<PaginatedPosts, 'hasMore'>
        & { posts: Array<(
          { __typename?: 'Post' }
          & Pick<Post, 'title' | 'description' | 'exclusive' | 'likes' | 'slug'>
          & { mainMedia?: Maybe<(
            { __typename?: 'Media' }
            & Pick<Media, 'url' | 'thumbnailUrl' | 'format'>
          )> }
        )> }
      ), community: (
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
    )>>, paginatedTags?: Maybe<(
      { __typename?: 'PaginatedTags' }
      & Pick<PaginatedTags, 'hasMore'>
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, '_id' | 'title' | 'postCount'>
      )> }
    )> }
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
  postsPerTag: Scalars['Int'];
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
      & Pick<Community, '_id' | 'logo' | 'title' | 'tagline' | 'description' | 'slug' | 'followersCount' | 'membersCount'>
      & { banner?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )>, avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'url'>
      )>, highlightedTags: Array<(
        { __typename?: 'HighlightedTag' }
        & { tag: (
          { __typename?: 'Tag' }
          & Pick<Tag, 'title' | 'slug' | 'postCount'>
          & { posts: (
            { __typename?: 'PaginatedPosts' }
            & Pick<PaginatedPosts, 'hasMore'>
            & { posts: Array<(
              { __typename?: 'Post' }
              & Pick<Post, 'title' | 'slug' | 'likes' | 'exclusive'>
              & { mainMedia?: Maybe<(
                { __typename?: 'Media' }
                & Pick<Media, 'thumbnailUrl'>
              )> }
            )> }
          ) }
        ) }
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
      )>, tags: (
        { __typename?: 'PaginatedTags' }
        & Pick<PaginatedTags, 'hasMore'>
        & { tags: Array<(
          { __typename?: 'Tag' }
          & Pick<Tag, '_id' | 'title' | 'postCount'>
        )> }
      ) }
    )> }
  )> }
);

export type GetPostMainMediaQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostMainMediaQuery = (
  { __typename?: 'Query' }
  & { findPostById?: Maybe<(
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorResponse' }
      & Pick<ErrorResponse, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & { mainMedia?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, '_id' | 'url' | 'thumbnailUrl' | 'format' | 'width' | 'height'>
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
    )>>, paginatedPosts?: Maybe<(
      { __typename?: 'PaginatedPosts' }
      & { posts: Array<(
        { __typename?: 'Post' }
        & Pick<Post, 'slug'>
        & { community: (
          { __typename?: 'Community' }
          & Pick<Community, 'slug'>
        ) }
      )> }
    )> }
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
      ), tags: (
        { __typename?: 'PaginatedTags' }
        & Pick<PaginatedTags, 'hasMore'>
        & { tags: Array<(
          { __typename?: 'Tag' }
          & Pick<Tag, 'title'>
        )> }
      ), community: (
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
  tagline
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityTagMutation, CreateCommunityTagMutationVariables>(CreateCommunityTagDocument, options);
      }
export type CreateCommunityTagMutationHookResult = ReturnType<typeof useCreateCommunityTagMutation>;
export type CreateCommunityTagMutationResult = Apollo.MutationResult<CreateCommunityTagMutation>;
export type CreateCommunityTagMutationOptions = Apollo.BaseMutationOptions<CreateCommunityTagMutation, CreateCommunityTagMutationVariables>;
export const CreateCommunityTagFromAdminTagHighlightDocument = gql`
    mutation CreateCommunityTagFromAdminTagHighlight($communitySlug: String!, $tagData: CreateTagInput!) {
  createTag(communitySlug: $communitySlug, data: $tagData) {
    errors {
      field
      message
    }
    tag {
      _id
      title
      postCount
    }
  }
}
    `;
export type CreateCommunityTagFromAdminTagHighlightMutationFn = Apollo.MutationFunction<CreateCommunityTagFromAdminTagHighlightMutation, CreateCommunityTagFromAdminTagHighlightMutationVariables>;

/**
 * __useCreateCommunityTagFromAdminTagHighlightMutation__
 *
 * To run a mutation, you first call `useCreateCommunityTagFromAdminTagHighlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityTagFromAdminTagHighlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityTagFromAdminTagHighlightMutation, { data, loading, error }] = useCreateCommunityTagFromAdminTagHighlightMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      tagData: // value for 'tagData'
 *   },
 * });
 */
export function useCreateCommunityTagFromAdminTagHighlightMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityTagFromAdminTagHighlightMutation, CreateCommunityTagFromAdminTagHighlightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityTagFromAdminTagHighlightMutation, CreateCommunityTagFromAdminTagHighlightMutationVariables>(CreateCommunityTagFromAdminTagHighlightDocument, options);
      }
export type CreateCommunityTagFromAdminTagHighlightMutationHookResult = ReturnType<typeof useCreateCommunityTagFromAdminTagHighlightMutation>;
export type CreateCommunityTagFromAdminTagHighlightMutationResult = Apollo.MutationResult<CreateCommunityTagFromAdminTagHighlightMutation>;
export type CreateCommunityTagFromAdminTagHighlightMutationOptions = Apollo.BaseMutationOptions<CreateCommunityTagFromAdminTagHighlightMutation, CreateCommunityTagFromAdminTagHighlightMutationVariables>;
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
      tags(limit: 10) {
        tags {
          title
        }
        hasMore
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($communitySlug: String!, $postId: String!) {
  deletePost(communitySlug: $communitySlug, postId: $postId) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeletePostMainMediaDocument = gql`
    mutation DeletePostMainMedia($communitySlug: String!, $postId: String!) {
  deletePostMainMedia(communitySlug: $communitySlug, postId: $postId) {
    errors {
      field
      message
    }
    post {
      mainMedia {
        _id
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMainMediaMutation, DeletePostMainMediaMutationVariables>(DeletePostMainMediaDocument, options);
      }
export type DeletePostMainMediaMutationHookResult = ReturnType<typeof useDeletePostMainMediaMutation>;
export type DeletePostMainMediaMutationResult = Apollo.MutationResult<DeletePostMainMediaMutation>;
export type DeletePostMainMediaMutationOptions = Apollo.BaseMutationOptions<DeletePostMainMediaMutation, DeletePostMainMediaMutationVariables>;
export const DeleteTagDocument = gql`
    mutation DeleteTag($communitySlug: String!, $tagId: String!) {
  deleteTag(communitySlug: $communitySlug, tagId: $tagId) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type DeleteTagMutationFn = Apollo.MutationFunction<DeleteTagMutation, DeleteTagMutationVariables>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useDeleteTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagMutation, DeleteTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, options);
      }
export type DeleteTagMutationHookResult = ReturnType<typeof useDeleteTagMutation>;
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<DeleteTagMutation, DeleteTagMutationVariables>;
export const FollowCommunityDocument = gql`
    mutation FollowCommunity($userId: String!, $communityId: String!) {
  createRole(data: {role: FOLLOWER, userId: $userId, communityId: $communityId}) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type FollowCommunityMutationFn = Apollo.MutationFunction<FollowCommunityMutation, FollowCommunityMutationVariables>;

/**
 * __useFollowCommunityMutation__
 *
 * To run a mutation, you first call `useFollowCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followCommunityMutation, { data, loading, error }] = useFollowCommunityMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useFollowCommunityMutation(baseOptions?: Apollo.MutationHookOptions<FollowCommunityMutation, FollowCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowCommunityMutation, FollowCommunityMutationVariables>(FollowCommunityDocument, options);
      }
export type FollowCommunityMutationHookResult = ReturnType<typeof useFollowCommunityMutation>;
export type FollowCommunityMutationResult = Apollo.MutationResult<FollowCommunityMutation>;
export type FollowCommunityMutationOptions = Apollo.BaseMutationOptions<FollowCommunityMutation, FollowCommunityMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityAvatarMutation, UpdateCommunityAvatarMutationVariables>(UpdateCommunityAvatarDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityBannerMutation, UpdateCommunityBannerMutationVariables>(UpdateCommunityBannerDocument, options);
      }
export type UpdateCommunityBannerMutationHookResult = ReturnType<typeof useUpdateCommunityBannerMutation>;
export type UpdateCommunityBannerMutationResult = Apollo.MutationResult<UpdateCommunityBannerMutation>;
export type UpdateCommunityBannerMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityBannerMutation, UpdateCommunityBannerMutationVariables>;
export const UpdateCommunityConfigMainDocument = gql`
    mutation UpdateCommunityConfigMain($id: String!, $updateData: UpdateCommunityInput!) {
  updateCommunity(id: $id, updateData: $updateData) {
    errors {
      field
      message
    }
    community {
      _id
      title
      slug
      tagline
      description
    }
  }
}
    `;
export type UpdateCommunityConfigMainMutationFn = Apollo.MutationFunction<UpdateCommunityConfigMainMutation, UpdateCommunityConfigMainMutationVariables>;

/**
 * __useUpdateCommunityConfigMainMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityConfigMainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityConfigMainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityConfigMainMutation, { data, loading, error }] = useUpdateCommunityConfigMainMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateData: // value for 'updateData'
 *   },
 * });
 */
export function useUpdateCommunityConfigMainMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityConfigMainMutation, UpdateCommunityConfigMainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityConfigMainMutation, UpdateCommunityConfigMainMutationVariables>(UpdateCommunityConfigMainDocument, options);
      }
export type UpdateCommunityConfigMainMutationHookResult = ReturnType<typeof useUpdateCommunityConfigMainMutation>;
export type UpdateCommunityConfigMainMutationResult = Apollo.MutationResult<UpdateCommunityConfigMainMutation>;
export type UpdateCommunityConfigMainMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityConfigMainMutation, UpdateCommunityConfigMainMutationVariables>;
export const UpdateCommunityHighlightTagsDocument = gql`
    mutation UpdateCommunityHighlightTags($id: String!, $highlightedTags: [HighlightedTagInput!]) {
  updateCommunity(id: $id, updateData: {highlightedTags: $highlightedTags}) {
    errors {
      field
      message
    }
    community {
      _id
      title
      highlightedTags {
        tag {
          _id
          title
          postCount(postOptions: {status: PUBLISHED})
        }
        order
      }
    }
  }
}
    `;
export type UpdateCommunityHighlightTagsMutationFn = Apollo.MutationFunction<UpdateCommunityHighlightTagsMutation, UpdateCommunityHighlightTagsMutationVariables>;

/**
 * __useUpdateCommunityHighlightTagsMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityHighlightTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityHighlightTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityHighlightTagsMutation, { data, loading, error }] = useUpdateCommunityHighlightTagsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      highlightedTags: // value for 'highlightedTags'
 *   },
 * });
 */
export function useUpdateCommunityHighlightTagsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityHighlightTagsMutation, UpdateCommunityHighlightTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityHighlightTagsMutation, UpdateCommunityHighlightTagsMutationVariables>(UpdateCommunityHighlightTagsDocument, options);
      }
export type UpdateCommunityHighlightTagsMutationHookResult = ReturnType<typeof useUpdateCommunityHighlightTagsMutation>;
export type UpdateCommunityHighlightTagsMutationResult = Apollo.MutationResult<UpdateCommunityHighlightTagsMutation>;
export type UpdateCommunityHighlightTagsMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityHighlightTagsMutation, UpdateCommunityHighlightTagsMutationVariables>;
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
        width
        height
      }
      content
      exclusive
      tags(limit: 10) {
        tags {
          _id
          title
          postCount
        }
        hasMore
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
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
      tags(limit: 10) {
        tags {
          _id
          title
        }
        hasMore
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMainImageMutation, UpdatePostMainImageMutationVariables>(UpdatePostMainImageDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMainMediaThumbnailMutation, UpdatePostMainMediaThumbnailMutationVariables>(UpdatePostMainMediaThumbnailDocument, options);
      }
export type UpdatePostMainMediaThumbnailMutationHookResult = ReturnType<typeof useUpdatePostMainMediaThumbnailMutation>;
export type UpdatePostMainMediaThumbnailMutationResult = Apollo.MutationResult<UpdatePostMainMediaThumbnailMutation>;
export type UpdatePostMainMediaThumbnailMutationOptions = Apollo.BaseMutationOptions<UpdatePostMainMediaThumbnailMutation, UpdatePostMainMediaThumbnailMutationVariables>;
export const UpdatePostMainVideoDocument = gql`
    mutation UpdatePostMainVideo($communitySlug: String!, $postId: String!, $videoData: UploadVideoInput!) {
  updatePostMainVideo(
    communitySlug: $communitySlug
    postId: $postId
    videoData: $videoData
  ) {
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
      file {
        name
        size
        extension
        type
      }
    }
    content
    exclusive
    tags(limit: 10) {
      tags {
        _id
        title
      }
      hasMore
    }
  }
}
    `;
export type UpdatePostMainVideoMutationFn = Apollo.MutationFunction<UpdatePostMainVideoMutation, UpdatePostMainVideoMutationVariables>;

/**
 * __useUpdatePostMainVideoMutation__
 *
 * To run a mutation, you first call `useUpdatePostMainVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMainVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMainVideoMutation, { data, loading, error }] = useUpdatePostMainVideoMutation({
 *   variables: {
 *      communitySlug: // value for 'communitySlug'
 *      postId: // value for 'postId'
 *      videoData: // value for 'videoData'
 *   },
 * });
 */
export function useUpdatePostMainVideoMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMainVideoMutation, UpdatePostMainVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMainVideoMutation, UpdatePostMainVideoMutationVariables>(UpdatePostMainVideoDocument, options);
      }
export type UpdatePostMainVideoMutationHookResult = ReturnType<typeof useUpdatePostMainVideoMutation>;
export type UpdatePostMainVideoMutationResult = Apollo.MutationResult<UpdatePostMainVideoMutation>;
export type UpdatePostMainVideoMutationOptions = Apollo.BaseMutationOptions<UpdatePostMainVideoMutation, UpdatePostMainVideoMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadVideoMutation, UploadVideoMutationVariables>(UploadVideoDocument, options);
      }
export type UploadVideoMutationHookResult = ReturnType<typeof useUploadVideoMutation>;
export type UploadVideoMutationResult = Apollo.MutationResult<UploadVideoMutation>;
export type UploadVideoMutationOptions = Apollo.BaseMutationOptions<UploadVideoMutation, UploadVideoMutationVariables>;
export const AdminPostsDocument = gql`
    query adminPosts($limit: Int!, $cursor: String, $postOptions: PostOptionsInput) {
  posts(limit: $limit, cursor: $cursor, postOptions: $postOptions) {
    paginatedPosts {
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
        createdAt
      }
      hasMore
    }
  }
}
    `;

/**
 * __useAdminPostsQuery__
 *
 * To run a query within a React component, call `useAdminPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      postOptions: // value for 'postOptions'
 *   },
 * });
 */
export function useAdminPostsQuery(baseOptions: Apollo.QueryHookOptions<AdminPostsQuery, AdminPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminPostsQuery, AdminPostsQueryVariables>(AdminPostsDocument, options);
      }
export function useAdminPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminPostsQuery, AdminPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminPostsQuery, AdminPostsQueryVariables>(AdminPostsDocument, options);
        }
export type AdminPostsQueryHookResult = ReturnType<typeof useAdminPostsQuery>;
export type AdminPostsLazyQueryHookResult = ReturnType<typeof useAdminPostsLazyQuery>;
export type AdminPostsQueryResult = Apollo.QueryResult<AdminPostsQuery, AdminPostsQueryVariables>;
export const AdminTagsDocument = gql`
    query adminTags($limit: Int!, $cursor: String, $tagOptions: TagOptionsInput) {
  tags(limit: $limit, cursor: $cursor, tagOptions: $tagOptions) {
    paginatedTags {
      tags {
        _id
        title
        slug
        description
        postCount
        createdAt
      }
      hasMore
    }
  }
}
    `;

/**
 * __useAdminTagsQuery__
 *
 * To run a query within a React component, call `useAdminTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminTagsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      tagOptions: // value for 'tagOptions'
 *   },
 * });
 */
export function useAdminTagsQuery(baseOptions: Apollo.QueryHookOptions<AdminTagsQuery, AdminTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminTagsQuery, AdminTagsQueryVariables>(AdminTagsDocument, options);
      }
export function useAdminTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminTagsQuery, AdminTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminTagsQuery, AdminTagsQueryVariables>(AdminTagsDocument, options);
        }
export type AdminTagsQueryHookResult = ReturnType<typeof useAdminTagsQuery>;
export type AdminTagsLazyQueryHookResult = ReturnType<typeof useAdminTagsLazyQuery>;
export type AdminTagsQueryResult = Apollo.QueryResult<AdminTagsQuery, AdminTagsQueryVariables>;
export const CommunityAdminConfigBrandingDocument = gql`
    query communityAdminConfigBranding($slug: String!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      _id
      slug
      title
      banner {
        url
      }
      avatar {
        url
      }
      creator {
        name
        surname
      }
    }
  }
}
    `;

/**
 * __useCommunityAdminConfigBrandingQuery__
 *
 * To run a query within a React component, call `useCommunityAdminConfigBrandingQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityAdminConfigBrandingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityAdminConfigBrandingQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCommunityAdminConfigBrandingQuery(baseOptions: Apollo.QueryHookOptions<CommunityAdminConfigBrandingQuery, CommunityAdminConfigBrandingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityAdminConfigBrandingQuery, CommunityAdminConfigBrandingQueryVariables>(CommunityAdminConfigBrandingDocument, options);
      }
export function useCommunityAdminConfigBrandingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityAdminConfigBrandingQuery, CommunityAdminConfigBrandingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityAdminConfigBrandingQuery, CommunityAdminConfigBrandingQueryVariables>(CommunityAdminConfigBrandingDocument, options);
        }
export type CommunityAdminConfigBrandingQueryHookResult = ReturnType<typeof useCommunityAdminConfigBrandingQuery>;
export type CommunityAdminConfigBrandingLazyQueryHookResult = ReturnType<typeof useCommunityAdminConfigBrandingLazyQuery>;
export type CommunityAdminConfigBrandingQueryResult = Apollo.QueryResult<CommunityAdminConfigBrandingQuery, CommunityAdminConfigBrandingQueryVariables>;
export const CommunityAdminConfigMainDocument = gql`
    query communityAdminConfigMain($slug: String!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      _id
      title
      tagline
      description
      creator {
        name
        surname
      }
    }
  }
}
    `;

/**
 * __useCommunityAdminConfigMainQuery__
 *
 * To run a query within a React component, call `useCommunityAdminConfigMainQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityAdminConfigMainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityAdminConfigMainQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCommunityAdminConfigMainQuery(baseOptions: Apollo.QueryHookOptions<CommunityAdminConfigMainQuery, CommunityAdminConfigMainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityAdminConfigMainQuery, CommunityAdminConfigMainQueryVariables>(CommunityAdminConfigMainDocument, options);
      }
export function useCommunityAdminConfigMainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityAdminConfigMainQuery, CommunityAdminConfigMainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityAdminConfigMainQuery, CommunityAdminConfigMainQueryVariables>(CommunityAdminConfigMainDocument, options);
        }
export type CommunityAdminConfigMainQueryHookResult = ReturnType<typeof useCommunityAdminConfigMainQuery>;
export type CommunityAdminConfigMainLazyQueryHookResult = ReturnType<typeof useCommunityAdminConfigMainLazyQuery>;
export type CommunityAdminConfigMainQueryResult = Apollo.QueryResult<CommunityAdminConfigMainQuery, CommunityAdminConfigMainQueryVariables>;
export const CommunityAdminHighlightedTagsDocument = gql`
    query CommunityAdminHighlightedTags($slug: String!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      _id
      title
      slug
      highlightedTags {
        tag {
          _id
          title
          postCount
        }
        order
      }
      creator {
        name
        surname
      }
    }
  }
}
    `;

/**
 * __useCommunityAdminHighlightedTagsQuery__
 *
 * To run a query within a React component, call `useCommunityAdminHighlightedTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityAdminHighlightedTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityAdminHighlightedTagsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCommunityAdminHighlightedTagsQuery(baseOptions: Apollo.QueryHookOptions<CommunityAdminHighlightedTagsQuery, CommunityAdminHighlightedTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityAdminHighlightedTagsQuery, CommunityAdminHighlightedTagsQueryVariables>(CommunityAdminHighlightedTagsDocument, options);
      }
export function useCommunityAdminHighlightedTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityAdminHighlightedTagsQuery, CommunityAdminHighlightedTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityAdminHighlightedTagsQuery, CommunityAdminHighlightedTagsQueryVariables>(CommunityAdminHighlightedTagsDocument, options);
        }
export type CommunityAdminHighlightedTagsQueryHookResult = ReturnType<typeof useCommunityAdminHighlightedTagsQuery>;
export type CommunityAdminHighlightedTagsLazyQueryHookResult = ReturnType<typeof useCommunityAdminHighlightedTagsLazyQuery>;
export type CommunityAdminHighlightedTagsQueryResult = Apollo.QueryResult<CommunityAdminHighlightedTagsQuery, CommunityAdminHighlightedTagsQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>(GetCommunityBasicDataDocument, options);
      }
export function useGetCommunityBasicDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>(GetCommunityBasicDataDocument, options);
        }
export type GetCommunityBasicDataQueryHookResult = ReturnType<typeof useGetCommunityBasicDataQuery>;
export type GetCommunityBasicDataLazyQueryHookResult = ReturnType<typeof useGetCommunityBasicDataLazyQuery>;
export type GetCommunityBasicDataQueryResult = Apollo.QueryResult<GetCommunityBasicDataQuery, GetCommunityBasicDataQueryVariables>;
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
      posts(limit: 10, postOptions: {status: PUBLISHED}) {
        posts {
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
        hasMore
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityTagPostsQuery, CommunityTagPostsQueryVariables>(CommunityTagPostsDocument, options);
      }
export function useCommunityTagPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityTagPostsQuery, CommunityTagPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityTagPostsQuery, CommunityTagPostsQueryVariables>(CommunityTagPostsDocument, options);
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
    paginatedTags {
      tags {
        _id
        title
        postCount(postOptions: {status: PUBLISHED})
      }
      hasMore
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCommunityTagsByUserInputQuery, FindCommunityTagsByUserInputQueryVariables>(FindCommunityTagsByUserInputDocument, options);
      }
export function useFindCommunityTagsByUserInputLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCommunityTagsByUserInputQuery, FindCommunityTagsByUserInputQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCommunityTagsByUserInputQuery, FindCommunityTagsByUserInputQueryVariables>(FindCommunityTagsByUserInputDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>(GetCommunitiesSlugsDocument, options);
      }
export function useGetCommunitiesSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>(GetCommunitiesSlugsDocument, options);
        }
export type GetCommunitiesSlugsQueryHookResult = ReturnType<typeof useGetCommunitiesSlugsQuery>;
export type GetCommunitiesSlugsLazyQueryHookResult = ReturnType<typeof useGetCommunitiesSlugsLazyQuery>;
export type GetCommunitiesSlugsQueryResult = Apollo.QueryResult<GetCommunitiesSlugsQuery, GetCommunitiesSlugsQueryVariables>;
export const GetCommunityHomeDataDocument = gql`
    query getCommunityHomeData($slug: String!, $postsStatus: PostStatus!, $postsPerTag: Int!) {
  community(slug: $slug) {
    errors {
      field
      message
    }
    community {
      _id
      logo
      title
      tagline
      description
      slug
      banner {
        url
      }
      avatar {
        url
      }
      highlightedTags {
        tag {
          title
          slug
          postCount(postOptions: {status: $postsStatus})
          posts(limit: $postsPerTag, postOptions: {status: $postsStatus}) {
            posts {
              title
              slug
              likes
              exclusive
              mainMedia {
                thumbnailUrl
              }
            }
            hasMore
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
 *      postsPerTag: // value for 'postsPerTag'
 *   },
 * });
 */
export function useGetCommunityHomeDataQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>(GetCommunityHomeDataDocument, options);
      }
export function useGetCommunityHomeDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityHomeDataQuery, GetCommunityHomeDataQueryVariables>(GetCommunityHomeDataDocument, options);
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
      tags(limit: 10) {
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityTagsDataQuery, GetCommunityTagsDataQueryVariables>(GetCommunityTagsDataDocument, options);
      }
export function useGetCommunityTagsDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityTagsDataQuery, GetCommunityTagsDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityTagsDataQuery, GetCommunityTagsDataQueryVariables>(GetCommunityTagsDataDocument, options);
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
      tags(limit: 10) {
        tags {
          _id
          title
          postCount
        }
        hasMore
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPostMainMediaDocument = gql`
    query GetPostMainMedia($id: String!) {
  findPostById(id: $id) {
    errors {
      field
      message
    }
    post {
      mainMedia {
        _id
        url
        thumbnailUrl
        format
        width
        height
      }
    }
  }
}
    `;

/**
 * __useGetPostMainMediaQuery__
 *
 * To run a query within a React component, call `useGetPostMainMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostMainMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostMainMediaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostMainMediaQuery(baseOptions: Apollo.QueryHookOptions<GetPostMainMediaQuery, GetPostMainMediaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostMainMediaQuery, GetPostMainMediaQueryVariables>(GetPostMainMediaDocument, options);
      }
export function useGetPostMainMediaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostMainMediaQuery, GetPostMainMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostMainMediaQuery, GetPostMainMediaQueryVariables>(GetPostMainMediaDocument, options);
        }
export type GetPostMainMediaQueryHookResult = ReturnType<typeof useGetPostMainMediaQuery>;
export type GetPostMainMediaLazyQueryHookResult = ReturnType<typeof useGetPostMainMediaLazyQuery>;
export type GetPostMainMediaQueryResult = Apollo.QueryResult<GetPostMainMediaQuery, GetPostMainMediaQueryVariables>;
export const GetPostsSlugsDocument = gql`
    query GetPostsSlugs {
  allPosts(postOptions: {status: PUBLISHED}) {
    errors {
      field
      message
    }
    paginatedPosts {
      posts {
        slug
        community {
          slug
        }
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsSlugsQuery, GetPostsSlugsQueryVariables>(GetPostsSlugsDocument, options);
      }
export function useGetPostsSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsSlugsQuery, GetPostsSlugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsSlugsQuery, GetPostsSlugsQueryVariables>(GetPostsSlugsDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HeaderMeQuery, HeaderMeQueryVariables>(HeaderMeDocument, options);
      }
export function useHeaderMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeaderMeQuery, HeaderMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HeaderMeQuery, HeaderMeQueryVariables>(HeaderMeDocument, options);
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
      tags(limit: 10) {
        tags {
          title
        }
        hasMore
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostBySlugsQuery, PostBySlugsQueryVariables>(PostBySlugsDocument, options);
      }
export function usePostBySlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostBySlugsQuery, PostBySlugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostBySlugsQuery, PostBySlugsQueryVariables>(PostBySlugsDocument, options);
        }
export type PostBySlugsQueryHookResult = ReturnType<typeof usePostBySlugsQuery>;
export type PostBySlugsLazyQueryHookResult = ReturnType<typeof usePostBySlugsLazyQuery>;
export type PostBySlugsQueryResult = Apollo.QueryResult<PostBySlugsQuery, PostBySlugsQueryVariables>;