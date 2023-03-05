
export default function HonorCard(props){
    return (
        <a 
            href={props.link} 
            data-aos="fade-up" data-aos-duration="500" data-aos-offset="100"  className="w-full md:w-2/6 bg-dark-100 rounded-md py-4 px-4 hover:bg-dark-200"
            target="_blank">
            <div className="mt-2">
                <h1 className="font-bold md:text-xl">{props.name}</h1>
                {props.issued != null ? <p className="font-light md:text-lg">Issued by {props.issued}</p> : null}
                <p className="font-light text-gray-400">{props.desc}</p>
            </div>
        </a>
    )
}
