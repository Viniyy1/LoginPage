import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'



function Home() {
const [users, setUsers] = useState([])

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()

async function getUsers() {
 const usersFromApi = await api.get('/Users')

 setUsers(usersFromApi.data)
}

async function createUsers() {

await api.post('/Users', {
  name: inputName.current.value,
  age: inputAge.current.value,
  email: inputEmail.current.value})

  getUsers()
}

async function deleteUsers(id) {

await api.delete(`/Users/${id}`)

getUsers()
}




useEffect(() => {
  getUsers()

}, [])



  return (
    <div className="container">
      <form>

      <h1>Cadastro de Usuários</h1>
      <input placeholder='Nome' type="text" name='name' ref={inputName} />
      <input placeholder='Idade' type="int" name='age' ref={inputAge} />
      <input placeholder='Email' type="email" name='email' ref={inputEmail} />
      <button onClick={createUsers} className="btn">Cadastrar</button>
      </form>

{users.map(user => (

  <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>	
          <p>Email: <span>{user.email}</span></p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>
          <img src={Trash} />
          <span>Excluir</span>
        </button>
      </div>

))}
      
    </div>
  )
}

export default Home
