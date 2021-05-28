import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'


class LinkCycler extends React.Component {

    state ={
    currentID : "ddcd7077-616b-5abd-bc7d-a34141ad7aa0" ,
   }

    render() {
    
        const { data } = this.props;
        const { edges: links } = data.allMarkdownRemark;
        const IdArray = []; //an array holding all the unique ID's for the links
        
        this.pushArray();//populates the array 

        return( 
            <div className="title">
                {links && links.map(({ node: linked }) => (
                    <div  key={linked.id} >
                        {  linked.id === this.state.currentID ? (
                        <a href={linked.frontmatter.url}>
                            {linked.frontmatter.title }
                        </a> ) : null }
                    </div> 
                ))}
            </div>
        )
    }
    
     //mounts and unmounts the interval function
    componentDidMount() {
        this.interval = setInterval(this.ChangeID, 3000);
        
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    pushArray() {
        console.log("pushing Array");
        this.links.forEach( ({node: link}) => {
            this.IdArray.push(link.id);
            console.log(link.id);
        })
    }
    ChangeID() {  
        if(this.IdArray[0]){
            this.setState({
                currentID : this.IdArray.pop()
            });
            console.log("currentID: " + this.state.currentID);
            
        }
        else{
            this.pushArray();
        }

        this.state.idState()
        
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
                    childrenImageSharp {
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
