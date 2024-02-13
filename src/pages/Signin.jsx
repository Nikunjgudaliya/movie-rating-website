import { Facebook, Google } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { yellow } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';

function SignIn() {
    return (
        <div className="bg-black min-h-screen flex justify-center mt-5">
            <div className="p-6 bg-transparent text-white">
                <h2 className="text-[55px] font-bold text-center mb-16">LOGIN</h2>
                <form className="flex flex-col items-center">
                    <div className="mb-8">
                        <input placeholder="Email" type="email" id="email" name="email" className="bg-transparent w-[340px] px-3 py-2 border-[2px] rounded-md text-white focus:outline-none focus:border-yellow-500 " />
                    </div>
                    <div className="mb-8">
                        <input placeholder="Password" type="password" id="password" name="password" className="bg-transparent w-[340px] px-3 py-2 border-[2px] rounded-md text-white focus:outline-none focus:border-yellow-500" />
                    </div>
                    <div className="mb-5 flex items-center">
                        <Checkbox sx={{ color: yellow[500], '&.Mui-checked': { color: yellow[500], }, }} />
                        <label htmlFor="remember" className="text-sm">Remember me</label>
                    </div>
                    <div className="mb-5 text-center">
                        <p className="text-sm">Don&apos;t Have any Account? <NavLink to="/signup" className="text-yellow_default ml-2">Sign Up</NavLink></p>
                    </div>
                    <div className="mb-[100px]">
                        <Button name='SIGN IN' bgColor='yellow_default' textColor='black' />
                    </div>
                </form>
                <hr className="my-6 border-gray-300 w-[400px]" />
                <p className="text-center my-6">Log in with</p>
                <div className="text-center">
                    <Facebook className='mr-4' style={{ fontSize: "45px" }} />
                    <Google style={{ fontSize: "40px" }} />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
