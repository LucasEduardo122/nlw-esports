export default function Card({ data }) {
    return (
        <div className='grid grid-cols-6 gap-6 mt-16'>
            {data.map((dados) => (
                <a href="" key={dados.title} className='relative rounded-lg overflow-hidden'>
                    <img src={dados.bannerURL} alt="" />

                    <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                        <strong className='font-bold text-white block'>{dados.title}</strong>
                        <span className='text-zinc-300 text-sm block'>{dados._count.ads} {dados._count.ads > 1 ? 'anúncios' : 'anúncio'}</span>
                    </div>
                </a>
            ))}
        </div>
    )
}