/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Input from './Input';
import {
  useFindCommunityTagsByUserInputLazyQuery,
  Tag,
  useCreateCommunityTagMutation,
  useUpdatePostMutation,
} from '../generated/graphql';
import {
  InputTagSuggestionContainer,
  TagsSelection,
  TagsSuggestions,
} from '../styles/InputWithTagSuggestion';

export type CommunityTag = {
  __typename?: 'Tag' | undefined;
} & Pick<Tag, '_id' | 'title'>;

interface InputWithTagSuggestionProps {
  inputName: string;
  inputLabel: string;
  communitySlug: string;
  postId: string;
  initialTags: CommunityTag[];
  receivedInfo: boolean;
}

const InputWithTagSuggestion: React.FC<InputWithTagSuggestionProps> = ({
  inputLabel,
  inputName,
  communitySlug,
  initialTags,
  postId,
  receivedInfo = false,
}) => {
  const [tagSuggestions, setTagSuggestions] = useState<CommunityTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<CommunityTag[]>([]);
  const [userInput, setUserInput] = useState('');
  const [initialTagsLoaded, setInitialTagsLoaded] = useState(false);

  const [
    findTags,
    { data: foundTags },
  ] = useFindCommunityTagsByUserInputLazyQuery();

  const [createTag] = useCreateCommunityTagMutation();
  const [updatePost] = useUpdatePostMutation();

  useEffect(() => {
    if (userInput.length <= 2) {
      setTagSuggestions([]);
    }

    if (userInput.length > 2) {
      findTags({
        variables: {
          communitySlug,
          input: userInput,
        },
      });

      if (
        foundTags &&
        foundTags.findTagsByInput &&
        foundTags.findTagsByInput.tags
      ) {
        const selectedTagIds = selectedTags.map(tag => tag._id);

        const filteredResults = foundTags.findTagsByInput.tags.filter(
          tag => !selectedTagIds.includes(tag._id),
        );

        setTagSuggestions(filteredResults);
      }

      if (
        foundTags &&
        foundTags.findTagsByInput &&
        foundTags.findTagsByInput.errors
      ) {
        const notFoundMessage = foundTags.findTagsByInput.errors.filter(error =>
          error.message.includes('No Tag found'),
        );

        if (notFoundMessage.length > 0) {
          setTagSuggestions([]);
        }
      }
    }
  }, [userInput, findTags, communitySlug, foundTags, selectedTags]);

  useEffect(() => {
    if (receivedInfo && !initialTagsLoaded) {
      setSelectedTags(initialTags);
      setInitialTagsLoaded(true);
    }

    if (communitySlug && postId && receivedInfo && initialTagsLoaded) {
      const tagsIds = selectedTags.map(selectedTag => selectedTag._id);

      updatePost({
        variables: {
          communitySlug,
          postId,
          post: {
            tags: tagsIds,
          },
        },
      });
    }
  }, [
    selectedTags,
    updatePost,
    communitySlug,
    postId,
    receivedInfo,
    initialTagsLoaded,
    initialTags,
  ]);

  const handleTagSelection = useCallback((tag: CommunityTag) => {
    setSelectedTags(state => [...state, tag]);
    setTagSuggestions([]);
    setUserInput('');
  }, []);

  const handleTagExclusion = useCallback((tag: CommunityTag) => {
    setSelectedTags(stateTags =>
      stateTags.filter(stateTag => stateTag !== tag),
    );
  }, []);

  const handleCreateTag = useCallback(
    async (input: string) => {
      const result = await createTag({
        variables: {
          communitySlug,
          tagData: {
            title: input,
          },
        },
      });

      if (result.data && result.data.createTag && result.data.createTag.tag) {
        const newTag = result.data.createTag.tag;

        setSelectedTags(state => [...state, newTag]);
        setUserInput('');
      }
    },
    [communitySlug, createTag],
  );

  return (
    <InputTagSuggestionContainer>
      {selectedTags.length > 0 && (
        <TagsSelection>
          {selectedTags.map(tag => (
            <article key={tag._id}>
              <header>
                <h5>{tag.title}</h5>
              </header>

              <button type="button" onClick={() => handleTagExclusion(tag)}>
                <MdClose />
              </button>
            </article>
          ))}
        </TagsSelection>
      )}

      <Input
        name={inputName}
        label={inputLabel}
        placeholder="Adicione tags..."
        onChange={event => setUserInput(event.target.value)}
        value={userInput}
      />

      {(tagSuggestions.length > 0 || userInput.length > 2) && (
        <TagsSuggestions>
          {userInput.length > 2 && (
            <li key="create-tag" onClick={() => handleCreateTag(userInput)}>
              <p>
                {userInput} <small>(criar)</small>
              </p>
            </li>
          )}
          {tagSuggestions.map(tag => (
            <li key={tag._id} onClick={() => handleTagSelection(tag)}>
              <p>{tag.title}</p>
            </li>
          ))}
        </TagsSuggestions>
      )}
    </InputTagSuggestionContainer>
  );
};

export default InputWithTagSuggestion;
