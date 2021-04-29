import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0 "
          style={{
            backgroundImage:" url('https://editor.p5js.org/Lukeknight00/embed/qwQZj4vZG')",
          }}
        ><h1
        className="has-text-weight-bold is-size-1 "
        style={{
          position: "absolute",
          boxShadow: '0.5rem 0 0 #a7fffff, -0.5rem 0 0 #a7fffff',
          backgroundColor: ' rgba(0, 109, 255, 0.6)',
          borderRadius: 25,
          width: "100%",
          maxWidth: "90vw",
          maxWidth: 620,
          
          color: 'White',
          padding: '1.2rem',
        }}
      >
        Creative Coding, Game Development, and more!
      </h1>
          <iframe style={{backgroundColor: "transparent", allowTransparency: "true",overflow:"hidden",pointerEvents:"none" ,width:"100vw", height:"50vh", border: "none",}} src="https://editor.p5js.org/Lukeknight00/embed/qwQZj4vZG">
          
          </iframe>
          
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
