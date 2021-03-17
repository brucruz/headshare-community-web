/* eslint-disable no-underscore-dangle */
import { MdClose } from 'react-icons/md';
import { Tag } from '../generated/graphql';
import { TagsContainer } from '../styles/components/Tags';

export type CommunityTag = {
  __typename?: 'Tag' | undefined;
} & Pick<Tag, '_id' | 'title' | 'postCount'>;

interface TagsProps {
  tags: CommunityTag[];
  handleTagExclusion?: (id: string) => void;
}

export function Tags({ tags, handleTagExclusion }: TagsProps): JSX.Element {
  return (
    <TagsContainer>
      {tags.map(tag => (
        <article key={tag._id}>
          <header>
            <h5>{tag.title}</h5>
          </header>

          {handleTagExclusion && (
            <button type="button" onClick={() => handleTagExclusion(tag._id)}>
              <MdClose />
            </button>
          )}
        </article>
      ))}
    </TagsContainer>
  );
}
