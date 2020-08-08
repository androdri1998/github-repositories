import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface IRepositoryParams {
  repository_name: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<IRepositoryParams>();
  return <h1> res: {params.repository_name}</h1>;
};

export default Repository;
