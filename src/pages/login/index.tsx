import { Link, useNavigate } from "react-router-dom"
import logoImg from "../../../public/muse (1).png"
import { Input } from "../../components/Input"
import { useState, type FormEvent } from "react"
import { auth } from '../../services/firebaseConection'
import { signInWithEmailAndPassword } from "firebase/auth"


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if(email == "" || password === ""){
            alert("Preencha todos os campos!")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate("/admin", {replace: true})
        })
        .catch((error) => {
           console.log("Erro ao fazer o login:")
           console.log(error) 
        })
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <img
                    src={logoImg} alt="logo"
                    width={"250"} />
            </Link>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col px-2"
            >
                <Input
                    placeholder="Digite seu e-mail..."
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <Input
                    placeholder="Digite sua senha..."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button
                    type="submit"
                    className="bg-[#ff914d] h-9 rounded border-0 text-lg font-medium text-white cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    )
}