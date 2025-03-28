'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback,useState } from 'react';
import {FieldValues,SubmitHandler,useForm} from 'react-hook-form';
import useRegisterModal from '@/app/Hooks/useRegisterModal';
import { MdEmail } from 'react-icons/md';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const [isLoading,setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'', 
            password:'' 
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

         axios.post('/api/auth/register', data )
            .then(()=>{
                RegisterModal.onClose();
            })
            .catch((error) =>{
                toast.error('Something went wrong!');
            })
            .finally(()=>{
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <div className='flex flex-col gap-4 '>
            <Heading title='Welcome to Airbnb' subtitle='Create an Account!'/>
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required/>
        </div>
    )


    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onclick={() => {}}/>
            <Button outline label='Continue with Github' icon={AiFillGithub} onclick={() => {}}/>
            <div className='rext-neutral-500 text-center mt-4 font-light '>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div className=''>
                        Already have an Account?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline ' onClick={RegisterModal.onClose}>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
    return ( 
      <Modal disabled={isLoading}  isOpen={RegisterModal.isOpen} title='Register' actionLabel='Continue' onClose={RegisterModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
     );
}
 
export default RegisterModal;