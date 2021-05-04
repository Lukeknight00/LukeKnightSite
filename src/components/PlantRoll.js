import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class PlantRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline" style={{
        

      }}>
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id} style={{textAlign:"center"}}>
              <article
                className={`plant-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  <div className="container">
                  {post.frontmatter.image ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.image,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          
                        }}
                      />
                   
                    </div>
                    
                  ) : null}
                   <p className="post-meta " 
                      style={{ 
                        position: 'absolute',
                        bottom: '8px',
                        right: '16px', 
                        color: 'White',
                        backgroundColor: "rgb(255,255,255,0.3)",
                        borderRadius: 10,
                        padding: '5px'
                      }}>
                    <Link
                      className="title is-size-4"
                      to={post.fields.slug}
                      style={{color: 'gold' }}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span></span>
                    <span className="subtitle is-size-7 is-block">
                      <i >The {post.frontmatter.sciencename}</i>
                    </span>
                  </p>
                  </div>
                </header>
                <p style={{textAlign:"center"}}>
                  {post.frontmatter.description}
                  <br />
                  <br />
                  <Link className="button" style={{backgroundColor:"rgb(10,255,10,.1)"}} to={post.fields.slug}>
                   Learn More about {post.frontmatter.name} →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

PlantRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query PlantRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "plant-post" } } }
        ) {
          edges {
            node {
              
              id
              fields {
                slug
              }
              frontmatter {
                description
                title
                sciencename
                name
                templateKey
                date(formatString: "MMMM DD, YYYY")
                image {
                  childImageSharp {
                    fluid(maxWidth: 1080, quality: 100) {
                      ...GatsbyImageSharpFluid
                      ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <PlantRoll data={data} count={count} />}
  />
)
