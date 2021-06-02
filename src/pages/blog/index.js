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
        className="has-text-weight-bold is-size-2"
        style={{
          font:  "message-box",
          
          position: "absolute",
          boxShadow: '0.5rem 0 0 #a7fffff, -0.5rem 0 0 #a7fffff',
          backgroundColor: ' rgba(240, 240,255, 0.8)',
          borderRadius: 25,
          textAlign: "center",
          backgroundWidth: "100%",
          maxWidth: "75vw",
          color: '#2a7fffff',
          padding: '1.2rem',
          margin: '1rem',
        }}
      >
        Creative Coding, Game and Web Development, plus more coding adventures!
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
