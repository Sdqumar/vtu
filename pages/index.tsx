import type { NextPage } from 'next'
import SignUp from "../compoments/Home/SignUp"

const Home: NextPage = () => {
  return (
    <div>
     <h1 className='bg-red-200 text-2xl'>Homepage</h1>
     <SignUp/>

    </div>
  )
}

export default Home
