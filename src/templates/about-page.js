import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import maFace from "../../static/img/luke.jpg" 
import java from "../../static/img/java.png"
import p5js from "../../static/img/p5js.png"
import Cplus from "../../static/img/C++.svg.png"
import gatsbyImg from "../../static/img/Gatsby-Netlify.jpg"
import unreal from "../../static/img/1200px-Unreal_Engine_Logo.svg.png"

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column ">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <div className="column is-10">
                
                <PageContent className="content" content={content} />
              </div>
              <div className="columns">
                <div className="column ">              
                  <img src={unreal} alt="unrealengine"></img>
                  </div>
                <div className="column ">
                  <img src={p5js} alt="p5.js"></img> 
                </div>
              </div>
              
            </div>
          </div>
          <div className="column is-6" style={{paddingTop: '10vh'}}>
            <img src={maFace} alt="me!"></img>
            <div className="columns"style={{paddingTop: '10vh'}}>
                <div className="column ">
                 <img src={java} alt="java"></img>
                </div>
                <div className="column ">
                  <img src={Cplus} alt="c++!"></img>
                </div>
            </div>
            <img src={gatsbyImg} alt="me!" style={{paddingTop: '10vh'}}></img>
            
          </div>
          
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
