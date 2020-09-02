import React, { FC } from 'react';

interface Props{
  a: '1';
}

const Login: FC<Props> = (props) => {
  const {a} = props;

  return (<div>{a}</div>);

};

export default Login