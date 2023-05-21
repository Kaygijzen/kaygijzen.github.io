import HonorCard from "./HonorCard.js"

import hr from "../assets/curve-hr.svg"

export default function Projects(){
    return (
        <div id="projects" className="mt-4 text-white pb-12">
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="font-light text-gray-400">Here are some of my public repositories</p>

            <div className="flex flex-col md:flex-row mt-4 gap-5">
                <HonorCard name="Discrete Markov Decision Process" link="https://github.com/Kaygijzen/MDP-Dynamic-Programming" desc="Python implementation of dynamic programming algorithms to solve a Markov decision process." />
                <HonorCard name="Sudoku" link="https://github.com/Kaygijzen/sudoku" desc="Pure Java implementation of a sudoku solver using a brute force algorithm." />
                <HonorCard name="Graphs & Trees" link="https://github.com/Kaygijzen/graphsAndTrees" desc="Python implementation of a various operations (such as traversal, insertion, deletion and search) on graphs and trees." />
                <HonorCard name="Tic-Tac-Toe" link="https://github.com/Kaygijzen/tictactoe" desc="C++ implementation of a decision-making algorithm (minimax) for tic-tac-toe." />
                {/* <HonorCard name="1st Place Winner of IT Network System Administration - LKS Kab. Tegal" issued="KEMENDIKBUD RI" desc="Linux Server, Cisco Configuration." /> */}
            </div>
            {/* <img src={hr} className="w-full mt-8 md:h-2" alt="hr" /> */}
        </div>
    )
}
