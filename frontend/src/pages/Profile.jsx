import React, { useEffect, useState } from 'react'
import PostService from "../API/PostService";
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import { useTournaments } from "../hooks/useTournaments";
import TournamentList from '../components/TournamentList';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import '../styles/App.css';


const Profile = () => {
  const params = useParams()
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [profile, setProfile] = useState({user: {}, tournaments: []})
  const sortedAndSearchedTournaments = useTournaments(profile.tournaments, filter.sort, filter.query);
  const [open, setOpen] = useState(false);

  const [fetchPostById, isLoadind, error] = useFetching(async (slug) => {
      const response = await PostService.getProfileBySlug(slug)
      setProfile(response.data)    
      console.log(response.data)  
  })

  useEffect(() => {
    fetchPostById(params.slug)
  }, [])

  return (
    <section>
        <div class="row">
          <div class="col-lg-2"></div>
          <div class="col-lg-8 col-md-12">
            <div class="profile-container my-5">
                <div class="d-flex m-4">
                  <img src={profile.user_icon} alt="user profile picture" class="profile-icon"/>
                  <div class="d-flex flex-column ps-4 pt-3">
                    <h5>{profile.user.username}</h5>
                    <p>{profile.user.email}</p>
                    <p>{profile.user.date_joined}</p>
                  </div>
                </div>
            </div>
              <div Style="text-align: center">
                <Button
                  onClick={() => setOpen(!open)}  
                  className="my_profile_button"
                  variant="link"
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  Турниры
                </Button>
              </div>
                <Collapse in={open}>
                  <div id="example-collapse-text">
                    <TournamentList tournaments={sortedAndSearchedTournaments} title="Список"/>
                  </div>
                </Collapse>
          </div>
          <div class="col-lg-2"></div>
        
      </div>
    </section>
  )
}

export default Profile