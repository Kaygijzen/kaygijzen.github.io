import HonorCard from "./HonorCard.js"

import hr from "../assets/curve-hr.svg"

export default function Honors(){
    return (
        <div id="honors" className="mt-4 text-white pb-20">
            <h1 className="text-2xl font-bold">Honors & Awards</h1>
            <p className="font-light text-gray-400">Here are some of my honors and awards</p>

            <div className="flex flex-col md:flex-row mt-4 gap-5">
                <HonorCard name="T500 TNW 2023" link="https://thenextweb.com/conference/t500?utm_campaign=T500&utm_medium=email&_hsmi=237854006&utm_content=237854006&utm_source=hs_email" issued="The Next Web" desc="The T500 is TNW's curated list of exceptional individuals (under 30) who have made extraordinary achievements in the Dutch tech sector." />
                {/* <HonorCard name="1st Place Winner of IT Network System Administration - LKS Kab. Tegal" issued="KEMENDIKBUD RI" desc="Linux Server, Cisco Configuration." /> */}
            </div>
            {/* <img src={hr} className="w-full mt-8 md:h-2" alt="hr" /> */}
        </div>
    )
}
