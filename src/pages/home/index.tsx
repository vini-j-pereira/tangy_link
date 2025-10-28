import { Social } from "../../components/Social";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type SocialLinksProps from "../../interface/SocialLinkProps";
import type LinksProps from "../../interface/linksProps";
import { db } from "../../services/firebaseConection";
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function Home() {


    const [links, setLinks] = useState<LinksProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
                .then((snapshot) => {
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

                    setLinks(lista);
                })
        }

        loadLinks();
    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            linkedin: snapshot.data()?.linkedin,
                            instagram: snapshot.data()?.instagram,
                            github: snapshot.data()?.github,
                        })
                    }
                })
        }
        loadSocialLinks();
    }, [])


    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
                Vinicius J. Pereira
            </h1>
            <span className="text-gray-50 mb-5 mt-3">
                Veja meus Links
            </span>
            <main className="flex flex-col w-11/12 text-center">

                {links.map((link) => (
                    <section
                        style={{ background: link.bg, color: link.color }}
                        className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                        <a href="">
                            <p className="text-base md:text-lg">
                                {link.name}
                            </p>
                        </a>
                    </section>
                ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                        <Social url={socialLinks?.github}>
                            <FaGithub size={35} color="#fff" />
                        </Social>
                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color="#fff" />
                        </Social>
                        <Social url={socialLinks?.linkedin}>
                            <FaLinkedin size={35} color="#fff" />
                        </Social>
                    </footer>
                )}
            </main>
        </div>

    )
}