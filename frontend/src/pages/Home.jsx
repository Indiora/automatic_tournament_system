import React from 'react'
import '../styles/App.css';


const Home = () => {
  return (
    <section className="home_section">
      <div class="container-fluid ">
        <div class="row ">
          <div class="col-lg-2"></div>
          <div class="col-lg-8 col-md-12">
            <div class="row">
              <div class="col position-absolute top-50 start-0 translate-middle-y">
                <button type="button" class="btn my_home_button btn-lg m-2">Создать турнир</button>
                <button type="button" class="btn my_home_button btn-lg m-2 ">Создать сетку</button>
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