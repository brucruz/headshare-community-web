import { useCallback, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { RawEditorSettings } from 'tinymce';

import { PostBuilderWrapper } from '../styles/PostBuilder';
import { useUpdatePostMutation } from '../generated/graphql';
import textBetweenTags from '../utils/textBetweenTags';
import {
  UpdatePostCallbackResponse,
  useSavePostBuilder,
} from '../hooks/useSavePostBuilder';

interface ContentProps {
  title: string;
  formattedTitle: string;
  text: string;
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
  const [content, setContent] = useState<ContentProps>(postContent);

  const [updatePost] = useUpdatePostMutation();

  const updatePostCallback = useCallback(
    async (
      contentInfo: ContentProps,
      controllerSignal: AbortController['signal'],
      // eslint-disable-next-line consistent-return
    ): Promise<UpdatePostCallbackResponse> => {
      if (!communitySlug || !postId) {
        return {
          callbackStatus: 'error',
        };
      }

      const response = await updatePost({
        variables: {
          postId,
          communitySlug,
          post: {
            title: contentInfo.title,
            formattedTitle: contentInfo.formattedTitle,
            content: contentInfo.text,
          },
        },
        context: { fetchOptions: { signal: controllerSignal } },
      });

      if (!response.data) {
        // Insert Snackbar with error detail and retry option

        const callbackResponse: UpdatePostCallbackResponse = {
          callbackStatus: 'error',
          message: response.errors?.toString(),
        };

        return callbackResponse;
      }
      if (response.data.updatePost) {
        if (response.data.updatePost.errors) {
          // Insert Snackbar with error detail and retry option

          const callbackResponse: UpdatePostCallbackResponse = {
            callbackStatus: 'error',
            message: response.data.updatePost.errors.toString(),
          };

          return callbackResponse;
        }
        if (response.data.updatePost.post) {
          const callbackResponse: UpdatePostCallbackResponse = {
            callbackStatus: 'success',
          };

          return callbackResponse;
        }
      }

      const callbackResponse: UpdatePostCallbackResponse = {
        callbackStatus: 'error',
      };

      return callbackResponse;
    },
    [communitySlug, postId, updatePost],
  );

  const [saveStatus] = useSavePostBuilder<ContentProps>(
    initialContent,
    content,
    updatePostCallback,
  );

  useEffect(() => {
    passSaveState(saveStatus);
  }, [passSaveState, saveStatus]);

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
