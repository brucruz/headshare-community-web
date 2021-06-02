import { debounce } from 'lodash';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import saveActions from '../constants/saveActions';
import { isObjectsEqual } from '../utils/isObjectsEqual';
import { useSnackbar } from './useSnackbar';

export type PostSaveStatus = 'saved' | 'saving';

export type UpdatePostCallbackStatus = 'success' | 'error';

export interface UpdatePostCallbackResponse {
  callbackStatus: UpdatePostCallbackStatus;
  message?: string;
}

export type SavePostBuilderResponse = [PostSaveStatus];

export function useSavePostBuilder<ContentProps>(
  initialContent: ContentProps,
  content: ContentProps,
  updatePostCallback: (
    contentInfo: ContentProps,
    controllerSignal: AbortController['signal'],
  ) => Promise<UpdatePostCallbackResponse>,
): SavePostBuilderResponse {
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

  const initialSaveState: SaveStateProps = {
    contentToSave: initialContent,
    isSaving: false,
    hasError: false,
  };

  const [saveStatus, setSaveStatus] = useState<PostSaveStatus>('saved');
  const [{ isSaving }, dispatch] = useReducer(updateReducer, initialSaveState);
  const abortController = useRef<AbortController>();
  const { addSnackbar } = useSnackbar();

  const saveContent = useCallback(
    async (
      contentInfo: ContentProps,
      dispatchFunction: (value: ReducerActionProps) => void,
    ) => {
      const sameContentInfo = contentInfo === initialContent;
      const sameContentInfoParams = isObjectsEqual(contentInfo, initialContent);

      if (sameContentInfo || sameContentInfoParams) {
        return;
      }

      const controller = new window.AbortController();
      abortController.current = controller;

      dispatchFunction({ type: saveActions.SAVE_START });

      const { callbackStatus, message } = await updatePostCallback(
        contentInfo,
        controller.signal,
      );

      console.log('contentInfo: ', contentInfo);
      console.log('callbackStatus: ', callbackStatus);

      if (callbackStatus === 'error') {
        // Insert Snackbar with error detail and retry option
        message && addSnackbar({ message });

        dispatchFunction({
          type: saveActions.SAVE_FAILURE,
          error: message,
        });
      }

      if (callbackStatus === 'success') {
        dispatchFunction({
          type: saveActions.SAVE_SUCCESS,
          payload: contentInfo,
        });
      }
    },
    [addSnackbar, initialContent, updatePostCallback],
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
    isSaving ? setSaveStatus('saving') : setSaveStatus('saved');
  }, [isSaving, setSaveStatus]);

  return [saveStatus];
}
