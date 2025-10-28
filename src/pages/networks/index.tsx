import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { db } from "../../services/firebaseConection";
import {
    setDoc,
    doc,
    getDoc
} from "firebase/firestore";


export default function Networks() {


    const [github, setGitHub] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
                .then((snapshot) => {
                    if(snapshot.data() !== undefined){
                      setGitHub(snapshot.data()?.github)
                      setInstagram(snapshot.data()?.instagram)
                      setLinkedin(snapshot.data()?.linkedin) 
                    } 
                })
        }
        loadLinks();
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            github: github,
            instagram: instagram,
            linkedin: linkedin
        })
            .then(() => {
                console.log(`Cadastrados com sucesso!`);
            })
            .catch((error) => {
                console.log(`Erro ao salvar ${error}`);
            })
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <h1
                className="text-[#fafafa] text-2xl font-medium mt-8 mb-4">
                Minha redes sociais
            </h1>
            <form
                onSubmit={handleRegister}
                className="flex flex-col max-w-xl w-full">
                <label
                    className="text-[#fafafa] font-medium mt-2 mb-2">
                    Link do GitHub
                </label>
                <Input
                    type="url"
                    placeholder="Digite a url do GitHub..."
                    value={github}
                    onChange={(e) => setGitHub(e.target.value)}
                />

                <label
                    className="text-[#fafafa] font-medium mt-2 mb-2">
                    Link do Instagram
                </label>
                <Input
                    type="url"
                    placeholder="Digite a url do Instagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label
                    className="text-[#fafafa] font-medium mt-2 mb-2">
                    Link do Linkedin
                </label>
                <Input
                    type="url"
                    placeholder="Digite a url do Linkedin..."
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                />

                <button
                    type="submit"
                    className="text-[#fafafa] bg-emerald-500 h-9 rounded-md items-center justify-center flex cursor-pointer">
                    Salvar Links
                </button>
            </form>
        </div>
    )
}