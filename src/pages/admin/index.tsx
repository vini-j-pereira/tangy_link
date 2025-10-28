import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConection";
import type LinksProps from "../../interface/linksProps";

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    doc,
    deleteDoc,
    orderBy
} from 'firebase/firestore';


export default function Admin() {

    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textColorInput, setTextColorInput] = useState("#f7f7f7");
    const [bgColorInput, setBgColorInput] = useState("#4eec40");

    const [links, setLinks] = useState<LinksProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, 'links');
        const queryRef = query(linksRef, orderBy('created', 'asc'));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinksProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color

                })
            })

            setLinks(lista)

        })

        return () => {
            unsub();
        }

    }, [])

    function handelRegister(e: FormEvent) {
        e.preventDefault();
        if (nameInput === '' || urlInput === '') {
            alert('Preencha todos os Campos')
            return;
        }

        addDoc(collection(db, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            color: textColorInput,
            created: new Date()

        })
            .then(() => {
                setNameInput('');
                setUrlInput('');
                console.log('Cadastrado com sucesso!');
            })
            .catch((error) => {
                console.log('Erro ao cadastrar no banco' + error);
            })
    }

    async function handleDeleteLink(id: string) {
        const confirmDelete = confirm(`Tem certeza que deseja deletar o item: ${id}`);

        if (confirmDelete) {
            const docRef = doc(db, 'links', id);
            await deleteDoc(docRef);
        } else {
            return
        }
    }


    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-3 mb-3 w-full max-w-xl"
                onSubmit={handelRegister}>
                <label
                    className="text-white font-medium mt-2 mb-2">
                    Nome do Link
                </label>
                <Input
                    placeholder="Digite o nome do link"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label
                    className="text-white font-medium mt-2 mb-2">
                    Url do Link
                </label>
                <Input
                    type="url"
                    placeholder="Digite a url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2 mb-6">
                        <label
                            className="text-white font-medium mt-2 mb-2">
                            Fundo do Link
                        </label>
                        <input
                            className="w-8 h-8 bg-gray-400 px-0.5 py-0.5 rounded"
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label
                            className="text-white font-medium mt-2 mb-2">
                            Cor do Link
                        </label>
                        <input
                            className="w-8 h-8 bg-gray-400 px-0.5 py-0.5 rounded"
                            type="color"
                            value={bgColorInput}
                            onChange={(e) => setBgColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-white border rounded-md bg-[#e6e6e6]">
                        <label
                            className="text-white font-medium mt-2 mb-3">
                            Veja como esta ficando:
                        </label>
                        <article
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-gray-50 rounded px-1 py-3"
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: bgColorInput }}>
                            <p style={{ color: textColorInput }}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button
                    className="mb-7 bg-fuchsia-400 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center cursor-pointer"
                    type="submit">
                    Cadastrar
                </button>
            </form>
            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus Links
            </h2>

            {links.map((link) => (
                <div className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2">
                    <article
                        key={link.id}
                        className="flex items-center justify-center w-11/12 max-w-xl rounded py-3 px-2 select-none"
                        style={{ backgroundColor: link.bg, color: link.color }}
                    >
                        <p>{link.name}</p>

                    </article>
                    <div>
                        <button
                            className="border border-dashed p-1 rounded border-[#fafafa] bg-transparent cursor-pointer"
                            onClick={() => handleDeleteLink(link.id)}
                        >
                            <FiTrash size={18} color="#fafafa" />
                        </button>
                    </div>
                </div>


            ))}
        </div>
    )
}