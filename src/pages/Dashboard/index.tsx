import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import { Title, Form, Repositories, Error } from './style';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );
    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }

    return [];
  });
  const [inputError, setInputError] = useState('');
  const [nameRepository, setNameRepository] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    ev: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    ev.preventDefault();

    try {
      const reponse = await api.get<Repository>(`/repos/${nameRepository}`);
      const repository = reponse.data;
      setRepositories([...repositories, repository]);
      setNameRepository('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form
        hasError={!!inputError}
        hasName={!!nameRepository}
        onSubmit={handleAddRepository}
      >
        <input
          value={nameRepository}
          placeholder="Digite o nome do repositório"
          onChange={({ target }) => setNameRepository(target.value)}
        />
        <button disabled={nameRepository !== '' ? false : true} type="submit">
          Pesquisar
        </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
