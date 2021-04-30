import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import BackendErrorMessages from '../../components/backendErrorMessages'
import { CurrentUserContext } from '../../contexts/currentUser'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'

const Settings = () => {
    const [currentUserState, dispatch] = useContext(CurrentUserContext)
    const apiUrl = '/user'
    const [{response, error}, doFetch] = useFetch(apiUrl)
    const [image, setImage] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [, setToken] = useLocalStorage('token')
    const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false)
    const user = currentUserState.currentUser

    const handleSubmit = (e) => {
        console.log('submit')
        e.preventDefault()
        doFetch({
            method: 'put',
            data: {
                user: {
                    ...user,
                    image, 
                    username,
                    bio,
                    email,
                    password
                }
            }
        })
    }

    const logout = (e) => {
        console.log('logout')
        e.preventDefault()
        setToken('')
        dispatch({type: 'LOGOUT'})
        setIsSuccessfullLogout(true)
    }

    useEffect(() => {
        if (!user) {
            return
        }

        setImage(user.image)
        setUsername(user.username)
        setBio(user.bio)
        setEmail(user.email) 
    }, [currentUserState, user])

    useEffect(() => {
        if (!response) {
            return
        }

        dispatch({type: 'SET_AUTHORIZED', payload: response.user})

    }, [response, dispatch])

    if (isSuccessfullLogout) {
        return <Redirect to='/' />
    }

   if (currentUserState.isLoggedIn === false) {
       return <Redirect to='/' />
   }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your settings </h1>
                        {error && <BackendErrorMessages backendErrors={error.errors} />}
                        <form onSubmit={handleSubmit}> 
                            <fieldset>
                                <fieldset className='form-group'>
                                    <input 
                                        type="text" 
                                        className='form-control form-control-lg' 
                                        placeholder='URL of profile picture'
                                        value={image}
                                        onChange={e => setImage(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input 
                                        type="text" 
                                        className='form-control form-control-lg' 
                                        placeholder='Username' 
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <textarea 
                                        className='form-control form-control-lg' 
                                        rows="10" 
                                        placeholder='Short bio'
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                    >
                                    </textarea>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input 
                                        type="email" 
                                        className='form-control form-control-lg' 
                                        placeholder='Email' 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input 
                                        type="password" 
                                        className='form-control form-control-lg' 
                                        placeholder='Password' 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button 
                                    type='submit' 
                                    className='btn btn-lg btn-primary pull-xs-right'
                                >
                                    Update settings
                                </button>
                            </fieldset>
                        </form>
                        <hr/>
                        <button 
                            className='btn btn-outline-danger' 
                            onClick={logout} 
                        >
                            Or click here to logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings