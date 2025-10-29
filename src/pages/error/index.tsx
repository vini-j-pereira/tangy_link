import { Link } from "react-router-dom";

export function ErrorPage() {
    return(
        <div 
        className="flex flex-col w-full min-h-screen justify-center items-center text-[#fafafa]">
            <h1 className="font-bold text-6xl mb-2">404</h1>
            <h2 className="font-bold text-3xl mb-4">Página não encontrada</h2>
            <p className="font-medium italic text-1xl mb-4">Essa pagina não existe!</p>
            <Link 
            className="bg-amber-500 py-1 px-4 rounded-md font-bold cursor-pointer"
            to="/">
                Voltar para a Home
            </Link>
        </div>
    )
}