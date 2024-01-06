import { FiLink2 } from 'react-icons/fi'

const Footer = () => {
    return (
        <div className='absolute bottom-5 left-5 text-blue-200'>
            <a
                href='https://devarshi0personalportfolio-v2.netlify.app/'
                className='flex items-center justify-center gap-3 text-2xl'
                target='_blank'>
                About <FiLink2 />
            </a>
        </div>
    )
}
export default Footer
