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
  aqdate,
  lastwatered,
  lastfertilized,
  potsize,
  rotate,
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
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: `fixed`,
              }}
             />

          </div>
          
          <div className="column is-5 rounded " style={{color: "whiteSmoke",backgroundColor: "rgba(63, 191, 127, 0.8)",borderRadius:"15px", paddingTop:"1em", marginTop:"1vh", height:"100%", textAlign:"left", fontSize:'120%'}}>
            <h1 style={{color: "whiteSmoke"}}> About {name}</h1> 
            <p>{description}</p>
            <p>I got Monty in {aqdate}</p>
            <p>Monty was last watered: {lastwatered}</p>
            <p>Monty was last fertilized: {lastfertilized}</p>
            <p>Monty currently lives in a {potsize} pot {rotate ? "which I rotate weekly." : "."} </p>
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
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                  minHeight: '500px',
                }}
              />
 
              
            </div>
            
            <div className="column is-5" style={{}}>
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
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  name: PropTypes.string,
  commonname: PropTypes.string,
  sciencename: PropTypes.string,
  helmet: PropTypes.object,
  image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const PlantPost = ({ data }) => {
  const { markdownRemark: post } = data
  const { frontmatter } = data.markdownRemark


  return (
    <Layout>
      <PlantPostTemplate
        content={post.html}
        image={frontmatter.image}
        aqdate={post.frontmatter.aqdate}
        lastwatered={post.frontmatter.lastwatered}
        lastfertilized={post.frontmatter.lastfertilized}
        potsize={post.frontmatter.potsize}
        rotate={post.frontmatter.rotate}
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
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
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
        aqdate(formatString: "MMMM, YYYY")
        lastwatered(formatString: "MMMM DD")
        lastfertilized(formatString: "MMMM DD")
        potsize
        rotate
        commonname
        sciencename
        description
        tags
      }
    }
  }
`
