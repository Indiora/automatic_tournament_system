import axios from 'axios'
import Col from 'react-bootstrap/esm/Col'

export default class PostService {

    static async getAllTournaments(limit=9, page=1) {
      
        const response = await axios.get('http://127.0.0.1:8000/api/v1/tournaments/', 
        {params: {
            page_size: limit,
            page: page
        }})
        return  response

    }

    static async getTournamentBySlug(slug) {

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/tournament/${slug}/`)
        return  response

    }

    static async getProfileBySlug(slug) {

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/profile/${slug}/`)
        return  response

    }

    static async getBracketById(id) {

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/bracket/${id}/`)
        return  response

    }

    static async createTournament(responseBody) {

        const response = await axios.post(`http://127.0.0.1:8000/api/v1/create_tournament/`, responseBody, {

            validateStatus: function (status) {
    
                    return status == 201;
                },
            })
        return  response

    }

    static async createBracket(responseBody) {

        const response = await axios.post(`http://127.0.0.1:8000/api/v1/create_bracket/`, responseBody, {

        validateStatus: function (status) {

                return status == 201;
            },
        })

        return  response

    }

    static async allTournamentBrackets(slug) {

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/tournament_brackets/${slug}/`)
        return  response

    }

    static async getAll(limit=10, page=1) {
      
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', 
        {params: {
            _limit: limit,
            _page: page
        }})
        return  response


    }

    static async getById(id) {
      
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id) 
        return response


    }

    static async getCommentsById(id) {
      
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`  ) 
        return response


    }
}


