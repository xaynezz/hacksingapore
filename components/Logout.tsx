import { supabase } from '@/config/dbConnect'
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {}

export default function Logout({ }: Props) {
    const router = useRouter();
    const logoutHandle = async () => {
        console.log("Logout clciked!");
        const { error } = await supabase.auth.signOut()
        if(!error){
            console.log("Logout successfully!");
            router.push("/");
        }else{
            console.log(error)
        }
    }

    return (
        <button onClick={logoutHandle}>
            Click me!
        </button>
    )
}