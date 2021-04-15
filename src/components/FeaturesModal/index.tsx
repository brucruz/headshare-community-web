import { useState } from 'react';
import {
  FeaturesListContainer,
  FeaturesModalContainer,
  FeaturesPlanSelectionContainer,
} from '../../styles/components/FeaturesModal';
import Button from '../Button';
import Modal from '../Modal';

export interface FeaturesModalProps {
  communityTitle: string;
}

export function FeaturesModal({
  communityTitle = 'Headshare',
}: FeaturesModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} setIsOpen={() => setIsOpen} closeButton>
      <FeaturesModalContainer>
        <h2>Acesso ao conteúdo exclusivo da página {communityTitle}</h2>

        <FeaturesPlanSelectionContainer>
          <div>R$ 49,90 / mês</div>
          <div>R$ 499 / ano</div>
        </FeaturesPlanSelectionContainer>

        <FeaturesListContainer>
          <li>Novas aulas sendo adicionadas toda semana</li>

          <li>
            Seja notificado por email quando novas aulas exclusivas para membros
            forem publicadas
          </li>

          <li>Espaço para você definir outras vantagens que preferir</li>
        </FeaturesListContainer>

        <Button text="Assinar" stretch />
      </FeaturesModalContainer>
    </Modal>
  );
}
