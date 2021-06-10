import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PreviewCompatibleImage from './PreviewCompatibleImage'




class LinkCycler extends React.Component {
   state={
       currentID : "0",       //default link

       IdArr : [],
   }
    //mounts and unmounts the interval function
    componentDidMount() {
        const { data } = this.props
        const { edges: links } = data.allMarkdownRemark
        this.setState({ IdArr : this.pushArray(links,this.state.IdArr)})//populates the array
        this.interval = setInterval( this.ChangeID.bind(this), 6000)

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    

    render() {
        const { data } = this.props
        const { edges: links } = data.allMarkdownRemark
        


    console.log("Current ID: " +  this.state.currentID);

        return( 
            <div className="LinkCycleContent">
                {links && links.map(({ node: linked }) => (
                    <div key={linked.id}   >   
                        {  linked.id === this.state.currentID ? (
                             <a href={linked.frontmatter.url} style={{color: 'White', minHeight: '50px',}}>
                                 <div className="columns" style={{gutterBottom:"20vh"}}>
                                    <div className="column is-6"> 
                                        <h1 className='is-size-2'>{linked.frontmatter.title } </h1>

                                        <h3 style={{textSizeAdjust:"80%"}}>{linked.frontmatter.description}</h3>
                                    </div>
                                    <div className="column is-6" style={{ textAlign: "center", paddingLeft:"5vw"}} > 
                                    <PreviewCompatibleImage 
                                        imageInfo={{
                                        image: linked.frontmatter.icon
                                        }}
                                     />
                                    </div>
                                </div>
                            </a>
                         ) : null}
                         
                    </div> 
                    )  
                )}
                {  this.state.currentID === "0" ? (
                    <h3 style={{ minHeight: '30px'}} > Thanks for checking out my website! I built it using <a style={{color: '#7026B9'}} href="https://www.gatsbyjs.com/">Gatsby</a> and <a  style={{color: 'purple'}} href="https://graphql.org/">GraphQL</a>, and it is hosted using <a  style={{color: '#C9FA4B'}} href="https://www.netlifycms.org/">Netlify's CMS.</a>
                    </h3> ) : null}  
            </div>
        )

        

         
       
        
    }
    pushArray = (links, IdArray) => {
        console.log("Starting to populate array ");
        
        links.forEach( ({node: link}) => {
            IdArray.push(link.id);
            console.log(link.id);
        });
        console.log("Populated array ");
        return IdArray;
    }
    ChangeID() { 
        
        
        var oldID = this.state.currentID; 
        var workingArr = this.state.IdArr;

        this.setState({currentID : workingArr.shift()});
        workingArr.push(oldID);    
        this.setState({IdArr : workingArr});

        console.log("Updating current ID: " + oldID);
        console.log("New ID: " +  this.state.currentID);
        this.forceUpdate();

     }
}

LinkCycler.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
    <StaticQuery
        query={graphql`
        query LinkCyclerQuery {
            allMarkdownRemark(sort: {order: DESC, fields: frontmatter___templateKey}, filter: {frontmatter: {templateKey: {eq: "links"}}}) {
            edges {
                node {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                    url
                    description
                    icon {
                        childImageSharp {
                            fluid(maxWidth: 200, maxHeight: 200, quality: 100) {
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
        render={(data, count) => <LinkCycler data={data} count={count} />}
        />
    )
