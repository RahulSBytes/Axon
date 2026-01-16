import { Search } from 'lucide-react'
import { history } from '../../constants/constant.js'
import moment from 'moment'



function History() {
    return (
        <div className='flex h-full w-full flex-col px-14 scrollbar-thin'>
            <div className='pb-4 pt-6 pl-0 pr-8 flex justify-between items-center'>
                <h3 className='text-2xl font-medium'>History</h3>
                <Search className='text-zinc-700' />
            </div>
            <section className=' overflow-y-scroll flex-1'>
                {
                    history.map(({ title, created_at },index) => <div className={` flex justify-between cursor-pointer p-3 ${index %2 == 0? "bg-zinc-300":""}`}>
                        <p className='text-zinc-800'>{title}</p> <span className='text-muted  text-sm'>{moment(created_at).fromNow()}</span>
                    </div>)
                }
            </section>
        </div>
    )
}

export default History