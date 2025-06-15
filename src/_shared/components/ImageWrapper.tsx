import styled from 'styled-components';

const Wrapper = styled.div<ImageWrapperProps>`
  background-image: url(${({ $imgSrc }) => $imgSrc});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.elevation.low};
  display: grid;
`;

interface ImageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  $imgSrc: string;
  children?: React.ReactNode;
}
export default function ImageWrapper({
  $imgSrc,
  children,
  ...rest
}: ImageWrapperProps) {
  return (
    <Wrapper $imgSrc={$imgSrc} {...rest}>
      {children}
    </Wrapper>
  );
}
