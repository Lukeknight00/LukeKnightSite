import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'




class LinkCycler extends React.Component {
   state={
       currentID : "2d24d54e-4326-5757-96cf-59959c3cc704",
       IdArr : [],
       //default link
   }
    //mounts and unmounts the interval function
    componentDidMount() {
        const { data } = this.props
        const { edges: links } = data.allMarkdownRemark
        this.setState({currentID: "2d24d54e-4326-5757-96cf-59959c3cc704"})
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
            <div className="LinkTitle" 
                 >
                {links && links.map(({ node: linked }) => (
                    <div  key={linked.id} style={{textColor: 'red'}} >
                        {  linked.id === this.state.currentID ? (
                        <a href={linked.frontmatter.url} 
                            >{linked.frontmatter.title }
                        </a> ) : null}
                    </div> 
                    )  
                )} 
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
        render={(data, count) => <LinkCycler data={data} count={count} />}
        />
    )
