import React from 'react'
import MyButton from '../components/UI/button/MyButton';
import '../styles/App.css';


const Home = () => {
  return (
    <section className="home_div">
      <div className="container-fluid ">
        <div className="row ">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col position-absolute top-50 start-0 translate-middle-y">
                <a href="/create_tournament"><MyButton style={{height: '3.75rem', width: '16rem', fontSize: '1.5rem' }} type="button" additionalCl={"btn-lg m-2"}>Create Tournament</MyButton></a>
                <a href="/create_bracket"><MyButton style={{height: '3.75rem' , width: '16rem', fontSize: '1.5rem' }} type="button" additionalCl={"btn-lg m-2"}>Create Bracket</MyButton></a>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Home