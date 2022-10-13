import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

function PasswordField({ label, relp, value, setValue, error }) {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <FormControl sx={{minWidth: '100%'}} error={error} variant="standard">
            <InputLabel>{label}</InputLabel>
            <Input
              
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={event => setValue(event.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText id="standard-weight-helper-text">{relp}</FormHelperText>
        </FormControl>
    );
}

export default PasswordField;