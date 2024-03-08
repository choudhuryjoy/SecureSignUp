import { auth } from '@/../auth'


const page = async () => {
    const session = await auth();
    return (
        <div className='flex justify-center align-center h-screen text-3xl  bg-emerald-900'>
            {JSON.stringify(session)}
        </div>
    )
}

export default page