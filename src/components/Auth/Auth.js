import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'
import { signup, signin } from '../../actions/auth'


const Auth = () => {
  const initailState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initailState)
  const dispatch = useDispatch()
  const history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)

    if (isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => setShowPassword((prev) => !prev)


  const switchMode = () => {
    setIsSignup((prev) => !prev)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      history('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Google sign in was unsuccessful. Try agin later')
  }

  return <Container component='main' maxWidth='xs'>
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {
            isSignup && <>
              <Input
                name='firstName'
                label='First Name'
                handleChange={handleChange}
                autoFocus
                half />
              <Input
                name='lastName'
                label='Last Name'
                handleChange={handleChange}
                half />
            </>
          }
          <Input
            name='email'
            label='Email Address'
            handleChange={handleChange}
            type='email'
          />
          <Input
            name='password'
            label='Password'
            handleChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            handleShowPassword={handleShowPassword}
          />
          {isSignup
            && <Input
              name='confirmPassword'
              label='Repeat Password'
              handleChange={handleChange}
              type='password'
            />
          }
        </Grid>
        <Button
          className={classes.submit}
          type='submit'
          variant='contained'
          color='primary'
          fullWidth >
          {isSignup ? 'Sign up' : 'Sign in'}
        </Button>
        <GoogleLogin
          clientId='866023766564-lhuonif4uosgvp8jk3dq7sfon73ppa4v.apps.googleusercontent.com'
          render={(renderProps) => <Button
            className={classes.googleButton}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<Icon />}
            variant='contained'
            fullWidth
            color='primary'
          >
            Google sign in
          </Button>}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy='single_host_origin'
        />
        <Grid container justifyContent='flex-end' >
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup ? 'Already have an account? Sign in' : `Don't have an account? Sign up`}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
}

export default Auth