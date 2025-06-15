import type React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface1};
  color: ${({ theme }) => theme.colors.onSurface};
  box-shadow: ${({ theme }) => theme.elevation.low};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadii.base};
  overflow: hidden;
  transition: transform 0.2s ease;
  height: fit-content;
  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.elevation.medium};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;

const ImageWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & > img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const BodyContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizeLg};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  text-align: left;
`;
const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizeBase};
  text-align: left;
`;

interface CardMeta {
  tags?: string[];
  category?: string;
  keywords?: string[];
  [key: string]: unknown;
}

interface PokemonCardProps extends React.ComponentProps<React.ElementType> {
  imageSrc?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  tags?: React.ReactNode[];
  action?: React.ReactNode;
  meta?: CardMeta;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  media?: React.ReactNode;
  renderTag?: (tag: React.ReactNode, idx: number) => React.ReactNode;
  renderTitle?: (title: React.ReactNode) => React.ReactNode;
  renderDescription?: (desc: React.ReactNode) => React.ReactNode;
  as?: React.ElementType;
  children?: React.ReactNode;
}

export default function Card({
  imageSrc,
  title,
  description,
  tags = [],
  action,
  meta,
  header,
  footer,
  media,
  renderTag,
  renderTitle,
  renderDescription,
  as = "div",
  children,
  ...rest
}: PokemonCardProps) {
  return (
    <CardContainer
      as={as}
      {...rest}
      {...(meta &&
        Object.fromEntries(
          Object.entries(meta).map(([k, v]) => [`data-meta-${k}`, String(v)]),
        ))}
    >
      {header}
      {media ??
        (imageSrc && (
          <ImageWrapper>
            <img src={imageSrc} alt={typeof title === "string" ? title : ""} />
          </ImageWrapper>
        ))}
      <BodyContainer>
        {children ?? (
          <>
            {title &&
              (renderTitle ? renderTitle(title) : <Title>{title}</Title>)}
            {description &&
              (renderDescription ? (
                renderDescription(description)
              ) : (
                <Description>{description}</Description>
              ))}
            {tags.length > 0 && (
              <TagList>
                {tags.map((tag, i) => (renderTag ? renderTag(tag, i) : tag))}
              </TagList>
            )}
            {action}
          </>
        )}
      </BodyContainer>
      {footer}
    </CardContainer>
  );
}
