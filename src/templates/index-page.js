import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import LinkCycler from '../components/LinkCycler'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import PlantRoll from '../components/PlantRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div >
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div className="columns" 
        style={{
                    paddingTop:'10vh',
        }}
      >
        <div className="column is-6"
          style={{
            display: 'flex',
            //height: '150px',
            minWidth:'50vw',
            paddingTop: '5vh',
            lineHeight: '1',
            justifyContent: 'space-around',
            alignItems: 'left',
            flexDirection: 'column',
          }}
        >
          <div className="column">
            <h1
              className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
              style={{
                position: 'sticky',
                boxShadow: '#2a7fffff',
                backgroundColor: '#2a7fffff',
                color: 'white',
                lineHeight: '1',
                padding: '0.25em',
              }}
            >
              {title}     
            </h1>
          </div> 
        </div>
        <div className="column is-6">
            <h3
              className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
              style={{
                boxShadow:
                  '#2a7fffff',
                backgroundColor: '#2a7fffff',
                color: 'white',
                lineHeight: '1',
                padding: '1.25em',
                marginBottom:'10vh',
                colorAdjust: 100,
                minWidth: "50vw",
                minHeight: "30vh",
                justifyContent: "right"
              }}
            >
               <LinkCycler />
            </h3>
          </div>
      </div>
    </div>
    <section className="section section--gradient" >
      <div className="container">
        <div className="section">
          <div className="columns"style={{width:"100%"}}>
            <div className="column is-12" >
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
              </div>
              <div className="content" style={{width:"100%",}}>
                <div className="columns" >
                  <div className="column is-6 ">
                    <h3 className="has-text-weight-semibold is-size-2">
                      Recent Project Updates
                    </h3>
                    <BlogRoll />
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/blog">
                        Read more
                      </Link>
                    </div>
                  </div>
                  <div className="column is-6">
                    <h3 className="has-text-weight-semibold is-size-2">
                      My Plants!
                    </h3>
                    <PlantRoll />
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/plant">
                        See more
                      </Link>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        
      }
    }
  }
`
