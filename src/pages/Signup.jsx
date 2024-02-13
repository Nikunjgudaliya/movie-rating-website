import { Facebook, Google } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';
Button
NavLink

function SignUp() {
    return (
        <div className="bg-black min-h-screen flex justify-center mt-5">
            <div className="p-6 bg-transparent text-white">
                <h2 className="text-[55px] font-bold text-center mb-16">SIGN UP</h2>
                <form className="flex flex-col items-center">
                    <div className="mb-8">
                        <input placeholder="Username" type="text" id="username" name="username" className="bg-transparent w-[340px] px-3 py-2 border-[2px] rounded-md text-white focus:outline-none focus:border-yellow-500" />
                    </div>
                    <div className="mb-8">
                        <input placeholder="Email" type="email" id="email" name="email" className="bg-transparent w-[340px] px-3 py-2 border-[2px] rounded-md text-white focus:outline-none focus:border-yellow-500 " />
                    </div>
                    <div className="mb-8">
                        <input placeholder="Password" type="password" id="password" name="password" className="bg-transparent w-[340px] px-3 py-2 border-[2px] rounded-md text-white focus:outline-none focus:border-yellow-500" />
                    </div>
                    <div className="mb-5 text-center">
                        <p className="text-sm">Don&apos;t Have any Account? <NavLink to="/signin" className="text-yellow_default ml-2">Sign In</NavLink></p>
                    </div>
                    <div className='mb-[100px]'>
                        <Button name='SIGN UP' bgColor='yellow_default' textColor='black' />
                    </div>
                </form>
                <hr className="my-6 border-gray-300 w-[400px]" />
                <p className="text-center my-6">Sign up with</p>
                <div className="text-center">
                    <Facebook className='mr-4' style={{ fontSize: "45px" }} />
                    <Google style={{ fontSize: "40px" }} />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
