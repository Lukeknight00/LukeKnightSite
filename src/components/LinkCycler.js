import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"




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
        this.interval = setInterval( this.ChangeID.bind(this), 1800)

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    

    render() {
        const { data } = this.props
        const { edges: links } = data.allMarkdownRemark
        //an array holding all the unique ID's for the links
            //this.interval = setInterval(this.ChangeID, 1000);


    console.log("Current ID: " +  this.state.currentID);

        return( 
            <div className="LinkTitle" style={{textAlign: "center" }}>
                {links && links.map(({ node: linked }) => (
                    <div  key={linked.id}  >
                        {  linked.id === this.state.currentID ? (
                        <a href={linked.frontmatter.url} style={{color: 'black', minHeight: '50px'}}
                            > <GatsbyImage image={getImage(linked.frontmatter.icon.childImageSharp)} alt="X" /> {linked.frontmatter.title } 
                        </a> ) : null}
                         
                    </div> 
                    )  
                )}
                {  this.state.currentID === "0" ? (
                    <p style={{ minHeight: '30px'}} > Guy who built this Website!
                    </p> ) : null}  
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
                    icon {
                        childImageSharp {
                            gatsbyImageData(width: 30
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF])
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
