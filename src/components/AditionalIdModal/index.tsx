import { useFormik } from 'formik';
import Input from '../Input';
import Modal from '../Modal';
import { RadioInput } from '../RadioInput';
import {
  AditionalIdForm,
  AditionalIdInputGroupWrapper,
  AditionalIdInputWrapper,
  AditionalIdInputWrapperSameLine,
  AditionalIdRadioGroup,
} from './AditionalIdModal';
import { DocumentIdType } from '../../generated/graphql';

export interface AditionalIdModalProps {
  nextStep: () => void;
  previousStep: () => void;
  isOpen: boolean;
}

export interface UpdateUserAditionalIdVariables {
  areaCode: string;
  phone: string;
  documentType: DocumentIdType;
  documentNumber: string;
}

export function AditionalIdModal({
  isOpen,
  nextStep,
  previousStep,
}: AditionalIdModalProps): JSX.Element {
  const updateUserAditionalIdForm = useFormik<UpdateUserAditionalIdVariables>({
    initialValues: {
      areaCode: '',
      phone: '',
      documentType: DocumentIdType.Cpf,
      documentNumber: '',
    },
    onSubmit: async values => {
      console.log(values);
    },
  });

  const { values: formValues } = updateUserAditionalIdForm;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={() => false}
      nextStep={nextStep}
      previousStep={previousStep}
      closeButton
      defaultContent={{
        title: 'Confirme os dados cadastrais abaixo',
        mainButton: {
          text: 'Prosseguir',
          type: 'submit',
          form: 'updateUserAditionalIdForm',
        },
      }}
    >
      <AditionalIdForm
        id="updateUserAditionalIdForm"
        onSubmit={updateUserAditionalIdForm.handleSubmit}
      >
        <AditionalIdInputGroupWrapper>
          <p>Celular:</p>

          <AditionalIdInputWrapperSameLine>
            <Input
              name="areaCode"
              value={updateUserAditionalIdForm.values.areaCode}
              onChange={e =>
                updateUserAditionalIdForm.setFieldValue(
                  'areaCode',
                  e.target.value,
                )
              }
              placeholder="11"
              mask="99"
            />
            <Input
              name="phone"
              value={updateUserAditionalIdForm.values.phone}
              onChange={e =>
                updateUserAditionalIdForm.setFieldValue('phone', e.target.value)
              }
              placeholder="91234 5678"
              mask={
                formValues.phone.length < 9 + 1 ? '9999 9999?' : '99999 9999'
              }
              formatChars={{
                '9': '[0-9]',
                '?': '[0-9]',
              }}
            />
          </AditionalIdInputWrapperSameLine>
        </AditionalIdInputGroupWrapper>

        <AditionalIdInputGroupWrapper>
          <p>Documento:</p>

          <AditionalIdRadioGroup>
            <RadioInput
              name={DocumentIdType.Cpf}
              value={DocumentIdType.Cpf}
              label="CPF"
              isChecked={formValues.documentType === DocumentIdType.Cpf}
              onChange={e =>
                updateUserAditionalIdForm.setFieldValue(
                  'documentType',
                  e.target.value,
                )
              }
            />

            <RadioInput
              name={DocumentIdType.Passport}
              value={DocumentIdType.Passport}
              label="Passaporte"
              isChecked={formValues.documentType === DocumentIdType.Passport}
              onChange={e =>
                updateUserAditionalIdForm.setFieldValue(
                  'documentType',
                  e.target.value,
                )
              }
            />
          </AditionalIdRadioGroup>

          <AditionalIdInputWrapper>
            <Input
              name="documentNumber"
              value={updateUserAditionalIdForm.values.documentNumber}
              onChange={e =>
                updateUserAditionalIdForm.setFieldValue(
                  'documentNumber',
                  e.target.value,
                )
              }
              label="Número do documento"
              placeholder="123.456.789-01"
              mask={
                formValues.documentType === DocumentIdType.Cpf
                  ? '999.999.999-99'
                  : undefined
              }
            />
          </AditionalIdInputWrapper>
        </AditionalIdInputGroupWrapper>
      </AditionalIdForm>
    </Modal>
  );
}
