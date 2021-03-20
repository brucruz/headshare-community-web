import {
  ExplainedInputContainer,
  ExplainedInputHeader,
  ExplainedInputInput,
} from '../styles/components/ExplainedInput';
import Input, { InputProps } from './Input';
import MediaInput, { MediaInputProps } from './MediaInput';
import { TextArea, TextAreaProps } from './TextArea';

interface ExplainedInputProps {
  explanation: {
    title: string;
    description?: string;
  };
  input?: InputProps;
  textarea?: TextAreaProps;
  media?: MediaInputProps;
}

export function ExplainedInput({
  explanation,
  input,
  textarea,
  media,
}: ExplainedInputProps): JSX.Element {
  return (
    <ExplainedInputContainer>
      <ExplainedInputHeader>
        <h4>{explanation.title}</h4>
        {explanation.description && <p>{explanation.description}</p>}
      </ExplainedInputHeader>

      <ExplainedInputInput>
        {input && <Input {...input} />}

        {textarea && <TextArea {...textarea} />}

        {media && <MediaInput {...media} />}
      </ExplainedInputInput>
    </ExplainedInputContainer>
  );
}

export default ExplainedInput;
