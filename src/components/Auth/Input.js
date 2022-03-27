import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core"
import Visbility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({ half, name, label, handleChange, handleShowPassword, autoFocus, type }) => {
  return <Grid item xs={12} md={half ? 6 : 12}>
    <TextField
      name={name}
      label={label}
      onChange={handleChange}
      autoFocus={autoFocus}
      type={type}
      variant='outlined'
      required
      fullWidth
      InputProps={
        name === 'password'
          ? {
            endAdornment: <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visbility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>,
          }
          : null
      } />
  </Grid>
}

export default Input