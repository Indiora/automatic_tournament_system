import React, { useEffect, useState } from 'react'
import PostService from "../API/PostService";
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import { useTournaments } from "../hooks/useTournaments";
import TournamentList from '../components/TournamentList';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import '../styles/App.css';
import useAxios from '../utils/useAxios';
import UploadButton from '../components/UI/UploadButton/UploadButton';
import MyFormGroupInput from '../components/UI/MyFormGroupInput/MyFormGroupInput';
import { useForm } from 'react-hook-form';


const Profile = () => {
  const api = useAxios()
  const params = useParams()
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [profile, setProfile] = useState({user: {}, tournaments: []})
  const sortedAndSearchedTournaments = useTournaments(profile.tournaments, filter.sort, filter.query);
  const [openTournaments, setOpenTournaments] = useState(false);
  const [openPasswordChange, setOpenPasswordChange] = useState(false);
  const [openProfileChange, setOpenProfileChange] = useState(false);
  const [state, setState] = useState({old_password: '', new_password: '', re_new_password: ''})
  const [inputFile, setInputFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({mode: "onBlur"});

  const handlePasswordChangeSubmit = e => {
      e.preventDefault();
      const response = api.post('/password_change/', state)
  };

  const inputChangeHandler = (inputValue) => {
    const {name, value} = inputValue
    setState({...state, [name]: value})
}

  const handleImageChangeSubmit = e => {
    e.preventDefault();
    console.log(inputFile)
    const response = api.patch(`/img_change/${params.slug}/`, {'slug':params.slug, 'user_icon': inputFile}, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
     });
  };
  
  const [fetchPostById, isLoadind, error] = useFetching(async (slug) => {
      const response = await PostService.getProfileBySlug(slug)
      setProfile(response.data)     
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
                <div className='mb-3'>
                  <Button
                    onClick={() => setOpenTournaments(!openTournaments)}  
                    className="my_profile_button"
                    variant="link"
                    aria-controls="example-collapse-text"
                    aria-expanded={openTournaments}
                  >
                    Турниры
                  </Button>
                  <Collapse in={openTournaments}>
                    <div id="example-collapse-text">
                      <TournamentList tournaments={sortedAndSearchedTournaments} title="Список"/>
                    </div>
                  </Collapse>
                </div>
                <div className='mb-3'>
                  <Button
                    onClick={() => setOpenProfileChange(!openProfileChange)}  
                    className="my_profile_button"
                    variant="link"
                    aria-controls="example-collapse-text"
                    aria-expanded={openProfileChange}
                  >
                    Настройки профиля
                  </Button>
                  <Collapse in={openProfileChange} className="mt-2">
                    <div id="example-collapse-text">
                    <Form onSubmit={handleImageChangeSubmit}>
                      <Card border="success" className='card_profile_form my-4'>
                          <Card.Header className='tournament_text'>Аватар</Card.Header>
                          <Card.Body>
                            <Form.Group className="mb-3">
                              <UploadButton setInputFileValue={setInputFile} />
                            </Form.Group>
                            <Button className='my_home_button btn-md' variant="success" type="submit">
                                Submit
                            </Button>
                          </Card.Body>
                        </Card>
                      </Form>
                    </div>
                  </Collapse>
                </div>
                <div className='mb-3'>
                  <Button
                    onClick={() => setOpenPasswordChange(!openPasswordChange)}  
                    className="my_profile_button"
                    variant="link"
                    aria-controls="example-collapse-text"
                    aria-expanded={openPasswordChange}
                  >
                    Настройки безопасности
                  </Button>
                  <Collapse in={openPasswordChange} className="mt-2">
                    <div id="example-collapse-text">
                    <Card border="success" className='card_profile_form my-4'>
                        <Card.Header className='tournament_text'>Сменить порооль</Card.Header>
                        <Card.Body>
                        <Form onSubmit={handlePasswordChangeSubmit}>
                            <MyFormGroupInput
                                label='Old password'
                                type='password'
                                name='old_password'
                                errors={errors}
                                register={register}
                                validationSchema={{ 
                                    required: "⚠ This input is required.",
                                }}
                                onChange={inputChangeHandler}>
                            </MyFormGroupInput>
                            <MyFormGroupInput
                                label='New password'
                                type='password'
                                name='new_password'
                                errors={errors}
                                register={register}
                                validationSchema={{ 
                                    required: "⚠ This input is required.",
                                }}
                                onChange={inputChangeHandler}>
                            </MyFormGroupInput>
                            <MyFormGroupInput
                                label='Repeat new password'
                                type='password'
                                name='re_new_password'
                                errors={errors}
                                register={register}
                                validationSchema={{ 
                                    required: "⚠ This input is required.",
                                }}
                                onChange={inputChangeHandler}>
                            </MyFormGroupInput>
                            <Button className='my_home_button btn-md' variant="success" type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    </div>
                  </Collapse>
            </div>
          </div>    
          <div class="col-lg-2"></div>
        </div>
    </section>
  )
}

export default Profile