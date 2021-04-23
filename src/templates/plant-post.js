import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const PlantPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  name,
  commonname,
  sciencename,
  image,
  image2,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      
      <div className="container content">
        <div className="columns">
          
          <div className="column is-6" >
            <h1 className="name is-size-1 has-text-weight-bold is-bold-light" >
              {name} the {commonname}
            </h1>

            <div className="column full-width-image"
              style={{
                backgroundImage: `url(${
                  !!image.childImageSharp ? image.childImageSharp.fluid.src : image
                })`,
                height: "70vh",
                backgroundPosition: `top left` ,
                backgroundAttachment: `fixed`,
              }}
             />

          </div>
          
          <div className="column is-4 rounded " style={{color: "whiteSmoke",backgroundColor: "rgba(63, 191, 127, 0.8)",borderRadius:"15px", paddingTop:"1em", marginTop:"15vh", height:"100%", textAlign:"center"}}>
            <h1 style={{color: "whiteSmoke"}}> About {name}</h1> <p>{description}</p>
          </div>
          
        </div>
        <div className="columns" style={{}}>
          <div className="column is-6 is-offset-1">
            <div className="column "
                style={{
                  backgroundImage: `url(${
                    !!image.childImageSharp ? image.childImageSharp.fluid.src : image2
                  })`,
                  backgroundPosition: "center" ,
                  height: '100%',
                  width: '100%',
                  backgroundSize: '100%',
                }}
              />
 
              
            </div>
            
            <div className="column is-5 is-offset-1" style={{}}>
              <h1 className="sciencename is-size-2 has-text-weight-bold is-bold-light">
                      About the <i>{sciencename} </i> <br/>
                      <p style={{fontSize:"30%"}}>from <a href="https://en.wikipedia.org/wiki/Main_Page">Wikipedia </a> </p>
              </h1>
                <PostContent content={content} />
            </div>
          </div>
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
    </section>
  )
}

PlantPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  name: PropTypes.string,
  commonname: PropTypes.string,
  sciencename: PropTypes.string,
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
        sciencename={post.frontmatter.sciencename}
        commonname={post.frontmatter.commonname}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Luke's Plants">
            <title>{`${post.frontmatter.name}`}</title>
            <meta
              name="name"
              content={`${post.frontmatter.name}`}
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
            fluid(maxWidth: 1440, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image2  { 
            childImageSharp {
              fluid(maxHeight: 700, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
        }
        name
        commonname
        sciencename
        description
        tags
      }
    }
  }
`
