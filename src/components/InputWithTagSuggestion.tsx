/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useState } from 'react';
import Input from './Input';
import {
  useFindCommunityTagsByUserInputLazyQuery,
  Tag,
  useCreateCommunityTagFromAdminTagHighlightMutation,
} from '../generated/graphql';
import {
  InputTagSuggestionContainer,
  TagsSuggestions,
} from '../styles/InputWithTagSuggestion';

export type CommunityTag = {
  __typename?: 'Tag' | undefined;
} & Pick<Tag, '_id' | 'title' | 'postCount'>;

interface InputWithTagSuggestionProps {
  inputName: string;
  inputLabel: string;
  communitySlug: string;
  selectedTags: CommunityTag[];
  selectTag: (tag: CommunityTag, index: number) => void;
}

export function InputWithTagSuggestion({
  inputLabel,
  inputName,
  communitySlug,
  selectedTags,
  selectTag,
}: InputWithTagSuggestionProps): JSX.Element {
  const [tagSuggestions, setTagSuggestions] = useState<CommunityTag[]>([]);
  const [userInput, setUserInput] = useState('');

  const [
    findTags,
    { data: foundTags },
  ] = useFindCommunityTagsByUserInputLazyQuery();

  const [createTag] = useCreateCommunityTagFromAdminTagHighlightMutation();

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
        foundTags.findTagsByInput.paginatedTags?.tags
      ) {
        const selectedTagIds = selectedTags.map(tag => tag._id);

        const filteredResults = foundTags.findTagsByInput.paginatedTags.tags.filter(
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

  const handleTagSelection = useCallback(
    (tag: CommunityTag, index: number) => {
      selectTag(tag, index);
      setTagSuggestions([]);
      setUserInput('');
    },
    [selectTag],
  );

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

        selectTag(newTag, 0);
        setUserInput('');
      }
    },
    [communitySlug, createTag, selectTag],
  );

  return (
    <InputTagSuggestionContainer>
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
          {tagSuggestions.map((tag, index) => (
            <li key={tag._id} onClick={() => handleTagSelection(tag, index)}>
              <p>{tag.title}</p>
            </li>
          ))}
        </TagsSuggestions>
      )}
    </InputTagSuggestionContainer>
  );
}
