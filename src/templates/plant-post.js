import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const PlantPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  name,
  sciencename,
  image,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="name is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
            <div
            className="full-width-image margin-top-0"
            style={{
              backgroundImage: `url(${
                !!image.childImageSharp ? image.childImageSharp.fluid.src : image
              })`,
              backgroundPosition: `top left`,
              backgroundAttachment: `fixed`,
            }}
             ></div>
            <h1 className="sciencename is-size-2 has-text-weight-bold is-bold-light">
              {sciencename}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

PlantPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  name: PropTypes.string,
  helmet: PropTypes.object,
}

const PlantPost = ({ data }) => {
  const { markdownRemark: post } = data
  const { frontmatter } = data.markdownRemark


  return (
    <Layout>
      <PlantPostTemplate
        content={post.html}
        image={frontmatter.image}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Luke's Plants">
            <title>{`${post.frontmatter.name}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        name={post.frontmatter.name}
      />
    </Layout>
  )
}

PlantPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default PlantPost

export const pageQuery = graphql`
  query PlantPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        image { 
          childImageSharp {
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        name
        sciencename
        description
        tags
      }
    }
  }
`
