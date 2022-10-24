import { TailSpin } from 'react-loader-spinner';
import { StyledLoader } from './LoaderStyled';

export const Loader = () => {
  return (
    <StyledLoader>
      <TailSpin />
    </StyledLoader>
  );
};
