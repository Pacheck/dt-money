import React, { useState, FormEvent, ChangeEvent } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { api } from '../../services/api';
import { RadioBox, Container, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const initialState = {
  title: '',
  value: '',
  category: '',
};

interface TransactionFormDataTypes {
  title: string;
  value: HTMLInputElement['value'];
  category: string;
}
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [transactionFormData, setTransactionFormData] =
    useState<TransactionFormDataTypes>(initialState);
  const [transactionType, setTransactionType] = useState('deposit');

  const handleCreateNewTransation = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      ...transactionFormData,
      transactionType,
    };
    api.post('/transactions', data);
  };

  const handleChangeTransactionFormData = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === 'number') {
      setTransactionFormData({ ...transactionFormData, [name]: Number(value) });
    } else {
      setTransactionFormData({ ...transactionFormData, [name]: value });
    }
  };

  const handleSetTypeDeposit = () => setTransactionType('deposit');
  const handleSetTypeWithdraw = () => setTransactionType('withdraw');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransation}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          name="title"
          value={transactionFormData.title}
          onChange={handleChangeTransactionFormData}
        />
        <input
          placeholder="Valor"
          type="number"
          name="value"
          value={transactionFormData.value}
          onChange={handleChangeTransactionFormData}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={transactionType === 'deposit'}
            activeColor="green"
            onClick={handleSetTypeDeposit}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={transactionType === 'withdraw'}
            activeColor="red"
            onClick={handleSetTypeWithdraw}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          name="category"
          value={transactionFormData.category}
          onChange={handleChangeTransactionFormData}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
