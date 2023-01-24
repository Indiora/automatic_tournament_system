import React from 'react'
import MyButton from '../components/UI/button/MyButton';
import '../styles/App.css';


const Home = () => {
  return (
    <section className="home_div">
      <div class="container-fluid ">
        <div class="row ">
          <div class="col-lg-2"></div>
          <div class="col-lg-8 col-md-12">
            <div class="row">
              <div class="col position-absolute top-50 start-0 translate-middle-y">
                <a href="/create_tournament"><MyButton type="button" additionalCl={"btn-lg m-2"}>Create Tournament</MyButton></a>
                <a href="/create_bracket"><MyButton type="button" additionalCl={"btn-lg m-2"}>Create Bracket</MyButton></a>
              </div>
            </div>
          </div>
          <div class="col-lg-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Home