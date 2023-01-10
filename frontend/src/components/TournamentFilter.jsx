import React from 'react';
import MySelect from "./UI/select/MySelect";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const TournamentFilter = ({filter, setFilter}) => {
    return (
            <div class="row ">
                <div class="col-lg-2"></div>
                <div class="col-lg-8 col-md-12">
                    <Row>
                        <Col><input
                            value={filter.query}
                            onChange={e => setFilter({...filter, query: e.target.value})}
                            placeholder="Поиск..."
                            className='form-control my-2 shadow-none'
                            Style="background: rgb(33, 37, 41); border-color: #1D8044; color: #1D8044; "
                            /></Col>
                        <Col xs={6}></Col>
                        <Col className='d-flex justify-content-end'>
                            {/* <MySelect
                                value={filter.sort}
                                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                                defaultValue="Игра"
                            
                                options={[
                                    {value: 'title', name: 'По названию'},
                                    {value: 'body', name: 'По описанию'},
                                ]}
                            /> */}
                        </Col>
                    </Row>
                </div>
                <div class="col-lg-2"></div>
            </div>
    );
}; 



export default TournamentFilter;