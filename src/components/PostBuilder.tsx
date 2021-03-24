import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { RawEditorSettings } from 'tinymce';
import debounce from 'lodash/debounce';

import { PostBuilderWrapper } from '../styles/PostBuilder';
import saveActions from '../constants/saveActions';
import { useUpdatePostMutation } from '../generated/graphql';
import textBetweenTags from '../utils/textBetweenTags';

interface ContentProps {
  title: string;
  formattedTitle: string;
  text: string;
}

interface SaveStateProps {
  contentToSave?: ContentProps;
  isSaving: boolean;
  hasError: boolean;
  errorMessage?: string;
}

interface ReducerActionProps {
  type: string;
  payload?: ContentProps;
  error?: string;
}

interface PostBuilderProps {
  postId: string;
  communitySlug: string;
  postContent: ContentProps;
  passSaveState: (state: 'saved' | 'saving') => void;
}

const initialContent: ContentProps = {
  title: 'Título',
  formattedTitle: '<h1>Título</h1>',
  text: '<p>Espalhe sua história...</p>',
};

function updateReducer(
  state: SaveStateProps,
  action: ReducerActionProps,
): SaveStateProps {
  switch (action.type) {
    case saveActions.SAVE_START:
      return {
        ...state,
        isSaving: true,
        hasError: false,
      };
    case saveActions.SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false,
        hasError: false,
        contentToSave: action.payload,
      };
    case saveActions.SAVE_FAILURE:
      return {
        ...state,
        isSaving: false,
        hasError: true,
        errorMessage: action.error,
      };
    default:
      throw new Error();
  }
}

const titleEditorConfig: RawEditorSettings & {
  selector?: undefined;
  target?: undefined;
} = {
  placeholder: 'Title',
  menubar: false,
  inline: true,
  toolbar: false,
  plugins: ['quickbars'],
  quickbars_insert_toolbar: 'undo redo',
  quickbars_selection_toolbar: 'italic underline',
  entity_encoding: 'raw',
};

const contentEditorConfig: RawEditorSettings & {
  selector?: undefined;
  target?: undefined;
} = {
  entity_encoding: 'raw',
  placeholder: 'Espalhe sua história...',
  menubar: false,
  inline: true,
  plugins: [
    'autolink',
    'codesample',
    'link',
    'lists',
    'media',
    // 'powerpaste',
    'table',
    'image',
    'quickbars',
    'codesample',
    'help',
    'hr',
  ],
  toolbar: false,
  quickbars_insert_toolbar: 'quicktable image media codesample hr',
  quickbars_selection_toolbar:
    'bold italic underline | formatselect | blockquote quicklink',
  contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
  // powerpaste_word_import: 'clean',
  // powerpaste_html_import: 'clean',
  block_formats:
    'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;',
};

const PostBuilder: React.FC<PostBuilderProps> = ({
  postId,
  communitySlug,
  postContent,
  passSaveState,
}) => {
  // Create abort controller
  const abortController = useRef<AbortController>();

  const [content, setContent] = useState<ContentProps>(postContent);

  const initialSaveState: SaveStateProps = {
    contentToSave: postContent,
    isSaving: false,
    hasError: false,
  };

  const [
    { contentToSave, hasError, isSaving, errorMessage },
    dispatch,
  ] = useReducer(updateReducer, initialSaveState);

  const [updatePost] = useUpdatePostMutation();

  const saveContent = useCallback(
    (
      contentInfo: ContentProps,
      dispatchFunction: (value: ReducerActionProps) => void,
    ) => {
      if (
        contentInfo.title === initialContent.title &&
        contentInfo.text === initialContent.text
      ) {
        return;
      }

      const controller = new window.AbortController();
      abortController.current = controller;

      dispatchFunction({ type: saveActions.SAVE_START });

      updatePost({
        variables: {
          postId,
          communitySlug,
          post: {
            title: contentInfo.title,
            formattedTitle: contentInfo.formattedTitle,
            content: contentInfo.text,
          },
        },
        context: { fetchOptions: { signal: controller.signal } },
      })
        .then(result => {
          if (!result.data) {
            dispatchFunction({
              type: saveActions.SAVE_FAILURE,
              error: result.errors?.toString(),
            });
          } else if (result.data.updatePost) {
            if (result.data.updatePost.errors) {
              dispatchFunction({
                type: saveActions.SAVE_FAILURE,
                error: result.data.updatePost.errors.toString(),
              });
            } else if (result.data.updatePost.post) {
              dispatchFunction({
                type: saveActions.SAVE_SUCCESS,
                payload: {
                  title: contentInfo.title,
                  formattedTitle: contentInfo.formattedTitle,
                  text: contentInfo.text,
                },
              });
            }
          }
        })
        .catch(err => {
          dispatchFunction({ type: saveActions.SAVE_FAILURE, error: err });
        });
    },
    [communitySlug, postId, updatePost],
  );

  const debouncedSaveContent = useRef(
    debounce(
      (contentInfo: ContentProps) => saveContent(contentInfo, dispatch),
      1500,
    ),
  ).current;

  useEffect(() => {
    debouncedSaveContent(content);
  }, [content, debouncedSaveContent]);

  useEffect(() => {
    isSaving ? passSaveState('saving') : passSaveState('saved');
  }, [isSaving, passSaveState]);

  // useEffect(() => {
  // contentEditor.subscribe('editableInput', () => {
  //   // title: postTitle.current?.value || '',
  //   // subtitle: postSubtitle.current?.value || '',
  //   setContent(state => ({
  //     ...state,
  //     text: contentEditor.getContent(0),
  //     description: `${contentEditor
  //       .getContent(0)
  //       .substring(0, 30)
  //       .toString()}...`,
  //   }));
  // });
  // }, []);

  return (
    <PostBuilderWrapper>
      <Editor
        id="title-editor"
        apiKey={process.env.NEXT_PUBLIC_TINY_APIKEY}
        init={{
          ...titleEditorConfig,
          formats: {
            // Changes the default format for h1 to have a class of heading
            h1: { block: 'h1', classes: 'heading' },
          },
        }}
        onEditorChange={editorContent =>
          setContent(state => ({
            ...state,
            title:
              textBetweenTags(editorContent, 'h1') ||
              textBetweenTags(editorContent, 'p') ||
              editorContent,
            formattedTitle: editorContent,
          }))
        }
        value={content.formattedTitle}
      />

      <Editor
        id="content-editor"
        apiKey={process.env.NEXT_PUBLIC_TINY_APIKEY}
        init={contentEditorConfig}
        onEditorChange={editorContent =>
          setContent(state => ({
            ...state,
            text: editorContent,
          }))
        }
        value={content.text}
      />
    </PostBuilderWrapper>
  );
};

export default PostBuilder;
