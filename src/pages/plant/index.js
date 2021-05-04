import React from 'react'

import Layout from '../../components/Layout'
import PlantRoll from '../../components/PlantRoll'

export default class PlantIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div        ><h1
        className="has-text-weight-bold is-size-1"
        style={{
          font:  "message-box",
          
          textAlign: "center",
          maxWidth: "75vw",
          color: '#197400',
          padding: '1.2rem',
          margin: '1rem',
        }}
      >
       My online Greenhouse
       <p className="has-text-weight-bold is-size-4">
       Please enjoy my green babys!
       </p>
      </h1>
          
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <PlantRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
