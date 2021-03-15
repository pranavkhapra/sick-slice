import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
// import styled from 'styled-components';

function pizzaDynamicPage({ data }) {
  const { person } = data;
  return (
    <>
      <div className="center">
        <Img fluid={person.image.asset.fluid} />
        <h2>
          <span className="mark">{person.name}</span>
        </h2>
        <p>{person.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

export default pizzaDynamicPage;
